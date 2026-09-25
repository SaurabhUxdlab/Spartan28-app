import React from 'react';

export const SpartanLogo = ({ size = 'default', showText = true, className = '' }) => {
  const iconSize = size === 'small' ? 24 : size === 'large' ? 44 : 32;

  return (
    <div className={`spartan-brand-lockup ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <div 
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(0, 229, 117, 0.15), rgba(0, 212, 255, 0.05))',
          border: '1px solid rgba(0, 229, 117, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(0, 229, 117, 0.2)',
          flexShrink: 0
        }}
      >
        <svg width={iconSize * 0.7} height={iconSize * 0.7} viewBox="0 0 24 24" fill="none">
          {/* Spartan Helmet Crest Path */}
          <path
            d="M12 2L4 7V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V7L12 2Z"
            stroke="#00E575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(0, 229, 117, 0.1)"
          />
          <path
            d="M12 6V14M9 10H15M8 17C9.5 18 10.7 18.5 12 18.5C13.3 18.5 14.5 18 16 17"
            stroke="#00E575"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 900, 
              fontSize: size === 'large' ? '1.35rem' : '1.05rem', 
              letterSpacing: '0.08em',
              color: '#FFFFFF' 
            }}>
              SPARTAN
            </span>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 900, 
              fontSize: size === 'large' ? '1.35rem' : '1.05rem', 
              color: 'var(--spartan-green)',
              textShadow: '0 0 8px rgba(0, 229, 117, 0.4)'
            }}>
              28
            </span>
          </div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.62rem', 
            fontWeight: 600, 
            letterSpacing: '0.18em', 
            color: 'var(--spartan-text-muted)',
            textTransform: 'uppercase'
          }}>
            Command HQ
          </span>
        </div>
      )}
    </div>
  );
};

export default SpartanLogo;
