import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const progressService = {
  async getLeaderboard() {
    const members = await dbService.getCollection('members');
    return members.map(m => ({
      id: m.id,
      name: m.name,
      avatar: m.avatar,
      streakDays: m.measurements?.streakDays || 0,
      todaySteps: m.measurements?.todaySteps || 0,
      stepTarget: m.measurements?.dailyStepTarget || 10000,
      todayHydrationMl: m.measurements?.todayHydrationMl || 0,
      hydrationQuotaMl: m.measurements?.hydrationQuotaMl || 3500,
      strengthScore: m.measurements?.strengthScore || 70,
      workoutsThisMonth: m.measurements?.workoutsThisMonth || 0,
      prs: m.measurements?.prs || {}
    })).sort((a, b) => b.streakDays - a.streakDays);
  },

  async updateMemberTelemetry(memberId, telemetryData) {
    const member = await dbService.getDocument('members', memberId);
    if (!member) throw new Error('Member not found');

    const nextMeasurements = {
      ...member.measurements,
      ...telemetryData
    };

    const result = await dbService.updateDocument('members', memberId, { measurements: nextMeasurements });
    await auditService.logAction({
      action: 'Updated Member Telemetry',
      module: 'Progress',
      recordId: memberId,
      details: `Updated PRs/Biometrics for ${member.name}`
    });

    return result;
  }
};
