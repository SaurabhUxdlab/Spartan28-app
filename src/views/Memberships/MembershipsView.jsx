import React, { useState, useEffect } from 'react';
import { membershipsService } from '../../services/membershipsService';
import { MembershipFormModal } from './MembershipFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
import { 
  CreditCard, 
  Plus, 
  Check, 
  Edit, 
  Trash2, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export const MembershipsView = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deletingPlan, setDeletingPlan] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadMemberships();
  }, []);

  const loadMemberships = async () => {
    setLoading(true);
    try {
      const data = await membershipsService.getMemberships();
      setMemberships(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load memberships', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingPlan) return;
    try {
      await membershipsService.deleteMembership(deletingPlan.id);
      addToast({ title: 'Plan Removed', message: `Deleted ${deletingPlan.name}`, type: 'success' });
      setDeletingPlan(null);
      loadMemberships();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  if (loading) {
    return <LoadingSpinner text="Retrieving Spartan Membership Protocols..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>Configured Membership Tiers</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
            Manage recurring subscriptions, elite class packs, and drop-in pricing configurations
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {
            setEditingPlan(null);
            setIsFormOpen(true);
          }}
        >
          Create Membership Tier
        </Button>
      </div>

      {/* Membership Cards Grid */}
      <div className="grid-3">
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className="spartan-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              background: 'linear-gradient(180deg, var(--spartan-bg-card) 0%, var(--spartan-bg-surface) 100%)',
              border: plan.name.includes('Annual') || plan.name.includes('Elite') ? '1px solid var(--spartan-green-border)' : '1px solid var(--spartan-border-subtle)'
            }}
          >
            {/* Top Badge */}
            {plan.badgeText && (
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <span className="spartan-badge spartan-badge-green" style={{ fontSize: '0.62rem' }}>
                  {plan.badgeText}
                </span>
              </div>
            )}

            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '4px' }}>
                {plan.id}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                {plan.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--spartan-green)', fontFamily: 'var(--font-heading)' }}>
                  ${Number(plan.price).toFixed(2)}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-muted)' }}>
                  / {plan.billingFrequency}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--spartan-text-secondary)', lineHeight: 1.4, marginBottom: '1rem', minHeight: '36px' }}>
                {plan.description}
              </p>

              {/* Benefits Checklist */}
              <div style={{ borderTop: '1px solid var(--spartan-border-subtle)', paddingTop: '12px', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '8px' }}>
                  INCLUDED PRIVILEGES:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(plan.features || []).map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: 'var(--spartan-text-secondary)' }}>
                      <Check size={14} style={{ color: 'var(--spartan-green)', marginTop: '2px', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Meta & Actions */}
            <div style={{ borderTop: '1px solid var(--spartan-border-subtle)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
                <Users size={14} />
                <span style={{ color: '#FFF', fontWeight: 700 }}>{plan.subscribersCount || 0}</span> athletes
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleEdit(plan)} title="Edit Plan" />
                <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeletingPlan(plan)} title="Delete Plan" style={{ color: 'var(--spartan-red)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Form Modal */}
      <MembershipFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingPlan}
        onSuccess={loadMemberships}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingPlan)}
        onClose={() => setDeletingPlan(null)}
        onConfirm={handleDelete}
        title="Remove Membership Tier"
        message={`Are you sure you want to deactivate and remove ${deletingPlan?.name}? Existing active subscribers will retain access until their cycle ends.`}
      />
    </div>
  );
};

export default MembershipsView;
