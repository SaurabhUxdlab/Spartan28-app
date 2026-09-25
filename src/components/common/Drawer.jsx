import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = '600px',
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
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(5, 8, 14, 0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: 'var(--spartan-bg-card)',
          borderLeft: '1px solid var(--spartan-border-light)',
          width: '100%',
          maxWidth: width,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--spartan-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--spartan-bg-surface)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFF', fontWeight: 700 }}>{title}</h3>
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
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {children}
        </div>

        {/* Drawer Footer */}
        {footer && (
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderTop: '1px solid var(--spartan-border-subtle)',
              background: 'var(--spartan-bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px'
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
