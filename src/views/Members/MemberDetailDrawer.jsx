import React, { useState } from 'react';
import { Drawer } from '../../components/common/Drawer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { TelemetryRing } from '../../components/charts/TelemetryRing';
import { 
  User, 
  Activity, 
  CreditCard, 
  Calendar, 
  Award, 
  Flame, 
  Dumbbell, 
  ShieldCheck, 
  QrCode, 
  Phone, 
  Mail, 
  Edit, 
  Trash2,
  CheckCircle,
  PauseCircle
} from 'lucide-react';
import { membersService } from '../../services/membersService';
import { useToast } from '../../context/ToastContext';

export const MemberDetailDrawer = ({
  member,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onMemberUpdated
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [updating, setUpdating] = useState(false);
  const { addToast } = useToast();

  if (!member) return null;

  const handleToggleStatus = async () => {
    setUpdating(true);
    try {
      await membersService.toggleStatus(member.id, member.status);
      addToast({
        title: 'Status Updated',
        message: `${member.name} status updated to ${member.status === 'Active' ? 'Paused' : 'Active'}`,
        type: 'success'
      });
      if (onMemberUpdated) onMemberUpdated();
      onClose();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  const handleAdjustCredits = async () => {
    const input = prompt(`Adjust class credits for ${member.name} (Current: ${member.credits}):`, String(member.credits || 0));
    if (input !== null) {
      const num = parseInt(input, 10);
      if (!isNaN(num)) {
        await membersService.updateMember(member.id, { credits: num });
        addToast({ title: 'Credits Updated', message: `Allocated ${num} credits to ${member.name}`, type: 'success' });
        if (onMemberUpdated) onMemberUpdated();
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Profile', icon: User },
    { id: 'telemetry', label: 'Telemetry & PRs', icon: Activity },
    { id: 'membership', label: 'Membership & Passes', icon: CreditCard }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={member.name}
      subtitle={`Spartan ID: ${member.scanId || member.id} • Joined ${member.joinedDate}`}
      width="640px"
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            icon={member.status === 'Active' ? PauseCircle : CheckCircle}
            onClick={handleToggleStatus}
            loading={updating}
          >
            {member.status === 'Active' ? 'Pause Athlete' : 'Activate Athlete'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(member)}
          >
            Edit Profile
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(member)}
          >
            Delete
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Athlete Identity Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--spartan-bg-card) 0%, var(--spartan-bg-surface) 100%)',
            border: '1px solid var(--spartan-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <img
            src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={member.name}
            style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid var(--spartan-green)' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', fontWeight: 800 }}>{member.name}</h3>
              <StatusBadge status={member.status} />
              <span className="spartan-badge spartan-badge-cyan">{member.membershipPlan}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '0.78rem', color: 'var(--spartan-text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={13} /> {member.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={13} /> {member.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Quick Metrics Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ background: 'var(--spartan-bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>CADENCE STREAK</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--spartan-amber)', marginTop: '2px' }}>
                  {member.measurements?.streakDays || 7} Days
                </div>
              </div>
              <div style={{ background: 'var(--spartan-bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>CLASS CREDITS</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--spartan-green)', marginTop: '2px' }}>
                  {member.credits || 10} Ready
                </div>
              </div>
              <div style={{ background: 'var(--spartan-bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>STRENGTH SCORE</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--spartan-cyan)', marginTop: '2px' }}>
                  {member.measurements?.strengthScore || 84} / 100
                </div>
              </div>
            </div>

            {/* Fitness Goals */}
            <div className="spartan-card">
              <div className="spartan-card-title" style={{ marginBottom: '8px' }}>
                <Award size={16} style={{ color: 'var(--spartan-green)' }} />
                <span>Training Focus & Goals</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(member.goals || ['Build Muscle', 'Get Stronger', 'Lose Fat']).map((g) => (
                  <span key={g} className="spartan-badge spartan-badge-green">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Assigned Coach */}
            <div className="spartan-card">
              <div className="spartan-card-title" style={{ marginBottom: '8px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--spartan-cyan)' }} />
                <span>Dedicated Coach Assignment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF' }}>{member.assignedCoachName || 'Ron Brezzell'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>Head Coach Spartan Protocol</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => alert(`Assigned Coach: ${member.assignedCoachName || 'Ron Brezzell'}`)}>
                  Reassign Coach
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Telemetry & PRs */}
        {activeTab === 'telemetry' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'var(--spartan-bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--spartan-border-subtle)' }}>
              <TelemetryRing
                value={member.measurements?.todaySteps || 8420}
                target={member.measurements?.dailyStepTarget || 10000}
                size={120}
                label="STEPS"
                unit="steps"
                subtitle="Apple Watch Synced"
                accentColor="#00E575"
              />
              <TelemetryRing
                value={member.measurements?.todayHydrationMl || 2850}
                target={member.measurements?.hydrationQuotaMl || 3500}
                size={120}
                label="HYDRATION"
                unit="ml"
                subtitle="Fluid Recovery Target"
                accentColor="#00D4FF"
              />
            </div>

            {/* Personal Records Matrix */}
            <div className="spartan-card">
              <div className="spartan-card-title" style={{ marginBottom: '12px' }}>
                <Dumbbell size={16} style={{ color: 'var(--spartan-amber)' }} />
                <span>Verified Personal Records (1RM)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>BACK SQUAT</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>{member.measurements?.prs?.squat || '365 lbs'}</div>
                </div>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>CONVENTIONAL DEADLIFT</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>{member.measurements?.prs?.deadlift || '445 lbs'}</div>
                </div>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>BENCH PRESS</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>{member.measurements?.prs?.bench || '285 lbs'}</div>
                </div>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>OVERHEAD PRESS</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>{member.measurements?.prs?.overheadPress || '185 lbs'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Membership & Passes */}
        {activeTab === 'membership' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="spartan-card">
              <div className="spartan-card-header">
                <span className="spartan-card-title">
                  <CreditCard size={16} style={{ color: 'var(--spartan-green)' }} />
                  <span>Active Plan Subscription</span>
                </span>
                <StatusBadge status={member.membershipStatus || 'Active'} />
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>
                {member.membershipPlan}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--spartan-text-muted)' }}>
                Next scheduled renewal on <span style={{ color: '#FFF', fontWeight: 600 }}>{member.planRenewalDate || '2026-10-24'}</span>
              </p>

              <div style={{ borderTop: '1px solid var(--spartan-border-subtle)', marginTop: '12px', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>Class Credits Allocation</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--spartan-green)' }}>
                    {member.credits || 0} Sessions Ready
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={handleAdjustCredits}>
                  Modify Credits
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default MemberDetailDrawer;
