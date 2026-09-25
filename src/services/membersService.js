import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const membersService = {
  async getMembers() {
    return await dbService.getCollection('members');
  },

  async getMemberById(id) {
    return await dbService.getDocument('members', id);
  },

  async createMember(data) {
    const member = await dbService.addDocument('members', {
      ...data,
      scanId: data.scanId || `SP28-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: data.joinedDate || new Date().toISOString().slice(0, 10),
      lastActive: 'Just now',
      status: data.status || 'Active',
      membershipStatus: data.membershipStatus || 'Active',
      credits: Number(data.credits) || 0,
      measurements: data.measurements || {
        weightLbs: 175,
        weightHistory: [175],
        streakDays: 0,
        workoutsThisMonth: 0,
        strengthScore: 70,
        dailyStepTarget: 10000,
        todaySteps: 0,
        hydrationQuotaMl: 3500,
        todayHydrationMl: 0,
        prs: { squat: '225 lbs', deadlift: '275 lbs', bench: '185 lbs', overheadPress: '115 lbs' }
      }
    });

    await auditService.logAction({
      action: 'Created Member',
      module: 'Members',
      recordId: member.id,
      details: `Added new athlete: ${member.name} (${member.email})`
    });

    return member;
  },

  async updateMember(id, updates) {
    const result = await dbService.updateDocument('members', id, updates);
    await auditService.logAction({
      action: 'Updated Member',
      module: 'Members',
      recordId: id,
      details: `Updated details/status for member ${id}`
    });
    return result;
  },

  async deleteMember(id) {
    const result = await dbService.deleteDocument('members', id);
    await auditService.logAction({
      action: 'Deleted Member',
      module: 'Members',
      recordId: id,
      details: `Permanently removed member ${id}`
    });
    return result;
  },

  async toggleStatus(id, currentStatus) {
    const nextStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    return await this.updateMember(id, { status: nextStatus, membershipStatus: nextStatus });
  }
};
