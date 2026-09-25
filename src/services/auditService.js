import { dbService } from '../firebase/firestoreHelper';

export const auditService = {
  async getAuditLogs() {
    return await dbService.getCollection('auditLogs');
  },

  async logAction({ user = 'Super Admin', role = 'Super Admin', action, module, recordId = '', details = '' }) {
    const logEntry = {
      user,
      role,
      action,
      module,
      recordId,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 200 + 10)
    };
    return await dbService.addDocument('auditLogs', logEntry);
  }
};
