import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settingsService';
import { isFirebaseConfigured } from '../../firebase/config';
import { dbService } from '../../firebase/firestoreHelper';
import { FormField } from '../../components/common/FormField';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useToast } from '../../context/ToastContext';
import { 
  Settings as SettingsIcon, 
  Building2, 
  ShieldAlert, 
  Database, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const SettingsView = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.updateSettings(settings);
      addToast({ title: 'Settings Saved', message: 'Updated Spartan HQ configuration', type: 'success' });
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to initial seed data?')) {
      dbService.resetToInitial();
    }
  };

  if (loading || !settings) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '900px' }}>
      {/* Top Banner */}
      <div className="spartan-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--spartan-text-primary)' }}>Spartan Facility & System Settings</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
            Configure operational policies, Spartan Flex cancellation rules, and cloud infrastructure
          </p>
        </div>

        <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>
          Save Configuration
        </Button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Facility Profile */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <Building2 size={16} style={{ color: 'var(--spartan-green)' }} />
              <span>Campus Locations & Facilities</span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <FormField label="Organization / Command Center Name">
              <input
                type="text"
                value={settings.facilityName}
                onChange={(e) => setSettings({ ...settings, facilityName: e.target.value })}
                className="form-control"
              />
            </FormField>

            <FormField label="Primary Campus Network">
              <input
                type="text"
                value={settings.primaryLocation}
                onChange={(e) => setSettings({ ...settings, primaryLocation: e.target.value })}
                className="form-control"
              />
            </FormField>
          </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '8px' }}>
              ACTIVE FACILITY BRANCHES:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(settings.locations || []).map((loc, idx) => (
                <div key={loc.id || idx} style={{ background: 'var(--spartan-bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--spartan-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--spartan-text-primary)' }}>{loc.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginLeft: '8px' }}>{loc.address}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--spartan-cyan)' }}>
                    Max Capacity: {loc.capacity} Athletes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spartan Flex Guarantee & Business Rules */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <ShieldAlert size={16} style={{ color: 'var(--spartan-amber)' }} />
              <span>Spartan Flex Guarantee & Booking Policy</span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <FormField label="Cancellation Window (Hours Before Class)">
              <input
                type="number"
                value={settings.spartanFlexPolicy?.cancellationWindowHours || 12}
                onChange={(e) => setSettings({
                  ...settings,
                  spartanFlexPolicy: {
                    ...settings.spartanFlexPolicy,
                    cancellationWindowHours: Number(e.target.value)
                  }
                })}
                className="form-control font-mono"
              />
            </FormField>

            <FormField label="Gate Rapid Turnstile Check-In Window (Minutes)">
              <input
                type="number"
                value={settings.turnstileCheckInWindowMinutes || 30}
                onChange={(e) => setSettings({ ...settings, turnstileCheckInWindowMinutes: Number(e.target.value) })}
                className="form-control font-mono"
              />
            </FormField>
          </div>

          <FormField label="Guarantee Notice Policy Text (Visible on Checkout & Bookings)">
            <textarea
              value={settings.spartanFlexPolicy?.guaranteeNotice || ''}
              onChange={(e) => setSettings({
                ...settings,
                spartanFlexPolicy: {
                  ...settings.spartanFlexPolicy,
                  guaranteeNotice: e.target.value
                }
              })}
              rows={2}
              className="form-control"
            />
          </FormField>
        </div>

        {/* Cloud Backend & Firebase Diagnostics */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <Database size={16} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Firebase Cloud Backend Diagnostics</span>
            </span>
            <StatusBadge status={isFirebaseConfigured ? 'Active' : 'Demo Mode'} />
          </div>

          <div style={{ background: 'var(--spartan-bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--spartan-text-muted)' }}>Backend Architecture</span>
              <span style={{ color: 'var(--spartan-text-primary)', fontWeight: 600 }}>Firebase (Auth + Cloud Firestore + Storage)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--spartan-text-muted)' }}>Connection Status</span>
              <span style={{ color: isFirebaseConfigured ? 'var(--spartan-green)' : 'var(--spartan-cyan)', fontWeight: 700 }}>
                {isFirebaseConfigured ? '● Live Firebase Connected' : '● Demo Local Storage Reactive Mode'}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', borderTop: '1px solid var(--spartan-border-subtle)', paddingTop: '8px' }}>
              To connect live Firebase, configure <code style={{ color: 'var(--spartan-green)' }}>.env</code> with your <code style={{ color: 'var(--spartan-green)' }}>VITE_FIREBASE_API_KEY</code>, <code style={{ color: 'var(--spartan-green)' }}>VITE_FIREBASE_PROJECT_ID</code>, etc. The application will automatically stream from Cloud Firestore!
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="danger" size="sm" icon={RefreshCw} onClick={handleReset}>
              Reset Local Seed Database
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsView;
