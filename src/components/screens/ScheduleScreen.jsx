import React, { useState } from 'react';
import { Dumbbell, User, Users, ArrowRight, Sparkles, DollarSign, Maximize2 } from 'lucide-react';
import { CLASSES_LIST } from '../../data/mockData';

export function ScheduleScreen({ onSelectClass, onOpenPacks }) {
  const [selectedDay, setSelectedDay] = useState('MON 28');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const days = [
    { label: 'ACTIVE', day: 'MON', date: '28' },
    { label: 'SESSION', day: 'TUE', date: '29' },
    { label: 'SESSION', day: 'WED', date: '30' },
    { label: 'SESSION', day: 'THU', date: '31' },
    { label: 'BOOTCAMP', day: 'SAT', date: '02' },
  ];

  return (
    <div
      className="relative w-full min-h-full text-white flex flex-col select-none overflow-y-auto hide-scrollbar"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '18px',
        paddingRight: '18px',
        paddingTop: '22px',
        paddingBottom: '90px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div className="flex-shrink-0" style={{ marginBottom: '14px' }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: '32px',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: '1',
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            margin: '0 0 4px 0',
          }}
        >
          YOUR SCHEDULE
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11.5px',
            color: '#94A3B8',
            margin: '0 0 10px 0',
          }}
        >
          Discipline is consistency. Plan your week.
        </p>

        {/* Location Breadcrumbs */}
        <div
          className="flex items-center gap-1.5"
          style={{
            fontSize: '9.5px',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: '700',
            color: '#94A3B8',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] flex-shrink-0" />
          <span>DOWNTOWN STUDIO</span>
          <span style={{ color: '#4B5563' }}>//</span>
          <span>SOUTH CAMPUS</span>
          <span style={{ color: '#4B5563' }}>//</span>
          <span>RON'S FACILITY</span>
        </div>
      </div>

      {/* Special Packs Promo Banner */}
      <div
        onClick={onOpenPacks}
        className="rounded-[10px] flex flex-col cursor-pointer transition-all hover:border-[#00E676]/40 relative overflow-hidden flex-shrink-0"
        style={{
          backgroundColor: '#16191d',
          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(0, 230, 118, 0.15), transparent 60%)',
          border: '1px solid #252c34',
          padding: '14px 16px',
          marginBottom: '14px',
          gap: '7px',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: '#00E676',
                color: '#000000',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 6px',
                borderRadius: '3px',
              }}
            >
              TIERED RATES
            </span>
            <span
              style={{
                color: '#00E676',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              1-ON-1 & GROUP PROTOCOLS
            </span>
          </div>

          <div
            className="flex items-center gap-1 shadow-sm"
            style={{
              backgroundColor: '#00E676',
              color: '#000000',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10.5px',
              fontWeight: '900',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: '4px',
            }}
          >
            <span>PACKS</span>
            <ArrowRight className="w-3 h-3 stroke-[3]" />
          </div>
        </div>

        <h2
          style={{
            fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: '19px',
            fontWeight: '900',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: '0',
            lineHeight: '1.1',
            letterSpacing: '0.01em',
          }}
        >
          IN-PERSON & GROUP PACKS
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            lineHeight: '1.4',
            color: '#94A3B8',
            margin: '0',
          }}
        >
          $45 Single // $35 (5-Pack) // $30 (10+ Pack). Group Training: $30/person (3+ people).
        </p>
      </div>

      {/* Horizontal Day Strip */}
      <div className="grid grid-cols-5 gap-1.5 flex-shrink-0" style={{ marginBottom: '14px' }}>
        {days.map((item) => {
          const key = `${item.day} ${item.date}`;
          const isSelected = selectedDay === key;

          return (
            <button
              key={key}
              onClick={() => setSelectedDay(key)}
              className="flex flex-col items-center justify-center rounded-[6px] transition-all cursor-pointer"
              style={{
                height: '56px',
                backgroundColor: isSelected ? '#00E676' : '#16191d',
                border: isSelected ? 'none' : '1px solid #252c34',
                color: isSelected ? '#000000' : '#FFFFFF',
                boxShadow: isSelected ? '0 2px 10px rgba(0, 230, 118, 0.25)' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: '8px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: isSelected ? 'rgba(0,0,0,0.85)' : '#64748B',
                }}
              >
                {isSelected ? 'ACTIVE' : item.label}
              </span>

              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '20px',
                  fontWeight: '900',
                  lineHeight: '1',
                  margin: '1px 0',
                }}
              >
                {item.date}
              </span>

              <span
                style={{
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: isSelected ? '#000000' : '#94A3B8',
                }}
              >
                {item.day}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar flex-shrink-0" style={{ marginBottom: '14px' }}>
        {['ALL', 'HIIT & CONDITIONING', 'STRENGTH & IRON'].map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="transition-colors cursor-pointer whitespace-nowrap"
              style={{
                height: '27px',
                padding: '0 13px',
                borderRadius: '3px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: isSelected ? '#00E676' : '#181b1f',
                color: isSelected ? '#000000' : '#94A3B8',
                border: isSelected ? 'none' : '1px solid #282e37',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Class Cards List */}
      <div className="flex flex-col w-full flex-shrink-0" style={{ gap: '14px' }}>
        {/* Card 1: Saturday Boot Camp */}
        <div
          className="rounded-[10px] flex flex-col shadow-lg flex-shrink-0"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '10px',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              style={{
                color: '#00E676',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10.5px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              SATURDAY // 08:00 AM (60 MIN) •
            </span>

            <span
              style={{
                backgroundColor: '#00E676',
                color: '#000000',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: '3px',
              }}
            >
              ● 12 SPOTS MAX
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '22px',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0',
              lineHeight: '1.1',
            }}
          >
            SATURDAY BOOT CAMP
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: '#4ade80',
                  color: '#000000',
                }}
              >
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.2' }}>
                  Coach Ron Brezzell
                </span>
                <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  SOUTH CAMPUS TURF
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end leading-none">
              <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '2px' }}>
                ENTRY RATE
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '26px',
                  fontWeight: '900',
                  color: '#00E676',
                }}
              >
                $15
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between pt-2.5"
            style={{ borderTop: '1px solid #22272e' }}
          >
            <div className="flex items-center gap-1.5 flex-1 pr-2">
              <Sparkles className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
              <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', lineHeight: '1.3' }}>
                FUNCTIONAL CONDITIONING // BODYWEIGHT & KETTLEBELLS
              </span>
            </div>

            <button
              onClick={() => onSelectClass(CLASSES_LIST[0])}
              className="flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              style={{
                height: '34px',
                padding: '0 14px',
                borderRadius: '3px',
                backgroundColor: '#00E676',
                color: '#000000',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: 'none',
                lineHeight: '1.1',
                textAlign: 'center',
              }}
            >
              ENROLL<br />NOW
            </button>
          </div>
        </div>

        {/* Card 2: Personal Training */}
        <div
          className="rounded-[10px] flex flex-col shadow-lg flex-shrink-0"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '10px',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              style={{
                color: '#00E676',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10.5px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              MON-THU // 07:00 AM (50 MIN) •
            </span>

            <span
              className="flex items-center gap-1"
              style={{
                backgroundColor: '#20252c',
                color: '#94A3B8',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: '3px',
              }}
            >
              <Sparkles className="w-2.5 h-2.5 text-[#94A3B8]" />
              <span>TIERED PACKS AVAILABLE</span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '22px',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0',
              lineHeight: '1.1',
            }}
          >
            PERSONAL TRAINING (IN-PERSON)
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: '#4ade80',
                  color: '#000000',
                }}
              >
                <User className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.2' }}>
                  Coach Ron Brezzell
                </span>
                <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  RON'S PRIVATE FACILITY
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end leading-none">
              <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '2px' }}>
                SINGLE SESSION
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '26px',
                  fontWeight: '900',
                  color: '#00E676',
                }}
              >
                $45
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between pt-2.5"
            style={{ borderTop: '1px solid #22272e' }}
          >
            <div className="flex items-center gap-1.5 flex-1 pr-2">
              <DollarSign className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
              <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', lineHeight: '1.3' }}>
                TIERED: $45 SINGLE // $35 (5-PK) // $30 (10+ PK)
              </span>
            </div>

            <button
              onClick={() => onSelectClass(CLASSES_LIST[1])}
              className="flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              style={{
                height: '34px',
                padding: '0 14px',
                borderRadius: '3px',
                backgroundColor: '#1f242b',
                color: '#00E676',
                border: '1px solid #2d343d',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                textAlign: 'center',
              }}
            >
              ENROLL<br />NOW
            </button>
          </div>
        </div>

        {/* Card 3: Group Training */}
        <div
          className="rounded-[10px] flex flex-col shadow-lg flex-shrink-0"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '10px',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              style={{
                color: '#00E676',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10.5px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              MON-THU // 05:30 PM (60 MIN) •
            </span>

            <span
              className="flex items-center gap-1"
              style={{
                backgroundColor: '#20252c',
                color: '#94A3B8',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: '3px',
              }}
            >
              <Users className="w-2.5 h-2.5 text-[#94A3B8]" />
              <span>GROUPS OF 3 OR MORE</span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '22px',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0',
              lineHeight: '1.1',
            }}
          >
            GROUP TRAINING (3+ ATHLETES)
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: '#4ade80',
                  color: '#000000',
                }}
              >
                <Users className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.2' }}>
                  Coach Ron Brezzell
                </span>
                <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  DOWNTOWN STUDIO
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end leading-none">
              <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '2px' }}>
                PER PERSON
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '26px',
                  fontWeight: '900',
                  color: '#00E676',
                }}
              >
                $30
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between pt-2.5"
            style={{ borderTop: '1px solid #22272e' }}
          >
            <div className="flex items-center gap-1.5 flex-1 pr-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
              <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', lineHeight: '1.3' }}>
                KETTLEBELL PROTOCOLS & MOBILITY // 3+ PERSONS
              </span>
            </div>

            <button
              onClick={() => onSelectClass(CLASSES_LIST[2])}
              className="flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              style={{
                height: '34px',
                padding: '0 14px',
                borderRadius: '3px',
                backgroundColor: '#1f242b',
                color: '#00E676',
                border: '1px solid #2d343d',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                textAlign: 'center',
              }}
            >
              ENROLL<br />NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleScreen;


