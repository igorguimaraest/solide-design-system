import React, { forwardRef } from 'react';
import { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'solid',
  size = 'md',
  tone = 'primary',
  shape = 'rounded',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;

  // Size configurations adhering to Apple HIG touch targets (>=28px desktop, >=44px mobile touch)
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5 min-h-[32px] min-w-[28px]',
    md: 'h-10 px-4 text-sm gap-2 min-h-[40px]',
    lg: 'h-12 px-5 text-base gap-2.5 min-h-[44px]',
  }[size];

  const shapeClass = shape === 'pill' ? 'rounded-full' : 'rounded-lg';

  // Variant & Tone configurations consuming semantic tokens
  let variantClasses = '';
  if (variant === 'solid') {
    if (tone === 'primary') {
      variantClasses = 'bg-[var(--color-accent)] text-white hover:opacity-90 active:opacity-80 shadow-sm';
    } else if (tone === 'secondary') {
      variantClasses = 'bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] active:opacity-85';
    } else if (tone === 'danger') {
      variantClasses = 'bg-[var(--color-destructive)] text-white hover:opacity-90 active:opacity-80 shadow-sm';
    }
  } else if (variant === 'outline') {
    if (tone === 'danger') {
      variantClasses = 'bg-transparent border border-[var(--color-destructive)] text-[var(--color-destructive)] hover:bg-[var(--solide-error-surface)]';
    } else {
      variantClasses = 'bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--solide-accent-surface)]';
    }
  } else if (variant === 'ghost') {
    if (tone === 'danger') {
      variantClasses = 'bg-transparent text-[var(--color-destructive)] hover:bg-[var(--solide-error-surface)]';
    } else {
      variantClasses = 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--surface-secondary)]';
    }
  }

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center font-medium font-sans ${shapeClass} transition-all duration-150 relative select-none disabled:opacity-[var(--solide-opacity-disabled,0.45)] disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
      <span className={`inline-flex items-center gap-inherit ${isLoading ? 'invisible' : ''}`}>
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
