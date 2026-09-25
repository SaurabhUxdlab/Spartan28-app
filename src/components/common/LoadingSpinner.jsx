import React from 'react';

export const LoadingSpinner = ({ text = 'Loading data...', size = 36 }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      gap: '14px'
    }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '3px solid rgba(0, 229, 117, 0.15)',
        borderTopColor: 'var(--spartan-green)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: 'var(--spartan-text-muted)',
        letterSpacing: '0.05em'
      }}>
        {text}
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
