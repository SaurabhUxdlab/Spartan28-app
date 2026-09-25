import React from 'react';

export const TelemetryRing = ({
  value = 0,
  target = 100,
  size = 130,
  strokeWidth = 9,
  accentColor = 'var(--spartan-green)',
  label = 'COMPLETED',
  unit = '',
  subtitle
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.round((value / (target || 1)) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--spartan-border-subtle)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={accentColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: `drop-shadow(0 0 6px ${accentColor}60)`
            }}
          />
        </svg>

        {/* Center content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.1
          }}
        >
          <span style={{
            fontSize: size > 110 ? '1.35rem' : '1.1rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--spartan-text-primary)'
          }}>
            {percentage}%
          </span>
          <span style={{
            fontSize: '0.62rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--spartan-text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: '2px'
          }}>
            {label}
          </span>
        </div>
      </div>

      {subtitle && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--spartan-text-primary)' }}>
            {value.toLocaleString()} <span style={{ color: 'var(--spartan-text-muted)', fontWeight: 400 }}>/ {target.toLocaleString()} {unit}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', marginTop: '1px' }}>
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
};

export default TelemetryRing;
