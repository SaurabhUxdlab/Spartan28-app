import React, { useState, useEffect } from 'react';
import { exercisesService } from '../../services/exercisesService';
import { ExerciseFormModal } from './ExerciseFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Flame, Plus, Edit, Trash2, Dumbbell, PlayCircle } from 'lucide-react';

export const ExercisesView = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [deletingExercise, setDeletingExercise] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = await exercisesService.getExercises();
      setExercises(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load exercise library', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingExercise) return;
    try {
      await exercisesService.deleteExercise(deletingExercise.id);
      addToast({ title: 'Exercise Archived', message: `Removed ${deletingExercise.name}`, type: 'success' });
      setDeletingExercise(null);
      loadExercises();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Exercise',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.mediaUrl || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80'}
            alt={row.name}
            style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--spartan-border-subtle)' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)' }}>{row.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>
              Target: <span style={{ color: 'var(--spartan-green)' }}>{row.targetMuscle}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
      sortable: true,
      render: (val) => <span className="spartan-badge spartan-badge-cyan">{val}</span>
    },
    {
      header: 'Target Structure',
      key: 'structure',
      render: (_, row) => (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--spartan-text-secondary)' }}>
          {row.defaultSets} Sets × {row.defaultReps} Reps ({row.restDurationSeconds}s Rest)
        </div>
      )
    },
    {
      header: 'Weight Guidance',
      key: 'weightGuidance',
      render: (val) => (
        <div style={{ fontSize: '0.78rem', color: 'var(--spartan-text-muted)' }}>
          {val || 'Standard Protocol'}
        </div>
      )
    },
    {
      header: 'Difficulty',
      key: 'difficulty',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleEdit(row)} title="Edit Exercise" />
          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeletingExercise(row)} title="Archive Exercise" style={{ color: 'var(--spartan-red)' }} />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={exercises}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search exercises or target muscle groups..."
        filterOptions={[
          {
            key: 'category',
            label: 'Category',
            options: ['Upper Body', 'Lower Body', 'Full Body', 'Conditioning', 'Core', 'Mobility']
          },
          {
            key: 'difficulty',
            label: 'Difficulty',
            options: ['Beginner', 'Intermediate', 'Advanced']
          }
        ]}
        onAddClick={() => {
          setEditingExercise(null);
          setIsFormOpen(true);
        }}
        addLabel="Create Exercise"
      />

      {/* Exercise Form Modal */}
      <ExerciseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingExercise}
        onSuccess={loadExercises}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deletingExercise)}
        onClose={() => setDeletingExercise(null)}
        onConfirm={handleDelete}
        title="Archive Exercise"
        message={`Are you sure you want to archive "${deletingExercise?.name}"? Workouts currently containing this exercise will preserve historic sequences.`}
      />
    </div>
  );
};

export default ExercisesView;
