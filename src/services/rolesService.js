import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const rolesService = {
  async getRoles() {
    return await dbService.getCollection('roles');
  },

  async updateRolePermissions(roleId, permissions) {
    const result = await dbService.updateDocument('roles', roleId, { permissions });
    await auditService.logAction({
      action: 'Updated Role Permissions',
      module: 'Roles & Permissions',
      recordId: roleId,
      details: `Modified access privileges for role ${roleId}`
    });
    return result;
  }
};
