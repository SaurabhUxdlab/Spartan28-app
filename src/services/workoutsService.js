import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const workoutsService = {
  async getWorkouts() {
    return await dbService.getCollection('workouts');
  },

  async getWorkoutById(id) {
    return await dbService.getDocument('workouts', id);
  },

  async createWorkout(data) {
    const workout = await dbService.addDocument('workouts', {
      ...data,
      durationMinutes: Number(data.durationMinutes) || 45,
      exercisesSequence: data.exercisesSequence || [],
      exerciseIds: (data.exercisesSequence || []).map(e => e.exerciseId || e.id),
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      status: data.status || 'Published',
      completionsCount: 0
    });

    await auditService.logAction({
      action: 'Created Workout Protocol',
      module: 'Workouts',
      recordId: workout.id,
      details: `Configured new workout: "${workout.name}" (${workout.durationMinutes}m)`
    });

    return workout;
  },

  async updateWorkout(id, updates) {
    const formatted = { ...updates };
    if (formatted.durationMinutes) formatted.durationMinutes = Number(formatted.durationMinutes);
    if (formatted.exercisesSequence) {
      formatted.exerciseIds = formatted.exercisesSequence.map(e => e.exerciseId || e.id);
    }
    const result = await dbService.updateDocument('workouts', id, formatted);
    await auditService.logAction({
      action: 'Updated Workout Protocol',
      module: 'Workouts',
      recordId: id,
      details: `Updated sequence/parameters for workout ${id}`
    });
    return result;
  },

  async duplicateWorkout(id) {
    const existing = await this.getWorkoutById(id);
    if (!existing) return null;
    const duplicatedData = {
      ...existing,
      id: undefined,
      name: `${existing.name} (Copy)`,
      completionsCount: 0,
      createdAt: new Date().toISOString()
    };
    return await this.createWorkout(duplicatedData);
  },

  async togglePublish(id, currentPublished) {
    const nextPublished = !currentPublished;
    return await this.updateWorkout(id, {
      isPublished: nextPublished,
      status: nextPublished ? 'Published' : 'Draft'
    });
  },

  async deleteWorkout(id) {
    const result = await dbService.deleteDocument('workouts', id);
    await auditService.logAction({
      action: 'Deleted Workout Protocol',
      module: 'Workouts',
      recordId: id,
      details: `Removed workout routine ${id}`
    });
    return result;
  }
};
