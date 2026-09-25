import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Dumbbell, 
  Flame, 
  Layers, 
  Calendar, 
  CalendarDays, 
  BookmarkCheck, 
  QrCode, 
  CreditCard, 
  Apple, 
  Activity, 
  FileText, 
  Bell, 
  DollarSign, 
  BarChart3, 
  ShieldCheck, 
  History, 
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { SpartanLogo } from '../../assets/SpartanLogo';
import { useAuth } from '../../context/AuthContext';

export const NAV_SECTIONS = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard, subtitle: 'Real-time facility telemetry, KPIs, and operational pulse.' }
    ]
  },
  {
    title: 'PEOPLE',
    items: [
      { id: 'members', label: 'Members', icon: Users, subtitle: 'Manage athlete rosters, telemetry profiles, and memberships.' },
      { id: 'coaches', label: 'Coaches', icon: UserCheck, subtitle: 'Head coaches, specialties, and assigned athlete rosters.' }
    ]
  },
  {
    title: 'FITNESS',
    items: [
      { id: 'workouts', label: 'Workouts', icon: Dumbbell, subtitle: 'Build, sequence, and publish strength & conditioning protocols.' },
      { id: 'exercises', label: 'Exercises', icon: Flame, subtitle: 'Kinetic movements, target muscle groups, and coaching cues.' },
      { id: 'programs', label: 'Workout Programs', icon: Layers, subtitle: 'Multi-week periodized training regimens and curricula.' },
      { id: 'classes', label: 'Classes', icon: CalendarDays, subtitle: 'Manage training sessions, capacities, and coach leads.' },
      { id: 'schedule', label: 'Schedule', icon: Calendar, subtitle: 'Manage classes, coaches, locations and weekly training sessions.' }
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { id: 'memberships', label: 'Memberships', icon: CreditCard, subtitle: 'Subscription tiers, passes, and privilege management.' },
      { id: 'bookings', label: 'Bookings', icon: BookmarkCheck, subtitle: 'Athlete reservations, waitlists, and credit allocations.' },
      { id: 'attendance', label: 'Attendance', icon: QrCode, subtitle: 'Turnstile check-in verification and gate admittance.' }
    ]
  },
  {
    title: 'NUTRITION & PERFORMANCE',
    items: [
      { id: 'nutrition', label: 'Nutrition', icon: Apple, subtitle: 'Food macronutrient library and Performance Fuel Plans.' },
      { id: 'progress', label: 'Progress', icon: Activity, subtitle: '10K Vanguard steps, hydration protocols, and 1RM PRs.' }
    ]
  },
  {
    title: 'CONTENT & COMMUNICATION',
    items: [
      { id: 'content', label: 'Content', icon: FileText, subtitle: 'Coach tips, announcements, and promotional banners.' },
      { id: 'notifications', label: 'Notifications', icon: Bell, subtitle: 'Broadcast push notifications to member devices.' }
    ]
  },
  {
    title: 'FINANCE',
    items: [
      { id: 'payments', label: 'Payments / Transactions', icon: DollarSign, subtitle: 'Payment vectors, settled volume, and billing records.' }
    ]
  },
  {
    title: 'REPORTING',
    items: [
      { id: 'reports', label: 'Reports', icon: BarChart3, subtitle: 'Operational intelligence and revenue analytics.' }
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { id: 'roles', label: 'Roles & Access', icon: ShieldCheck, subtitle: 'Configurable RBAC permissions matrix.' },
      { id: 'audit', label: 'Audit Log', icon: History, subtitle: 'Immutable administrative operations record.' }
    ]
  }
];

export const Sidebar = ({ activeTab, onSelectTab, isCollapsed, onToggleCollapse }) => {
  const { user, logout } = useAuth();

  return (
    <aside
      style={{
        width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--spartan-bg-surface)',
        borderRight: '1px solid var(--spartan-border-subtle)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 100,
        overflow: 'hidden'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          flexShrink: 0,
          padding: isCollapsed ? '1rem 0.5rem' : '1.25rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--spartan-border-subtle)',
          minHeight: 'var(--header-height)'
        }}
      >
        <SpartanLogo size={isCollapsed ? 'small' : 'default'} showText={!isCollapsed} />
        
        {!isCollapsed && (
          <button
            onClick={onToggleCollapse}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--spartan-text-muted)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Collapse Sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Nav List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: isCollapsed ? '0.75rem 0.25rem' : '0.75rem 0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {!isCollapsed && (
              <span
                style={{
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--spartan-text-dim)',
                  textTransform: 'uppercase'
                }}
              >
                {section.title}
              </span>
            )}

            {section.items.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: isCollapsed ? '0.65rem 0' : '0.55rem 0.75rem',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--spartan-green-border)' : 'transparent',
                    background: isActive ? 'var(--spartan-green-dim)' : 'transparent',
                    color: isActive ? 'var(--spartan-green)' : 'var(--spartan-text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--spartan-bg-card-hover)';
                      e.currentTarget.style.color = 'var(--spartan-text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--spartan-text-secondary)';
                    }
                  }}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!isCollapsed && (
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: isCollapsed ? '2px' : '0px',
                        top: '20%',
                        bottom: '20%',
                        width: '3px',
                        borderRadius: '2px',
                        backgroundColor: 'var(--spartan-green)',
                        boxShadow: '0 0 8px var(--spartan-green)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div
        style={{
          flexShrink: 0,
          padding: isCollapsed ? '0.75rem 0.25rem' : '0.85rem 1rem',
          borderTop: '1px solid var(--spartan-border-subtle)',
          background: 'var(--spartan-bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <img
            src={user?.avatar}
            alt={user?.name}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              objectFit: 'cover',
              border: '1px solid var(--spartan-green-border)',
              flexShrink: 0
            }}
          />
          {!isCollapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--spartan-text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--spartan-green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {user?.role}
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={logout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--spartan-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Sign Out"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--spartan-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--spartan-text-muted)')}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
