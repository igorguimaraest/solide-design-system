import React from 'react';

export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  shortcutKey?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}
