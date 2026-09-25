import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const exercisesService = {
  async getExercises() {
    return await dbService.getCollection('exercises');
  },

  async getExerciseById(id) {
    return await dbService.getDocument('exercises', id);
  },

  async createExercise(data) {
    const exercise = await dbService.addDocument('exercises', {
      ...data,
      defaultSets: Number(data.defaultSets) || 3,
      defaultReps: Number(data.defaultReps) || 10,
      restDurationSeconds: Number(data.restDurationSeconds) || 60,
      status: data.status || 'Active',
      mediaUrl: data.mediaUrl || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80'
    });

    await auditService.logAction({
      action: 'Created Exercise',
      module: 'Exercises',
      recordId: exercise.id,
      details: `Added new exercise "${exercise.name}" (${exercise.category})`
    });

    return exercise;
  },

  async updateExercise(id, updates) {
    const result = await dbService.updateDocument('exercises', id, updates);
    await auditService.logAction({
      action: 'Updated Exercise',
      module: 'Exercises',
      recordId: id,
      details: `Updated exercise specifications for ${id}`
    });
    return result;
  },

  async deleteExercise(id) {
    const result = await dbService.deleteDocument('exercises', id);
    await auditService.logAction({
      action: 'Deleted Exercise',
      module: 'Exercises',
      recordId: id,
      details: `Archived exercise ${id}`
    });
    return result;
  }
};
