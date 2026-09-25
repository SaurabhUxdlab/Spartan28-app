import React, { useState } from 'react';
import { Check } from 'lucide-react';

export function GoalsScreen({ onContinue, onBack }) {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const toggleGoal = (id) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const goals = [
    {
      id: 'muscle',
      label: 'Build Muscle',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      ),
    },
    {
      id: 'fat_loss',
      label: 'Lose Fat',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.63-1.64-3.03-2.5-4.5-.86 1.47-2.5 2.87-2.5 4.5z" />
          <path d="M12 2c-4 4.5-8 9-8 14a8 8 0 0 0 16 0c0-5-4-9.5-8-14z" />
        </svg>
      ),
    },
    {
      id: 'stronger',
      label: 'Get Stronger',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'fitness',
      label: 'Improve Fitness',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="14" y1="12" x2="18" y2="12" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="15" x2="16" y2="15" />
        </svg>
      ),
    },
    {
      id: 'mobility',
      label: 'Improve Mobility',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <path d="M9 20l3-6 3 6" />
          <path d="M6 10l6-1 6 1" />
          <path d="M12 9v5" />
        </svg>
      ),
    },
    {
      id: 'health',
      label: 'General Health',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="9" x2="12" y2="15" />
          <line x1="9" y1="12" x2="15" y2="12" />
        </svg>
      ),
    },
    {
      id: 'athletic',
      label: 'Athletic Performance',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] text-[#9ca3af] stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 4v4l-4 4-5-1 3-3 2 1 3-3-2-2z" />
          <path d="M18 10l3-3-2-2-3 3 2 1-3 3 5 1z" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="relative w-full h-full text-white flex flex-col select-none overflow-y-auto hide-scrollbar"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '22px',
        paddingRight: '22px',
        paddingTop: '24px',
        paddingBottom: '24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top 3-Segment Progress Bar */}
      <div className="w-full flex items-center gap-2" style={{ marginBottom: '18px' }}>
        <div className="flex-1 h-[2.5px] bg-[#00E676] rounded-full" />
        <div className="flex-1 h-[2.5px] bg-[#272d34] rounded-full" />
        <div className="flex-1 h-[2.5px] bg-[#272d34] rounded-full" />
      </div>

      {/* Header Typography */}
      <div className="flex flex-col text-left" style={{ marginBottom: '16px' }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: '32px',
            fontWeight: '800',
            textTransform: 'uppercase',
            lineHeight: '0.94',
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            margin: '0 0 6px 0',
          }}
        >
          WHAT ARE YOU WORKING<br />TOWARD?
        </h1>
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '12px',
            lineHeight: '1.4',
            color: '#94A3B8',
            margin: '0',
            fontWeight: '400',
          }}
        >
          Select all the goals that apply to your current training focus.
        </p>
      </div>

      {/* Goal Cards List */}
      <div className="flex flex-col w-full" style={{ gap: '9px' }}>
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);

          return (
            <div
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className="w-full flex items-center justify-between px-3.5 rounded-[6px] cursor-pointer transition-all duration-150"
              style={{
                height: '52px',
                backgroundColor: '#181b1f',
                border: isSelected ? '1px solid #00E676' : '1px solid #282e37',
                boxSizing: 'border-box',
                boxShadow: isSelected ? '0 0 10px rgba(0, 230, 118, 0.15)' : 'none',
              }}
            >
              <div className="flex items-center gap-3.5">
                {/* Square Icon Container */}
                <div
                  className="w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#22272e',
                  }}
                >
                  {goal.icon}
                </div>

                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    letterSpacing: '0.01em',
                  }}
                >
                  {goal.label}
                </span>
              </div>

              {/* Checkbox */}
              <div
                className="w-[18px] h-[18px] rounded-[3px] flex items-center justify-center transition-all"
                style={{
                  border: isSelected ? '1px solid #00E676' : '1px solid #3d4550',
                  backgroundColor: isSelected ? '#00E676' : 'transparent',
                }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Button */}
      <div className="w-full" style={{ marginTop: '18px' }}>
        <button
          onClick={() => onContinue(selectedGoals)}
          className="w-full flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
          style={{
            height: '46px',
            borderRadius: '3px',
            backgroundColor: '#00E676',
            color: '#000000',
            fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
            fontWeight: '800',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: 'none',
            boxShadow: '0 2px 10px rgba(0, 230, 118, 0.25)',
          }}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default GoalsScreen;
