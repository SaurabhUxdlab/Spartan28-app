import React from 'react';
import { Watch, CreditCard, Bell, Settings, LogOut, ChevronRight, Check } from 'lucide-react';

export function ProfileScreen({ onLogout, onManageMembership }) {
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
          ATHLETE PROFILE
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11.5px',
            color: '#94A3B8',
            margin: '0',
          }}
        >
          Spartan 28 ID & Membership Credentials
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="rounded-[10px] flex items-center gap-3.5 flex-shrink-0 shadow-lg"
        style={{
          backgroundColor: '#16191d',
          border: '1px solid #252c34',
          padding: '12px 14px',
          marginBottom: '12px',
        }}
      >
        <div className="relative flex-shrink-0">
          <img
            src="/ron-chains.jpg"
            alt="Ron Brezzell"
            className="w-14 h-14 rounded-full object-cover"
            style={{
              border: '2px solid #00E676',
              boxShadow: '0 0 10px rgba(0, 230, 118, 0.25)',
            }}
          />
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: '#00E676',
              color: '#000000',
              border: '2px solid #121416',
            }}
          >
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>
        </div>

        <div className="flex flex-col flex-1 justify-center">
          <h2
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '20px',
              fontWeight: '900',
              color: '#FFFFFF',
              lineHeight: '1.1',
              margin: '0 0 2px 0',
            }}
          >
            Ron Brezzell
          </h2>

          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '11px',
              fontWeight: '800',
              color: '#00E676',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: '1.2',
            }}
          >
            ID: SP28-7749
          </span>

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: '#94A3B8',
              lineHeight: '1.2',
              marginTop: '1px',
            }}
          >
            athlete@spartan28.com
          </span>
        </div>
      </div>

      {/* Active Membership VIP Card */}
      <div
        className="rounded-[10px] flex flex-col flex-shrink-0 shadow-lg"
        style={{
          backgroundColor: '#16191d',
          border: '1.5px solid #00E676',
          boxShadow: '0 0 18px rgba(0, 230, 118, 0.12)',
          padding: '12px 14px',
          marginBottom: '14px',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '9.5px',
            fontWeight: '800',
            color: '#00E676',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          ACTIVE TIER
        </span>

        <div className="flex items-center justify-between">
          <h3
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '20px',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0',
              lineHeight: '1.1',
            }}
          >
            ANNUAL PASS (VIP)
          </h3>

          <button
            onClick={onManageMembership}
            className="flex items-center justify-center transition-colors cursor-pointer"
            style={{
              backgroundColor: '#00E676',
              color: '#000000',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10.5px',
              fontWeight: '900',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: '3px',
              border: 'none',
            }}
          >
            MANAGE
          </button>
        </div>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10.5px',
            color: '#94A3B8',
            marginTop: '2px',
          }}
        >
          Auto-renews in 240 days
        </span>
      </div>

      {/* Preferences & Hardware Section */}
      <div className="flex flex-col flex-shrink-0" style={{ marginBottom: '14px' }}>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '10px',
            fontWeight: '800',
            color: '#94A3B8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '6px',
            paddingLeft: '2px',
          }}
        >
          PREFERENCES & HARDWARE
        </span>

        <div
          className="rounded-[10px] overflow-hidden flex-shrink-0 shadow-lg"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
          }}
        >
          {/* Row 1: Apple Watch */}
          <div
            className="flex items-center justify-between transition-colors hover:bg-[#1c2026] cursor-pointer"
            style={{
              padding: '11px 14px',
              borderBottom: '1px solid #22272e',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Watch className="w-4 h-4 text-[#00E676] flex-shrink-0" />
              <span style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: '500' }}>
                Apple Watch & Wearables
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10.5px',
                fontWeight: '900',
                color: '#00E676',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              CONNECTED
            </span>
          </div>

          {/* Row 2: Payment Methods */}
          <div
            className="flex items-center justify-between transition-colors hover:bg-[#1c2026] cursor-pointer"
            style={{
              padding: '11px 14px',
              borderBottom: '1px solid #22272e',
            }}
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-[#00E676] flex-shrink-0" />
              <span style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: '500' }}>
                Payment Methods (Visa 4521)
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B]" />
          </div>

          {/* Row 3: Push Notifications */}
          <div
            className="flex items-center justify-between transition-colors hover:bg-[#1c2026] cursor-pointer"
            style={{
              padding: '11px 14px',
              borderBottom: '1px solid #22272e',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-[#00E676] flex-shrink-0" />
              <span style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: '500' }}>
                Workout Push Notifications
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>
              Enabled
            </span>
          </div>

          {/* Row 4: App Settings & Sound */}
          <div
            className="flex items-center justify-between transition-colors hover:bg-[#1c2026] cursor-pointer"
            style={{
              padding: '11px 14px',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#00E676] flex-shrink-0" />
              <span style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: '500' }}>
                App Settings & Sound
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B]" />
          </div>
        </div>
      </div>

      {/* Logout Action */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0"
        style={{
          height: '42px',
          borderRadius: '6px',
          backgroundColor: '#16191d',
          border: '1px solid #252c34',
          color: '#FF5252',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '12.5px',
          fontWeight: '900',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        <LogOut className="w-4 h-4 text-[#FF5252]" />
        <span>SIGN OUT OF SPARTAN 28</span>
      </button>
    </div>
  );
}

export default ProfileScreen;
