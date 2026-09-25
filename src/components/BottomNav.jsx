import React from 'react';
import { Home, Maximize2, Calendar, Activity, User } from 'lucide-react';

export function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Maximize2 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="w-full bg-[#0e1012] border-t border-[#1f242b] px-2 py-1.5 z-40 flex items-center justify-around select-none flex-shrink-0"
      style={{
        boxSizing: 'border-box',
        height: '62px',
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 transition-colors duration-150 relative cursor-pointer"
            style={{ minWidth: '54px' }}
          >
            <Icon
              className={`w-[19px] h-[19px] transition-transform duration-150 ${
                isActive ? 'text-[#00E676] stroke-[2.5]' : 'text-[#64748b]'
              }`}
            />
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#00E676' : '#64748b',
                lineHeight: '1.2',
                marginTop: '1px',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;

