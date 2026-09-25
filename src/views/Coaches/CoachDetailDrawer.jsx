import React, { useState } from 'react';
import { Drawer } from '../../components/common/Drawer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CalendarDays, 
  Users, 
  Award, 
  Quote, 
  Edit, 
  Trash2,
  CheckCircle,
  PauseCircle,
  Shield
} from 'lucide-react';
import { coachesService } from '../../services/coachesService';
import { useToast } from '../../context/ToastContext';

export const CoachDetailDrawer = ({
  coach,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onCoachUpdated
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [updating, setUpdating] = useState(false);
  const { addToast } = useToast();

  if (!coach) return null;

  const handleToggleStatus = async () => {
    setUpdating(true);
    const newStatus = coach.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await coachesService.updateCoach(coach.id, { status: newStatus });
      addToast({
        title: 'Status Updated',
        message: `${coach.name} is now marked as ${newStatus}`,
        type: 'success'
      });
      if (onCoachUpdated) onCoachUpdated();
      onClose();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Bio', icon: User },
    { id: 'specializations', label: 'Specializations & Credentials', icon: Award }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={coach.name}
      subtitle={`Staff ID: ${coach.id} • ${coach.role || 'Coach / Staff'}`}
      width="620px"
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            icon={coach.status === 'Active' ? PauseCircle : CheckCircle}
            onClick={handleToggleStatus}
            loading={updating}
          >
            {coach.status === 'Active' ? 'Deactivate Coach' : 'Activate Coach'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(coach)}
          >
            Edit Profile
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(coach)}
          >
            Delete
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Coach Identity Card */}
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
            src={coach.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80'}
            alt={coach.name}
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: 'var(--radius-md)', 
              objectFit: 'cover', 
              border: '2px solid var(--spartan-green)',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ color: 'var(--spartan-text-primary)', fontSize: '1.2rem', fontWeight: 800 }}>{coach.name}</h3>
              <StatusBadge status={coach.status || 'Active'} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--spartan-green)', fontWeight: 600, marginTop: '2px' }}>
              {coach.role || 'Spartan Coach'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', fontSize: '0.78rem', color: 'var(--spartan-text-muted)', flexWrap: 'wrap' }}>
              {coach.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={13} /> {coach.email}
                </span>
              )}
              {coach.phone && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={13} /> {coach.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Quick Metrics Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ background: 'var(--spartan-bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
                  ASSIGNED ATHLETES
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--spartan-green)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} />
                  <span>{coach.assignedAthletesCount || 0}</span>
                </div>
              </div>

              <div style={{ background: 'var(--spartan-bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
                  ACTIVE CLASSES / LABS
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--spartan-cyan)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarDays size={18} />
                  <span>{coach.activeClasses || 0}</span>
                </div>
              </div>
            </div>

            {/* Coaching Quote / Motto */}
            {coach.quote && (
              <div
                style={{
                  background: 'var(--spartan-bg-input)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '3px solid var(--spartan-green)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <Quote size={18} style={{ color: 'var(--spartan-green)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--spartan-text-secondary)', lineHeight: 1.4 }}>
                  "{coach.quote}"
                </div>
              </div>
            )}

            {/* Professional Biography */}
            <div className="spartan-card">
              <div className="spartan-card-title" style={{ marginBottom: '8px' }}>
                <Shield size={16} style={{ color: 'var(--spartan-cyan)' }} />
                <span>Professional Biography</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--spartan-text-secondary)', lineHeight: 1.6 }}>
                {coach.bio || 'No biography provided for this coach profile.'}
              </p>
            </div>

            {/* Facility Location */}
            <div className="spartan-card">
              <div className="spartan-card-title" style={{ marginBottom: '6px' }}>
                <MapPin size={16} style={{ color: 'var(--spartan-green)' }} />
                <span>Primary Facility Location</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--spartan-text-primary)', fontWeight: 600 }}>
                {coach.location || 'South Campus Turf'}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Specializations */}
        {activeTab === 'specializations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="spartan-card">
              <div className="spartan-card-title" style={{ marginBottom: '12px' }}>
                <Award size={16} style={{ color: 'var(--spartan-cyan)' }} />
                <span>Training Specializations & Disciplines</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(coach.specializations || ['Strength & Conditioning']).map((spec, idx) => (
                  <span
                    key={idx}
                    className="spartan-badge spartan-badge-cyan"
                    style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CoachDetailDrawer;
