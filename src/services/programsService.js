import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const programsService = {
  async getPrograms() {
    return await dbService.getCollection('workoutPrograms');
  },

  async getProgramById(id) {
    return await dbService.getDocument('workoutPrograms', id);
  },

  async createProgram(data) {
    const program = await dbService.addDocument('workoutPrograms', {
      ...data,
      durationWeeks: Number(data.durationWeeks) || 8,
      totalSessions: Number(data.totalSessions) || 24,
      enrolledMembersCount: 0,
      status: data.status || 'Active',
      linkedWorkoutIds: data.linkedWorkoutIds || []
    });

    await auditService.logAction({
      action: 'Created Workout Program',
      module: 'Programs',
      recordId: program.id,
      details: `Created multi-week program: "${program.name}" (${program.durationWeeks} weeks)`
    });

    return program;
  },

  async updateProgram(id, updates) {
    const formatted = { ...updates };
    if (formatted.durationWeeks) formatted.durationWeeks = Number(formatted.durationWeeks);
    if (formatted.totalSessions) formatted.totalSessions = Number(formatted.totalSessions);
    const result = await dbService.updateDocument('workoutPrograms', id, formatted);
    await auditService.logAction({
      action: 'Updated Workout Program',
      module: 'Programs',
      recordId: id,
      details: `Updated parameters for program ${id}`
    });
    return result;
  },

  async deleteProgram(id) {
    const result = await dbService.deleteDocument('workoutPrograms', id);
    await auditService.logAction({
      action: 'Deleted Workout Program',
      module: 'Programs',
      recordId: id,
      details: `Archived structured program ${id}`
    });
    return result;
  }
};
