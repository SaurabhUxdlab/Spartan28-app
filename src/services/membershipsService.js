import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const membershipsService = {
  async getMemberships() {
    return await dbService.getCollection('memberships');
  },

  async getMembershipById(id) {
    return await dbService.getDocument('memberships', id);
  },

  async createMembership(data) {
    const membership = await dbService.addDocument('memberships', {
      ...data,
      price: Number(data.price) || 0,
      subscribersCount: 0,
      status: data.status || 'Active',
      features: Array.isArray(data.features) ? data.features : (data.features ? data.features.split('\n').filter(Boolean) : [])
    });

    await auditService.logAction({
      action: 'Created Membership Plan',
      module: 'Memberships',
      recordId: membership.id,
      details: `Created plan "${membership.name}" priced at $${membership.price}`
    });

    return membership;
  },

  async updateMembership(id, updates) {
    const formatted = { ...updates };
    if (formatted.price !== undefined) formatted.price = Number(formatted.price);
    if (typeof formatted.features === 'string') {
      formatted.features = formatted.features.split('\n').filter(Boolean);
    }
    const result = await dbService.updateDocument('memberships', id, formatted);
    await auditService.logAction({
      action: 'Updated Membership Plan',
      module: 'Memberships',
      recordId: id,
      details: `Modified plan specifications for ${id}`
    });
    return result;
  },

  async deleteMembership(id) {
    const result = await dbService.deleteDocument('memberships', id);
    await auditService.logAction({
      action: 'Deleted Membership Plan',
      module: 'Memberships',
      recordId: id,
      details: `Removed membership tier ${id}`
    });
    return result;
  }
};
