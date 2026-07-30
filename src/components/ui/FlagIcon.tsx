'use client';

import React from 'react';

interface FlagIconProps {
  locale: string;
  className?: string;
}

export function FlagIcon({ locale, className = "w-5 h-3.5 rounded-[2px] shadow-sm shrink-0 overflow-hidden" }: FlagIconProps) {
  if (locale === 'id') {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="20" fill="#CE1126" />
        <rect y="20" width="60" height="20" fill="#FFFFFF" />
        <rect width="60" height="40" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
    );
  }

  if (locale === 'en' || locale === 'gb') {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3.5" />
        <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="6" />
        <rect width="60" height="40" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
    );
  }

  if (locale === 'zh' || locale === 'cn') {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <polygon id="star-small" points="0,-2.2 0.5,-0.7 2.1,-0.5 0.9,0.5 1.3,2.0 0,1.1 -1.3,2.0 -0.9,0.5 -2.1,-0.5 -0.5,-0.7" fill="#FFFF00" />
        </defs>
        <rect width="60" height="40" fill="#EE1C25" />
        <polygon points="10,4 11.4,7.8 15.7,8.1 12.4,10.9 13.5,14.9 10,12.3 6.5,14.9 7.6,10.9 4.3,8.1 8.6,7.8" fill="#FFFF00" />
        <use href="#star-small" x="20" y="4" transform="rotate(25 20 4)" />
        <use href="#star-small" x="23.5" y="9" transform="rotate(40 23.5 9)" />
        <use href="#star-small" x="23.5" y="15.5" transform="rotate(0 23.5 15.5)" />
        <use href="#star-small" x="20" y="20.5" transform="rotate(-25 20 20.5)" />
        <rect width="60" height="40" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
    );
  }

  // Fallback
  return (
    <div className={className} style={{ backgroundColor: '#ccc' }} />
  );
}
