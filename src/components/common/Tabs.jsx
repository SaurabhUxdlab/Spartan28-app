import React from 'react';

export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div
      className={`spartan-tabs-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        borderBottom: '1px solid var(--spartan-border-subtle)',
        paddingBottom: '2px',
        overflowX: 'auto'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.65rem 1.15rem',
              border: 'none',
              background: 'transparent',
              color: isActive ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              borderBottom: isActive ? '2px solid var(--spartan-green)' : '2px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {Icon && <Icon size={16} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  background: isActive ? 'var(--spartan-green-dim)' : 'rgba(255,255,255,0.06)',
                  color: isActive ? 'var(--spartan-green)' : 'var(--spartan-text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
