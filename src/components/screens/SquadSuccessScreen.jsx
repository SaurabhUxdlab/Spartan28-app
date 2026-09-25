import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export function SquadSuccessScreen({ selectedPlan, onStartTraining }) {
  const plan = selectedPlan || {
    name: 'MONTHLY PLAN',
    features: [
      'Full Mobile App Access',
      'Daily Workout Protocols',
      'Step Tracking & Apple Watch Sync',
      'Guided Coaching by Ron Brezzell',
    ],
  };

  return (
    <div
      className="relative w-full h-full text-white flex flex-col justify-between select-none overflow-hidden"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '22px',
        paddingRight: '22px',
        paddingTop: '36px',
        paddingBottom: '28px',
        boxSizing: 'border-box',
        minHeight: '100%',
      }}
    >
      {/* Background Graphic / Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/gym-bg.jpg"
          alt="Gym Background"
          className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #121416 12%, rgba(18,20,22,0.82) 55%, rgba(18,20,22,0.65) 100%)',
          }}
        />
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 text-center">
        <h1
          style={{
            fontFamily: "'Barlow Condensed', 'Bebas Neue', 'Oswald', sans-serif",
            fontSize: '48px',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: '0.88',
            color: '#FFFFFF',
            letterSpacing: '0.01em',
            margin: '0 0 12px 0',
          }}
        >
          WELCOME TO<br />THE SQUAD
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
          Your elite training journey begins now. Discipline is your new standard. The tools for transformation are unlocked.
        </p>
      </div>

      {/* Active Membership Dossier Card */}
      <div className="relative z-10 w-full my-auto py-2">
        <div
          className="rounded-[8px] w-full shadow-2xl"
          style={{
            backgroundColor: '#181b1f',
            border: '1px solid #282e37',
            padding: '22px 20px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#94A3B8',
              letterSpacing: '0.08em',
              fontWeight: '700',
              textTransform: 'uppercase',
              fontFamily: "'Barlow Condensed', sans-serif",
              textAlign: 'center',
              marginBottom: '3px',
            }}
          >
            ACTIVE MEMBERSHIP
          </div>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
              fontSize: '28px',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: '#00E676',
              letterSpacing: '0.02em',
              textAlign: 'center',
              margin: '0 0 18px 0',
            }}
          >
            {plan.name}
          </h2>

          <div className="flex flex-col" style={{ gap: '11px' }}>
            {plan.features?.map((feature, idx) => (
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
                    fontSize: '12.5px',
                    color: '#E2E8F0',
                    lineHeight: '1.2',
                    fontWeight: '400',
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 w-full pt-2">
        <button
          onClick={onStartTraining}
          className="w-full flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] cursor-pointer"
          style={{
            height: '46px',
            borderRadius: '6px',
            backgroundColor: '#00E676',
            color: '#000000',
            fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
            fontWeight: '800',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: 'none',
            boxShadow: '0 2px 12px rgba(0, 230, 118, 0.3)',
          }}
        >
          <span>START TRAINING</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}

export default SquadSuccessScreen;
