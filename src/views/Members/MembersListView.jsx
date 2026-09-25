import React, { useState, useEffect } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { MemberDetailDrawer } from './MemberDetailDrawer';
import { MemberFormModal } from './MemberFormModal';
import { membersService } from '../../services/membersService';
import { useToast } from '../../context/ToastContext';
import { Eye, Edit, Trash2 } from 'lucide-react';

export const MembersListView = ({ triggerAction }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    if (triggerAction === 'new_member') {
      setEditingMember(null);
      setIsFormOpen(true);
    }
  }, [triggerAction]);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await membersService.getMembers();
      setMembers(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load members', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingMember) return;
    try {
      await membersService.deleteMember(deletingMember.id);
      addToast({ title: 'Athlete Deleted', message: `Removed ${deletingMember.name}`, type: 'success' });
      setDeletingMember(null);
      if (selectedMember?.id === deletingMember.id) {
        setIsDetailOpen(false);
      }
      loadMembers();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Spartan Athlete',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={row.name}
            style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--spartan-border-subtle)' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#FFF' }}>{row.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>
              {row.scanId || row.id}
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
          <div style={{ fontSize: '0.82rem', color: 'var(--spartan-text-secondary)' }}>{row.email}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.phone || '-'}</div>
        </div>
      )
    },
    {
      header: 'Membership Plan',
      key: 'membershipPlan',
      sortable: true,
      render: (val) => (
        <span className="spartan-badge spartan-badge-cyan">
          {val || 'Monthly Plan'}
        </span>
      )
    },
    {
      header: 'Assigned Coach',
      key: 'assignedCoachName',
      sortable: true,
      render: (val) => (
        <div style={{ fontSize: '0.82rem', color: '#FFF', fontWeight: 600 }}>
          {val || 'Ron Brezzell'}
        </div>
      )
    },
    {
      header: 'Credits',
      key: 'credits',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--spartan-green)' }}>
          {val || 0}
        </span>
      )
    },
    {
      header: 'Cadence Streak',
      key: 'streak',
      render: (_, row) => (
        <div style={{ fontSize: '0.82rem', color: 'var(--spartan-amber)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
          🔥 {row.measurements?.streakDays || 0}d
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => handleRowClick(row)}
            title="View Details"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => handleEdit(row)}
            title="Edit Athlete"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setDeletingMember(row)}
            title="Delete Athlete"
            style={{ color: 'var(--spartan-red)' }}
          />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={members}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search athlete name, email, or Scan ID..."
        filterOptions={[
          {
            key: 'status',
            label: 'Status',
            options: ['Active', 'Paused']
          },
          {
            key: 'membershipPlan',
            label: 'Plan',
            options: ['Monthly Plan', 'Annual Pass', 'Elite Protocol 10-Pack', 'Group Training']
          }
        ]}
        onAddClick={() => {
          setEditingMember(null);
          setIsFormOpen(true);
        }}
        addLabel="Register Athlete"
        onRowClick={handleRowClick}
      />

      {/* Member Detail Drawer */}
      <MemberDetailDrawer
        member={selectedMember}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={(m) => {
          setIsDetailOpen(false);
          handleEdit(m);
        }}
        onDelete={(m) => {
          setIsDetailOpen(false);
          setDeletingMember(m);
        }}
        onMemberUpdated={loadMembers}
      />

      {/* Member Create/Edit Modal */}
      <MemberFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingMember}
        onSuccess={loadMembers}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingMember)}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDelete}
        title="Delete Athlete Profile"
        message={`Are you sure you want to permanently delete ${deletingMember?.name}? All workout progress and membership records will be archived.`}
        confirmText="Delete Athlete"
      />
    </div>
  );
};

export default MembersListView;
