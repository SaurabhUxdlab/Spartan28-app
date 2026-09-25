import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Filter, SlidersHorizontal } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from './Button';

export const DataTable = ({
  columns = [],
  data = [],
  searchKey,
  searchPlaceholder = 'Search records...',
  filterOptions = [], // [{ key: 'status', label: 'Status', options: ['All', 'Active', 'Paused'] }]
  loading = false,
  emptyTitle = 'No data available',
  emptyDescription = 'No records match your criteria.',
  onAddClick,
  addLabel = 'Create Record',
  pageSize = 8,
  onRowClick,
  actions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search term matching across searchKey or all string values
      if (searchTerm) {
        if (searchKey && item[searchKey]) {
          const val = String(item[searchKey]).toLowerCase();
          if (!val.includes(searchTerm.toLowerCase())) return false;
        } else {
          const matchAny = Object.values(item).some(val => 
            typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (!matchAny) return false;
        }
      }

      // Dropdown filters
      for (const [key, filterVal] of Object.entries(activeFilters)) {
        if (filterVal && filterVal !== 'ALL') {
          if (String(item[key]).toLowerCase() !== String(filterVal).toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchTerm, searchKey, activeFilters]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      if (sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
  }, [filteredData, sortConfig]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Table Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: 1,
            maxWidth: '360px'
          }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--spartan-text-muted)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="form-control"
              style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem' }}
            />
          </div>

          {/* Filters */}
          {filterOptions.map(filter => (
            <div key={filter.key} style={{ display: 'flex', alignItems: 'center' }}>
              <select
                value={activeFilters[filter.key] || 'ALL'}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="form-control"
                style={{ height: '38px', fontSize: '0.82rem', paddingRight: '28px' }}
              >
                <option value="ALL">{filter.label}: All</option>
                {filter.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {actions}
          {onAddClick && (
            <Button variant="primary" size="sm" onClick={onAddClick}>
              + {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="table-container">
        {loading ? (
          <LoadingSpinner text="Querying Spartan Command..." />
        ) : sortedData.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            actionText={onAddClick ? addLabel : undefined}
            onAction={onAddClick}
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="spartan-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key || col.header}
                      style={{
                        cursor: col.sortable ? 'pointer' : 'default',
                        width: col.width || 'auto',
                        textAlign: col.align || 'left'
                      }}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span>{col.header}</span>
                        {col.sortable && (
                          <ArrowUpDown
                            size={12}
                            style={{
                              color: sortConfig.key === col.key ? 'var(--spartan-green)' : 'var(--spartan-text-dim)'
                            }}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    onClick={() => onRowClick && onRowClick(row)}
                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key || col.header}
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && sortedData.length > 0 && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--spartan-border-subtle)',
              background: 'var(--spartan-bg-surface)',
              fontSize: '0.8rem',
              color: 'var(--spartan-text-muted)'
            }}
          >
            <div>
              Showing <span style={{ color: '#FFF', fontWeight: 600 }}>{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span style={{ color: '#FFF', fontWeight: 600 }}>
                {Math.min(currentPage * pageSize, sortedData.length)}
              </span>{' '}
              of <span style={{ color: '#FFF', fontWeight: 600 }}>{sortedData.length}</span> entries
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
              </Button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFF' }}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
