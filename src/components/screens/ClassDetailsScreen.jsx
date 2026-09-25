import React from 'react';
import { ArrowLeft, MapPin, User, Flame, Activity } from 'lucide-react';

export function ClassDetailsScreen({ classData, onBack, onBookClass }) {
  const cls = classData || {
    title: 'SATURDAY BOOTCAMP',
    badge: 'BOOTCAMP',
    time: 'Saturday 9:00 AM • 60 Minutes',
    location: 'Spartan 28 Fitness / Outdoor Training',
    coach: 'Coach Ron Brezzell',
    intensity: 'HIGH INTENSITY',
    spotsLeft: 12,
    description: 'A high-energy, full-body conditioning session designed to push your limits. Combining strength, cardio, and functional movements for maximum results. Expect heavy carries, sled pushes, and relentless pace in an outdoor environment engineered for elite performance.',
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0d0f12] text-white flex flex-col justify-between select-none">
      <div>
        {/* Top Hero Banner with Back Button */}
        <div className="relative h-64 w-full overflow-hidden bg-[#14171a]">
          <img
            src="/ron-chains.jpg"
            alt={cls.title}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/40 to-black/60" />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4 -mt-6 relative z-10">
          <div>
            {/* Tag */}
            <span className="bg-[#00E676] text-black font-headline font-black text-[11px] px-3 py-0.5 rounded tracking-widest uppercase">
              {cls.badge || 'BOOTCAMP'}
            </span>

            {/* Title */}
            <h1
              className="font-headline text-[34px] font-black uppercase tracking-tight text-white leading-tight mt-2 mb-1"
              style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
            >
              {cls.title}
            </h1>

            <p className="text-gray-300 text-[13px] font-medium">
              {cls.time}
            </p>
          </div>

          {/* Info Rows */}
          <div className="flex flex-col gap-3 pt-2">
            {/* Location */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#14171a] border border-[#22272d]">
              <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 flex items-center justify-center text-[#00E676] flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-headline font-bold text-[10px] uppercase tracking-wider">
                  Location
                </span>
                <span className="text-white text-[13.5px] font-medium">
                  {cls.location}
                </span>
              </div>
            </div>

            {/* Coach */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14171a] border border-[#22272d]">
              <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 flex items-center justify-center text-[#00E676] flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-headline font-bold text-[10px] uppercase tracking-wider">
                  Coach
                </span>
                <span className="text-white text-[13.5px] font-medium">
                  {cls.coach}
                </span>
              </div>
            </div>

            {/* Intensity */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#14171a] border border-[#22272d]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#00E676]" />
                  <span className="text-gray-400 font-headline font-bold text-[10px] uppercase tracking-wider">
                    Intensity
                  </span>
                </div>
                <span className="text-[#00E676] font-headline font-bold text-[11px] tracking-wider uppercase">
                  {cls.intensity}
                </span>
              </div>

              {/* Intensity meter blocks */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                <div className="h-1.5 bg-[#00E676] rounded-full" />
                <div className="h-1.5 bg-[#00E676] rounded-full" />
                <div className="h-1.5 bg-[#00E676] rounded-full" />
                <div className="h-1.5 bg-[#00E676] rounded-full" />
                <div className="h-1.5 bg-[#252c34] rounded-full" />
              </div>
            </div>

            {/* About this class */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-white font-headline font-bold text-[13px] uppercase tracking-wider">
                ABOUT THIS CLASS
              </span>
              <p className="text-gray-300 text-[12.5px] leading-relaxed font-normal">
                {cls.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-0 bg-[#0d0f12] border-t border-[#1d2228] p-4 flex flex-col gap-2">
        <div className="text-center">
          <span className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
            {cls.spotsLeft} SPOTS REMAINING
          </span>
        </div>

        <button
          onClick={() => onBookClass(cls)}
          className="w-full py-4 rounded-md bg-[#00E676] hover:bg-[#00C853] text-black font-headline font-black text-[15px] tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(0,230,118,0.3)] active:scale-[0.99]"
        >
          BOOK CLASS
        </button>
      </div>
    </div>
  );
}

export default ClassDetailsScreen;
