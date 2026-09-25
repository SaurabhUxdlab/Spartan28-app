import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const classesService = {
  async getClasses() {
    return await dbService.getCollection('classes');
  },

  async getClassById(id) {
    return await dbService.getDocument('classes', id);
  },

  async createClass(data) {
    const newClass = await dbService.addDocument('classes', {
      ...data,
      durationMinutes: Number(data.durationMinutes) || 60,
      capacity: Number(data.capacity) || 12,
      bookedCount: 0,
      waitlistCount: 0,
      status: 'Open'
    });

    await auditService.logAction({
      action: 'Created Class',
      module: 'Classes',
      recordId: newClass.id,
      details: `Scheduled new class "${newClass.name}" at ${newClass.location}`
    });

    return newClass;
  },

  async updateClass(id, updates) {
    const formatted = { ...updates };
    if (formatted.durationMinutes) formatted.durationMinutes = Number(formatted.durationMinutes);
    if (formatted.capacity) formatted.capacity = Number(formatted.capacity);
    const result = await dbService.updateDocument('classes', id, formatted);
    await auditService.logAction({
      action: 'Updated Class',
      module: 'Classes',
      recordId: id,
      details: `Updated class details for ${id}`
    });
    return result;
  },

  async deleteClass(id) {
    const result = await dbService.deleteDocument('classes', id);
    await auditService.logAction({
      action: 'Deleted Class',
      module: 'Classes',
      recordId: id,
      details: `Cancelled/deleted class ${id}`
    });
    return result;
  }
};
