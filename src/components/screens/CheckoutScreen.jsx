import React, { useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck, CheckCircle2, CreditCard, Tag } from 'lucide-react';

export function CheckoutScreen({ onAuthorizePay, onBack }) {
  const [selectedPack, setSelectedPack] = useState('10pack');
  const [selectedPayment, setSelectedPayment] = useState('applepay');

  const is10Pack = selectedPack === '10pack';
  const price = is10Pack ? '199.00' : '30.00';

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0d0f12] text-white flex flex-col justify-between p-4 pb-6 select-none">
      <div>
        {/* Top Steps Bar */}
        <div className="flex items-center justify-between pt-1 pb-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-[#161a1e] flex items-center justify-center text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-headline font-bold text-[10px] tracking-wider uppercase">
              STEP 02 // 02
            </span>
            <span className="text-[#00E676] font-headline font-bold text-[10px] tracking-wider uppercase">
              SECURE CHECKOUT TERMINAL
            </span>
          </div>
          <div className="w-8" />
        </div>

        {/* Title */}
        <h1
          className="font-headline text-[30px] font-black uppercase tracking-tight text-white leading-tight mb-3"
          style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
        >
          CONFIRM & PAY
        </h1>

        {/* Option Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setSelectedPack('single')}
            className={`py-2 px-3 rounded-lg font-headline font-bold text-[11px] uppercase tracking-wider transition-colors border ${
              !is10Pack
                ? 'bg-[#00E676] border-[#00E676] text-black'
                : 'bg-[#14171a] border-[#252c34] text-gray-400'
            }`}
          >
            SINGLE DROP-IN ($30)
          </button>
          <button
            onClick={() => setSelectedPack('10pack')}
            className={`py-2 px-3 rounded-lg font-headline font-bold text-[11px] uppercase tracking-wider transition-colors border ${
              is10Pack
                ? 'bg-[#00E676] border-[#00E676] text-black'
                : 'bg-[#14171a] border-[#252c34] text-gray-400'
            }`}
          >
            ★ 10-PACK ($199)
          </button>
        </div>

        {/* Pricing Breakdown Card */}
        <div className="rounded-xl p-4 bg-[#14171a] border border-[#22272d] mb-4">
          <h2
            className="font-headline text-[20px] font-black uppercase text-white mb-1"
            style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
          >
            {is10Pack ? 'ELITE PROTOCOL 10-PACK' : 'SINGLE SESSION PASS'}
          </h2>
          <span className="text-[#00E676] text-[11px] font-medium block mb-3">
            ⚡ You're saving $51.00 compared to individual drop-in passes!
          </span>

          <div className="flex flex-col gap-1.5 text-[12px] text-gray-400 pb-3 border-b border-[#22272d]">
            <div className="flex justify-between">
              <span>Standard Value Rate</span>
              <span>$250.00</span>
            </div>
            <div className="flex justify-between text-[#00E676]">
              <span>Bundle Discount Adjustment</span>
              <span>-$51.00</span>
            </div>
            <div className="flex justify-between">
              <span>Facility & Protocol Fee</span>
              <span className="text-[#00E676]">WAIVED ($0.00)</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-3">
            <span className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
              TOTAL DUE TODAY
            </span>
            <span
              className="font-headline text-[32px] font-black text-[#00E676] leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
            >
              ${price}
            </span>
          </div>
        </div>

        {/* Credit Allocation Info */}
        <div className="rounded-xl p-3 bg-[#161a1e] border border-[#272d34] mb-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#00E676]/10 flex items-center justify-center text-[#00E676] flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-[11.5px] leading-relaxed text-gray-300">
            <span className="font-headline font-bold text-white uppercase tracking-wider text-[12px]">
              10 CLASS CREDITS ALLOCATION
            </span>
            <span>Credits deposited instantly to your Spartan Wallet. Usable across all peak and non-peak sessions.</span>
          </div>
        </div>

        {/* Voucher Code */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#14171a] border border-[#22272d] mb-4 text-[12px]">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#00E676]" />
            <span className="font-headline font-bold uppercase text-white">SPARTANPASS</span>
            <span className="text-[#00E676] text-[11px]">(-$5.00 APPLIED)</span>
          </div>
          <span className="text-gray-500 font-semibold text-[11px] cursor-pointer hover:text-white">REMOVE</span>
        </div>

        {/* Payment Vector */}
        <div className="flex flex-col gap-2 mb-4">
          <span className="text-gray-400 font-headline font-bold text-[10px] uppercase tracking-wider">
            SELECT PAYMENT VECTOR
          </span>

          <div
            onClick={() => setSelectedPayment('applepay')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
              selectedPayment === 'applepay'
                ? 'bg-[#181d22] border-[#00E676]'
                : 'bg-[#14171a] border-[#22272d]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-semibold text-white"> Apple Pay</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">TOUCH ID</span>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'applepay' ? 'border-[#00E676]' : 'border-gray-600'}`}>
              {selectedPayment === 'applepay' && <div className="w-2 h-2 rounded-full bg-[#00E676]" />}
            </div>
          </div>

          <div
            onClick={() => setSelectedPayment('visa')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
              selectedPayment === 'visa'
                ? 'bg-[#181d22] border-[#00E676]'
                : 'bg-[#14171a] border-[#22272d]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-[#00E676]" />
              <span className="text-[13px] font-semibold text-white">VISA ending in 4521</span>
              <span className="text-[10px] bg-[#00E676]/20 text-[#00E676] px-1.5 py-0.5 rounded font-bold">SPARTAN BLACK</span>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'visa' ? 'border-[#00E676]' : 'border-gray-600'}`}>
              {selectedPayment === 'visa' && <div className="w-2 h-2 rounded-full bg-[#00E676]" />}
            </div>
          </div>
        </div>
      </div>

      {/* Authorize & Pay Action */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onAuthorizePay}
          className="w-full py-4 rounded-md bg-[#00E676] hover:bg-[#00C853] text-black font-headline font-black text-[15px] tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(0,230,118,0.3)] flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <Lock className="w-4 h-4 stroke-[2.5]" />
          <span>AUTHORIZE & PAY ${price}</span>
        </button>

        <div className="flex items-center justify-around text-[10px] text-gray-500 font-headline font-bold uppercase tracking-wider">
          <span>🔒 256-BIT ENCRYPTED</span>
          <span>⚡ INSTANT DISPATCH</span>
          <span>🛡 ZERO LOCK-IN</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
