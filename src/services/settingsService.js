import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';
import { INITIAL_DATA } from '../firebase/initialData';

const SETTINGS_KEY = 'spartan28_settings';

export const settingsService = {
  async getSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DATA.settings;
  },

  async updateSettings(updates) {
    const current = await this.getSettings();
    const merged = { ...current, ...updates };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    await auditService.logAction({
      action: 'Updated System Settings',
      module: 'Settings',
      recordId: 'SYSTEM',
      details: `Updated facility policies and Spartan Flex configuration`
    });
    return merged;
  }
};
