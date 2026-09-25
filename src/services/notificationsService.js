import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const notificationsService = {
  async getNotifications() {
    return await dbService.getCollection('notifications');
  },

  async sendNotification(data) {
    const notification = await dbService.addDocument('notifications', {
      ...data,
      sentTime: 'Just now',
      status: 'Sent',
      deliveredCount: Math.floor(Math.random() * 200 + 50)
    });

    await auditService.logAction({
      action: 'Broadcasted Notification',
      module: 'Notifications',
      recordId: notification.id,
      details: `Sent "${notification.title}" to ${notification.targetGroup || 'All Members'}`
    });

    return notification;
  },

  async deleteNotification(id) {
    const result = await dbService.deleteDocument('notifications', id);
    await auditService.logAction({
      action: 'Deleted Notification',
      module: 'Notifications',
      recordId: id,
      details: `Removed notification log ${id}`
    });
    return result;
  }
};
