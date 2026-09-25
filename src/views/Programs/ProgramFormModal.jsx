import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { programsService } from '../../services/programsService';
import { workoutsService } from '../../services/workoutsService';
import { useToast } from '../../context/ToastContext';

export const ProgramFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    durationWeeks: 8,
    totalSessions: 32,
    objective: '',
    difficulty: 'Intermediate',
    description: '',
    status: 'Active',
    linkedWorkoutIds: []
  });

  const [workoutsList, setWorkoutsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadWorkouts();
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          durationWeeks: initialData.durationWeeks || 8,
          totalSessions: initialData.totalSessions || 32,
          objective: initialData.objective || '',
          difficulty: initialData.difficulty || 'Intermediate',
          description: initialData.description || '',
          status: initialData.status || 'Active',
          linkedWorkoutIds: initialData.linkedWorkoutIds || []
        });
      } else {
        setFormData({
          name: '',
          durationWeeks: 8,
          totalSessions: 32,
          objective: 'Hypertrophy & Fat Loss',
          difficulty: 'Intermediate',
          description: 'A comprehensive multi-week progression protocol.',
          status: 'Active',
          linkedWorkoutIds: []
        });
      }
    }
  }, [initialData, isOpen]);

  const loadWorkouts = async () => {
    try {
      const list = await workoutsService.getWorkouts();
      setWorkoutsList(list);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleWorkout = (id) => {
    setFormData(prev => {
      const exists = prev.linkedWorkoutIds.includes(id);
      return {
        ...prev,
        linkedWorkoutIds: exists
          ? prev.linkedWorkoutIds.filter(wId => wId !== id)
          : [...prev.linkedWorkoutIds, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await programsService.updateProgram(initialData.id, formData);
        addToast({ title: 'Program Updated', message: `Saved ${formData.name}`, type: 'success' });
      } else {
        await programsService.createProgram(formData);
        addToast({ title: 'Program Created', message: `Published ${formData.name}`, type: 'success' });
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Structured Program' : 'Create Structured Program'}
      subtitle="Periodize multi-week curriculum, session counts, and workout connections"
      maxWidth="620px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Publish Program'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormField label="Program Title" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Spartan Lean & Strong Protocol"
            required
            className="form-control"
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Duration (Weeks)">
            <input
              type="number"
              value={formData.durationWeeks}
              onChange={(e) => setFormData({ ...formData, durationWeeks: Number(e.target.value) })}
              className="form-control"
            />
          </FormField>

          <FormField label="Total Sessions">
            <input
              type="number"
              value={formData.totalSessions}
              onChange={(e) => setFormData({ ...formData, totalSessions: Number(e.target.value) })}
              className="form-control"
            />
          </FormField>

          <FormField label="Difficulty">
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="form-control"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </FormField>
        </div>

        <FormField label="Primary Objective">
          <input
            type="text"
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            placeholder="e.g. Progressive overload & body fat reduction"
            className="form-control"
          />
        </FormField>

        <FormField label="Detailed Protocol Description">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="form-control"
          />
        </FormField>

        {/* Linked Workouts */}
        <FormField label="Linked Workouts in this Program (Select all that apply)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
            {workoutsList.map(wo => {
              const isSelected = formData.linkedWorkoutIds.includes(wo.id);
              return (
                <div
                  key={wo.id}
                  onClick={() => toggleWorkout(wo.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--spartan-green-dim)' : 'var(--spartan-bg-surface)',
                    border: `1px solid ${isSelected ? 'var(--spartan-green)' : 'var(--spartan-border-subtle)'}`,
                    color: isSelected ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{wo.name} ({wo.durationMinutes}m)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                    {isSelected ? '✓ Linked' : '+ Link'}
                  </span>
                </div>
              );
            })}
          </div>
        </FormField>
      </form>
    </Modal>
  );
};

export default ProgramFormModal;
