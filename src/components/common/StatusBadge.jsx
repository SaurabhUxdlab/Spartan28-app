import React from 'react';

export const StatusBadge = ({ status, variant, className = '' }) => {
  const norm = (status || '').toLowerCase();

  let badgeType = 'muted';
  if (variant) {
    badgeType = variant;
  } else if (norm.includes('active') || norm.includes('paid') || norm.includes('present') || norm.includes('published') || norm.includes('open') || norm.includes('optimal')) {
    badgeType = 'green';
  } else if (norm.includes('pending') || norm.includes('waitlist') || norm.includes('paused') || norm.includes('draft') || norm.includes('trial')) {
    badgeType = 'amber';
  } else if (norm.includes('full') || norm.includes('cancelled') || norm.includes('no-show') || norm.includes('expired') || norm.includes('failed')) {
    badgeType = 'red';
  } else if (norm.includes('credit') || norm.includes('elite') || norm.includes('vip') || norm.includes('annual')) {
    badgeType = 'cyan';
  } else if (norm.includes('hyrox') || norm.includes('bootcamp')) {
    badgeType = 'purple';
  }

  return (
    <span className={`spartan-badge spartan-badge-${badgeType} ${className}`}>
      <span 
        style={{ 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          backgroundColor: 'currentColor' 
        }} 
      />
      {status}
    </span>
  );
};

export default StatusBadge;
