import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { exercisesService } from '../../services/exercisesService';
import { useToast } from '../../context/ToastContext';

export const ExerciseFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Upper Body',
    targetMuscle: '',
    defaultSets: 3,
    defaultReps: 12,
    restDurationSeconds: 45,
    weightGuidance: '',
    difficulty: 'Intermediate',
    instructions: '',
    mediaUrl: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Upper Body',
        targetMuscle: initialData.targetMuscle || '',
        defaultSets: initialData.defaultSets || 3,
        defaultReps: initialData.defaultReps || 12,
        restDurationSeconds: initialData.restDurationSeconds || 45,
        weightGuidance: initialData.weightGuidance || '',
        difficulty: initialData.difficulty || 'Intermediate',
        instructions: initialData.instructions || '',
        mediaUrl: initialData.mediaUrl || '',
        status: initialData.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        category: 'Upper Body',
        targetMuscle: 'Lats & Rhomboids',
        defaultSets: 3,
        defaultReps: 12,
        restDurationSeconds: 45,
        weightGuidance: 'Moderate to Heavy (60-75 lbs)',
        difficulty: 'Intermediate',
        instructions: 'Slow down the eccentric negative phase. Form over speed.',
        mediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80',
        status: 'Active'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await exercisesService.updateExercise(initialData.id, formData);
        addToast({ title: 'Exercise Updated', message: `Saved changes for ${formData.name}`, type: 'success' });
      } else {
        await exercisesService.createExercise(formData);
        addToast({ title: 'Exercise Created', message: `Added ${formData.name} to library`, type: 'success' });
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
      title={initialData ? 'Edit Exercise' : 'Create Library Exercise'}
      subtitle="Define target muscle kinetics, default sets/reps, and coaching cues"
      maxWidth="600px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Save Exercise'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Exercise Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dumbbell Row"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Target Muscle Group" required>
            <input
              type="text"
              value={formData.targetMuscle}
              onChange={(e) => setFormData({ ...formData, targetMuscle: e.target.value })}
              placeholder="e.g. Lats, Rhomboids, Core"
              required
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Category">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-control"
            >
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Full Body">Full Body</option>
              <option value="Conditioning">Conditioning</option>
              <option value="Core">Core</option>
              <option value="Mobility">Mobility</option>
            </select>
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

          <FormField label="Rest Timer (Sec)">
            <input
              type="number"
              value={formData.restDurationSeconds}
              onChange={(e) => setFormData({ ...formData, restDurationSeconds: e.target.value })}
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Default Sets">
            <input
              type="number"
              value={formData.defaultSets}
              onChange={(e) => setFormData({ ...formData, defaultSets: e.target.value })}
              className="form-control"
            />
          </FormField>

          <FormField label="Default Reps">
            <input
              type="number"
              value={formData.defaultReps}
              onChange={(e) => setFormData({ ...formData, defaultReps: e.target.value })}
              className="form-control"
            />
          </FormField>

          <FormField label="Weight Guidance">
            <input
              type="text"
              value={formData.weightGuidance}
              onChange={(e) => setFormData({ ...formData, weightGuidance: e.target.value })}
              placeholder="e.g. 65 lbs / 75% 1RM"
              className="form-control"
            />
          </FormField>
        </div>

        <FormField label="Instructional Media URL (Image/Video Demo)">
          <input
            type="url"
            value={formData.mediaUrl}
            onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
            placeholder="https://..."
            className="form-control"
          />
        </FormField>

        <FormField label="Execution Instructions & Coaching Cues">
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            rows={3}
            className="form-control"
            placeholder="Describe posture, tempo, breathing, and contraction points..."
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default ExerciseFormModal;
