import React, { forwardRef } from 'react';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  inputSize = 'md',
  isInvalid = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  id,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'h-8 text-xs px-2.5',
    md: 'h-10 text-sm px-3.5',
    lg: 'h-12 text-base px-4',
  }[inputSize];

  const borderClasses = isInvalid
    ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)] focus:ring-2 focus:ring-[var(--solide-error-surface)]'
    : 'border-[var(--border-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--solide-accent-ring)]';

  return (
    <div className="relative inline-flex w-full items-center">
      {leftIcon && (
        <span className="absolute left-3 flex items-center justify-center text-[var(--solide-text-muted)] pointer-events-none" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={isInvalid}
        aria-describedby={ariaDescribedBy}
        className={`w-full bg-[var(--solide-bg-surface)] text-[var(--solide-text-primary)] placeholder-[var(--solide-text-muted)] rounded-lg border transition-colors outline-none disabled:opacity-[var(--solide-opacity-disabled,0.45)] disabled:cursor-not-allowed ${sizeClasses} ${borderClasses} ${leftIcon ? 'pl-9' : ''} ${rightIcon ? 'pr-9' : ''} ${className}`}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 flex items-center justify-center text-[var(--solide-text-muted)] pointer-events-none" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
