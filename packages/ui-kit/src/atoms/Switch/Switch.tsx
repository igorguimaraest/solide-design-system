import React, { useId } from 'react';
import { SwitchProps } from './Switch.types';

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  size = 'default',
  label,
  description,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? `sld-switch-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const compact = size === 'compact';
  const trackSize = compact ? 'h-4 w-7' : 'h-5 w-9';
  const thumbSize = compact ? 'h-3 w-3' : 'h-4 w-4';
  const thumbTranslate = compact ? 'translate-x-3' : 'translate-x-4';
  const stateClasses = disabled
    ? 'bg-[var(--sld-disabled-bg)] border-[var(--sld-border-subtle)]'
    : checked
      ? 'bg-[var(--sld-control-selected-bg)] border-[var(--sld-control-selected-border)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[var(--sld-control-selected-hover-bg)] group-active:[&&]:bg-[var(--sld-control-selected-active-bg)]'
      : 'bg-[var(--sld-border-default)] border-[var(--sld-border-default)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-[var(--sld-border-strong)]';
  const thumbColor = disabled
    ? 'bg-[var(--sld-disabled-fg)]'
    : checked
      ? 'bg-[var(--sld-control-selected-fg)]'
      : 'bg-[var(--sld-surface-card)]';

  return (
    <label className={`group inline-flex items-start gap-2.5 font-ui select-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        {...props}
        id={inputId}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-describedby={descriptionId}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="peer sr-only"
      />
      <span data-part="control" aria-hidden="true" className={`relative mt-px inline-flex shrink-0 rounded-full border transition-[background-color,border-color] duration-[var(--sld-durationBase)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none peer-focus-visible:outline peer-focus-visible:outline-[var(--focus-ring-width)] peer-focus-visible:outline-[var(--sld-action-focusRing)] peer-focus-visible:outline-offset-[var(--focus-ring-offset)] ${trackSize} ${stateClasses}`}>
        <span className={`absolute left-0.5 top-0.5 rounded-full shadow-[var(--sld-shadow-xs)] transition-[transform,background-color] duration-[var(--sld-durationBase)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none ${thumbSize} ${checked ? thumbTranslate : 'translate-x-0'} ${thumbColor}`} />
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className={`text-[13px] font-medium leading-[1.3] ${disabled ? 'text-[var(--sld-disabled-fg)]' : 'text-[var(--sld-text-primary)]'}`}>{label}</span>}
          {description && <span id={descriptionId} className={`text-[11.5px] leading-[1.3] ${disabled ? 'text-[var(--sld-disabled-fg)]' : 'text-[var(--sld-text-secondary)]'}`}>{description}</span>}
        </span>
      )}
    </label>
  );
};

Switch.displayName = 'Switch';
