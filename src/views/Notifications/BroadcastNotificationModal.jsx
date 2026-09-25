import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { notificationsService } from '../../services/notificationsService';
import { useToast } from '../../context/ToastContext';
import { Send, Bell } from 'lucide-react';

export const BroadcastNotificationModal = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'Workout Alert',
    targetGroup: 'Active Members'
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    setLoading(true);
    try {
      await notificationsService.sendNotification(formData);
      addToast({
        title: 'Push Notification Broadcasted',
        message: `Dispatched "${formData.title}" to ${formData.targetGroup}`,
        type: 'success'
      });
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
      title="Broadcast Mobile Push Notification"
      subtitle="Instantly ping member devices with workout assignments, class reminders, or updates"
      maxWidth="540px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading} icon={Send}>
            Broadcast Alert
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormField label="Notification Title" required>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Upper Body Strength Protocol Ready"
            required
            className="form-control"
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Notification Category">
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="form-control"
            >
              <option value="Workout Alert">Workout Alert</option>
              <option value="Class Reminder">Class Reminder</option>
              <option value="Waitlist Update">Waitlist Update</option>
              <option value="Billing">Billing & Subscription</option>
              <option value="Announcement">Facility Announcement</option>
            </select>
          </FormField>

          <FormField label="Target Audience">
            <select
              value={formData.targetGroup}
              onChange={(e) => setFormData({ ...formData, targetGroup: e.target.value })}
              className="form-control"
            >
              <option value="Active Members">All Active Members</option>
              <option value="Booked Athletes (CLS-001)">Saturday Bootcamp Bookings</option>
              <option value="Expiring in 72 Hours">Subscribers Expiring in 72h</option>
              <option value="Vanguard 10k Club">10K Vanguard Club</option>
              <option value="Coaches Only">Coaches & Staff</option>
            </select>
          </FormField>
        </div>

        <FormField label="Push Message Body" required>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            required
            className="form-control"
            placeholder="Type concise alert message shown on lock screens..."
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default BroadcastNotificationModal;
