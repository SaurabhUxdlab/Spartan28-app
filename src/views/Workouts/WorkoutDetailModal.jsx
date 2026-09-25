import React from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Dumbbell, Clock, Flame, User, CheckCircle2 } from 'lucide-react';

export const WorkoutDetailModal = ({
  workout,
  isOpen,
  onClose,
  onEdit
}) => {
  if (!workout) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={workout.name}
      subtitle={`Duration: ${workout.durationMinutes} min • ${workout.category} • Created by ${workout.authorCoach}`}
      maxWidth="680px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
              onEdit(workout);
            }}
          >
            Edit Protocol
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Meta Header */}
        <div style={{ background: 'var(--spartan-bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--spartan-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="spartan-badge spartan-badge-cyan">{workout.category}</span>
              <StatusBadge status={workout.difficulty} />
            </div>
            <StatusBadge status={workout.status} />
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>{workout.name}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--spartan-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
            {workout.description || workout.trainingObjective}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px', fontSize: '0.78rem', color: 'var(--spartan-text-muted)', borderTop: '1px solid var(--spartan-border-subtle)', paddingTop: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {workout.durationMinutes} Minutes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Dumbbell size={14} /> {workout.exercisesSequence?.length || 0} Exercises
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> {workout.completionsCount || 0} Member Completions
            </span>
          </div>
        </div>

        {/* Step Breakdown Sequence */}
        <div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '8px' }}>
            EXERCISE EXECUTION STATIONS:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(workout.exercisesSequence || []).map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--spartan-bg-card)',
                  border: '1px solid var(--spartan-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--spartan-green-dim)',
                    color: 'var(--spartan-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.9rem' }}>{step.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
                      Target Load: <span style={{ color: '#FFF' }}>{step.weight || 'Standard'}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  <div style={{ color: 'var(--spartan-green)', fontWeight: 700 }}>
                    {step.sets} Sets × {step.reps} Reps
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>
                    {step.restSeconds}s Rest Interval
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WorkoutDetailModal;
