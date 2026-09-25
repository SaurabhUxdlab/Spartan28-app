import React, { useState, useEffect } from 'react';
import { auditService } from '../../services/auditService';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  History, 
  ShieldCheck, 
  Clock, 
  Terminal, 
  Filter 
} from 'lucide-react';

export const AuditLogView = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await auditService.getAuditLogs();
      setLogs(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load audit trail', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Admin / Actor',
      key: 'user',
      sortable: true,
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.85rem' }}>{val}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--spartan-green)', fontFamily: 'var(--font-mono)' }}>
            {row.role}
          </div>
        </div>
      )
    },
    {
      header: 'Action Performed',
      key: 'action',
      sortable: true,
      render: (val) => (
        <span style={{ fontWeight: 600, color: 'var(--spartan-text-primary)', fontSize: '0.85rem' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Module',
      key: 'module',
      sortable: true,
      render: (val) => <span className="spartan-badge spartan-badge-cyan">{val}</span>
    },
    {
      header: 'Record Identifier',
      key: 'recordId',
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
          {val || '-'}
        </span>
      )
    },
    {
      header: 'Operation Details',
      key: 'details',
      render: (val) => (
        <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-secondary)' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Timestamp',
      key: 'timestamp',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--spartan-text-primary)' }}>
          {val}
        </span>
      )
    },
    {
      header: 'IP Vector',
      key: 'ipAddress',
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>
          {val || '192.168.1.1'}
        </span>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="spartan-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <History size={20} style={{ color: 'var(--spartan-cyan)' }} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.9rem' }}>
              Immutable Administrative Audit Log
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
              All database mutations, pricing modifications, and athlete actions are permanently recorded.
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" onClick={loadLogs}>
          Refresh Trail
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        loading={loading}
        searchKey="details"
        searchPlaceholder="Search action details or actor..."
        filterOptions={[
          {
            key: 'module',
            label: 'Module',
            options: ['Members', 'Memberships', 'Workouts', 'Exercises', 'Classes', 'Bookings', 'Attendance', 'Nutrition', 'Content', 'Payments', 'Roles & Permissions', 'Settings']
          }
        ]}
      />
    </div>
  );
};

export default AuditLogView;
