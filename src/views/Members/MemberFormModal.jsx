import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { membersService } from '../../services/membersService';
import { useToast } from '../../context/ToastContext';

export const MemberFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipPlan: 'Monthly Plan',
    assignedCoachName: 'Ron Brezzell',
    credits: 10,
    status: 'Active',
    goals: ['Build Muscle', 'Get Stronger']
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        membershipPlan: initialData.membershipPlan || 'Monthly Plan',
        assignedCoachName: initialData.assignedCoachName || 'Ron Brezzell',
        credits: initialData.credits || 10,
        status: initialData.status || 'Active',
        goals: initialData.goals || ['Build Muscle']
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        membershipPlan: 'Monthly Plan',
        assignedCoachName: 'Ron Brezzell',
        credits: 10,
        status: 'Active',
        goals: ['Build Muscle', 'Get Stronger']
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await membersService.updateMember(initialData.id, formData);
        addToast({ title: 'Athlete Updated', message: `Saved changes for ${formData.name}`, type: 'success' });
      } else {
        await membersService.createMember(formData);
        addToast({ title: 'Athlete Registered', message: `Added ${formData.name} to Spartan Roster`, type: 'success' });
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const goalOptions = [
    'Build Muscle',
    'Lose Fat',
    'Get Stronger',
    'Improve Fitness',
    'Improve Mobility',
    'General Health',
    'Athletic Performance'
  ];

  const toggleGoal = (goal) => {
    setFormData(prev => {
      const exists = prev.goals.includes(goal);
      return {
        ...prev,
        goals: exists ? prev.goals.filter(g => g !== goal) : [...prev.goals, goal]
      };
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Spartan Athlete' : 'Register New Spartan Athlete'}
      subtitle="Configure profile credentials, membership tier, and dedicated coach assignment"
      maxWidth="580px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Register Athlete'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Full Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Johnson"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Email Address" required>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="athlete@spartan28.com"
              required
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Phone Number">
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="form-control"
            />
          </FormField>

          <FormField label="Membership Tier">
            <select
              value={formData.membershipPlan}
              onChange={(e) => setFormData({ ...formData, membershipPlan: e.target.value })}
              className="form-control"
            >
              <option value="Monthly Plan">Monthly Plan ($9.99/mo)</option>
              <option value="Annual Pass">Annual Pass ($99.00/yr)</option>
              <option value="Elite Protocol 10-Pack">Elite Protocol 10-Pack ($199.00)</option>
              <option value="Group Training">Group Training ($149.00/mo)</option>
              <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
            </select>
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Assigned Coach">
            <select
              value={formData.assignedCoachName}
              onChange={(e) => setFormData({ ...formData, assignedCoachName: e.target.value })}
              className="form-control"
            >
              <option value="Ron Brezzell">Ron Brezzell (Head Coach)</option>
              <option value="Marcus Vance">Marcus Vance (Hyrox & Strength)</option>
              <option value="Elena Rostova">Elena Rostova (Mobility)</option>
              <option value="Jordan Cole">Jordan Cole (Combat)</option>
            </select>
          </FormField>

          <FormField label="Initial Credits">
            <input
              type="number"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
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
              <option value="Paused">Paused</option>
            </select>
          </FormField>
        </div>

        <FormField label="Training Focus & Goals (Select all that apply)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {goalOptions.map(g => {
              const selected = formData.goals.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGoal(g)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    border: `1px solid ${selected ? 'var(--spartan-green)' : 'var(--spartan-border-subtle)'}`,
                    background: selected ? 'var(--spartan-green-dim)' : 'transparent',
                    color: selected ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {selected ? '✓ ' : '+ '} {g}
                </button>
              );
            })}
          </div>
        </FormField>
      </form>
    </Modal>
  );
};

export default MemberFormModal;
