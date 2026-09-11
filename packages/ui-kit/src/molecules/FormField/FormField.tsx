import React from 'react';
import { FormFieldProps } from './FormField.types';

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  hint,
  error,
  isRequired = false,
  children,
  className = '',
}) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const childWithProps = React.cloneElement(children, {
    id,
    isInvalid: !!error,
    'aria-describedby': describedBy,
    required: isRequired,
  });

  return (
    <div className={`flex flex-col gap-1.5 w-full font-sans ${className}`}>
      <label
        htmlFor={id}
        className="text-xs font-medium text-[var(--solide-text-primary)] select-none flex items-center justify-between"
      >
        <span>
          {label}
          {isRequired && (
            <span className="text-[var(--solide-feedback-error)] ml-0.5" aria-hidden="true">*</span>
          )}
        </span>
        {hint && (
          <span id={hintId} className="text-[11px] font-normal text-[var(--solide-text-muted)]">
            {hint}
          </span>
        )}
      </label>

      {childWithProps}

      {error && (
        <span
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs text-[var(--solide-feedback-error)] font-medium mt-0.5 flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';
