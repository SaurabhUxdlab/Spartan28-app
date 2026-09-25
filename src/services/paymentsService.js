import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const paymentsService = {
  async getTransactions() {
    return await dbService.getCollection('transactions');
  },

  async getTransactionById(id) {
    return await dbService.getDocument('transactions', id);
  },

  async createTransaction(data) {
    const txn = await dbService.addDocument('transactions', {
      ...data,
      referenceId: data.referenceId || `#SP-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: Number(data.amount) || 0,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: data.status || 'Paid in Full',
      currency: 'USD'
    });

    await auditService.logAction({
      action: 'Processed Transaction',
      module: 'Payments',
      recordId: txn.id,
      details: `Logged $${txn.amount} charge for ${txn.memberName} (${txn.item})`
    });

    return txn;
  }
};
