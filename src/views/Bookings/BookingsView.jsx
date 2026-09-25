import React, { useState, useEffect } from 'react';
import { bookingsService } from '../../services/bookingsService';
import { NewBookingModal } from './NewBookingModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  BookmarkCheck, 
  Plus, 
  XCircle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  DollarSign 
} from 'lucide-react';

export const BookingsView = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingsService.getBookings();
      setBookings(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancellingBooking) return;
    try {
      await bookingsService.cancelBooking(cancellingBooking.id);
      addToast({
        title: 'Reservation Cancelled',
        message: `Spartan Flex Guarantee credit restored for ${cancellingBooking.memberName}`,
        type: 'success'
      });
      setCancellingBooking(null);
      loadBookings();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const handlePromoteWaitlist = async (booking) => {
    try {
      await bookingsService.updateBookingStatus(booking.id, 'Confirmed');
      addToast({
        title: 'Athlete Promoted',
        message: `${booking.memberName} is now confirmed for ${booking.className}`,
        type: 'success'
      });
      loadBookings();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Athlete',
      key: 'memberName',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.88rem' }}>{row.memberName}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.memberEmail}</div>
        </div>
      )
    },
    {
      header: 'Class / Session',
      key: 'className',
      sortable: true,
      render: (val) => <div style={{ color: '#FFF', fontWeight: 600 }}>{val}</div>
    },
    {
      header: 'Date & Time',
      key: 'bookingDate',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--spartan-green)' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Location',
      key: 'location',
      render: (val) => (
        <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} /> {val}
        </span>
      )
    },
    {
      header: 'Payment / Vector',
      key: 'paymentStatus',
      render: (val) => (
        <span className="spartan-badge spartan-badge-muted" style={{ fontSize: '0.68rem' }}>
          {val || 'Included in Pass'}
        </span>
      )
    },
    {
      header: 'Reservation Status',
      key: 'status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          {row.status?.includes('Waitlist') && (
            <Button
              variant="secondary"
              size="sm"
              icon={CheckCircle}
              onClick={() => handlePromoteWaitlist(row)}
              title="Promote to Confirmed"
            >
              Admit
            </Button>
          )}
          {row.status !== 'Cancelled' && (
            <Button
              variant="ghost"
              size="sm"
              icon={XCircle}
              onClick={() => setCancellingBooking(row)}
              title="Cancel Booking"
              style={{ color: 'var(--spartan-red)' }}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={bookings}
        loading={loading}
        searchKey="memberName"
        searchPlaceholder="Search athlete or class booking..."
        filterOptions={[
          {
            key: 'status',
            label: 'Status',
            options: ['Confirmed', 'Waitlisted', 'Cancelled']
          }
        ]}
        onAddClick={() => setIsModalOpen(true)}
        addLabel="Reserve Spot"
      />

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadBookings}
      />

      {/* Cancel Booking Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(cancellingBooking)}
        onClose={() => setCancellingBooking(null)}
        onConfirm={handleCancelBooking}
        title="Cancel Session Reservation"
        message={`Cancel reservation for ${cancellingBooking?.memberName} in ${cancellingBooking?.className}? Under the Spartan Flex Guarantee (12h policy), their credit will be restored instantly.`}
        confirmText="Cancel Reservation"
      />
    </div>
  );
};

export default BookingsView;
