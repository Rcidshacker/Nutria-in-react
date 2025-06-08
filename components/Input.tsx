
import React from 'react';
import { PRIMARY_COLOR_CLASS } from '../constants'; // melon

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, icon, containerClassName = '', className, ...props }) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-cocoa-700 dark:text-clay-200 mb-1">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input
          id={id}
          className={`w-full px-3 py-2 border border-clay-300 dark:border-cocoa-600 rounded-md shadow-sm focus:outline-none focus:ring-${PRIMARY_COLOR_CLASS}-500 focus:border-${PRIMARY_COLOR_CLASS}-500 dark:bg-cocoa-700 dark:text-peach-100 placeholder-cocoa-400 dark:placeholder-cocoa-500 transition-colors duration-200 ease-in-out ${icon ? 'pl-10' : ''} ${className} ${error ? 'border-red-500' : `border-clay-300 dark:border-cocoa-600`}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};