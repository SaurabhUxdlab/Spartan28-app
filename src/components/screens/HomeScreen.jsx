import React from 'react';
import { Play, Calendar, MessageSquare, Shield, CheckCircle2, ChevronRight, Activity, Footprints } from 'lucide-react';

export function HomeScreen({ onStartWorkout, onViewClassDetails, onOpenChat }) {
  return (
    <div
      className="relative w-full h-full text-white flex flex-col select-none overflow-y-auto hide-scrollbar"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '24px',
        paddingBottom: '80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header & Greeting */}
      <div style={{ marginBottom: '16px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '34px',
              fontWeight: '900',
              textTransform: 'uppercase',
              lineHeight: '1',
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              margin: '0',
            }}
          >
            GOOD MORNING, RON
          </h1>

          {/* Quick Chat Shortcut */}
          <button
            onClick={onOpenChat}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{
              backgroundColor: '#181b1f',
              border: '1px solid #282e37',
              color: '#00E676',
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* First Workout Free Tag */}
        <div className="flex items-center" style={{ marginBottom: '6px' }}>
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px]"
            style={{
              backgroundColor: 'rgba(0, 230, 118, 0.08)',
              border: '1px solid #00E676',
              color: '#00E676',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <Shield className="w-2.5 h-2.5 stroke-[2.5]" />
            <span>FIRST WORKOUT FREE</span>
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#94A3B8',
            margin: '0',
          }}
        >
          Ready to crush today's goals.
        </p>
      </div>

      {/* Main Stack of Cards */}
      <div className="flex flex-col w-full" style={{ gap: '14px' }}>
        {/* 1. Hero Workout of the Day Card */}
        <div
          className="relative rounded-[8px] overflow-hidden shadow-xl"
          style={{
            height: '240px',
            backgroundColor: '#181b1f',
            border: '1px solid #282e37',
          }}
        >
          <img
            src="/ron-chains.jpg"
            alt="Upper Body Strength"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(18,20,22,0.95) 0%, rgba(18,20,22,0.45) 50%, transparent 100%)',
            }}
          />

          {/* Top Badge */}
          <div className="absolute top-3.5 left-3.5">
            <span
              style={{
                backgroundColor: '#00E676',
                color: '#000000',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: '800',
                fontSize: '10.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '3px',
              }}
            >
              TODAY'S PROTOCOL
            </span>
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-col" style={{ gap: '6px' }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                fontSize: '26px',
                fontWeight: '900',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                lineHeight: '1',
                margin: '0',
                letterSpacing: '0.02em',
              }}
            >
              UPPER BODY STRENGTH
            </h2>

            <div
              className="flex items-center gap-3"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#CBD5E1',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <span>⏱ 48 MIN</span>
              <span>⚡ 8 EXERCISES</span>
            </div>

            {/* Start Workout Button */}
            <button
              onClick={onStartWorkout}
              className="w-full flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.99] cursor-pointer"
              style={{
                height: '40px',
                borderRadius: '3px',
                backgroundColor: '#00E676',
                color: '#000000',
                fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
                fontWeight: '800',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
                boxShadow: '0 2px 10px rgba(0, 230, 118, 0.3)',
                marginTop: '4px',
              }}
            >
              <span>START WORKOUT</span>
              <Play className="w-3.5 h-3.5 fill-black stroke-none" />
            </button>
          </div>
        </div>

        {/* 2. Up Next Card */}
        <div
          className="rounded-[8px] flex flex-col"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '12px',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(0, 230, 118, 0.08)',
                border: '1px solid rgba(0, 230, 118, 0.35)',
                color: '#00E676',
              }}
            >
              <Calendar className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '9.5px',
                  fontWeight: '700',
                  color: '#94A3B8',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                UP NEXT
              </span>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0',
                  lineHeight: '1.2',
                }}
              >
                Group Strength Training
              </h3>
              <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>Tomorrow at 5:30 PM</span>
            </div>
          </div>

          <button
            onClick={onViewClassDetails}
            className="w-full flex items-center justify-center transition-colors cursor-pointer"
            style={{
              height: '34px',
              borderRadius: '3px',
              backgroundColor: 'transparent',
              border: '1px solid #00E676',
              color: '#00E676',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            VIEW DETAILS
          </button>
        </div>

        {/* 3. Weekly Goal Card with Circular Ring */}
        <div
          className="rounded-[8px] flex flex-col items-center text-center"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '20px 16px',
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10.5px',
              fontWeight: '700',
              color: '#94A3B8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            WEEKLY GOAL
          </span>

          {/* SVG Circular Progress Ring */}
          <div className="relative w-28 h-28 my-1 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                strokeWidth="7.5"
                stroke="#222830"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                strokeWidth="7.5"
                strokeDasharray={238.7}
                strokeDashoffset={238.7 * (1 - 0.75)}
                strokeLinecap="round"
                stroke="#00E676"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '28px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                }}
              >
                3/4
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: '700',
                  color: '#94A3B8',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                WORKOUTS
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: '11.5px',
              color: '#94A3B8',
              margin: '10px 0 0 0',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            One more session to hit your target.
          </p>
        </div>

        {/* 4. Coach Tip Card */}
        <div
          onClick={onOpenChat}
          className="rounded-[8px] flex flex-col cursor-pointer transition-colors"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '16px',
            gap: '10px',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00E676]" />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                COACH TIP
              </span>
            </div>

            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10.5px',
                fontWeight: '700',
                color: '#00E676',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              COACH RON BREZZELL
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontStyle: 'italic',
              lineHeight: '1.45',
              color: '#D1D5DB',
              margin: '0',
            }}
          >
            "Focus on your eccentric movements today. Slow down the negative phase to maximize muscle time under tension. Form over speed."
          </p>

          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: '1px solid #22272e', fontSize: '10.5px', color: '#94A3B8' }}
          >
            <span className="flex items-center gap-1 text-[#00E676]">
              <CheckCircle2 className="w-3 h-3" />
              <span>Assigned by Coach Ron Brezzell</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>

        {/* 5. Daily Step Goal Card */}
        <div
          className="rounded-[8px] flex flex-col"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '8px',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-[#00E676]" />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                DAILY STEP GOAL
              </span>
            </div>

            <span
              style={{
                fontSize: '10.5px',
                color: '#00E676',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              Apple Watch Synced
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '26px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  marginRight: '4px',
                }}
              >
                8,420
              </span>
              <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>/ 10,000 Steps</span>
            </div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '12.5px',
                fontWeight: '800',
                color: '#00E676',
              }}
            >
              84%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#22272e] rounded-full overflow-hidden">
            <div className="h-full bg-[#00E676] rounded-full w-[84%]" />
          </div>

          <span style={{ fontSize: '10.5px', color: '#64748B' }}>
            Curated target by Coach Ron Brezzell
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
