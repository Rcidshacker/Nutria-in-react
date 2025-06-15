// --- START OF FILE components/RadioCard.tsx ---

import React from 'react';
import { PRIMARY_COLOR_CLASS } from '../constants';

interface RadioCardProps {
  id: string;
  name: string;
  value: string;
  label: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  id,
  name,
  value,
  label,
  description,
  icon,
  checked,
  onChange,
  className = ''
}) => {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[0.99]
        ${checked 
          ? `border-${PRIMARY_COLOR_CLASS}-500 ring-2 ring-${PRIMARY_COLOR_CLASS}-400 bg-${PRIMARY_COLOR_CLASS}-50 dark:bg-cocoa-700` 
          : 'border-clay-300 dark:border-cocoa-600 hover:border-clay-400 dark:hover:border-cocoa-500 bg-white dark:bg-cocoa-800'}
        ${className}
      `}
    >
      {/* --- FIX START: Main content container with flex-grow --- */}
      <div className="flex flex-grow items-center">
        {icon && <div className="mr-3 text-2xl text-cocoa-600 dark:text-clay-300">{icon}</div>}
        <div className="flex-grow">
          <span className="font-medium text-cocoa-800 dark:text-peach-100">{label}</span>
          {description && <p className="text-sm text-cocoa-500 dark:text-clay-300">{description}</p>}
        </div>
      </div>
      {/* --- FIX END --- */}

      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {/* FIX: Removed ml-4 to allow natural spacing, added flex-shrink-0 to prevent it from shrinking */}
      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${checked ? `border-${PRIMARY_COLOR_CLASS}-500 bg-${PRIMARY_COLOR_CLASS}-500` : 'border-cocoa-400 dark:border-cocoa-500'}`}>
          {checked && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
    </label>
  );
};

// --- END OF FILE components/RadioCard.tsx ---