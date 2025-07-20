// src/components/Checkbox.tsx

import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className={`h-4 w-4 text-melon-500 border-clay-300 dark:border-cocoa-600 rounded focus:ring-melon-400 dark:bg-cocoa-700 dark:checked:bg-melon-500 ${className} ${error ? 'border-red-500' : ''}`}
          {...props}
        />
        <label htmlFor={id} className="ml-2 block text-sm text-cocoa-800 dark:text-clay-200">
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};