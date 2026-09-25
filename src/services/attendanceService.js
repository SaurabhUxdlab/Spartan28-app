import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const attendanceService = {
  async getAttendanceLogs() {
    return await dbService.getCollection('attendance');
  },

  async recordAttendance(data) {
    const entry = await dbService.addDocument('attendance', {
      ...data,
      checkInTime: data.checkInTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: data.status || 'Present',
      verifiedBy: data.verifiedBy || 'Turnstile Rapid Scan'
    });

    await auditService.logAction({
      action: 'Recorded Attendance',
      module: 'Attendance',
      recordId: entry.id,
      details: `${data.memberName} checked in for ${data.className || 'Session'} [${entry.status}]`
    });

    return entry;
  },

  async updateAttendanceStatus(id, newStatus) {
    const result = await dbService.updateDocument('attendance', id, { status: newStatus });
    await auditService.logAction({
      action: 'Modified Attendance Status',
      module: 'Attendance',
      recordId: id,
      details: `Changed check-in status to ${newStatus}`
    });
    return result;
  },

  async simulateRapidScan(scanId, locationName = 'South Campus Gate 01') {
    const members = await dbService.getCollection('members');
    const member = members.find(m => m.scanId?.toLowerCase() === scanId?.toLowerCase() || m.id === scanId);

    if (!member) {
      throw new Error(`Scan ID "${scanId}" not recognized in Spartan member database.`);
    }

    const newLog = await this.recordAttendance({
      memberId: member.id,
      memberName: member.name,
      scanId: member.scanId,
      turnstileLocation: locationName,
      status: 'Present',
      verifiedBy: 'NFC Turnstile Rapid Check-In'
    });

    return {
      member,
      log: newLog
    };
  }
};
