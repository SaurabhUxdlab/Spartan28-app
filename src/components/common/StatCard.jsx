import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  trend = 'up', // 'up' | 'down' | 'neutral'
  subtitle,
  icon: Icon,
  badgeText,
  colorVariant = 'green', // 'green' | 'cyan' | 'amber' | 'purple' | 'blue'
  className = '',
  onClick
}) => {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  const glowColor = 
    colorVariant === 'green' ? 'rgba(0, 229, 117, 0.15)' :
    colorVariant === 'cyan' ? 'rgba(0, 212, 255, 0.15)' :
    colorVariant === 'amber' ? 'rgba(255, 176, 32, 0.15)' :
    colorVariant === 'purple' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.15)';

  const accentColor = 
    colorVariant === 'green' ? 'var(--spartan-green)' :
    colorVariant === 'cyan' ? 'var(--spartan-cyan)' :
    colorVariant === 'amber' ? 'var(--spartan-amber)' :
    colorVariant === 'purple' ? 'var(--spartan-purple)' : 'var(--spartan-blue)';

  return (
    <div
      className={`spartan-card ${onClick ? 'interactive' : ''} ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        background: `linear-gradient(180deg, var(--spartan-bg-card) 0%, var(--spartan-bg-surface) 100%)`,
        position: 'relative'
      }}
    >
      {/* Decorative top accent line */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: 0.7
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--spartan-text-muted)'
        }}>
          {title}
        </span>

        {Icon && (
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            background: glowColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor
          }}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.02em',
          color: '#FFF'
        }}>
          {prefix}{value}{suffix}
        </span>
        {badgeText && (
          <span className={`spartan-badge spartan-badge-${colorVariant}`} style={{ fontSize: '0.65rem' }}>
            {badgeText}
          </span>
        )}
      </div>

      {(change || subtitle) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
          {change && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontWeight: 600,
                color: isUp ? 'var(--spartan-green)' : isDown ? 'var(--spartan-red)' : 'var(--spartan-text-muted)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {isUp && <TrendingUp size={13} />}
              {isDown && <TrendingDown size={13} />}
              {!isUp && !isDown && <Minus size={13} />}
              {change}
            </span>
          )}
          {subtitle && (
            <span style={{ color: 'var(--spartan-text-muted)' }}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
