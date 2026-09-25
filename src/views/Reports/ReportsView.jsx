import React, { useState, useEffect } from 'react';
import { reportsService } from '../../services/reportsService';
import { TacticalAreaChart } from '../../components/charts/TacticalAreaChart';
import { TacticalBarChart } from '../../components/charts/TacticalBarChart';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  Flame 
} from 'lucide-react';

export const ReportsView = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [workoutEngagement, setWorkoutEngagement] = useState([]);
  const [membershipDist, setMembershipDist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('6M');
  const { addToast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const [rev, eng, dist] = await Promise.all([
        reportsService.getRevenueAnalytics(),
        reportsService.getWorkoutEngagement(),
        reportsService.getMembershipDistribution()
      ]);
      setRevenueData(rev);
      setWorkoutEngagement(eng);
      setMembershipDist(dist);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to aggregate report metrics', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = (reportType) => {
    const csvContent = `Report,${reportType}\nGenerated,${new Date().toISOString()}\nStatus,Official Spartan Intelligence Export\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `spartan28_${reportType.toLowerCase().replace(/\s+/g, '_')}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({ title: 'Report Exported', message: `Downloaded ${reportType} CSV`, type: 'success' });
  };

  if (loading) {
    return <LoadingSpinner text="Generating Operational Intelligence Reports..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>Operational & Revenue Intelligence</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
            Comprehensive analytics for memberships, class attendance, and workout completions
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'var(--spartan-bg-card)', borderRadius: 'var(--radius-md)', padding: '2px', border: '1px solid var(--spartan-border-subtle)' }}>
            {['1M', '3M', '6M', 'YTD'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: dateRange === range ? 'var(--spartan-green-dim)' : 'transparent',
                  color: dateRange === range ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                  fontWeight: dateRange === range ? 700 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {range}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => handleExportCSV('Executive Summary')}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Revenue Trajectory */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <div>
              <span className="spartan-card-title">
                <DollarSign size={16} style={{ color: 'var(--spartan-green)' }} />
                <span>Revenue Growth & Forecast ($ USD)</span>
              </span>
              <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
                Recurring monthly subscriptions vs 10-pack drop-in vectors
              </div>
            </div>
            <Button variant="ghost" size="sm" icon={Download} onClick={() => handleExportCSV('Revenue')} />
          </div>

          <TacticalAreaChart
            data={revenueData}
            xKey="month"
            yKey="revenue"
            height={220}
            accentColor="#00E575"
          />
        </div>

        {/* Day of Week Workout Sessions */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <div>
              <span className="spartan-card-title">
                <Flame size={16} style={{ color: 'var(--spartan-amber)' }} />
                <span>Daily Session Intensity</span>
              </span>
              <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
                Peak volume occurs on Saturdays (Bootcamp)
              </div>
            </div>
            <Button variant="ghost" size="sm" icon={Download} onClick={() => handleExportCSV('Workout Sessions')} />
          </div>

          <TacticalBarChart
            data={workoutEngagement}
            xKey="day"
            yKey="sessions"
            height={220}
            accentColor="#FFB020"
          />
        </div>
      </div>

      {/* Membership Distribution Breakdown */}
      <div className="spartan-card">
        <div className="spartan-card-header">
          <div>
            <span className="spartan-card-title">
              <Users size={16} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Membership Distribution & Active Roster</span>
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
              Subscriber distribution across configured Spartan tiers
            </div>
          </div>
          <Button variant="ghost" size="sm" icon={Download} onClick={() => handleExportCSV('Membership Breakdown')} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {membershipDist.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--spartan-bg-surface)',
                border: '1px solid var(--spartan-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginBottom: '4px' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>
                {item.subscribers} Athletes
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--spartan-green)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                ${Number(item.price).toFixed(2)} unit rate
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
