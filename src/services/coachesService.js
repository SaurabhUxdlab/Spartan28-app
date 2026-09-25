import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const coachesService = {
  async getCoaches() {
    return await dbService.getCollection('coaches');
  },

  async getCoachById(id) {
    return await dbService.getDocument('coaches', id);
  },

  async createCoach(data) {
    const coach = await dbService.addDocument('coaches', {
      ...data,
      assignedAthletesCount: Number(data.assignedAthletesCount) || 0,
      activeClasses: Number(data.activeClasses) || 0,
      status: data.status || 'Active',
      specializations: Array.isArray(data.specializations) ? data.specializations : (data.specializations ? data.specializations.split(',').map(s => s.trim()) : ['Strength & Conditioning']),
      avatar: data.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80'
    });

    await auditService.logAction({
      action: 'Created Coach Profile',
      module: 'Coaches',
      recordId: coach.id,
      details: `Added new coach profile for ${coach.name}`
    });

    return coach;
  },

  async updateCoach(id, updates) {
    const formatted = { ...updates };
    if (typeof formatted.specializations === 'string') {
      formatted.specializations = formatted.specializations.split(',').map(s => s.trim());
    }
    const result = await dbService.updateDocument('coaches', id, formatted);
    await auditService.logAction({
      action: 'Updated Coach Profile',
      module: 'Coaches',
      recordId: id,
      details: `Updated coach information for ${id}`
    });
    return result;
  },

  async deleteCoach(id) {
    const result = await dbService.deleteDocument('coaches', id);
    await auditService.logAction({
      action: 'Deleted Coach',
      module: 'Coaches',
      recordId: id,
      details: `Deactivated coach profile ${id}`
    });
    return result;
  }
};
