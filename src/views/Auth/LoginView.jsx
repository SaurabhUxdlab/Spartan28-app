import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SpartanLogo } from '../../assets/SpartanLogo';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { Shield, Key, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const LoginView = () => {
  const { login, loading, demoAccounts } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('superadmin@spartan28.com');
  const [password, setPassword] = useState('spartan2026');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await login(email, password);
      addToast({
        title: 'Authentication Verified',
        message: `Welcome to Spartan Command HQ, ${email.split('@')[0]}`,
        type: 'success'
      });
    } catch (err) {
      addToast({
        title: 'Authentication Failed',
        message: err.message || 'Invalid credentials',
        type: 'error'
      });
    }
  };

  const handleSelectDemo = (acc) => {
    setEmail(acc.email);
    setPassword('spartan2026');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--spartan-bg-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glowing atmospheric elements */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 117, 0.08) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-5%',
          pointerEvents: 'none'
        }}
      />

      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--spartan-bg-card)',
          border: '1px solid var(--spartan-border-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.25rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 117, 0.08)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <SpartanLogo size="large" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
            COMMAND ACCESS
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--spartan-text-secondary)', marginTop: '4px' }}>
            Discipline is freedom. Enter your tactical credentials to access the management portal.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <FormField label="Email or Spartan ID" required>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--spartan-text-muted)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@spartan28.com"
                required
                className="form-control"
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </FormField>

          <FormField label="Tactical Password" required>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--spartan-text-muted)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="form-control"
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </FormField>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.78rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--spartan-text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--spartan-green)' }}
              />
              Remember credential
            </label>
            <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password reset link dispatched to authorized administrator email.'); }} style={{ fontSize: '0.78rem' }}>
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={ArrowRight}
            style={{ width: '100%', height: '44px' }}
          >
            Authenticate & Enter
          </Button>
        </form>

        {/* Quick Demo Accounts Selection */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--spartan-border-subtle)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '8px', textAlign: 'center' }}>
            ONE-CLICK DEMO AUTHENTICATION:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {demoAccounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: email === acc.email ? 'var(--spartan-green-dim)' : 'var(--spartan-bg-surface)',
                  border: `1px solid ${email === acc.email ? 'var(--spartan-green-border)' : 'var(--spartan-border-subtle)'}`,
                  color: email === acc.email ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: email === acc.email ? 'var(--spartan-green)' : 'var(--spartan-text-muted)' }} />
                <div>
                  <div style={{ color: '#FFF', fontSize: '0.75rem' }}>{acc.role}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--spartan-text-muted)' }}>{acc.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
