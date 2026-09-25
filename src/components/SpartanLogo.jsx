import React from 'react';

export function SpartanLogo({ size = 'medium', variant = 'full', className = '' }) {
  if (variant === 'shield') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181b1f] border border-[#272d34] ${className}`}>
        <svg viewBox="0 0 100 100" className="w-4 h-4" fill="none">
          <path
            d="M32 18 C40 8, 62 8, 72 16 C82 24, 88 38, 86 52 C84 42, 78 30, 68 24 C58 18, 42 18, 32 18 Z"
            fill="#00E676"
          />
          <path
            d="M36 28 C52 24, 70 30, 74 46 C76 56, 75 66, 70 76 L66 66 C64 56, 58 48, 48 46 L40 44 L36 28 Z"
            fill="#00E676"
          />
        </svg>
        <span className="font-headline text-[12px] tracking-widest text-[#00E676] font-bold">SPARTAN 28</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Spartan Helmet Outline matching reference vector */}
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Plume Wave Crest */}
          <path
            d="M24 22 C36 10, 68 8, 82 18 C90 26, 94 40, 90 54 C87 42, 80 30, 68 24 C56 18, 36 18, 24 22 Z"
            fill="#00E676"
          />
          <path
            d="M18 28 C30 18, 56 16, 72 24 C82 32, 84 44, 80 54 C74 44, 62 34, 46 30 C34 26, 24 28, 18 28 Z"
            fill="#00E676"
          />
          {/* Main Skull Crown */}
          <path
            d="M30 30 C48 24, 72 30, 76 46 C78 58, 76 70, 70 80 L66 68 C64 56, 58 48, 46 46 L36 44 L30 30 Z"
            fill="#00E676"
          />
          {/* Nose & Brow Guard */}
          <path
            d="M24 40 L52 46 L48 58 L38 58 L36 82 L30 82 L28 52 L16 46 Z"
            fill="#00E676"
          />
          {/* Cheek & Chin Guard */}
          <path
            d="M38 60 L52 60 L56 80 C54 88, 42 92, 34 92 L30 86 L38 84 L38 60 Z"
            fill="#00E676"
          />
          {/* Visor slit */}
          <path
            d="M28 48 L46 50 L44 55 L28 53 Z"
            fill="#121416"
          />
        </svg>
      </div>

      {/* Brand Text: Exact Georgia/Serif Green with proportional leading */}
      <div className="flex flex-col justify-center select-none" style={{ marginTop: '-2px' }}>
        <span
          className="text-[#00E676] font-serif font-bold tracking-tight"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '22px',
            lineHeight: '1.05',
          }}
        >
          Spartan 28
        </span>
        <span
          className="text-[#00E676] font-serif font-medium tracking-normal"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '20px',
            lineHeight: '1.05',
          }}
        >
          Fitness LLC
        </span>
      </div>
    </div>
  );
}

export default SpartanLogo;
