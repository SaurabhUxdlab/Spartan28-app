import React, { useState } from 'react';

export const TacticalAreaChart = ({
  data = [],
  xKey = 'month',
  yKey = 'revenue',
  height = 200,
  accentColor = '#00E575',
  gradientId = 'greenGlow',
  formatValue = (v) => `$${v.toLocaleString()}`
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) return null;

  const yValues = data.map(d => d[yKey] || 0);
  const minY = Math.min(...yValues) * 0.85;
  const maxY = Math.max(...yValues) * 1.15;
  const range = maxY - minY || 1;

  const width = 600;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 1.5;

  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = height - padding + 10 - ((d[yKey] - minY) / range) * chartHeight;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - 10} L ${points[0].x},${height - 10} Z`;

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map((p, idx) => {
          const y = height - padding + 10 - p * chartHeight;
          const val = minY + p * range;
          return (
            <g key={idx}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeDasharray="4 4"
              />
              <text
                x={padding - 8}
                y={y + 3}
                fill="var(--spartan-text-dim)"
                fontSize="10"
                fontFamily="var(--font-mono)"
                textAnchor="end"
              >
                {formatValue(Math.round(val))}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points and X-axis labels */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={hoveredPoint?.index === i ? 6 : 3.5}
              fill="#0A0D14"
              stroke={accentColor}
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={() => setHoveredPoint({ ...pt, index: i })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            <text
              x={pt.x}
              y={height - 2}
              fill="var(--spartan-text-muted)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              textAnchor="middle"
            >
              {pt.data[xKey]}
            </text>
          </g>
        ))}
      </svg>

      {/* Interactive Tooltip */}
      {hoveredPoint && (
        <div
          style={{
            position: 'absolute',
            left: `${(hoveredPoint.x / width) * 100}%`,
            top: `${(hoveredPoint.y / height) * 100}%`,
            transform: 'translate(-50%, -125%)',
            background: 'var(--spartan-bg-card)',
            border: `1px solid ${accentColor}`,
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap',
            zIndex: 10
          }}
        >
          <div style={{ color: 'var(--spartan-text-muted)', fontSize: '0.7rem' }}>
            {hoveredPoint.data[xKey]}
          </div>
          <div style={{ color: '#FFF', fontWeight: 700, marginTop: '2px' }}>
            {formatValue(hoveredPoint.data[yKey])}
          </div>
        </div>
      )}
    </div>
  );
};

export default TacticalAreaChart;
