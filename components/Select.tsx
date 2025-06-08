
import React from 'react';
import { PRIMARY_COLOR_CLASS } from '../constants'; // melon

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({ label, id, options, error, containerClassName = '', className, ...props }) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-cocoa-700 dark:text-clay-200 mb-1">{label}</label>}
      <select
        id={id}
        className={`w-full px-3 py-2 border border-clay-300 dark:border-cocoa-600 rounded-md shadow-sm focus:outline-none focus:ring-${PRIMARY_COLOR_CLASS}-500 focus:border-${PRIMARY_COLOR_CLASS}-500 dark:bg-cocoa-700 dark:text-peach-100 transition-colors duration-200 ease-in-out ${className} ${error ? 'border-red-500' : 'border-clay-300 dark:border-cocoa-600'}`}
        {...props}
      >
        <option value="" className="text-cocoa-500">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};