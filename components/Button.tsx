
import React from 'react';
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-cocoa-800 transform transition-all duration-200 ease-in-out";
  
  let variantStyles = "";
  let hoverActiveStyles = "hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-px";

  switch (variant) {
    case 'primary':
      variantStyles = `bg-${PRIMARY_COLOR_CLASS}-500 text-white hover:bg-${PRIMARY_COLOR_CLASS}-600 focus:ring-${PRIMARY_COLOR_CLASS}-400 dark:bg-${PRIMARY_COLOR_CLASS}-500 dark:hover:bg-${PRIMARY_COLOR_CLASS}-600`;
      break;
    case 'secondary':
      variantStyles = `bg-${ACCENT_COLOR_CLASS}-500 text-white hover:bg-${ACCENT_COLOR_CLASS}-600 focus:ring-${ACCENT_COLOR_CLASS}-400`;
      break;
    case 'outline':
      variantStyles = `border border-${PRIMARY_COLOR_CLASS}-500 text-${PRIMARY_COLOR_CLASS}-600 hover:bg-${PRIMARY_COLOR_CLASS}-50 dark:text-${PRIMARY_COLOR_CLASS}-400 dark:border-${PRIMARY_COLOR_CLASS}-400 dark:hover:bg-cocoa-700 focus:ring-${PRIMARY_COLOR_CLASS}-500`;
      break;
    case 'ghost':
      variantStyles = `text-${PRIMARY_COLOR_CLASS}-600 hover:bg-${PRIMARY_COLOR_CLASS}-100 dark:text-${PRIMARY_COLOR_CLASS}-400 dark:hover:bg-cocoa-700 focus:ring-${PRIMARY_COLOR_CLASS}-500`;
      break;
    case 'link':
      variantStyles = `text-${PRIMARY_COLOR_CLASS}-600 hover:underline dark:text-${PRIMARY_COLOR_CLASS}-400 focus:ring-${PRIMARY_COLOR_CLASS}-500`;
      hoverActiveStyles = ""; // Links typically don't scale or translate
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-sm";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-base";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-lg";
      break;
  }

  const widthStyles = fullWidth ? "w-full" : "";
  
  const disabledStyles = "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${disabledStyles} ${hoverActiveStyles} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
};