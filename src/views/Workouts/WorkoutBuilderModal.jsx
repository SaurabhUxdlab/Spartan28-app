import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { workoutsService } from '../../services/workoutsService';
import { exercisesService } from '../../services/exercisesService';
import { useToast } from '../../context/ToastContext';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Dumbbell, 
  Clock, 
  Flame,
  CheckCircle2
} from 'lucide-react';

export const WorkoutBuilderModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Full Body',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    trainingObjective: '',
    authorCoach: 'Ron Brezzell',
    isPublished: true,
    exercisesSequence: []
  });

  const [availableExercises, setAvailableExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadLibraryExercises();
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          description: initialData.description || '',
          category: initialData.category || 'Full Body',
          difficulty: initialData.difficulty || 'Intermediate',
          durationMinutes: initialData.durationMinutes || 45,
          trainingObjective: initialData.trainingObjective || '',
          authorCoach: initialData.authorCoach || 'Ron Brezzell',
          isPublished: initialData.isPublished !== undefined ? initialData.isPublished : true,
          exercisesSequence: initialData.exercisesSequence ? [...initialData.exercisesSequence] : []
        });
      } else {
        setFormData({
          name: '',
          description: '',
          category: 'Full Body',
          difficulty: 'Intermediate',
          durationMinutes: 45,
          trainingObjective: 'Metabolic Conditioning & Strength',
          authorCoach: 'Ron Brezzell',
          isPublished: true,
          exercisesSequence: [
            { exerciseId: 'EX-001', name: 'Dumbbell Row', sets: 3, reps: 12, restSeconds: 45, weight: '65 lbs' },
            { exerciseId: 'EX-005', name: 'Kettlebell Swings', sets: 4, reps: 20, restSeconds: 45, weight: '28 kg' }
          ]
        });
      }
    }
  }, [initialData, isOpen]);

  const loadLibraryExercises = async () => {
    try {
      const exList = await exercisesService.getExercises();
      setAvailableExercises(exList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddExerciseStep = (exercise) => {
    const newStep = {
      exerciseId: exercise.id,
      name: exercise.name,
      sets: exercise.defaultSets || 3,
      reps: exercise.defaultReps || 10,
      restSeconds: exercise.restDurationSeconds || 60,
      weight: exercise.weightGuidance || 'Moderate'
    };

    setFormData(prev => ({
      ...prev,
      exercisesSequence: [...prev.exercisesSequence, newStep]
    }));
  };

  const handleUpdateStep = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.exercisesSequence];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, exercisesSequence: updated };
    });
  };

  const handleRemoveStep = (index) => {
    setFormData(prev => ({
      ...prev,
      exercisesSequence: prev.exercisesSequence.filter((_, i) => i !== index)
    }));
  };

  const handleMoveStep = (index, direction) => {
    setFormData(prev => {
      const updated = [...prev.exercisesSequence];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, exercisesSequence: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await workoutsService.updateWorkout(initialData.id, formData);
        addToast({ title: 'Workout Updated', message: `Saved ${formData.name}`, type: 'success' });
      } else {
        await workoutsService.createWorkout(formData);
        addToast({ title: 'Workout Protocol Built', message: `Published ${formData.name}`, type: 'success' });
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
      title={initialData ? 'Edit Workout Protocol' : 'Build Spartan Workout Protocol'}
      subtitle="Sequence kinetic exercises, calibrate rest intervals, and assign coach author"
      maxWidth="780px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Protocol' : 'Publish Workout'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {/* Protocol Meta */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <FormField label="Protocol / Workout Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Iron Back Protocol"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Target Category">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-control"
            >
              <option value="Full Body">Full Body</option>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Conditioning">Conditioning</option>
              <option value="Core">Core</option>
            </select>
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
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

          <FormField label="Est. Duration (Mins)">
            <input
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
              className="form-control"
            />
          </FormField>

          <FormField label="Author Coach">
            <select
              value={formData.authorCoach}
              onChange={(e) => setFormData({ ...formData, authorCoach: e.target.value })}
              className="form-control"
            >
              <option value="Ron Brezzell">Coach Ron Brezzell</option>
              <option value="Marcus Vance">Coach Marcus Vance</option>
              <option value="Elena Rostova">Dr. Elena Rostova</option>
              <option value="Jordan Cole">Coach Jordan Cole</option>
            </select>
          </FormField>
        </div>

        <FormField label="Training Objective & Focus">
          <input
            type="text"
            value={formData.trainingObjective}
            onChange={(e) => setFormData({ ...formData, trainingObjective: e.target.value })}
            placeholder="e.g. High-volume pull dynamics focused on lat development and grip endurance"
            className="form-control"
          />
        </FormField>

        {/* Workout Builder Exercise Sequence */}
        <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--spartan-border-subtle)', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--spartan-text-primary)' }}>Exercise Sequence ({formData.exercisesSequence.length} Exercises)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
                Set target sets, reps, load, and rest timer per station
              </p>
            </div>

            {/* Quick Add Exercise Dropdown */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                onChange={(e) => {
                  const selectedEx = availableExercises.find(ex => ex.id === e.target.value);
                  if (selectedEx) handleAddExerciseStep(selectedEx);
                  e.target.value = '';
                }}
                className="form-control"
                style={{ width: 'auto', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                defaultValue=""
              >
                <option value="" disabled>+ Add Exercise from Library</option>
                {availableExercises.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name} ({ex.category})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sequence List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {formData.exercisesSequence.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--spartan-bg-surface)',
                  border: '1px solid var(--spartan-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--spartan-green-dim)',
                  color: 'var(--spartan-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  flexShrink: 0
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div style={{ flex: 1.5 }}>
                  <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.85rem' }}>{step.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    ID: {step.exerciseId}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 3 }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--spartan-text-muted)', display: 'block' }}>SETS</span>
                    <input
                      type="number"
                      value={step.sets}
                      onChange={(e) => handleUpdateStep(idx, 'sets', Number(e.target.value))}
                      className="form-control"
                      style={{ width: '60px', padding: '4px 6px', height: '30px', fontSize: '0.78rem' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--spartan-text-muted)', display: 'block' }}>REPS</span>
                    <input
                      type="number"
                      value={step.reps}
                      onChange={(e) => handleUpdateStep(idx, 'reps', Number(e.target.value))}
                      className="form-control"
                      style={{ width: '60px', padding: '4px 6px', height: '30px', fontSize: '0.78rem' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--spartan-text-muted)', display: 'block' }}>WEIGHT/LOAD</span>
                    <input
                      type="text"
                      value={step.weight}
                      onChange={(e) => handleUpdateStep(idx, 'weight', e.target.value)}
                      placeholder="e.g. 65 lbs"
                      className="form-control"
                      style={{ width: '85px', padding: '4px 6px', height: '30px', fontSize: '0.78rem' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--spartan-text-muted)', display: 'block' }}>REST (S)</span>
                    <input
                      type="number"
                      value={step.restSeconds}
                      onChange={(e) => handleUpdateStep(idx, 'restSeconds', Number(e.target.value))}
                      className="form-control"
                      style={{ width: '60px', padding: '4px 6px', height: '30px', fontSize: '0.78rem' }}
                    />
                  </div>
                </div>

                {/* Move & Delete Step */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveStep(idx, -1)}
                    style={{ background: 'none', border: 'none', color: 'var(--spartan-text-muted)', cursor: 'pointer', padding: '2px' }}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === formData.exercisesSequence.length - 1}
                    onClick={() => handleMoveStep(idx, 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--spartan-text-muted)', cursor: 'pointer', padding: '2px' }}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    style={{ background: 'none', border: 'none', color: 'var(--spartan-red)', cursor: 'pointer', padding: '2px', marginLeft: '4px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {formData.exercisesSequence.length === 0 && (
              <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--spartan-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--spartan-border-subtle)', color: 'var(--spartan-text-muted)', fontSize: '0.8rem' }}>
                No exercises added to this sequence yet. Select an exercise from the dropdown above.
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default WorkoutBuilderModal;
