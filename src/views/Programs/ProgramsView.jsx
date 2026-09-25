import React, { useState, useEffect } from 'react';
import { programsService } from '../../services/programsService';
import { ProgramFormModal } from './ProgramFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Layers, Plus, Edit, Trash2, Calendar, Users, Award } from 'lucide-react';

export const ProgramsView = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [deletingProgram, setDeletingProgram] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const data = await programsService.getPrograms();
      setPrograms(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load workout programs', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prog) => {
    setEditingProgram(prog);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingProgram) return;
    try {
      await programsService.deleteProgram(deletingProgram.id);
      addToast({ title: 'Program Archived', message: `Deleted ${deletingProgram.name}`, type: 'success' });
      setDeletingProgram(null);
      loadPrograms();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Structured Program',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.9rem' }}>{row.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.objective}</div>
        </div>
      )
    },
    {
      header: 'Timeline',
      key: 'durationWeeks',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--spartan-text-primary)' }}>
          {val} Weeks ({row.totalSessions} Sessions)
        </span>
      )
    },
    {
      header: 'Difficulty',
      key: 'difficulty',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Enrolled Athletes',
      key: 'enrolledMembersCount',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--spartan-green)' }}>
          {val || 0} Athletes
        </span>
      )
    },
    {
      header: 'Linked Workouts',
      key: 'linkedWorkoutIds',
      render: (val) => (
        <span className="spartan-badge spartan-badge-cyan">
          {val?.length || 0} Protocols
        </span>
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
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleEdit(row)} title="Edit Program" />
          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeletingProgram(row)} title="Delete Program" style={{ color: 'var(--spartan-red)' }} />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={programs}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search structured program title or objective..."
        onAddClick={() => {
          setEditingProgram(null);
          setIsFormOpen(true);
        }}
        addLabel="Create Structured Program"
      />

      {/* Program Form Modal */}
      <ProgramFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingProgram}
        onSuccess={loadPrograms}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deletingProgram)}
        onClose={() => setDeletingProgram(null)}
        onConfirm={handleDelete}
        title="Archive Workout Program"
        message={`Are you sure you want to archive "${deletingProgram?.name}"?`}
      />
    </div>
  );
};

export default ProgramsView;
