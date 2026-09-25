import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { bookingsService } from '../../services/bookingsService';
import { membersService } from '../../services/membersService';
import { classesService } from '../../services/classesService';
import { useToast } from '../../context/ToastContext';

export const NewBookingModal = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    memberId: '',
    classId: '',
    paymentStatus: 'Credit Used (1 Credit)',
    status: 'Confirmed'
  });

  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [mList, cList] = await Promise.all([
        membersService.getMembers(),
        classesService.getClasses()
      ]);
      setMembers(mList);
      setClasses(cList);
      if (mList.length > 0) setFormData(prev => ({ ...prev, memberId: mList[0].id }));
      if (cList.length > 0) setFormData(prev => ({ ...prev, classId: cList[0].id }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.memberId || !formData.classId) return;

    setLoading(true);
    try {
      const member = members.find(m => m.id === formData.memberId);
      const cls = classes.find(c => c.id === formData.classId);

      await bookingsService.createBooking({
        memberId: member.id,
        memberName: member.name,
        memberEmail: member.email,
        classId: cls.id,
        className: cls.name,
        coachName: cls.coachName,
        location: cls.location,
        bookingDate: `${cls.date} ${cls.startTime}`,
        status: formData.status,
        paymentStatus: formData.paymentStatus
      });

      addToast({
        title: 'Booking Confirmed',
        message: `Reserved ${cls.name} for ${member.name}`,
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
      title="Create Class Reservation"
      subtitle="Manually allocate spot or place athlete on waitlist"
      maxWidth="540px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            Confirm Reservation
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormField label="Select Spartan Athlete" required>
          <select
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            className="form-control"
            required
          >
            {members.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.membershipPlan} • {m.credits} credits ready)
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Select Class / Session" required>
          <select
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            className="form-control"
            required
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} • {c.dayOfWeek} {c.startTime} ({c.bookedCount}/{c.capacity} spots) - {c.location}
              </option>
            ))}
          </select>
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Payment Method / Vector">
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              className="form-control"
            >
              <option value="Credit Used (1 Credit)">Deduct Class Credit (1)</option>
              <option value="Paid ($15.00 Drop-in)">Single Drop-in ($15.00)</option>
              <option value="Paid ($45.00 1-on-1)">1-on-1 PT Single ($45.00)</option>
              <option value="Annual Pass Included">Annual Pass Free Session</option>
              <option value="Comped / Staff Pass">Comped / Staff Pass</option>
            </select>
          </FormField>

          <FormField label="Reservation Status">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="form-control"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Waitlisted">Waitlisted</option>
            </select>
          </FormField>
        </div>

        <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-green-border)', fontSize: '0.75rem', color: 'var(--spartan-text-secondary)', marginTop: '8px' }}>
          <strong style={{ color: 'var(--spartan-green)' }}>Spartan Flex Guarantee:</strong> Athletes can cancel up to 12 hours prior to zero-hour for automatic credit restoration.
        </div>
      </form>
    </Modal>
  );
};

export default NewBookingModal;
