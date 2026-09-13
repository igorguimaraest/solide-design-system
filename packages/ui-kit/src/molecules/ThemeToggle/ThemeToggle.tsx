import React from 'react';
import { Icon } from '../../atoms/Icon';
import { ThemeToggleProps } from './ThemeToggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  value,
  onValueChange,
  disabled = false,
  'aria-label': ariaLabel = 'Alternar tema Claro e Escuro',
}) => {
  const isDark = value === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onValueChange(isDark ? 'light' : 'dark')}
      className="relative inline-flex shrink-0 items-center p-0 bg-transparent border-0 rounded-[var(--sld-radius-full)] cursor-pointer disabled:cursor-not-allowed sld-focus-ring"
    >
      <span
        aria-hidden="true"
        className={`relative inline-flex items-center justify-between w-[var(--sld-theme-toggle-track-w)] h-[var(--sld-theme-toggle-track-h)] px-[var(--sld-theme-toggle-track-px)] rounded-[var(--sld-radius-full)] border border-[var(--sld-border-subtle)] ${isDark ? 'bg-[var(--sld-surface-shell)] border-[var(--sld-border-strong)]' : 'bg-[var(--sld-border-default)]'} transition-[background-color,border-color,box-shadow] duration-[var(--sld-theme-toggle-duration-track)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none`}
      >
        <Icon name="sun" size="sm" className={`w-[var(--sld-theme-toggle-glyph-size)] h-[var(--sld-theme-toggle-glyph-size)] text-[var(--sld-text-muted)] transition-opacity duration-[var(--sld-theme-toggle-duration-glyph)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none ${isDark ? 'opacity-70' : 'opacity-0'}`} />
        <Icon name="moon" size="sm" className={`w-[var(--sld-theme-toggle-glyph-size)] h-[var(--sld-theme-toggle-glyph-size)] text-[var(--sld-text-muted)] transition-opacity duration-[var(--sld-theme-toggle-duration-glyph)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none ${isDark ? 'opacity-0' : 'opacity-70'}`} />
        <span className={`absolute top-[var(--sld-theme-toggle-thumb-inset-block)] left-[var(--sld-theme-toggle-thumb-inset-inline)] inline-flex items-center justify-center w-[var(--sld-theme-toggle-thumb-size)] h-[var(--sld-theme-toggle-thumb-size)] rounded-full bg-[var(--sld-surface-card)] text-[var(--sld-text-primary)] shadow-[var(--sld-shadow-xs)] transition-[transform,background-color] duration-[var(--sld-theme-toggle-duration-thumb)] [transition-timing-function:var(--sld-easingSnappy)] motion-reduce:transition-none ${isDark ? 'translate-x-[var(--sld-theme-toggle-thumb-translate)]' : 'translate-x-0'}`}>
          <Icon name={isDark ? 'moon' : 'sun'} size="sm" className="w-[var(--sld-theme-toggle-icon-size)] h-[var(--sld-theme-toggle-icon-size)]" />
        </span>
      </span>
    </button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';