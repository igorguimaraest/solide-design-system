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
    ? 'border-[var(--sld-status-danger-border)]'
    : 'border-[var(--sld-border-strong)] focus-visible:border-[var(--sld-action-focusRing)]';

  const focusClasses = 'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--sld-action-focusRing)] focus-visible:outline-offset-[var(--focus-ring-offset)]';

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
        className={`w-full bg-[var(--solide-bg-surface)] text-[var(--solide-text-primary)] placeholder-[var(--solide-text-muted)] rounded-lg border transition-colors outline-none disabled:bg-[var(--sld-disabled-bg)] disabled:text-[var(--sld-disabled-fg)] disabled:cursor-not-allowed ${sizeClasses} ${borderClasses} ${focusClasses} ${leftIcon ? 'pl-9' : ''} ${rightIcon ? 'pr-9' : ''} ${className}`}
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
