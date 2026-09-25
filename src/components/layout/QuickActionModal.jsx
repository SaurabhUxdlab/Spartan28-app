import React from 'react';
import { Modal } from '../common/Modal';
import { 
  UserPlus, 
  CalendarPlus, 
  Dumbbell, 
  Bell, 
  DollarSign, 
  Flame, 
  Apple,
  FileText
} from 'lucide-react';

export const QuickActionModal = ({ isOpen, onClose, onSelectAction }) => {
  const actions = [
    {
      id: 'new_member',
      title: 'Register Athlete',
      description: 'Add new member profile & assign protocol',
      icon: UserPlus,
      color: 'var(--spartan-green)',
      targetTab: 'members'
    },
    {
      id: 'new_class',
      title: 'Schedule Class',
      description: 'Set date, coach, capacity & location',
      icon: CalendarPlus,
      color: 'var(--spartan-cyan)',
      targetTab: 'classes'
    },
    {
      id: 'new_workout',
      title: 'Build Workout Protocol',
      description: 'Sequence exercises, sets, reps & rest timer',
      icon: Dumbbell,
      color: 'var(--spartan-amber)',
      targetTab: 'workouts'
    },
    {
      id: 'broadcast_alert',
      title: 'Broadcast Mobile Alert',
      description: 'Send push notification to squad athletes',
      icon: Bell,
      color: 'var(--spartan-purple)',
      targetTab: 'notifications'
    },
    {
      id: 'record_payment',
      title: 'Log Transaction',
      description: 'Record credit pack or drop-in payment',
      icon: DollarSign,
      color: 'var(--spartan-green)',
      targetTab: 'payments'
    },
    {
      id: 'new_nutrition',
      title: 'Publish Fuel Plan',
      description: 'Configure macro split & calorie target',
      icon: Apple,
      color: 'var(--spartan-cyan)',
      targetTab: 'nutrition'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Spartan Command // Quick Actions"
      subtitle="Select an operational action to initiate"
      maxWidth="580px"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => {
                onClose();
                onSelectAction(act.targetTab, act.id);
              }}
              className="spartan-card interactive"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid var(--spartan-border-subtle)',
                background: 'var(--spartan-bg-surface)'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${act.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: act.color,
                  flexShrink: 0
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--spartan-text-primary)' }}>{act.title}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--spartan-text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                  {act.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
};

export default QuickActionModal;
