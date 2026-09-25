import React from 'react';
import { ShieldCheck, Check, Bell, User, QrCode, Calendar, Wallet, Zap, Receipt, Dumbbell } from 'lucide-react';

export function ProgressScreen({ onBrowseSchedule, onViewWallet, onOpenWorkout }) {
  return (
    <div
      className="relative w-full min-h-full text-white flex flex-col select-none overflow-y-auto hide-scrollbar"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '18px',
        paddingRight: '18px',
        paddingTop: '20px',
        paddingBottom: '90px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between flex-shrink-0" style={{ marginBottom: '14px' }}>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '3.5px',
              height: '24px',
              backgroundColor: '#00E676',
              borderRadius: '2px',
            }}
          />
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: '#00E676',
                textTransform: 'uppercase',
                lineHeight: '1',
              }}
            >
              SPARTAN 28
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                fontSize: '20px',
                fontWeight: '900',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                letterSpacing: '0.02em',
              }}
            >
              PROGRESS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            style={{
              backgroundColor: '#181b1f',
              border: '1px solid #282e37',
              color: '#94A3B8',
            }}
          >
            <Bell className="w-4 h-4" />
          </button>

          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            style={{
              backgroundColor: '#00E676',
              color: '#000000',
            }}
          >
            <User className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Hero Unlocked Section with Radial Glow */}
      <div
        className="flex flex-col items-center text-center relative flex-shrink-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(0, 230, 118, 0.16), transparent 70%)',
          paddingTop: '6px',
          paddingBottom: '14px',
        }}
      >
        {/* Shield with Check Badge */}
        <div className="relative mb-3 flex-shrink-0">
          <div
            className="w-16 h-16 rounded-[14px] flex items-center justify-center"
            style={{
              backgroundColor: '#14281e',
              border: '1.5px solid rgba(0, 230, 118, 0.5)',
              boxShadow: '0 0 25px rgba(0, 230, 118, 0.25)',
            }}
          >
            <ShieldCheck className="w-9 h-9 text-[#00E676] stroke-[2]" />
          </div>

          <div
            className="w-4 h-4 rounded-full flex items-center justify-center absolute -bottom-1 -right-1"
            style={{
              backgroundColor: '#00E676',
              color: '#000000',
              border: '2px solid #121416',
            }}
          >
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        </div>

        {/* Status Line */}
        <span
          style={{
            color: '#00E676',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '10px',
            fontWeight: '800',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '3px',
          }}
        >
          ● TRANSACTION VERIFIED - 10 CREDITS
        </span>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: '30px',
            fontWeight: '900',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            lineHeight: '1.05',
            letterSpacing: '0.02em',
            margin: '0 0 6px 0',
          }}
        >
          PROTOCOL UNLOCKED!
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            lineHeight: '1.45',
            color: '#94A3B8',
            maxWidth: '300px',
            margin: '0',
          }}
        >
          Your <strong style={{ color: '#00E676', fontWeight: '700' }}>10-Class Spartan Pack</strong> is primed and synced to biometric scan. All sessions are loaded.
        </p>
      </div>

      {/* Main Content Cards */}
      <div className="flex flex-col w-full flex-shrink-0" style={{ gap: '14px' }}>
        {/* Card 1: Tactical Digital Pass */}
        <div
          className="rounded-[10px] flex flex-col flex-shrink-0 shadow-lg"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '12px',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '9px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  lineHeight: '1',
                }}
              >
                TACTICAL DIGITAL PASS
              </span>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '17px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  lineHeight: '1.2',
                  marginTop: '2px',
                }}
              >
                SPARTAN ALL-ACCESS
              </h2>
            </div>

            <span
              style={{
                backgroundColor: 'rgba(0, 230, 118, 0.12)',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                color: '#00E676',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '3px',
              }}
            >
              ● ACTIVE
            </span>
          </div>

          {/* Inner QR & Turnstile Box */}
          <div
            className="flex items-center gap-3.5 rounded-[8px]"
            style={{
              backgroundColor: '#0f1114',
              border: '1px solid #22272e',
              padding: '10px 12px',
            }}
          >
            <div
              className="w-12 h-12 rounded-[6px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: '#121416',
                border: '1px solid #282e37',
                color: '#00E676',
              }}
            >
              <QrCode className="w-8 h-8" />
            </div>

            <div className="flex flex-col justify-center">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  color: '#64748B',
                  textTransform: 'uppercase',
                }}
              >
                TURNSTILE RAPID CHECK-IN
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '15px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  lineHeight: '1.2',
                }}
              >
                SCAN-ID: SP28-9941
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#94A3B8',
                  marginTop: '1px',
                }}
              >
                 Tap to add to Apple Wallet
              </span>
            </div>
          </div>

          {/* Credit Allocation Segmented Progress */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '9.5px',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                }}
              >
                CREDIT ALLOCATION
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                }}
              >
                <span style={{ color: '#00E676' }}>10</span> / 10 Sessions Ready
              </span>
            </div>

            {/* 10 Segmented Progress Bars */}
            <div className="grid grid-cols-10 gap-1 my-0.5">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-[2px]"
                  style={{
                    backgroundColor: '#00E676',
                    boxShadow: '0 0 6px rgba(0, 230, 118, 0.4)',
                  }}
                />
              ))}
            </div>

            <span
              style={{
                fontSize: '8.5px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: '700',
                color: '#64748B',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              0 OF 10 SESSIONS EXPENDED (100% BALANCE)
            </span>
          </div>
        </div>

        {/* Card 2: First Protocol Recommended */}
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00E676] fill-[#00E676]" />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                  fontSize: '14px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                FIRST PROTOCOL RECOMMENDED
              </span>
            </div>
            <span
              style={{
                fontSize: '9px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: '800',
                color: '#94A3B8',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              SPOT READY
            </span>
          </div>

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
                HIIT & CONDITIONING
              </span>

              <span
                style={{
                  backgroundColor: '#20252c',
                  color: '#94A3B8',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '9px',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '3px',
                }}
              >
                1 CREDIT
              </span>
            </div>

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
              HYBRID IRON & METCON
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#22272e',
                    color: '#94A3B8',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '11px',
                    fontWeight: '900',
                  }}
                >
                  MK
                </div>
                <div className="flex flex-col">
                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.2' }}>
                    Coach Marcus Vance
                  </span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>
                    Tomorrow • 07:00 AM - 08:00 AM
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end leading-tight">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '10.5px',
                    fontWeight: '800',
                    color: '#00E676',
                    textTransform: 'uppercase',
                  }}
                >
                  ZONE 4/5
                </span>
                <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>
                  Lab 01
                </span>
              </div>
            </div>

            <button
              onClick={onBrowseSchedule}
              className="flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              style={{
                height: '36px',
                width: '100%',
                borderRadius: '4px',
                backgroundColor: '#00E676',
                color: '#000000',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '12px',
                fontWeight: '900',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: 'none',
                marginTop: '2px',
              }}
            >
              <Dumbbell className="w-4 h-4 stroke-[2.5]" />
              <span>QUICK RESERVE SPOT (1 CREDIT)</span>
            </button>
          </div>
        </div>

        {/* Card 3: Transaction Ledger */}
        <div
          className="rounded-[10px] flex flex-col flex-shrink-0 shadow-lg"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '14px 16px',
            gap: '10px',
          }}
        >
          <div className="flex items-center justify-between pb-1" style={{ borderBottom: '1px solid #22272e' }}>
            <div className="flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '11px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                TRANSACTION LEDGER
              </span>
            </div>

            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '800',
                color: '#00E676',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              PAID IN FULL
            </span>
          </div>

          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span style={{ color: '#94A3B8' }}>Spartan 10-Class Pack</span>
              <span style={{ fontWeight: '700', color: '#FFFFFF' }}>$189.00</span>
            </div>

            <div className="flex items-center justify-between">
              <span style={{ color: '#94A3B8' }}>Payment Method</span>
              <span style={{ fontWeight: '700', color: '#FFFFFF' }}> Apple Pay</span>
            </div>

            <div className="flex items-center justify-between">
              <span style={{ color: '#94A3B8' }}>Reference Identifier</span>
              <span style={{ fontFamily: 'monospace', fontSize: '10.5px', color: '#94A3B8' }}>#SP-84920</span>
            </div>

            <div className="flex items-center justify-between">
              <span style={{ color: '#94A3B8' }}>Receipt Dispatch</span>
              <span style={{ color: '#00E676', fontWeight: '600' }}>alex@spartan28.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Dual Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1 flex-shrink-0">
          <button
            onClick={onBrowseSchedule}
            className="flex items-center justify-center gap-2 transition-all cursor-pointer"
            style={{
              height: '42px',
              width: '100%',
              borderRadius: '5px',
              backgroundColor: '#00E676',
              color: '#000000',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '13px',
              fontWeight: '900',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              border: 'none',
              boxShadow: '0 4px 18px rgba(0, 230, 118, 0.3)',
            }}
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span>BROWSE SCHEDULE & BOOK SESSIONS</span>
          </button>

          <button
            onClick={onViewWallet}
            className="flex items-center justify-center gap-2 transition-colors cursor-pointer"
            style={{
              height: '38px',
              width: '100%',
              borderRadius: '5px',
              backgroundColor: '#1a1e23',
              border: '1px solid #282e37',
              color: '#FFFFFF',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '11.5px',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <Wallet className="w-3.5 h-3.5 text-[#00E676]" />
            <span>VIEW CLASS WALLET / CREDITS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressScreen;
