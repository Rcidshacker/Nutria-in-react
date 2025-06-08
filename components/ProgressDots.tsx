
import React from 'react';
import { PRIMARY_COLOR_CLASS } from '../constants'; // melon

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out
            ${index + 1 === currentStep ? `bg-${PRIMARY_COLOR_CLASS}-500 scale-125` : 'bg-clay-300 dark:bg-cocoa-600'}
          `}
        />
      ))}
    </div>
  );
};