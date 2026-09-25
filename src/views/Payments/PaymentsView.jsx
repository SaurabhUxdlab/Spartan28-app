import React, { useState, useEffect } from 'react';
import { paymentsService } from '../../services/paymentsService';
import { TransactionDetailModal } from './TransactionDetailModal';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  DollarSign, 
  CreditCard, 
  Eye, 
  Download, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp 
} from 'lucide-react';

export const PaymentsView = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await paymentsService.getTransactions();
      setTransactions(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load transactions', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const totalProcessed = transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const columns = [
    {
      header: 'Reference ID',
      key: 'referenceId',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--spartan-cyan)', fontSize: '0.82rem' }}>
          {val || row.id}
        </span>
      )
    },
    {
      header: 'Spartan Athlete',
      key: 'memberName',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.88rem' }}>{row.memberName}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.memberEmail}</div>
        </div>
      )
    },
    {
      header: 'Item / Allocation',
      key: 'item',
      sortable: true,
      render: (val) => <span style={{ color: '#FFF', fontWeight: 600 }}>{val}</span>
    },
    {
      header: 'Amount ($ USD)',
      key: 'amount',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--spartan-green)', fontSize: '0.95rem' }}>
          ${Number(val).toFixed(2)}
        </span>
      )
    },
    {
      header: 'Payment Vector',
      key: 'paymentMethod',
      render: (val, row) => (
        <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CreditCard size={12} style={{ color: 'var(--spartan-green)' }} />
          {val} {row.cardLast4 ? `(•• ${row.cardLast4})` : ''}
        </span>
      )
    },
    {
      header: 'Timestamp',
      key: 'date',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF' }}>{val}</span>
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Receipt',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="ghost"
          size="sm"
          icon={Eye}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTxn(row);
            setIsReceiptOpen(true);
          }}
          title="View Receipt"
        />
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Financial Stats */}
      <div className="grid-3">
        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <DollarSign size={16} style={{ color: 'var(--spartan-green)' }} />
              <span>Processed Volume</span>
            </span>
            <span className="spartan-badge spartan-badge-green">SETTLED</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--spartan-green)', fontFamily: 'var(--font-heading)' }}>
            ${totalProcessed.toFixed(2)}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '4px' }}>
            Auto settles in USD across all payment vectors
          </p>
        </div>

        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <CreditCard size={16} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Payment Vectors</span>
            </span>
            <span className="spartan-badge spartan-badge-cyan">GENERIC VAULT</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF' }}>
            Apple Pay • Visa • Spartan Black
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '4px' }}>
            256-Bit Encrypted Tokenized Ledger
          </p>
        </div>

        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <TrendingUp size={16} style={{ color: 'var(--spartan-amber)' }} />
              <span>Refund Rate</span>
            </span>
            <span className="spartan-badge spartan-badge-amber">0.0%</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
            0 Disputes
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '4px' }}>
            Protected by Spartan Flex 12h cancellation policy
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <DataTable
        columns={columns}
        data={transactions}
        loading={loading}
        searchKey="memberName"
        searchPlaceholder="Search reference ID, athlete, or plan..."
        filterOptions={[
          {
            key: 'category',
            label: 'Category',
            options: ['Class Credits Pack', 'Subscription', 'Single Drop-in']
          }
        ]}
        onRowClick={(row) => {
          setSelectedTxn(row);
          setIsReceiptOpen(true);
        }}
      />

      {/* Receipt Modal */}
      <TransactionDetailModal
        transaction={selectedTxn}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
};

export default PaymentsView;
