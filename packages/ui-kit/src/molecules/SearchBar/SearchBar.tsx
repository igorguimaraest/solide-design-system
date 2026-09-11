import React, { useState } from 'react';
import { SearchBarProps } from './SearchBar.types';
import { Icon } from '../../atoms/Icon';

export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  defaultValue = '',
  placeholder = 'Buscar...',
  shortcutKey = 'Ctrl+K',
  onChange,
  onClear,
  onSearch,
  className = '',
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onClear?.();
    onChange?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(currentValue);
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className={`relative inline-flex items-center w-full max-w-md font-ui ${className}`}>
      <span className="absolute left-3 flex items-center justify-center text-[var(--solide-text-muted)] pointer-events-none" aria-hidden="true">
        <Icon name="search" size="sm" />
      </span>

      <input
        type="text"
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full h-9 pl-9 pr-16 bg-[var(--solide-surface-base)] text-sm text-[var(--solide-text-primary)] placeholder-[var(--solide-text-muted)] rounded-[var(--sld-radius-md,8px)] border border-[var(--solide-border-strong)] outline-none focus:border-[var(--solide-action-focusRing)] focus:ring-2 focus:ring-[rgba(51,78,172,0.15)] transition-colors disabled:bg-[var(--solide-surface-sunken)]"
        aria-label={placeholder}
      />

      <div className="absolute right-2.5 flex items-center gap-1">
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded text-[var(--solide-text-muted)] hover:text-[var(--solide-text-primary)] hover:bg-[var(--sld-action-ghost-hover,rgba(15,23,42,0.05))] transition-colors"
            aria-label="Limpar busca"
          >
            <Icon name="x" size="sm" />
          </button>
        )}
        {shortcutKey && (
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--solide-text-muted)] bg-[var(--solide-surface-sunken)] border border-[var(--solide-border-default)] rounded shadow-xs select-none pointer-events-none">
            {shortcutKey}
          </kbd>
        )}
      </div>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
