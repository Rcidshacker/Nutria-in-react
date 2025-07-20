// src/components/Button.tsx

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-transform duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:scale-[1.02] dark:ring-offset-cocoa-800',
  {
    variants: {
      variant: {
        primary: 'bg-melon-500 text-white hover:bg-melon-600 focus-visible:ring-melon-400',
        secondary: 'bg-spicy-amber-500 text-white hover:bg-spicy-amber-600 focus-visible:ring-spicy-amber-400',
        outline: 'border border-melon-500 text-melon-600 hover:bg-melon-50 dark:text-melon-400 dark:border-melon-400 dark:hover:bg-cocoa-700 focus-visible:ring-melon-500',
        ghost: 'text-melon-600 hover:bg-melon-100 dark:text-melon-400 dark:hover:bg-cocoa-700 focus-visible:ring-melon-500',
        link: 'text-melon-600 underline-offset-4 hover:underline dark:text-melon-400',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2.5',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth ? 'w-full' : '',
          variant === 'link' ? 'hover:scale-100 active:scale-100' : '' // Links shouldn't scale
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';