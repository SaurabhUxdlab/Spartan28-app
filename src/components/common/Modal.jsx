import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '550px',
  footer
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(5, 8, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: 'var(--spartan-bg-card)',
          border: '1px solid var(--spartan-border-light)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 117, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--spartan-border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'var(--spartan-bg-surface)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontWeight: 700 }}>{title}</h3>
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--spartan-text-muted)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--spartan-text-muted)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--spartan-border-subtle)',
              background: 'var(--spartan-bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
