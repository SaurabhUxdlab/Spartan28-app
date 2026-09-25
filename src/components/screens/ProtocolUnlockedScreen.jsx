import React from 'react';
import { ShieldCheck, QrCode, ArrowRight, CheckCircle2, Bell, Wallet } from 'lucide-react';

export function ProtocolUnlockedScreen({ onBrowseSchedule, onViewWallet }) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0d0f12] text-white flex flex-col p-4 pb-24 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pt-1 pb-4">
        <span className="font-headline font-bold text-[12px] uppercase tracking-widest text-gray-400">
          SPARTAN 28 PROGRESS
        </span>
        <button className="w-8 h-8 rounded-full bg-[#181d22] flex items-center justify-center text-gray-400 hover:text-white">
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Verified Shield Banner */}
      <div className="flex flex-col items-center text-center my-1">
        <div className="w-14 h-14 rounded-2xl bg-[#00E676]/15 border border-[#00E676] flex items-center justify-center text-[#00E676] mb-3 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <span className="text-[#00E676] font-headline font-bold text-[11px] tracking-widest uppercase mb-1">
          • TRANSACTION VERIFIED • 10 CREDITS •
        </span>

        <h1
          className="font-headline text-[34px] font-black uppercase tracking-tight text-white leading-tight mb-1"
          style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
        >
          PROTOCOL UNLOCKED!
        </h1>

        <p className="text-gray-400 text-[12px] max-w-[300px] leading-relaxed mb-4">
          Your 10-Class Spartan Pack is primed and synced to biometric scan. All sessions are loaded.
        </p>
      </div>

      {/* Tactical Digital Pass Card */}
      <div className="rounded-xl p-4 bg-[#14171a] border border-[#272d34] mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#22272d] pb-2">
          <div className="flex flex-col">
            <span className="text-gray-500 font-headline font-bold text-[9px] uppercase tracking-wider">
              TACTICAL DIGITAL PASS
            </span>
            <span className="font-headline font-bold text-[14px] uppercase text-white tracking-wide">
              SPARTAN ALL-ACCESS
            </span>
          </div>
          <span className="bg-[#00E676]/20 border border-[#00E676] text-[#00E676] font-headline font-bold text-[9.5px] px-2 py-0.5 rounded tracking-wider uppercase">
            ● ACTIVE
          </span>
        </div>

        {/* Turnstile QR Code */}
        <div className="flex items-center gap-4 bg-[#0d0f12] p-3 rounded-lg border border-[#22272d]">
          <div className="w-14 h-14 bg-white p-1 rounded flex items-center justify-center flex-shrink-0">
            <QrCode className="w-full h-full text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] font-headline font-bold uppercase">
              TURNSTILE RAPID CHECK-IN
            </span>
            <span className="font-headline font-black text-[15px] text-[#00E676] tracking-wider">
              SCAN-ID: SP28-9941
            </span>
            <span className="text-gray-500 text-[10.5px] mt-0.5">
               Tap to add to Apple Wallet
            </span>
          </div>
        </div>

        {/* Credit Allocation Progress */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-headline font-bold">
            <span className="text-gray-400 uppercase">CREDIT ALLOCATION</span>
            <span className="text-[#00E676]">10 / 10 Sessions Ready (100%)</span>
          </div>
          <div className="w-full h-2 bg-[#22272d] rounded-full overflow-hidden">
            <div className="h-full bg-[#00E676] rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* Recommended Next Session */}
      <div className="rounded-xl p-3.5 bg-[#14171a] border border-[#22272d] mb-4">
        <span className="text-gray-500 font-headline font-bold text-[9.5px] uppercase tracking-wider block mb-1">
          FIRST PROTOCOL RECOMMENDED
        </span>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[#00E676] font-headline font-bold text-[10px] uppercase">
              HIIT & CONDITIONING
            </span>
            <h3 className="font-bold text-[14px] text-white">Hybrid Iron & Metcon</h3>
            <p className="text-gray-400 text-[11px]">Tomorrow - 07:00 AM • Lab 01</p>
          </div>
          <span className="text-gray-400 font-headline font-bold text-[10px] bg-[#1d2228] px-2 py-0.5 rounded">
            1 CREDIT
          </span>
        </div>
        <button
          onClick={onBrowseSchedule}
          className="w-full py-2 rounded bg-[#00E676]/10 border border-[#00E676] text-[#00E676] font-headline font-bold text-[11.5px] tracking-wider uppercase"
        >
          QUICK RESERVE SPOT (1 CREDIT)
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={onBrowseSchedule}
          className="w-full py-3.5 rounded-md bg-[#00E676] hover:bg-[#00C853] text-black font-headline font-black text-[14px] tracking-wider uppercase transition-all duration-200 shadow-[0_4px_15px_rgba(0,230,118,0.25)] active:scale-[0.99]"
        >
          BROWSE SCHEDULE & BOOK SESSIONS
        </button>

        <button
          onClick={onViewWallet}
          className="w-full py-3 rounded-md bg-[#14171a] hover:bg-[#1b2026] border border-[#272d34] text-gray-300 font-headline font-bold text-[12px] tracking-wider uppercase flex items-center justify-center gap-1.5"
        >
          <Wallet className="w-4 h-4 text-[#00E676]" />
          <span>VIEW CLASS WALLET / CREDITS</span>
        </button>
      </div>
    </div>
  );
}

export default ProtocolUnlockedScreen;
