
import React from 'react';
import { APP_NAME, PRIMARY_COLOR_CLASS } from '../constants'; // melon

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Simple SVG Nutria-like icon
const NutriaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={`fill-current ${className}`} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M100 20C55.8 20 20 55.8 20 100s35.8 80 80 80 80-35.8 80-80S144.2 20 100 20zm0 140c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z"/>
    <path d="M100 50c-8.3 0-15 6.7-15 15v50c0 8.3 6.7 15 15 15s15-6.7 15-15V65c0-8.3-6.7-15-15-15z"/>
    <circle cx="75" cy="80" r="10"/>
    <circle cx="125" cy="80" r="10"/>
    <path d="M100 120c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 30c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/>
  </svg>
);


export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  let textSizeClass = 'text-2xl';
  let iconSizeClass = 'w-8 h-8';
  if (size === 'sm') {
    textSizeClass = 'text-xl';
    iconSizeClass = 'w-6 h-6';
  } else if (size === 'lg') {
    textSizeClass = 'text-3xl';
    iconSizeClass = 'w-10 h-10';
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <NutriaIcon className={`${iconSizeClass} text-${PRIMARY_COLOR_CLASS}-500`} />
      <h1 className={`${textSizeClass} font-bold text-cocoa-800 dark:text-peach-100`}>{APP_NAME}</h1>
    </div>
  );
};