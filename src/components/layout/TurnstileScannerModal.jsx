import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { QrCode, CheckCircle2, AlertCircle, Scan, Sparkles, UserCheck } from 'lucide-react';
import { attendanceService } from '../../services/attendanceService';
import { useToast } from '../../context/ToastContext';
import { useFacility } from '../../context/FacilityContext';

export const TurnstileScannerModal = ({ isOpen, onClose }) => {
  const [scanInput, setScanInput] = useState('SP28-9941');
  const [scannedResult, setScannedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { activeFacility } = useFacility();

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!scanInput.trim()) return;

    setLoading(true);
    setScannedResult(null);

    try {
      const location = activeFacility.id === 'ALL' ? 'South Campus Gate 01' : activeFacility.name;
      const res = await attendanceService.simulateRapidScan(scanInput.trim(), location);
      setScannedResult({ success: true, member: res.member, log: res.log });
      addToast({
        title: 'Check-In Approved',
        message: `${res.member.name} admitted at ${location}`,
        type: 'success'
      });
    } catch (err) {
      setScannedResult({ success: false, error: err.message });
      addToast({
        title: 'Access Denied',
        message: err.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const samplePasses = [
    { name: 'Alex Johnson', id: 'SP28-9941', plan: 'Group Training' },
    { name: 'Sarah Connor', id: 'SP28-8832', plan: 'Elite Protocol 10-Pack' },
    { name: 'Marcus Reed', id: 'SP28-4411', plan: 'Annual Pass' },
    { name: 'Elena Ramos', id: 'SP28-7712', plan: 'Monthly Plan' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setScannedResult(null);
        onClose();
      }}
      title="Spartan Gate // Rapid Turnstile Check-In"
      subtitle="Simulate contactless NFC or 2D Barcode scanner entry"
      maxWidth="500px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Scanner Target Display */}
        <div
          style={{
            background: 'var(--spartan-bg-surface)',
            border: '1px dashed var(--spartan-green-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated laser line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              background: 'var(--spartan-green)',
              boxShadow: '0 0 10px var(--spartan-green)',
              opacity: loading ? 1 : 0.4
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--spartan-green-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--spartan-green)'
            }}>
              <QrCode size={28} />
            </div>
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>
            SCAN-ID NFC RECEIVER
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--spartan-text-muted)', marginTop: '4px' }}>
            Tap wrist device or enter 8-digit Spartan Identifier
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleScan} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            placeholder="e.g. SP28-9941"
            className="form-control font-mono"
            style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
            autoFocus
          />
          <Button type="submit" variant="primary" loading={loading} icon={Scan}>
            Scan Pass
          </Button>
        </form>

        {/* Quick Sample IDs */}
        <div>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '6px' }}>
            SAMPLE ATHLETE PASSES (CLICK TO TEST):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {samplePasses.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setScanInput(p.id)}
                style={{
                  background: scanInput === p.id ? 'var(--spartan-green-dim)' : 'var(--spartan-bg-card)',
                  border: `1px solid ${scanInput === p.id ? 'var(--spartan-green-border)' : 'var(--spartan-border-subtle)'}`,
                  color: scanInput === p.id ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {p.name} [{p.id}]
              </button>
            ))}
          </div>
        </div>

        {/* Scan Result Visualizer */}
        {scannedResult && (
          <div
            className="animate-fade-in"
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: scannedResult.success ? 'rgba(0, 229, 117, 0.08)' : 'rgba(255, 68, 68, 0.08)',
              border: `1px solid ${scannedResult.success ? 'var(--spartan-green)' : 'var(--spartan-red)'}`,
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            {scannedResult.success ? (
              <>
                <img
                  src={scannedResult.member.avatar}
                  alt={scannedResult.member.name}
                  style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 800, color: '#FFF' }}>{scannedResult.member.name}</span>
                    <span className="spartan-badge spartan-badge-green" style={{ fontSize: '0.62rem' }}>
                      ACCESS GRANTED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-secondary)', marginTop: '2px' }}>
                    {scannedResult.member.membershipPlan} • {scannedResult.member.credits} Credits Remaining
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Turnstile Gate Logged: {scannedResult.log.turnstileLocation} ({scannedResult.log.checkInTime})
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--spartan-red)' }}>
                <AlertCircle size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{scannedResult.error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TurnstileScannerModal;
