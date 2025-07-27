
import React from 'react';

interface StepWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`w-full max-w-lg p-6 md:p-8 bg-white dark:bg-cocoa-800 rounded-xl shadow-xl ${className}`}>
      <h2 className="text-2xl font-semibold text-center text-cocoa-800 dark:text-peach-100 mb-6">{title}</h2>
      {children}
    </div>
  );
};