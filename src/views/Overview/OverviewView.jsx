import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  CalendarDays, 
  DollarSign, 
  Dumbbell, 
  Flame, 
  Activity, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TacticalAreaChart } from '../../components/charts/TacticalAreaChart';
import { TacticalBarChart } from '../../components/charts/TacticalBarChart';
import { TelemetryRing } from '../../components/charts/TelemetryRing';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { reportsService } from '../../services/reportsService';
import { classesService } from '../../services/classesService';
import { bookingsService } from '../../services/bookingsService';
import { membersService } from '../../services/membersService';
import { contentService } from '../../services/contentService';
import { useAuth } from '../../context/AuthContext';

export const OverviewView = ({ onNavigate }) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [workoutEngagement, setWorkoutEngagement] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [activeTip, setActiveTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    setLoading(true);
    try {
      const [m, rev, eng, cls, bks, cnt] = await Promise.all([
        reportsService.getOverviewMetrics(),
        reportsService.getRevenueAnalytics(),
        reportsService.getWorkoutEngagement(),
        classesService.getClasses(),
        bookingsService.getBookings(),
        contentService.getContentItems()
      ]);

      setMetrics(m);
      setRevenueData(rev);
      setWorkoutEngagement(eng);
      setUpcomingClasses(cls.slice(0, 3));
      setRecentBookings(bks.slice(0, 4));
      
      const tip = cnt.find(c => c.type === 'Coach Tip') || cnt[0];
      setActiveTip(tip);
    } catch (e) {
      console.error('Error loading overview:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Synchronizing Spartan Command HQ..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Tactical Hero Banner */}
      <div
        className="spartan-card"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 117, 0.12) 0%, rgba(20, 27, 38, 0.95) 100%)',
          border: '1px solid var(--spartan-green-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          padding: '1.5rem 2rem'
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="pulse-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--spartan-green)', fontWeight: 700, letterSpacing: '0.1em' }}>
              SPARTAN PROTOCOL SYSTEM ACTIVE
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#FFF', fontWeight: 900 }}>
            COMMAND HQ // <span className="text-gradient-green">{user?.name?.toUpperCase() || 'RON BREZZELL'}</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--spartan-text-secondary)', marginTop: '4px' }}>
            {activeTip ? `Coach Tip of the Day: "${activeTip.body}"` : 'Discipline translates to results. All facility gates, athlete telemetry, and training schedules operating at peak capacity.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="secondary" size="md" onClick={() => onNavigate('attendance')}>
            View Gate Check-Ins
          </Button>
          <Button variant="primary" size="md" icon={CalendarDays} onClick={() => onNavigate('schedule')}>
            Open Schedule
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid-4">
        <StatCard
          title="Total Athletes"
          value={metrics?.totalMembers || 6}
          change="+18.4%"
          trend="up"
          subtitle="Active roster"
          icon={Users}
          colorVariant="green"
          onClick={() => onNavigate('members')}
        />
        <StatCard
          title="Active Subscriptions"
          value={metrics?.activeMemberships || 980}
          change="+12.1%"
          trend="up"
          subtitle="Monthly & Annual Passes"
          icon={CreditCard}
          colorVariant="cyan"
          onClick={() => onNavigate('memberships')}
        />
        <StatCard
          title="Gross Revenue"
          prefix="$"
          value={(metrics?.totalRevenue || 32600).toLocaleString()}
          change="+24.8%"
          trend="up"
          subtitle="This billing cycle"
          icon={DollarSign}
          colorVariant="green"
          onClick={() => onNavigate('payments')}
        />
        <StatCard
          title="Protocols Completed"
          value={metrics?.workoutCompletionsCount || 1806}
          change="+8.5%"
          trend="up"
          subtitle="Logged workouts"
          icon={Dumbbell}
          colorVariant="amber"
          onClick={() => onNavigate('workouts')}
        />
      </div>

      {/* Charts & Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Revenue Performance Chart */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <div>
              <div className="spartan-card-title">
                <DollarSign size={18} style={{ color: 'var(--spartan-green)' }} />
                <span>Revenue & Subscription Trajectory</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--spartan-text-muted)', marginTop: '2px' }}>
                Monthly recurring membership vs class pack credits breakdown
              </p>
            </div>
            <span className="spartan-badge spartan-badge-green">+24% YoY Growth</span>
          </div>

          <TacticalAreaChart
            data={revenueData}
            xKey="month"
            yKey="revenue"
            height={220}
            accentColor="#00E575"
          />
        </div>

        {/* Telemetry Overview & Daily Vanguard Club */}
        <div className="spartan-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="spartan-card-header">
            <div className="spartan-card-title">
              <Activity size={18} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Squad Telemetry</span>
            </div>
            <span className="spartan-badge spartan-badge-cyan">LIVE SYNC</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0.5rem 0' }}>
            <TelemetryRing
              value={8420}
              target={10000}
              size={115}
              label="10K GOAL"
              unit="steps"
              subtitle="Squad Avg Steps"
              accentColor="#00E575"
            />
            <TelemetryRing
              value={2850}
              target={3500}
              size={115}
              label="FLUID"
              unit="ml"
              subtitle="Hydration Target"
              accentColor="#00D4FF"
            />
          </div>

          <div style={{
            background: 'var(--spartan-bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            border: '1px solid var(--spartan-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={16} style={{ color: 'var(--spartan-amber)' }} />
              <span style={{ fontSize: '0.78rem', color: '#FFF', fontWeight: 600 }}>Top Cadence Streak</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--spartan-amber)', fontWeight: 700 }}>
              19 Days (Chloe B.)
            </span>
          </div>
        </div>
      </div>

      {/* Operational Sections: Upcoming Classes & Recent Bookings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Upcoming Classes */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <div className="spartan-card-title">
              <CalendarDays size={18} style={{ color: 'var(--spartan-green)' }} />
              <span>Upcoming Classes & Labs</span>
            </div>
            <button
              onClick={() => onNavigate('classes')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--spartan-green)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View All ({upcomingClasses.length}) <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                style={{
                  background: 'var(--spartan-bg-surface)',
                  border: '1px solid var(--spartan-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#FFF', fontSize: '0.9rem' }}>{cls.name}</span>
                    <StatusBadge status={cls.status} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', marginTop: '3px' }}>
                    {cls.dayOfWeek} • {cls.startTime} ({cls.durationMinutes} min) • <span style={{ color: 'var(--spartan-text-secondary)' }}>{cls.location}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: cls.bookedCount >= cls.capacity ? 'var(--spartan-red)' : 'var(--spartan-green)', fontFamily: 'var(--font-mono)' }}>
                    {cls.bookedCount} / {cls.capacity} SPOTS
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--spartan-text-muted)' }}>
                    {cls.coachName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings Feed */}
        <div className="spartan-card">
          <div className="spartan-card-header">
            <div className="spartan-card-title">
              <CheckCircle2 size={18} style={{ color: 'var(--spartan-cyan)' }} />
              <span>Recent Athlete Bookings</span>
            </div>
            <button
              onClick={() => onNavigate('bookings')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--spartan-cyan)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              All Bookings <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentBookings.map((bk) => (
              <div
                key={bk.id}
                style={{
                  background: 'var(--spartan-bg-surface)',
                  border: '1px solid var(--spartan-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#FFF', fontSize: '0.85rem' }}>{bk.memberName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>
                    {bk.className} • {bk.bookingDate}
                  </div>
                </div>
                <StatusBadge status={bk.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
