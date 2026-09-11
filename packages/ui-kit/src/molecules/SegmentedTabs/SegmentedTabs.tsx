import React, { useRef, useId } from 'react';
import { SegmentedTabsProps } from './SegmentedTabs.types';

export function SegmentedTabs<T extends string = string>({
  options,
  value,
  onChange,
  ariaLabel = 'Abas de navegação',
  fullWidth = true,
  size = 'md',
  className = '',
  idPrefix,
}: SegmentedTabsProps<T>) {
  const generatedId = useId();
  const prefix = idPrefix || `seg-tabs-${generatedId}`;
  const tablistRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledOptions = options.map((opt, idx) => ({ opt, idx })).filter(item => !item.opt.disabled);
    if (enabledOptions.length === 0) return;

    const currentPos = enabledOptions.findIndex(item => item.idx === currentIndex);
    let targetOption: { opt: typeof options[0]; idx: number } | undefined;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextPos = (currentPos + 1) % enabledOptions.length;
      targetOption = enabledOptions[nextPos];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevPos = (currentPos - 1 + enabledOptions.length) % enabledOptions.length;
      targetOption = enabledOptions[prevPos];
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetOption = enabledOptions[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      targetOption = enabledOptions[enabledOptions.length - 1];
    }

    if (targetOption) {
      onChange(targetOption.opt.id);
      const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      if (buttons && buttons[targetOption.idx]) {
        buttons[targetOption.idx].focus();
      }
    }
  };

  return (
    <div
      ref={tablistRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className={`
        flex items-center
        ${size === 'sm' ? 'p-[2px] gap-[2px]' : 'p-[3px] gap-[3px]'}
        bg-[var(--solide-bg-surface)] border border-[var(--solide-border-subtle)]
        rounded-[var(--r-sm,8px)]
        overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        ${fullWidth ? 'w-full' : 'inline-flex'}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {options.map((option, index) => {
        const isSelected = option.id === value;
        const tabId = `${prefix}-tab-${option.id}`;
        const panelId = `${prefix}-panel-${option.id}`;

        return (
          <button
            key={option.id}
            role="tab"
            id={tabId}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              inline-flex items-center justify-center gap-1.5
              ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs'}
              font-sans whitespace-nowrap select-none
              rounded-[var(--r-xs,6px)]
              transition-all duration-150 ease-out
              motion-reduce:transition-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--solide-ring-focus)] focus-visible:ring-offset-1
              disabled:opacity-[var(--solide-opacity-disabled,0.45)] disabled:cursor-not-allowed
              ${fullWidth ? 'flex-1 min-w-max text-center' : ''}
              ${
                isSelected
                  ? 'bg-[var(--solide-bg-surface-elevated)] text-[var(--solide-text-primary)] font-semibold shadow-xs'
                  : 'bg-transparent text-[var(--solide-text-secondary)] font-medium hover:text-[var(--solide-text-primary)]'
              }
            `.trim().replace(/\s+/g, ' ')}
          >
            {option.icon && <span className="inline-flex shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
            {option.badge !== undefined && (
              <span
                className={`
                  inline-flex items-center justify-center px-1.5 py-0.2
                  text-[10px] font-mono tabular-nums rounded-full
                  ${
                    isSelected
                      ? 'bg-[var(--solide-bg-surface)] text-[var(--solide-text-primary)]'
                      : 'bg-[var(--solide-bg-surface-elevated)] text-[var(--solide-text-secondary)]'
                  }
                `.trim().replace(/\s+/g, ' ')}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
