import React, { useState, useEffect } from 'react';
import { progressService } from '../../services/progressService';
import { TelemetryRing } from '../../components/charts/TelemetryRing';
import { TacticalBarChart } from '../../components/charts/TacticalBarChart';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  Activity, 
  Flame, 
  Dumbbell, 
  Award, 
  Droplet, 
  Footprints, 
  TrendingUp, 
  Search, 
  Sparkles 
} from 'lucide-react';

export const ProgressPerformanceView = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    setLoading(true);
    try {
      const data = await progressService.getLeaderboard();
      setLeaderboard(data);
      if (data.length > 0) setSelectedAthlete(data[0]);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load athlete telemetry', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredAthletes = leaderboard.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner text="Connecting to Spartan Telemetry Stream..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Telemetry Squad Banner */}
      <div className="grid-3">
        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <Footprints size={16} style={{ color: 'var(--spartan-green)' }} />
              <span>10K Vanguard Club</span>
            </span>
            <span className="spartan-badge spartan-badge-green">ACTIVE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--spartan-text-primary)' }}>
              {leaderboard.filter(a => a.todaySteps >= 10000).length} / {leaderboard.length}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)' }}>Athletes Hit Target</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-secondary)', marginTop: '4px' }}>
            Apple Watch & Biometric step sync protocol
          </p>
        </div>

        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <Droplet size={16} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Squad Fluid Recovery</span>
            </span>
            <span className="spartan-badge spartan-badge-cyan">OPTIMAL</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--spartan-cyan)' }}>
              2.85 L
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)' }}>Daily Squad Avg</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-secondary)', marginTop: '4px' }}>
            Target: 3.5L baseline on heavy lifting days
          </p>
        </div>

        <div className="spartan-card">
          <div className="spartan-card-header">
            <span className="spartan-card-title">
              <Flame size={16} style={{ color: 'var(--spartan-amber)' }} />
              <span>Max Cadence Streak</span>
            </span>
            <span className="spartan-badge spartan-badge-amber">ON FIRE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--spartan-amber)' }}>
              19 Days
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)' }}>Chloe Bennett</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-secondary)', marginTop: '4px' }}>
            Zero missed training protocols
          </p>
        </div>
      </div>

      {/* Main Two-Column View: Athlete Selector & Deep Biometrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem' }}>
        {/* Left: Athlete Leaderboard Roster */}
        <div className="spartan-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="spartan-card-header" style={{ marginBottom: 0 }}>
            <div className="spartan-card-title">
              <Activity size={16} style={{ color: 'var(--spartan-green)' }} />
              <span>Athlete Telemetry Roster</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--spartan-text-muted)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search athlete telemetry..."
              className="form-control"
              style={{ paddingLeft: '32px', height: '34px', fontSize: '0.8rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '480px', overflowY: 'auto' }}>
            {filteredAthletes.map((athlete, idx) => {
              const isSelected = selectedAthlete?.id === athlete.id;
              return (
                <div
                  key={athlete.id}
                  onClick={() => setSelectedAthlete(athlete)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--spartan-green-dim)' : 'var(--spartan-bg-surface)',
                    border: `1px solid ${isSelected ? 'var(--spartan-green)' : 'var(--spartan-border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--spartan-text-muted)', width: '16px' }}>
                      #{idx + 1}
                    </span>
                    <img
                      src={athlete.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={athlete.name}
                      style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.85rem' }}>{athlete.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)' }}>
                        {athlete.todaySteps.toLocaleString()} Steps • {athlete.streakDays}d Streak
                      </div>
                    </div>
                  </div>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--spartan-cyan)' }}>
                    {athlete.strengthScore}/100
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Athlete Biometric Drilldown */}
        {selectedAthlete && (
          <div className="spartan-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--spartan-border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={selectedAthlete.avatar}
                  alt={selectedAthlete.name}
                  style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid var(--spartan-green)' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--spartan-text-primary)' }}>{selectedAthlete.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
                    Spartan Telemetry Profile • Strength Index: <span style={{ color: 'var(--spartan-green)', fontWeight: 700 }}>{selectedAthlete.strengthScore}/100</span>
                  </div>
                </div>
              </div>

              <span className="spartan-badge spartan-badge-green">
                🔥 {selectedAthlete.streakDays} DAYS ON FIRE
              </span>
            </div>

            {/* Dual Telemetry Rings */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'var(--spartan-bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--spartan-border-subtle)' }}>
              <TelemetryRing
                value={selectedAthlete.todaySteps}
                target={selectedAthlete.stepTarget}
                size={130}
                label="STEPS"
                unit="steps"
                subtitle="Apple Watch Cadence"
                accentColor="#00E575"
              />
              <TelemetryRing
                value={selectedAthlete.todayHydrationMl}
                target={selectedAthlete.hydrationQuotaMl}
                size={130}
                label="FLUID"
                unit="ml"
                subtitle="Fluid Protocol Target"
                accentColor="#00D4FF"
              />
            </div>

            {/* Verified Personal Records Matrix */}
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '8px' }}>
                VERIFIED 1RM STRENGTH PRs:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--spartan-border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--spartan-text-muted)' }}>SQUAT</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--spartan-text-primary)', marginTop: '2px' }}>
                    {selectedAthlete.prs?.squat || '365 lbs'}
                  </div>
                </div>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--spartan-border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--spartan-text-muted)' }}>DEADLIFT</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--spartan-text-primary)', marginTop: '2px' }}>
                    {selectedAthlete.prs?.deadlift || '445 lbs'}
                  </div>
                </div>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--spartan-border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--spartan-text-muted)' }}>BENCH PRESS</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--spartan-text-primary)', marginTop: '2px' }}>
                    {selectedAthlete.prs?.bench || '285 lbs'}
                  </div>
                </div>
                <div style={{ background: 'var(--spartan-bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--spartan-border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--spartan-text-muted)' }}>OH PRESS</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--spartan-text-primary)', marginTop: '2px' }}>
                    {selectedAthlete.prs?.overheadPress || '185 lbs'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPerformanceView;
