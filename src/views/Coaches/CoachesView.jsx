import React, { useState, useEffect } from 'react';
import { coachesService } from '../../services/coachesService';
import { CoachFormModal } from './CoachFormModal';
import { CoachDetailDrawer } from './CoachDetailDrawer';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  CalendarDays, 
  Users, 
  Plus,
  Mail,
  Phone
} from 'lucide-react';

export const CoachesView = ({ triggerAction }) => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState(null);
  const [deletingCoach, setDeletingCoach] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadCoaches();
  }, []);

  useEffect(() => {
    if (triggerAction === 'new_coach') {
      setEditingCoach(null);
      setIsFormOpen(true);
    }
  }, [triggerAction]);

  const loadCoaches = async () => {
    setLoading(true);
    try {
      const data = await coachesService.getCoaches();
      setCoaches(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load coaches', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (coach) => {
    setSelectedCoach(coach);
    setIsDetailOpen(true);
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingCoach) return;
    try {
      await coachesService.deleteCoach(deletingCoach.id);
      addToast({ title: 'Coach Deactivated', message: `Removed ${deletingCoach.name}`, type: 'success' });
      setDeletingCoach(null);
      if (selectedCoach?.id === deletingCoach.id) {
        setIsDetailOpen(false);
      }
      loadCoaches();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Coach',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80'}
            alt={row.name}
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: 'var(--radius-sm)', 
              objectFit: 'cover', 
              border: '1px solid var(--spartan-green-border)',
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.88rem' }}>
              {row.name}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--spartan-text-muted)', marginTop: '1px' }}>
              {row.role || 'Coach / Staff'}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      key: 'email',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--spartan-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Mail size={12} style={{ color: 'var(--spartan-text-dim)', flexShrink: 0 }} />
            <span>{row.email || '—'}</span>
          </div>
          {row.phone && (
            <div style={{ fontSize: '0.74rem', color: 'var(--spartan-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <Phone size={11} style={{ color: 'var(--spartan-text-dim)', flexShrink: 0 }} />
              <span>{row.phone}</span>
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Specialization',
      key: 'specializations',
      render: (val) => {
        const specs = Array.isArray(val) ? val : (val ? [val] : []);
        if (specs.length === 0) return <span style={{ color: 'var(--spartan-text-dim)' }}>—</span>;
        
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '240px' }}>
            {specs.slice(0, 2).map((spec, idx) => (
              <span key={idx} className="spartan-badge spartan-badge-cyan" style={{ fontSize: '0.66rem', padding: '2px 7px' }}>
                {spec}
              </span>
            ))}
            {specs.length > 2 && (
              <span className="spartan-badge spartan-badge-muted" style={{ fontSize: '0.64rem', padding: '2px 5px' }}>
                +{specs.length - 2}
              </span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (val) => <StatusBadge status={val || 'Active'} />
    },
    {
      header: 'Assigned Classes',
      key: 'activeClasses',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--spartan-text-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <CalendarDays size={13} style={{ color: 'var(--spartan-cyan)' }} />
            <span>{row.activeClasses || 0} Classes</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={11} style={{ color: 'var(--spartan-text-dim)' }} />
            <span>{row.assignedAthletesCount || 0} Athletes</span>
          </div>
        </div>
      )
    },
    {
      header: 'Schedule / Availability',
      key: 'location',
      sortable: true,
      render: (val) => (
        <div style={{ fontSize: '0.8rem', color: 'var(--spartan-text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <MapPin size={13} style={{ color: 'var(--spartan-green)', flexShrink: 0 }} />
          <span>{val?.split('/')[0]?.trim() || 'South Campus Turf'}</span>
        </div>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }} 
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => handleRowClick(row)}
            title="View Coach Profile"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => handleEdit(row)}
            title="Edit Coach"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setDeletingCoach(row)}
            title="Deactivate Coach"
            style={{ color: 'var(--spartan-red)' }}
          />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Professional Admin Data Table */}
      <DataTable
        columns={columns}
        data={coaches}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search coaches by name, role, email, or discipline..."
        filterOptions={[
          {
            key: 'status',
            label: 'Status',
            options: ['Active', 'Inactive']
          }
        ]}
        onAddClick={() => {
          setEditingCoach(null);
          setIsFormOpen(true);
        }}
        addLabel="Add Coach"
        onRowClick={handleRowClick}
      />

      {/* Coach Detail Drawer */}
      <CoachDetailDrawer
        coach={selectedCoach}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={(c) => {
          setIsDetailOpen(false);
          handleEdit(c);
        }}
        onDelete={(c) => {
          setIsDetailOpen(false);
          setDeletingCoach(c);
        }}
        onCoachUpdated={loadCoaches}
      />

      {/* Coach Form Modal (Create / Edit) */}
      <CoachFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingCoach}
        onSuccess={loadCoaches}
      />

      {/* Deactivate / Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingCoach)}
        onClose={() => setDeletingCoach(null)}
        onConfirm={handleDelete}
        title="Deactivate Coach Profile"
        message={`Are you sure you want to deactivate ${deletingCoach?.name}? Assigned training sessions will require a substitute coach.`}
        confirmText="Deactivate Coach"
      />
    </div>
  );
};

export default CoachesView;
