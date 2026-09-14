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

  const solidClasses = {
    primary: 'bg-[var(--sld-action-primary-bg)] text-[var(--sld-action-primary-text)] enabled:hover:bg-[var(--sld-action-primary-hover)] enabled:active:bg-[var(--sld-action-primary-active)]',
    secondary: 'bg-[var(--sld-action-secondary-bg)] text-[var(--sld-action-secondary-text)] border border-[var(--sld-border-strong)] enabled:hover:bg-[var(--sld-action-secondary-hover)] enabled:active:bg-[var(--sld-action-secondary-active)]',
    danger: 'bg-[var(--sld-action-danger-bg)] text-[var(--sld-action-danger-text)] enabled:hover:bg-[var(--sld-action-danger-hover)] enabled:active:bg-[var(--sld-action-danger-active)]',
    warning: 'bg-[var(--sld-action-warning-bg)] text-[var(--sld-action-warning-text)] enabled:hover:bg-[var(--sld-action-warning-hover)] enabled:active:bg-[var(--sld-action-warning-active)]',
  };
  const subtleClasses = tone === 'danger'
    ? 'text-[var(--sld-status-danger-text)] border-[var(--sld-status-danger-border)] enabled:hover:bg-[var(--sld-status-danger-bg)] enabled:active:bg-[var(--sld-status-danger-bg)]'
    : 'text-[var(--sld-text-primary)] border-[var(--sld-border-strong)] enabled:hover:bg-[var(--sld-action-ghost-hover)] enabled:active:bg-[var(--sld-action-ghost-active)]';
  const variantClasses = variant === 'solid' ? solidClasses[tone] : `bg-transparent ${variant === 'outline' ? 'border' : ''} ${subtleClasses}`;

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center font-medium font-sans ${shapeClass} transition-colors duration-[var(--sld-durationFast)] motion-reduce:transition-none relative select-none disabled:bg-[var(--sld-disabled-bg)] disabled:text-[var(--sld-disabled-fg)] disabled:border-[var(--sld-border-subtle)] disabled:cursor-not-allowed sld-focus-ring ${sizeClasses} ${variantClasses} ${className}`}
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
      <span className={`inline-flex items-center [gap:inherit] ${isLoading ? 'invisible' : ''}`}>
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
