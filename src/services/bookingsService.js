import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';
import { classesService } from './classesService';

export const bookingsService = {
  async getBookings() {
    return await dbService.getCollection('bookings');
  },

  async createBooking(data) {
    const booking = await dbService.addDocument('bookings', {
      ...data,
      status: data.status || 'Confirmed',
      paymentStatus: data.paymentStatus || 'Credit Used (1 Credit)',
      checkInStatus: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });

    // Increment booked count for the class if classId is provided
    if (data.classId) {
      try {
        const cls = await classesService.getClassById(data.classId);
        if (cls) {
          const nextCount = (cls.bookedCount || 0) + 1;
          await classesService.updateClass(data.classId, {
            bookedCount: nextCount,
            status: nextCount >= cls.capacity ? 'Full' : 'Open'
          });
        }
      } catch (err) {
        console.error('Error updating class capacity on booking:', err);
      }
    }

    await auditService.logAction({
      action: 'Created Booking',
      module: 'Bookings',
      recordId: booking.id,
      details: `Booked ${booking.memberName} for ${booking.className}`
    });

    return booking;
  },

  async updateBookingStatus(id, newStatus) {
    const result = await dbService.updateDocument('bookings', id, { status: newStatus });
    await auditService.logAction({
      action: 'Updated Booking Status',
      module: 'Bookings',
      recordId: id,
      details: `Changed booking status to ${newStatus}`
    });
    return result;
  },

  async cancelBooking(id) {
    const booking = await dbService.getDocument('bookings', id);
    const result = await dbService.updateDocument('bookings', id, { 
      status: 'Cancelled',
      cancelledAt: new Date().toISOString()
    });

    if (booking?.classId) {
      try {
        const cls = await classesService.getClassById(booking.classId);
        if (cls && cls.bookedCount > 0) {
          const nextCount = Math.max(0, cls.bookedCount - 1);
          await classesService.updateClass(booking.classId, {
            bookedCount: nextCount,
            status: 'Open'
          });
        }
      } catch (err) {
        console.error('Error adjusting class count after cancellation:', err);
      }
    }

    await auditService.logAction({
      action: 'Cancelled Booking',
      module: 'Bookings',
      recordId: id,
      details: `Cancelled reservation with full Spartan Flex guarantee restoration`
    });

    return result;
  }
};
