import React from 'react';
import { Check } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../../data/mockData';

export function PlansScreen({ onSelectPlan, onBack }) {
  return (
    <div
      className="relative w-full h-full text-white flex flex-col select-none overflow-y-auto hide-scrollbar"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '22px',
        paddingRight: '22px',
        paddingTop: '28px',
        paddingBottom: '32px',
        boxSizing: 'border-box',
        minHeight: '100%',
      }}
    >
      {/* Top Header */}
      <div className="text-center" style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: '34px',
            fontWeight: '800',
            textTransform: 'uppercase',
            lineHeight: '1',
            color: '#00E676',
            letterSpacing: '0.02em',
            margin: '0 0 10px 0',
          }}
        >
          SELECT YOUR PATH
        </h1>
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '11.5px',
            lineHeight: '1.45',
            color: '#94A3B8',
            maxWidth: '280px',
            margin: '0 auto',
            fontWeight: '400',
          }}
        >
          Commitment is the first step. Choose the plan that aligns with your goals and unlock elite training protocols designed for peak performance.
        </p>
      </div>

      {/* Plans Stack */}
      <div className="flex flex-col w-full" style={{ gap: '22px' }}>
        {/* 1. MONTHLY PLAN */}
        <div
          className="relative rounded-[6px] flex flex-col justify-between"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '20px 18px',
            boxSizing: 'border-box',
          }}
        >
          <div>
            {/* Tag */}
            <div
              style={{
                color: '#00E676',
                fontSize: '10.5px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: "'Barlow Condensed', sans-serif",
                marginBottom: '3px',
              }}
            >
              7-DAY FREE TRIAL
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                fontSize: '26px',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: '0 0 4px 0',
                letterSpacing: '0.02em',
              }}
            >
              MONTHLY PLAN
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-1" style={{ marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '38px',
                  fontWeight: '900',
                  color: '#00E676',
                  lineHeight: '1',
                }}
              >
                $9.99
              </span>
              <span style={{ color: '#94A3B8', fontSize: '12px' }}>/ month</span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11.5px',
                lineHeight: '1.4',
                color: '#94A3B8',
                marginBottom: '16px',
              }}
            >
              First Workout Free. Flexible monthly access to elevate your fitness journey.
            </p>

            {/* Feature Checklist */}
            <div className="flex flex-col" style={{ gap: '9px', marginBottom: '18px' }}>
              {[
                'Full Mobile App Access',
                'Daily Workout Protocols',
                'Step Tracking & Apple Watch Sync',
                'Guided Coaching by Ron Brezzell',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ border: '1.2px solid #00E676' }}
                  >
                    <Check className="w-2.5 h-2.5 text-[#00E676] stroke-[3.5]" />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      color: '#E2E8F0',
                      lineHeight: '1.2',
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Outlined Green Button */}
          <button
            onClick={() => onSelectPlan(MEMBERSHIP_PLANS[0])}
            className="w-full flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
            style={{
              height: '42px',
              borderRadius: '3px',
              backgroundColor: 'transparent',
              color: '#00E676',
              fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '1.5px solid #00E676',
            }}
          >
            START FREE TRIAL
          </button>
        </div>

        {/* 2. ANNUAL PASS (Featured with glowing green border) */}
        <div
          className="relative rounded-[6px] flex flex-col justify-between"
          style={{
            backgroundColor: '#16191d',
            border: '2px solid #00E676',
            padding: '22px 18px 20px 18px',
            boxSizing: 'border-box',
            boxShadow: '0 0 18px rgba(0, 230, 118, 0.22)',
          }}
        >
          {/* Top Floating Badge */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00E676] text-black px-4 py-0.5 rounded-full font-headline font-black uppercase tracking-wider shadow-md text-center"
            style={{
              fontSize: '10px',
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}
          >
            BEST VALUE - SAVE 17%
          </div>

          <div>
            {/* Tag */}
            <div
              style={{
                color: '#00E676',
                fontSize: '10.5px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: "'Barlow Condensed', sans-serif",
                marginBottom: '3px',
              }}
            >
              FIRST WORKOUT FREE
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                fontSize: '26px',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: '0 0 4px 0',
                letterSpacing: '0.02em',
              }}
            >
              ANNUAL PASS
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-1" style={{ marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '38px',
                  fontWeight: '900',
                  color: '#00E676',
                  lineHeight: '1',
                }}
              >
                $99
              </span>
              <span style={{ color: '#94A3B8', fontSize: '12px' }}>/ year</span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11.5px',
                lineHeight: '1.4',
                color: '#94A3B8',
                marginBottom: '16px',
              }}
            >
              Commit to the full transformation with maximum savings and complete features.
            </p>

            {/* Feature Checklist */}
            <div className="flex flex-col" style={{ gap: '9px', marginBottom: '20px' }}>
              {[
                "Full Access to Ron's Custom Workouts",
                'Daily Habit & Step Tracking',
                'Apple Watch & Device Sync',
                'Spartan 28 Community Access',
                'Sole Trainer: Ron Brezzell',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ border: '1.2px solid #00E676' }}
                  >
                    <Check className="w-2.5 h-2.5 text-[#00E676] stroke-[3.5]" />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      color: '#E2E8F0',
                      lineHeight: '1.2',
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Solid Green Button */}
          <button
            onClick={() => onSelectPlan(MEMBERSHIP_PLANS[1])}
            className="w-full flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
            style={{
              height: '44px',
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
            CLAIM ANNUAL PASS
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlansScreen;
