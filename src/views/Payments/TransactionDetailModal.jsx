import React from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SpartanLogo } from '../../assets/SpartanLogo';
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  User, 
  CheckCircle2, 
  Download, 
  Printer 
} from 'lucide-react';

export const TransactionDetailModal = ({
  transaction,
  isOpen,
  onClose
}) => {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Spartan Transaction Receipt"
      subtitle={`Reference ID: ${transaction.referenceId || transaction.id}`}
      maxWidth="500px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" icon={Printer} onClick={handlePrint}>
            Print Receipt
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Receipt Branded Top */}
        <div
          style={{
            background: 'var(--spartan-bg-surface)',
            border: '1px solid var(--spartan-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <SpartanLogo size="small" />
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            OFFICIAL RECEIPT // DISPATCHED
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--spartan-green)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            ${Number(transaction.amount).toFixed(2)}
          </div>
          <StatusBadge status={transaction.status} />
        </div>

        {/* Ledger Rows */}
        <div style={{ background: 'var(--spartan-bg-surface)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--spartan-border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--spartan-border-subtle)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--spartan-text-muted)' }}>Athlete</span>
            <span style={{ color: '#FFF', fontWeight: 700 }}>{transaction.memberName}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--spartan-border-subtle)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--spartan-text-muted)' }}>Athlete Email</span>
            <span style={{ color: 'var(--spartan-text-secondary)' }}>{transaction.memberEmail || '-'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--spartan-border-subtle)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--spartan-text-muted)' }}>Item Purchased</span>
            <span style={{ color: '#FFF', fontWeight: 600 }}>{transaction.item}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--spartan-border-subtle)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--spartan-text-muted)' }}>Payment Vector</span>
            <span style={{ color: 'var(--spartan-cyan)', fontWeight: 600 }}>
              {transaction.paymentMethod} {transaction.cardLast4 ? `(••• ${transaction.cardLast4})` : ''}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--spartan-text-muted)' }}>Transaction Date</span>
            <span style={{ color: '#FFF', fontFamily: 'var(--font-mono)' }}>{transaction.date}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetailModal;
