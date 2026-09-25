import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { membershipsService } from '../../services/membershipsService';
import { useToast } from '../../context/ToastContext';

export const MembershipFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 9.99,
    billingFrequency: 'Monthly',
    description: '',
    features: '',
    facilityAccess: 'Standard Mobile Only',
    coachingBenefits: 'Community Q&A',
    nutritionBenefits: 'Standard Fuel Guides',
    status: 'Active',
    badgeText: ''
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || 0,
        billingFrequency: initialData.billingFrequency || 'Monthly',
        description: initialData.description || '',
        features: Array.isArray(initialData.features) ? initialData.features.join('\n') : (initialData.features || ''),
        facilityAccess: initialData.facilityAccess || 'Standard Mobile Only',
        coachingBenefits: initialData.coachingBenefits || '',
        nutritionBenefits: initialData.nutritionBenefits || '',
        status: initialData.status || 'Active',
        badgeText: initialData.badgeText || ''
      });
    } else {
      setFormData({
        name: '',
        price: 9.99,
        billingFrequency: 'Monthly',
        description: '',
        features: 'Full Mobile App Access\nDaily Workout Protocols\nStep Tracking & Apple Watch Sync',
        facilityAccess: 'Standard Mobile Only',
        coachingBenefits: 'Community Q&A & Coach Tips',
        nutritionBenefits: 'Standard Fuel Guides',
        status: 'Active',
        badgeText: '7-DAY FREE TRIAL'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await membershipsService.updateMembership(initialData.id, formData);
        addToast({ title: 'Plan Updated', message: `Updated ${formData.name}`, type: 'success' });
      } else {
        await membershipsService.createMembership(formData);
        addToast({ title: 'Plan Created', message: `Created new membership tier ${formData.name}`, type: 'success' });
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
      title={initialData ? 'Edit Membership Tier' : 'Create Spartan Membership Tier'}
      subtitle="Configure pricing, billing intervals, benefits, and facility privileges"
      maxWidth="600px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Create Plan'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Membership Plan Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Elite Protocol 10-Pack"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Badge / Promo Tag (Optional)">
            <input
              type="text"
              value={formData.badgeText}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              placeholder="e.g. BEST VALUE SAVE 17%"
              className="form-control"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Price ($ USD)" required>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Billing Frequency">
            <select
              value={formData.billingFrequency}
              onChange={(e) => setFormData({ ...formData, billingFrequency: e.target.value })}
              className="form-control"
            >
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual</option>
              <option value="One-Time Credit Pack">One-Time Credit Pack</option>
              <option value="Per Session">Per Session</option>
            </select>
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

        <FormField label="Description">
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief overview of who this protocol tier is for..."
            className="form-control"
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Facility Access Level">
            <input
              type="text"
              value={formData.facilityAccess}
              onChange={(e) => setFormData({ ...formData, facilityAccess: e.target.value })}
              placeholder="e.g. South Campus + Downtown"
              className="form-control"
            />
          </FormField>

          <FormField label="Coaching Privileges">
            <input
              type="text"
              value={formData.coachingBenefits}
              onChange={(e) => setFormData({ ...formData, coachingBenefits: e.target.value })}
              placeholder="e.g. Coach Ron Direct Chat"
              className="form-control"
            />
          </FormField>
        </div>

        <FormField label="Included Feature List (One benefit per line)">
          <textarea
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            rows={4}
            className="form-control"
            placeholder="Full Mobile App Access&#10;Daily Workout Protocols&#10;Apple Watch Device Sync"
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default MembershipFormModal;
