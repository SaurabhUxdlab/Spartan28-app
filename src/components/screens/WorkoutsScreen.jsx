import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { WORKOUTS_LIST } from '../../data/mockData';

export function WorkoutsScreen({ onSelectWorkout }) {
  const [activeFilter, setActiveFilter] = useState('TODAY');

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
      {/* Header Section */}
      <div style={{ marginBottom: '16px' }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: '34px',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: '1',
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            margin: '0 0 4px 0',
          }}
        >
          MY WORKOUTS
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#94A3B8',
            margin: '0 0 14px 0',
          }}
        >
          Select your next challenge.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['TODAY', 'PLANS', 'COMPLETED'].map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="transition-all cursor-pointer"
                style={{
                  height: '28px',
                  padding: '0 16px',
                  borderRadius: '9999px',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  backgroundColor: isActive ? '#00E676' : '#181b1f',
                  color: isActive ? '#000000' : '#94A3B8',
                  border: isActive ? 'none' : '1px solid #282e37',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 230, 118, 0.25)' : 'none',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workout Cards List */}
      <div className="flex flex-col w-full" style={{ gap: '14px' }}>
        {WORKOUTS_LIST.map((workout) => (
          <div
            key={workout.id}
            className="rounded-[8px] overflow-hidden flex flex-col shadow-lg"
            style={{
              backgroundColor: '#16191d',
              border: '1px solid #252c34',
            }}
          >
            {/* Workout Image Banner */}
            <div className="relative w-full overflow-hidden" style={{ height: '145px', backgroundColor: '#0d0f12' }}>
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
              />

              {/* Glowing energy curves for Spartan Core Burn */}
              {workout.glowOverlay && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(0, 230, 118, 0.25) 0%, transparent 70%)',
                    mixBlendMode: 'screen',
                  }}
                />
              )}

              {/* Duration Badge */}
              <div
                className="absolute top-3 right-3 flex items-center gap-1 backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: '#FFFFFF',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '10.5px',
                  fontWeight: '700',
                  letterSpacing: '0.04em',
                }}
              >
                <Clock className="w-3 h-3 text-white" />
                <span>{workout.duration}</span>
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '12px 14px 14px 14px' }} className="flex flex-col gap-1.5">
              {/* Category & Difficulty Tags */}
              <div className="flex items-center gap-2">
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
                  {workout.category}
                </span>

                <span
                  style={{
                    border: '1px solid #3b444e',
                    padding: '1px 6px',
                    borderRadius: '2px',
                    color: '#94A3B8',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '9.5px',
                    fontWeight: '700',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {workout.difficulty}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0',
                  lineHeight: '1.2',
                }}
              >
                {workout.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  lineHeight: '1.38',
                  color: '#94A3B8',
                  margin: '0',
                }}
              >
                {workout.description}
              </p>

              {/* Action Button */}
              <button
                onClick={() => onSelectWorkout(workout)}
                className="w-full flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
                style={{
                  height: '36px',
                  borderRadius: '3px',
                  backgroundColor: '#00E676',
                  color: '#000000',
                  fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
                  fontWeight: '800',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 230, 118, 0.25)',
                  marginTop: '6px',
                }}
              >
                <span>START</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutsScreen;
