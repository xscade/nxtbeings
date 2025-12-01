import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-sky-500/20 backdrop-blur-md border border-sky-500/30 text-white hover:bg-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]',
    secondary: 'bg-white text-purple-900 hover:bg-gray-50 shadow-lg shadow-black/5',
    outline: 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <button 
      className={cn(
        'rounded-full font-medium transition-all duration-200 active:scale-95 flex items-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

