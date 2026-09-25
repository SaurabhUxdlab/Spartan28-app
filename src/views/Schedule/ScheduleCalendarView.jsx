import React, { useState, useEffect } from 'react';
import { classesService } from '../../services/classesService';
import { coachesService } from '../../services/coachesService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  User, 
  Plus,
  Sparkles,
  Dumbbell,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ClassFormModal } from '../Classes/ClassFormModal';

export const ScheduleCalendarView = () => {
  const [classes, setClasses] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedCoach, setSelectedCoach] = useState('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const { addToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cls, cList] = await Promise.all([
        classesService.getClasses(),
        coachesService.getCoaches()
      ]);
      setClasses(cls);
      setCoaches(cList);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load schedule', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 7-day structure for the active week
  const daysOfWeek = [
    { day: 'Monday', short: 'MON', dateNum: '21', isToday: false },
    { day: 'Tuesday', short: 'TUE', dateNum: '22', isToday: false },
    { day: 'Wednesday', short: 'WED', dateNum: '23', isToday: false },
    { day: 'Thursday', short: 'THU', dateNum: '24', isToday: false },
    { day: 'Friday', short: 'FRI', dateNum: '25', isToday: true }, // Active/Today
    { day: 'Saturday', short: 'SAT', dateNum: '26', isToday: false },
    { day: 'Sunday', short: 'SUN', dateNum: '27', isToday: false }
  ];

  const filteredClasses = classes.filter(cls => {
    if (selectedLocation !== 'ALL' && cls.location !== selectedLocation) return false;
    if (selectedCoach !== 'ALL' && !cls.coachName?.includes(selectedCoach)) return false;
    return true;
  });

  const handleCardClick = (cls) => {
    setEditingClass(cls);
    setIsFormOpen(true);
  };

  if (loading) {
    return <LoadingSpinner text="Loading Tactical Spartan Schedule..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* Schedule Control Bar */}
      <div
        className="spartan-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          padding: '1rem 1.35rem',
          background: 'linear-gradient(180deg, var(--spartan-bg-card) 0%, var(--spartan-bg-surface) 100%)',
          border: '1px solid var(--spartan-border-subtle)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Left Side: Chevron Navigation & Date Hierarchy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setWeekOffset(w => w - 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--spartan-bg-input)',
                border: '1px solid var(--spartan-border-subtle)',
                color: 'var(--spartan-text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--spartan-green-border)';
                e.currentTarget.style.color = 'var(--spartan-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--spartan-border-subtle)';
                e.currentTarget.style.color = 'var(--spartan-text-primary)';
              }}
              title="Previous Week"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setWeekOffset(w => w + 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--spartan-bg-input)',
                border: '1px solid var(--spartan-border-subtle)',
                color: 'var(--spartan-text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--spartan-green-border)';
                e.currentTarget.style.color = 'var(--spartan-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--spartan-border-subtle)';
                e.currentTarget.style.color = 'var(--spartan-text-primary)';
              }}
              title="Next Week"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '0.66rem',
              fontWeight: 700,
              color: 'var(--spartan-green)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              CURRENT WEEK
            </span>
            <span style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--spartan-text-primary)',
              letterSpacing: '-0.01em',
              marginTop: '1px'
            }}>
              SEPT 21 — SEPT 27, 2026
            </span>
          </div>
        </div>

        {/* Right Side: Location Filter, Coach Filter, Schedule Class CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Location Dropdown */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="form-control"
            style={{ width: 'auto', minWidth: '150px', fontSize: '0.82rem', height: '36px', padding: '0 0.75rem' }}
          >
            <option value="ALL">All Locations</option>
            <option value="South Campus Turf">South Campus Turf</option>
            <option value="Ron's Private Facility">Ron's Private Facility</option>
            <option value="Downtown Studio">Downtown Studio</option>
            <option value="South Campus Turf (Lab 01)">South Campus Turf (Lab 01)</option>
          </select>

          {/* Coach Dropdown */}
          <select
            value={selectedCoach}
            onChange={(e) => setSelectedCoach(e.target.value)}
            className="form-control"
            style={{ width: 'auto', minWidth: '140px', fontSize: '0.82rem', height: '36px', padding: '0 0.75rem' }}
          >
            <option value="ALL">All Coaches</option>
            {coaches.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Schedule Class Primary CTA */}
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => {
              setEditingClass(null);
              setIsFormOpen(true);
            }}
            style={{ height: '36px', padding: '0 1rem', fontSize: '0.82rem', fontWeight: 700 }}
          >
            Schedule Class
          </Button>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(170px, 1fr))',
          gap: '10px',
          overflowX: 'auto',
          minHeight: '440px',
          paddingBottom: '0.5rem'
        }}
      >
        {daysOfWeek.map(({ day, short, dateNum, isToday }) => {
          // Filter classes mapped to this day
          const dayClasses = filteredClasses.filter(c => {
            const cDay = (c.dayOfWeek || '').toLowerCase();
            const dName = day.toLowerCase();

            if (cDay.includes(dName)) return true;
            if (cDay.includes('mon-thu') && ['monday', 'tuesday', 'wednesday', 'thursday'].includes(dName)) return true;
            if (dName === 'saturday' && c.name.toLowerCase().includes('saturday')) return true;
            if (dName === 'sunday' && (c.name.toLowerCase().includes('hybrid') || c.category?.toLowerCase().includes('hiit'))) return true;
            return false;
          });

          return (
            <div
              key={day}
              style={{
                background: isToday 
                  ? 'linear-gradient(180deg, rgba(0, 229, 117, 0.06) 0%, var(--spartan-bg-card) 100%)' 
                  : 'var(--spartan-bg-card)',
                border: isToday 
                  ? '1px solid var(--spartan-green-border)' 
                  : '1px solid var(--spartan-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative',
                boxShadow: isToday ? '0 0 16px rgba(0, 229, 117, 0.08)' : 'var(--shadow-sm)'
              }}
            >
              {/* Active Day Top Accent Bar */}
              {isToday && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: '2px',
                    background: 'var(--spartan-green)',
                    boxShadow: '0 0 8px var(--spartan-green)'
                  }}
                />
              )}

              {/* Day Header */}
              <div
                style={{
                  borderBottom: '1px solid var(--spartan-border-subtle)',
                  paddingBottom: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: isToday ? 'var(--spartan-green)' : 'var(--spartan-text-muted)',
                    textTransform: 'uppercase'
                  }}>
                    {short}
                  </span>

                  {isToday && (
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--spartan-green-dim)',
                        color: 'var(--spartan-green)',
                        border: '1px solid var(--spartan-green-border)',
                        letterSpacing: '0.06em'
                      }}
                    >
                      TODAY
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '2px' }}>
                  <span style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: isToday ? 'var(--spartan-green)' : 'var(--spartan-text-primary)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em'
                  }}>
                    {dateNum}
                  </span>

                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'var(--spartan-text-dim)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}>
                    {dayClasses.length} {dayClasses.length === 1 ? 'SESSION' : 'SESSIONS'}
                  </span>
                </div>
              </div>

              {/* Day Classes Column Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {dayClasses.map((cls) => {
                  const capacity = Number(cls.capacity) || 12;
                  const booked = Number(cls.bookedCount) || 0;
                  const isFull = booked >= capacity;
                  const percentFilled = Math.min(100, Math.round((booked / capacity) * 100));

                  const capacityColor = isFull 
                    ? 'var(--spartan-red)' 
                    : percentFilled >= 75 
                    ? 'var(--spartan-amber)' 
                    : 'var(--spartan-green)';

                  return (
                    <div
                      key={cls.id}
                      onClick={() => handleCardClick(cls)}
                      className="interactive"
                      style={{
                        background: 'var(--spartan-bg-surface)',
                        border: '1px solid var(--spartan-border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px 11px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '7px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--spartan-green-border)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 229, 117, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--spartan-border-subtle)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }}
                    >
                      {/* Category & Capacity Bar Top */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                        <span style={{
                          fontSize: '0.63rem',
                          fontWeight: 700,
                          color: 'var(--spartan-cyan)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '90px'
                        }}>
                          {cls.category?.split('&')[0]?.trim() || 'TRAINING'}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: capacityColor
                          }}>
                            {booked}/{capacity}
                          </span>
                          {isFull && (
                            <span style={{
                              fontSize: '0.58rem',
                              fontWeight: 800,
                              padding: '1px 4px',
                              borderRadius: '3px',
                              background: 'var(--spartan-red-dim)',
                              color: 'var(--spartan-red)',
                              letterSpacing: '0.04em'
                            }}>
                              FULL
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Capacity Mini Progress Track */}
                      <div
                        style={{
                          width: '100%',
                          height: '3px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${percentFilled}%`,
                            height: '100%',
                            background: capacityColor,
                            borderRadius: '2px',
                            transition: 'width 0.4s ease'
                          }}
                        />
                      </div>

                      {/* Class Title */}
                      <h4 style={{
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        color: 'var(--spartan-text-primary)',
                        lineHeight: 1.25,
                        margin: '1px 0 0 0'
                      }}>
                        {cls.name}
                      </h4>

                      {/* Time & Duration */}
                      <div style={{
                        fontSize: '0.73rem',
                        fontWeight: 600,
                        color: 'var(--spartan-green)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <Clock size={12} style={{ flexShrink: 0 }} />
                        <span>{cls.startTime} · {cls.durationMinutes} min</span>
                      </div>

                      {/* Location */}
                      <div style={{
                        fontSize: '0.71rem',
                        color: 'var(--spartan-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <MapPin size={12} style={{ flexShrink: 0, color: 'var(--spartan-text-dim)' }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {cls.location?.split('(')[0]?.trim() || 'Turf Facility'}
                        </span>
                      </div>

                      {/* Coach Lead Footer */}
                      <div style={{
                        fontSize: '0.71rem',
                        fontWeight: 600,
                        color: 'var(--spartan-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        borderTop: '1px solid var(--spartan-border-subtle)',
                        paddingTop: '6px',
                        marginTop: '2px'
                      }}>
                        <User size={12} style={{ color: 'var(--spartan-cyan)', flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {cls.coachName?.replace('Coach ', '')}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Refined Tactical Empty State */}
                {dayClasses.length === 0 && (
                  <div
                    style={{
                      flex: 1,
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '1.25rem 0.5rem',
                      background: 'rgba(255, 255, 255, 0.015)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px dashed var(--spartan-border-subtle)',
                      gap: '5px'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--spartan-text-dim)',
                      marginBottom: '2px'
                    }}>
                      <Dumbbell size={14} />
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--spartan-text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}>
                      OPEN / RECOVERY
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      color: 'var(--spartan-text-dim)'
                    }}>
                      No scheduled sessions
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Schedule / Edit Form Modal */}
      <ClassFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClass(null);
        }}
        initialData={editingClass}
        onSuccess={loadData}
      />
    </div>
  );
};

export default ScheduleCalendarView;
