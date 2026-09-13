import React, { createContext, useContext, useId, useMemo } from 'react';
import { RadioGroupProps, RadioProps } from './Radio.types';

type RadioContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  name: string;
};

const RadioContext = createContext<RadioContextValue | null>(null);

export function RadioGroup<T extends string>({ value, onValueChange, disabled = false, name, 'aria-label': ariaLabel, className = '', children }: RadioGroupProps<T>) {
  const generatedName = useId();
  const groupName = name ?? `sld-radio-${generatedName}`;
  const contextValue = useMemo<RadioContextValue>(() => ({
    value,
    onValueChange: (next) => onValueChange(next as T),
    disabled,
    name: groupName,
  }), [disabled, groupName, onValueChange, value]);

  return (
    <RadioContext.Provider value={contextValue}>
      <div role="radiogroup" aria-label={ariaLabel} className={`flex flex-col gap-3 ${className}`}>{children}</div>
    </RadioContext.Provider>
  );
}

export function Radio<T extends string>({ value, disabled = false, label, description, id, className = '' }: RadioProps<T>) {
  const context = useContext(RadioContext);
  const generatedId = useId();
  if (!context) throw new Error('Radio must be used within RadioGroup');

  const inputId = id ?? `sld-radio-option-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const checked = context.value === value;
  const isDisabled = context.disabled || disabled;
  const stateClasses = isDisabled
    ? 'bg-[var(--sld-disabled-bg)] border-[var(--sld-border-subtle)] text-[var(--sld-disabled-fg)]'
    : checked
      ? 'bg-[var(--sld-control-selected-bg)] border-[var(--sld-control-selected-border)] text-[var(--sld-control-selected-fg)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[var(--sld-control-selected-hover-bg)] group-active:bg-[var(--sld-control-selected-active-bg)]'
      : 'bg-[var(--sld-surface-card)] border-[var(--sld-border-strong)] text-transparent [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-[var(--sld-text-secondary)]';

  return (
    <label className={`group inline-flex items-start gap-2.5 font-ui select-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        id={inputId}
        type="radio"
        name={context.name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        aria-describedby={descriptionId}
        onChange={() => context.onValueChange(value)}
        className="peer sr-only"
      />
      <span data-part="control" aria-hidden="true" className={`mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-[var(--sld-durationFast)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none peer-focus-visible:outline peer-focus-visible:outline-[var(--focus-ring-width)] peer-focus-visible:outline-[var(--sld-action-focusRing)] peer-focus-visible:outline-offset-[var(--focus-ring-offset)] ${stateClasses}`}>
        <span className={`h-1.5 w-1.5 rounded-full bg-current transition-transform duration-[var(--sld-durationFast)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className={`text-[13px] font-medium leading-[1.3] ${isDisabled ? 'text-[var(--sld-disabled-fg)]' : 'text-[var(--sld-text-primary)]'}`}>{label}</span>
        {description && <span id={descriptionId} className={`text-[11.5px] leading-[1.3] ${isDisabled ? 'text-[var(--sld-disabled-fg)]' : 'text-[var(--sld-text-secondary)]'}`}>{description}</span>}
      </span>
    </label>
  );
}
