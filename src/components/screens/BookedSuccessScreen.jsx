import React from 'react';
import { Check, Calendar } from 'lucide-react';

export function BookedSuccessScreen({ classData, onDone, onAddToCalendar }) {
  const cls = classData || {
    title: 'Saturday Bootcamp',
    time: 'Saturday, Oct 12 • 9:00 AM',
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0d0f12] text-white flex flex-col justify-between p-6 select-none">
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Animated Green Check Circle */}
        <div className="w-20 h-20 rounded-full bg-[#00E676] flex items-center justify-center text-black mb-6 shadow-[0_0_30px_rgba(0,230,118,0.4)]">
          <Check className="w-10 h-10 stroke-[3.5]" />
        </div>

        {/* Title */}
        <h1
          className="font-headline text-[40px] font-black uppercase tracking-tight text-white leading-tight mb-2"
          style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
        >
          BOOKED ✓
        </h1>

        <p className="text-gray-400 text-[14px] max-w-[260px] mx-auto mb-8 font-normal">
          You're all set for {cls.title}.
        </p>

        {/* Booking Card */}
        <div className="w-full max-w-sm rounded-xl p-4 bg-[#161a1e] border border-[#272d34] flex items-center justify-center gap-3">
          <Calendar className="w-5 h-5 text-[#00E676]" />
          <span className="font-medium text-[14px] text-white">
            {cls.time || 'Saturday, Oct 12 • 9:00 AM'}
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col gap-3 pb-2">
        <button
          onClick={onAddToCalendar}
          className="w-full py-3.5 rounded-md bg-[#161a1e] hover:bg-[#1e242b] border border-white/30 text-white font-headline font-bold text-[14px] tracking-wider uppercase transition-colors"
        >
          ADD TO CALENDAR
        </button>

        <button
          onClick={onDone}
          className="w-full py-4 rounded-md bg-[#00E676] hover:bg-[#00C853] text-black font-headline font-black text-[15px] tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(0,230,118,0.3)] active:scale-[0.99]"
        >
          DONE
        </button>
      </div>
    </div>
  );
}

export default BookedSuccessScreen;
