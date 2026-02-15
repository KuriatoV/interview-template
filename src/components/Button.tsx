import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' &&
          'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200',
        variant === 'secondary' &&
          'border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
