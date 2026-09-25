import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { classesService } from '../../services/classesService';
import { coachesService } from '../../services/coachesService';
import { useToast } from '../../context/ToastContext';

export const ClassFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Bootcamp & Conditioning',
    date: '2026-09-26',
    dayOfWeek: 'Saturday',
    startTime: '08:00 AM',
    endTime: '09:00 AM',
    durationMinutes: 60,
    location: 'South Campus Turf',
    coachName: 'Coach Ron Brezzell',
    intensity: 'High Intensity',
    capacity: 12,
    entryRate: '$15.00 Drop-in / Credit Pass',
    description: ''
  });

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadCoaches();
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          category: initialData.category || 'Bootcamp & Conditioning',
          date: initialData.date || '2026-09-26',
          dayOfWeek: initialData.dayOfWeek || 'Saturday',
          startTime: initialData.startTime || '08:00 AM',
          endTime: initialData.endTime || '09:00 AM',
          durationMinutes: initialData.durationMinutes || 60,
          location: initialData.location || 'South Campus Turf',
          coachName: initialData.coachName || 'Coach Ron Brezzell',
          intensity: initialData.intensity || 'High Intensity',
          capacity: initialData.capacity || 12,
          entryRate: initialData.entryRate || '$15.00 Drop-in',
          description: initialData.description || ''
        });
      } else {
        setFormData({
          name: '',
          category: 'Bootcamp & Conditioning',
          date: '2026-09-26',
          dayOfWeek: 'Saturday',
          startTime: '08:00 AM',
          endTime: '09:00 AM',
          durationMinutes: 60,
          location: 'South Campus Turf',
          coachName: 'Coach Ron Brezzell',
          intensity: 'High Intensity',
          capacity: 12,
          entryRate: '$15.00 Drop-in / 1 Credit',
          description: 'A high energy, full body conditioning session designed to push your limits.'
        });
      }
    }
  }, [initialData, isOpen]);

  const loadCoaches = async () => {
    try {
      const cList = await coachesService.getCoaches();
      setCoaches(cList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await classesService.updateClass(initialData.id, formData);
        addToast({ title: 'Class Updated', message: `Saved changes for ${formData.name}`, type: 'success' });
      } else {
        await classesService.createClass(formData);
        addToast({ title: 'Class Scheduled', message: `Scheduled ${formData.name} at ${formData.location}`, type: 'success' });
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
      title={initialData ? 'Edit Class / Lab' : 'Schedule Spartan Class / Lab'}
      subtitle="Set date, timing, location campus, capacity roster, and coaching lead"
      maxWidth="620px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Schedule Session'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <FormField label="Class Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Saturday Bootcamp"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Category">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-control"
            >
              <option value="Bootcamp & Conditioning">Bootcamp & Conditioning</option>
              <option value="HIIT & Conditioning">HIIT & Conditioning</option>
              <option value="Strength & Iron">Strength & Iron</option>
              <option value="Combat & Boxing">Combat & Boxing</option>
              <option value="Mobility & Recovery">Mobility & Recovery</option>
              <option value="1-on-1 Protocol">1-on-1 Protocol</option>
              <option value="Group Protocol">Group Protocol</option>
            </select>
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Date">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="form-control"
            />
          </FormField>

          <FormField label="Start Time">
            <input
              type="text"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              placeholder="08:00 AM"
              className="form-control"
            />
          </FormField>

          <FormField label="Duration (Mins)">
            <input
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Facility Location">
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="form-control"
            >
              <option value="South Campus Turf">South Campus Turf</option>
              <option value="Ron's Private Facility">Ron's Private Facility</option>
              <option value="Downtown Studio">Downtown Studio</option>
              <option value="South Campus Turf (Lab 01)">South Campus Turf (Lab 01)</option>
            </select>
          </FormField>

          <FormField label="Assigned Coach">
            <select
              value={formData.coachName}
              onChange={(e) => setFormData({ ...formData, coachName: e.target.value })}
              className="form-control"
            >
              {coaches.map(c => (
                <option key={c.id} value={c.name}>{c.name} ({c.role})</option>
              ))}
              <option value="Coach Ron Brezzell">Coach Ron Brezzell</option>
              <option value="Coach Marcus Vance">Coach Marcus Vance</option>
              <option value="Dr. Elena Rostova">Dr. Elena Rostova</option>
              <option value="Coach Jordan Cole">Coach Jordan Cole</option>
            </select>
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Max Capacity (Spots)">
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
              className="form-control"
            />
          </FormField>

          <FormField label="Intensity">
            <select
              value={formData.intensity}
              onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
              className="form-control"
            >
              <option value="High Intensity">High Intensity</option>
              <option value="Zone 4/5">Zone 4/5</option>
              <option value="Moderate">Moderate</option>
              <option value="Low - Recovery">Low - Recovery</option>
              <option value="Tiered Packs">Tiered Packs</option>
            </select>
          </FormField>

          <FormField label="Entry Rate Text">
            <input
              type="text"
              value={formData.entryRate}
              onChange={(e) => setFormData({ ...formData, entryRate: e.target.value })}
              placeholder="$15 Drop-in"
              className="form-control"
            />
          </FormField>
        </div>

        <FormField label="Class Description & Gear Requirements">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="form-control"
            placeholder="A high-energy, full body conditioning session..."
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default ClassFormModal;
