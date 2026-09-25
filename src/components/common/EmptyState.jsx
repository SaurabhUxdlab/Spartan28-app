import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No Records Found',
  description = 'There are no active entries matching the criteria.',
  actionText,
  onAction,
  actionIcon
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3.5rem 1.5rem',
      textAlign: 'center',
      background: 'var(--spartan-bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--spartan-border-subtle)',
      maxWidth: '500px',
      margin: '1.5rem auto'
    }}>
      {Icon && (
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--spartan-bg-surface)',
          border: '1px solid var(--spartan-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--spartan-green)',
          marginBottom: '1rem'
        }}>
          <Icon size={26} />
        </div>
      )}
      <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#FFF' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--spartan-text-muted)', marginBottom: actionText ? '1.25rem' : 0, maxWidth: '380px' }}>
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" icon={actionIcon} onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
