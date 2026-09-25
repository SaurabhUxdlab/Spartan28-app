import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const contentService = {
  async getContentItems() {
    return await dbService.getCollection('content');
  },

  async createContentItem(data) {
    const item = await dbService.addDocument('content', {
      ...data,
      publishedAt: data.publishedAt || new Date().toISOString().slice(0, 10),
      status: data.status || 'Published'
    });

    await auditService.logAction({
      action: 'Created App Content',
      module: 'Content',
      recordId: item.id,
      details: `Published "${item.title}" (${item.type})`
    });

    return item;
  },

  async updateContentItem(id, updates) {
    const result = await dbService.updateDocument('content', id, updates);
    await auditService.logAction({
      action: 'Updated App Content',
      module: 'Content',
      recordId: id,
      details: `Modified app content item ${id}`
    });
    return result;
  },

  async deleteContentItem(id) {
    const result = await dbService.deleteDocument('content', id);
    await auditService.logAction({
      action: 'Deleted App Content',
      module: 'Content',
      recordId: id,
      details: `Removed content item ${id}`
    });
    return result;
  }
};
