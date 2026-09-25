import React from 'react';
import { SpartanLogo } from '../SpartanLogo';

export function WelcomeScreen({ onGetStarted, onLogin }) {
  return (
    <div
      className="relative w-full h-full text-white flex flex-col justify-between select-none overflow-hidden"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '26px',
        paddingRight: '26px',
        paddingTop: '28px',
        paddingBottom: '32px',
        boxSizing: 'border-box',
        minHeight: '100%',
      }}
    >
      {/* Background Athlete Image (Coach Ron) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/athlete-welcome.jpg"
          alt="Coach Ron Brezzell"
          className="absolute right-[-4%] top-[6%] h-[74%] w-[88%] object-cover object-top filter contrast-125 brightness-95"
        />
        {/* Soft edge gradients blending seamlessly into dark background */}
        <div
          className="absolute inset-0 w-[64%]"
          style={{
            background: 'linear-gradient(to right, #121416 0%, rgba(18,20,22,0.85) 60%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #121416 12%, rgba(18,20,22,0.7) 45%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background: 'linear-gradient(to bottom, #121416 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Top Header / Spartan 28 Fitness LLC Logo */}
      <header className="relative z-10 w-full" style={{ marginBottom: 'auto' }}>
        <SpartanLogo size="small" />
      </header>

      {/* Bottom Content Section: Stacked Headline + Subtext + 2 Buttons */}
      <div
        className="relative z-10 w-full flex flex-col"
        style={{ gap: '14px', marginTop: 'auto' }}
      >
        {/* Main Stacked Headline */}
        <div
          className="flex flex-col text-left"
          style={{
            lineHeight: '0.86',
            fontFamily: "'Barlow Condensed', 'Bebas Neue', 'Oswald', sans-serif",
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            fontSize: '42px',
            color: '#FFFFFF',
          }}
        >
          <span>GET</span>
          <span>STRONGER.</span>
          <span>LIVE</span>
          <span>STRONGER.</span>
        </div>

        {/* Supporting Subtext */}
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '12px',
            lineHeight: '1.45',
            color: '#94A3B8',
            maxWidth: '255px',
            margin: '0',
            fontWeight: '400',
          }}
        >
          Your personalized path to strength, confidence, and lasting results starts here.
        </p>

        {/* Buttons Stack */}
        <div
          className="w-full flex flex-col"
          style={{ gap: '10px', paddingTop: '6px' }}
        >
          {/* Primary Green CTA */}
          <button
            onClick={onGetStarted}
            className="w-full flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
            style={{
              height: '46px',
              borderRadius: '4px',
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
            GET STARTED
          </button>

          {/* Secondary White Outlined CTA */}
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
            style={{
              height: '46px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '1.5px solid #FFFFFF',
            }}
          >
            I ALREADY HAVE AN ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
