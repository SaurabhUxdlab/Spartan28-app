import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { coachesService } from '../../services/coachesService';
import { useToast } from '../../context/ToastContext';

export const CoachFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Strength & Conditioning Coach',
    email: '',
    phone: '',
    bio: '',
    specializations: 'Strength & Power, Spartan Core Burn',
    location: 'South Campus Turf',
    quote: 'Discipline is freedom.',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        role: initialData.role || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        bio: initialData.bio || '',
        specializations: Array.isArray(initialData.specializations) ? initialData.specializations.join(', ') : (initialData.specializations || ''),
        location: initialData.location || 'South Campus Turf',
        quote: initialData.quote || '',
        avatar: initialData.avatar || '',
        status: initialData.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        role: 'Strength & Conditioning Coach',
        email: '',
        phone: '',
        bio: 'Elite conditioning specialist forged in discipline and biomechanical precision.',
        specializations: 'Strength & Power, Spartan Core Burn, Hypertrophy',
        location: 'South Campus Turf',
        quote: 'Discipline is freedom. Form over speed.',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
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
        await coachesService.updateCoach(initialData.id, formData);
        addToast({ title: 'Coach Updated', message: `Saved changes for ${formData.name}`, type: 'success' });
      } else {
        await coachesService.createCoach(formData);
        addToast({ title: 'Coach Profile Added', message: `Added ${formData.name} to coaching roster`, type: 'success' });
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
      title={initialData ? 'Edit Coach Profile' : 'Add Coach to Spartan Roster'}
      subtitle="Configure training specializations, campus locations, and biography"
      maxWidth="620px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Add Coach'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Coach Full Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ron Brezzell"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Coaching Role / Title" required>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Head Coach & Founder"
              required
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Email">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="coach@spartan28.com"
              className="form-control"
            />
          </FormField>

          <FormField label="Phone Number">
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <FormField label="Primary Facility Location">
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. South Campus Turf / Ron's Facility"
              className="form-control"
            />
          </FormField>

          <FormField label="Status">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="form-control"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </FormField>
        </div>

        <FormField label="Specializations (Comma separated)">
          <input
            type="text"
            value={formData.specializations}
            onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
            placeholder="Strength & Power, Spartan Core Burn, Hyrox Metcon"
            className="form-control"
          />
        </FormField>

        <FormField label="Coaching Motto / Quote">
          <input
            type="text"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="e.g. Discipline is freedom. Form over speed."
            className="form-control"
          />
        </FormField>

        <FormField label="Avatar Image URL">
          <input
            type="url"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            className="form-control"
          />
        </FormField>

        <FormField label="Professional Bio">
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="form-control"
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default CoachFormModal;
