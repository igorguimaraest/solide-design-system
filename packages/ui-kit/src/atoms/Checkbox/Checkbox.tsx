import React, { useEffect, useId, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  indeterminate = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? `sld-checkbox-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = checked || indeterminate;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const selectedClasses = selected
    ? 'bg-[var(--sld-control-selected-bg)] border-[var(--sld-control-selected-border)] text-[var(--sld-control-selected-fg)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[var(--sld-control-selected-hover-bg)] group-active:[&&]:bg-[var(--sld-control-selected-active-bg)]'
    : 'bg-[var(--sld-surface-card)] border-[var(--sld-border-strong)] text-transparent [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-[var(--sld-text-secondary)]';

  const disabledClasses = disabled
    ? 'bg-[var(--sld-disabled-bg)] border-[var(--sld-border-subtle)] text-[var(--sld-disabled-fg)]'
    : selectedClasses;

  return (
    <label className={`group inline-flex items-start gap-2.5 font-ui select-none ${disabled ? 'cursor-not-allowed text-[var(--sld-disabled-fg)]' : 'cursor-pointer'} ${className}`}>
      <input
        {...props}
        ref={inputRef}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={descriptionId}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        data-part="control"
        aria-hidden="true"
        className={`mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--sld-radius-xs)] border transition-[background-color,border-color,color,transform] duration-[var(--sld-durationFast)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none peer-focus-visible:outline peer-focus-visible:outline-[var(--focus-ring-width)] peer-focus-visible:outline-[var(--sld-action-focusRing)] peer-focus-visible:outline-offset-[var(--focus-ring-offset)] ${disabledClasses}`}
      >
        {indeterminate ? (
          <span className="h-0.5 w-2 rounded-full bg-current" />
        ) : (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5 4 7.5 10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-[13px] font-medium leading-[1.3] text-[var(--sld-text-primary)] group-has-[:disabled]:text-[var(--sld-disabled-fg)]">{label}</span>}
          {description && <span id={descriptionId} className="text-[11.5px] leading-[1.3] text-[var(--sld-text-secondary)] group-has-[:disabled]:text-[var(--sld-disabled-fg)]">{description}</span>}
        </span>
      )}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
