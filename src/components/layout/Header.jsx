import React, { useState } from 'react';
import { 
  Building2, 
  QrCode, 
  Plus, 
  Shield, 
  Database, 
  ChevronDown, 
  Check, 
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFacility } from '../../context/FacilityContext';
import { useTheme } from '../../context/ThemeContext';
import { isFirebaseConfigured } from '../../firebase/config';
import { dbService } from '../../firebase/firestoreHelper';
import { Button } from '../common/Button';

export const Header = ({
  activeTitle = 'Command Dashboard',
  activeSubtitle = '',
  breadcrumb = 'Overview',
  onOpenQuickAction,
  onOpenTurnstileScan
}) => {
  const { user, switchRole, demoAccounts } = useAuth();
  const { activeFacility, setActiveFacility, facilities } = useFacility();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showFacilityMenu, setShowFacilityMenu] = useState(false);

  const handleResetData = () => {
    if (window.confirm('Reset all Spartan 28 local data back to initial seed state?')) {
      dbService.resetToInitial();
    }
  };

  return (
    <header
      style={{
        minHeight: 'var(--header-height)',
        backgroundColor: 'var(--spartan-bg-surface)',
        borderBottom: '1px solid var(--spartan-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.75rem',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        gap: '1rem',
        flexWrap: 'wrap',
        transition: 'background-color 0.25s ease, border-color 0.25s ease'
      }}
    >
      {/* Left: Page Title & Breadcrumb */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{
            fontSize: '0.68rem',
            color: 'var(--spartan-green)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700
          }}>
            SPARTAN HQ / {breadcrumb}
          </span>
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--spartan-text-primary)', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          {activeTitle}
        </h2>
        {activeSubtitle && (
          <p style={{ fontSize: '0.78rem', color: 'var(--spartan-text-muted)', marginTop: '2px', fontWeight: 400 }}>
            {activeSubtitle}
          </p>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Facility Location Switcher */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowFacilityMenu(!showFacilityMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--spartan-bg-card)',
              border: '1px solid var(--spartan-border-subtle)',
              color: 'var(--spartan-text-primary)',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <Building2 size={14} style={{ color: 'var(--spartan-cyan)' }} />
            <span style={{ fontWeight: 600 }}>{activeFacility.name}</span>
            <ChevronDown size={14} style={{ color: 'var(--spartan-text-muted)' }} />
          </button>

          {showFacilityMenu && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '230px',
                background: 'var(--spartan-bg-card)',
                border: '1px solid var(--spartan-border-light)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                overflow: 'hidden',
                padding: '4px 0'
              }}
            >
              <div style={{ padding: '6px 12px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', borderBottom: '1px solid var(--spartan-border-subtle)' }}>
                SELECT FACILITY LOCATION
              </div>
              {facilities.map((fac) => (
                <button
                  key={fac.id}
                  onClick={() => {
                    setActiveFacility(fac);
                    setShowFacilityMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    background: activeFacility.id === fac.id ? 'var(--spartan-green-dim)' : 'transparent',
                    color: activeFacility.id === fac.id ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{fac.name}</span>
                  {activeFacility.id === fac.id && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Turnstile Rapid Scanner Button */}
        <Button
          variant="secondary"
          size="sm"
          icon={QrCode}
          onClick={onOpenTurnstileScan}
          title="Simulate member barcode or NFC scan"
        >
          Gate Scanner
        </Button>

        {/* Quick Action Button */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenQuickAction}
        >
          Quick Action
        </Button>

        {/* Backend / Firebase Status Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            background: isFirebaseConfigured ? 'var(--spartan-green-dim)' : 'rgba(2, 132, 199, 0.1)',
            border: `1px solid ${isFirebaseConfigured ? 'var(--spartan-green-border)' : 'rgba(2, 132, 199, 0.25)'}`,
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: isFirebaseConfigured ? 'var(--spartan-green)' : 'var(--spartan-cyan)'
          }}
          title={isFirebaseConfigured ? 'Connected to live Cloud Firestore' : 'Running in High-Speed Local Demo Mode with Initial Spartan Dataset'}
        >
          <Database size={12} />
          <span>{isFirebaseConfigured ? 'Firebase Live' : 'Demo DB'}</span>
        </div>

        {/* Theme Switcher Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.45rem 0.8rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--spartan-bg-card)',
            border: '1px solid var(--spartan-border-subtle)',
            color: 'var(--spartan-text-primary)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`}
        >
          {isDark ? (
            <>
              <Moon size={13} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun size={13} style={{ color: 'var(--spartan-amber)' }} />
              <span>Light</span>
            </>
          )}
        </button>

        {/* Role Switcher Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--spartan-bg-card)',
              border: '1px solid var(--spartan-border-subtle)',
              cursor: 'pointer'
            }}
          >
            <Shield size={14} style={{ color: 'var(--spartan-green)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-primary)', fontWeight: 600 }}>{user?.role}</span>
            <ChevronDown size={12} style={{ color: 'var(--spartan-text-muted)' }} />
          </button>

          {showRoleMenu && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '260px',
                background: 'var(--spartan-bg-card)',
                border: '1px solid var(--spartan-border-light)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                overflow: 'hidden',
                padding: '6px 0'
              }}
            >
              <div style={{ padding: '6px 14px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', borderBottom: '1px solid var(--spartan-border-subtle)' }}>
                SWITCH ROLE SIMULATION
              </div>
              {demoAccounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    switchRole(acc.role);
                    setShowRoleMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    background: user?.role === acc.role ? 'var(--spartan-green-dim)' : 'transparent',
                    color: user?.role === acc.role ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--spartan-text-primary)' }}>{acc.role}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)' }}>{acc.name} ({acc.title})</div>
                  </div>
                  {user?.role === acc.role && <Check size={14} />}
                </button>
              ))}

              <div style={{ borderTop: '1px solid var(--spartan-border-subtle)', marginTop: '4px', paddingTop: '4px' }}>
                <button
                  onClick={() => {
                    handleResetData();
                    setShowRoleMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--spartan-amber)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={12} />
                  <span>Reset Demo Data to Initial</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
