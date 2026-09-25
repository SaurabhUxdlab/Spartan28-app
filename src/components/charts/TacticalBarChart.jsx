import React, { useState } from 'react';

export const TacticalBarChart = ({
  data = [],
  xKey = 'day',
  yKey = 'sessions',
  height = 180,
  accentColor = 'var(--spartan-green)'
}) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) return null;

  const yValues = data.map(d => d[yKey] || 0);
  const maxY = Math.max(...yValues, 10);
  const width = 500;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 1.5;
  const barWidth = Math.min(32, (chartWidth / data.length) * 0.55);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((p, idx) => {
          const y = height - padding + 5 - p * chartHeight;
          return (
            <line
              key={idx}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="var(--spartan-border-subtle)"
              strokeDasharray="3 3"
            />
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1 || 1)) * (chartWidth - barWidth);
          const barHeight = (d[yKey] / maxY) * chartHeight;
          const y = height - padding + 5 - barHeight;
          const isHovered = hoveredIdx === i;

          return (
            <g
              key={i}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Background slot */}
              <rect
                x={x}
                y={height - padding + 5 - chartHeight}
                width={barWidth}
                height={chartHeight}
                rx={4}
                fill="var(--spartan-border-subtle)"
                opacity={0.4}
              />
              {/* Active Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(4, barHeight)}
                rx={4}
                fill={accentColor}
                opacity={isHovered ? 1 : 0.85}
                style={{ transition: 'all 0.2s ease' }}
              />
              {/* X label */}
              <text
                x={x + barWidth / 2}
                y={height - 5}
                fill={isHovered ? 'var(--spartan-text-primary)' : 'var(--spartan-text-muted)'}
                fontSize="10"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
                fontWeight={isHovered ? 700 : 400}
              >
                {d[xKey]}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIdx !== null && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            background: 'var(--spartan-bg-card)',
            border: '1px solid var(--spartan-border-subtle)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--spartan-text-primary)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {data[hoveredIdx][xKey]}: <span style={{ color: accentColor, fontWeight: 700 }}>{data[hoveredIdx][yKey]} sessions</span>
        </div>
      )}
    </div>
  );
};

export default TacticalBarChart;
