import React, { useState, useEffect } from 'react';
import { workoutsService } from '../../services/workoutsService';
import { WorkoutBuilderModal } from './WorkoutBuilderModal';
import { WorkoutDetailModal } from './WorkoutDetailModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  Dumbbell, 
  Plus, 
  Copy, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  Flame, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export const WorkoutsView = ({ triggerAction }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [deletingWorkout, setDeletingWorkout] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    if (triggerAction === 'new_workout') {
      setEditingWorkout(null);
      setIsBuilderOpen(true);
    }
  }, [triggerAction]);

  const loadWorkouts = async () => {
    setLoading(true);
    try {
      const data = await workoutsService.getWorkouts();
      setWorkouts(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load workouts', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (workout) => {
    try {
      await workoutsService.duplicateWorkout(workout.id);
      addToast({ title: 'Protocol Duplicated', message: `Created copy of ${workout.name}`, type: 'success' });
      loadWorkouts();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const handleTogglePublish = async (workout) => {
    try {
      await workoutsService.togglePublish(workout.id, workout.isPublished);
      addToast({
        title: 'Status Updated',
        message: `${workout.name} is now ${!workout.isPublished ? 'Published' : 'Draft'}`,
        type: 'success'
      });
      loadWorkouts();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deletingWorkout) return;
    try {
      await workoutsService.deleteWorkout(deletingWorkout.id);
      addToast({ title: 'Workout Removed', message: `Deleted ${deletingWorkout.name}`, type: 'success' });
      setDeletingWorkout(null);
      loadWorkouts();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Protocol / Workout',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.9rem' }}>{row.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {row.description || row.trainingObjective}
          </div>
        </div>
      )
    },
    {
      header: 'Target Body',
      key: 'category',
      sortable: true,
      render: (val) => <span className="spartan-badge spartan-badge-cyan">{val}</span>
    },
    {
      header: 'Difficulty',
      key: 'difficulty',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Duration',
      key: 'durationMinutes',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#FFF' }}>
          ⏱️ {val} Min
        </span>
      )
    },
    {
      header: 'Stations',
      key: 'stations',
      render: (_, row) => (
        <div style={{ fontSize: '0.78rem', color: 'var(--spartan-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {row.exercisesSequence?.length || 0} Exercises
        </div>
      )
    },
    {
      header: 'Author Coach',
      key: 'authorCoach',
      render: (val) => <span style={{ fontSize: '0.8rem', color: '#FFF' }}>{val || 'Ron Brezzell'}</span>
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePublish(row);
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          title="Click to toggle publish status"
        >
          <StatusBadge status={row.isPublished ? 'Published' : 'Draft'} />
        </button>
      )
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
            onClick={() => {
              setSelectedWorkout(row);
              setIsDetailOpen(true);
            }}
            title="View Protocol Sequence"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Copy}
            onClick={() => handleDuplicate(row)}
            title="Duplicate Workout"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => {
              setEditingWorkout(row);
              setIsBuilderOpen(true);
            }}
            title="Edit Protocol"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setDeletingWorkout(row)}
            title="Delete Workout"
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
        data={workouts}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search workout protocol name or focus..."
        filterOptions={[
          {
            key: 'category',
            label: 'Category',
            options: ['Full Body', 'Upper Body', 'Lower Body', 'Conditioning', 'Core']
          },
          {
            key: 'difficulty',
            label: 'Difficulty',
            options: ['Beginner', 'Intermediate', 'Advanced']
          }
        ]}
        onAddClick={() => {
          setEditingWorkout(null);
          setIsBuilderOpen(true);
        }}
        addLabel="Build Workout Protocol"
        onRowClick={(row) => {
          setSelectedWorkout(row);
          setIsDetailOpen(true);
        }}
      />

      {/* Workout Builder Modal */}
      <WorkoutBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        initialData={editingWorkout}
        onSuccess={loadWorkouts}
      />

      {/* Workout Detail Modal */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={(w) => {
          setEditingWorkout(w);
          setIsBuilderOpen(true);
        }}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deletingWorkout)}
        onClose={() => setDeletingWorkout(null)}
        onConfirm={handleDelete}
        title="Delete Workout Protocol"
        message={`Are you sure you want to permanently delete "${deletingWorkout?.name}"?`}
      />
    </div>
  );
};

export default WorkoutsView;
