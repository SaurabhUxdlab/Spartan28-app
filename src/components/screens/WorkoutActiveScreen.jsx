import React, { useState, useEffect } from 'react';
import { X, Info, Plus, Minus, Check, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';

export function WorkoutActiveScreen({ workout, onClose, onFinish }) {
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 3;
  const [weight, setWeight] = useState(65);
  const [reps, setReps] = useState(12);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleCompleteSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
      setTimerSeconds(45);
      setIsTimerRunning(true);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E676', '#ffffff', '#00C853'],
      });
      setTimeout(() => {
        onFinish();
      }, 1200);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="relative w-full h-full text-white flex flex-col justify-between select-none overflow-y-auto hide-scrollbar"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '0px',
        paddingBottom: '24px',
        boxSizing: 'border-box',
        minHeight: '100%',
      }}
    >
      {/* Top Green Progress Indicator */}
      <div className="w-full h-[2.5px] bg-[#22272e] flex overflow-hidden" style={{ marginBottom: '14px' }}>
        <div className="h-full bg-[#00E676]" style={{ width: '37.5%' }} />
      </div>

      <div className="flex flex-col w-full">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors"
            style={{ backgroundColor: '#181b1f', border: '1px solid #282e37' }}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center">
            <span
              style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'Barlow Condensed', sans-serif",
                lineHeight: '1',
              }}
            >
              EXERCISE 03 OF 08
            </span>
            <h1
              style={{
                fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                fontSize: '24px',
                fontWeight: '900',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                lineHeight: '1.1',
                margin: '2px 0 0 0',
              }}
            >
              DUMBBELL ROW
            </h1>
          </div>

          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors"
            style={{ backgroundColor: '#181b1f', border: '1px solid #282e37' }}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Exercise Photo Container */}
        <div
          className="relative w-full rounded-[8px] overflow-hidden shadow-lg flex items-center justify-center"
          style={{
            height: '240px',
            backgroundColor: '#181b1f',
            border: '1px solid #282e37',
            marginBottom: '14px',
          }}
        >
          <img
            src="/coach-ron.jpg"
            alt="Dumbbell Row Execution"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
          />

          {/* Yellow Wall Accent Gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(18,20,22,0.85) 0%, transparent 40%)',
            }}
          />

          {/* Set Tracker Indicator */}
          <div
            className="absolute top-3 left-3"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              border: '1px solid rgba(0, 230, 118, 0.4)',
              color: '#00E676',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10.5px',
              fontWeight: '800',
              letterSpacing: '0.06em',
              padding: '2px 8px',
              borderRadius: '3px',
              textTransform: 'uppercase',
            }}
          >
            SET {currentSet} OF {totalSets}
          </div>
        </div>

        {/* Target & Rest Bar */}
        <div
          className="rounded-[6px] flex items-center justify-between"
          style={{
            backgroundColor: '#16191d',
            border: '1px solid #252c34',
            padding: '12px 16px',
            marginBottom: '14px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '700',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1px',
              }}
            >
              TARGET
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: '700',
                color: '#FFFFFF',
              }}
            >
              3 Sets x 12 Reps
            </span>
          </div>

          {/* Rest Timer Button */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="flex items-center gap-1.5 cursor-pointer transition-colors"
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
              fontSize: '24px',
              fontWeight: '900',
              color: '#00E676',
              background: 'none',
              border: 'none',
              lineHeight: '1',
            }}
          >
            <Timer className="w-4 h-4 text-[#00E676]" />
            <span>{formatTime(timerSeconds)}</span>
          </button>
        </div>

        {/* Weight & Reps Columns */}
        <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '18px' }}>
          {/* Box 1: WEIGHT */}
          <div
            className="rounded-[6px] flex flex-col items-center justify-between"
            style={{
              backgroundColor: '#181b1f',
              border: '1px solid #282e37',
              padding: '12px 8px',
              height: '110px',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '800',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              WEIGHT (LBS)
            </span>

            <div className="flex items-center justify-between w-full px-2">
              <button
                onClick={() => setWeight(Math.max(5, weight - 5))}
                className="w-7 h-7 rounded-[4px] flex items-center justify-center text-white cursor-pointer hover:bg-[#252c34] transition-colors"
                style={{ backgroundColor: '#20252c' }}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                    fontSize: '44px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    lineHeight: '0.9',
                  }}
                >
                  {weight}
                </span>
                <div className="w-6 h-[2.5px] bg-[#00E676] rounded-full mt-1" />
              </div>

              <button
                onClick={() => setWeight(weight + 5)}
                className="w-7 h-7 rounded-[4px] flex items-center justify-center text-white cursor-pointer hover:bg-[#252c34] transition-colors"
                style={{ backgroundColor: '#20252c' }}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Box 2: REPS DONE */}
          <div
            className="rounded-[6px] flex flex-col items-center justify-between"
            style={{
              backgroundColor: '#181b1f',
              border: '1px solid #282e37',
              padding: '12px 8px',
              height: '110px',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '9.5px',
                fontWeight: '800',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              REPS DONE
            </span>

            <div className="flex items-center justify-between w-full px-2">
              <button
                onClick={() => setReps(Math.max(1, reps - 1))}
                className="w-7 h-7 rounded-[4px] flex items-center justify-center text-white cursor-pointer hover:bg-[#252c34] transition-colors"
                style={{ backgroundColor: '#20252c' }}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                    fontSize: '44px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    lineHeight: '0.9',
                  }}
                >
                  {reps}
                </span>
                <div className="w-6 h-[2.5px] bg-transparent mt-1" />
              </div>

              <button
                onClick={() => setReps(reps + 1)}
                className="w-7 h-7 rounded-[4px] flex items-center justify-center text-white cursor-pointer hover:bg-[#252c34] transition-colors"
                style={{ backgroundColor: '#20252c' }}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col w-full" style={{ gap: '8px' }}>
        {/* Complete Set Button */}
        <button
          onClick={handleCompleteSet}
          className="w-full flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.99] cursor-pointer"
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
            boxShadow: '0 2px 10px rgba(0, 230, 118, 0.3)',
          }}
        >
          <span>{currentSet === totalSets ? 'FINISH WORKOUT' : 'COMPLETE SET'}</span>
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Skip Exercise Button */}
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center transition-colors cursor-pointer"
          style={{
            height: '42px',
            borderRadius: '4px',
            backgroundColor: '#181b1f',
            border: '1px solid #282e37',
            color: '#94A3B8',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          SKIP EXERCISE
        </button>
      </div>
    </div>
  );
}

export default WorkoutActiveScreen;
