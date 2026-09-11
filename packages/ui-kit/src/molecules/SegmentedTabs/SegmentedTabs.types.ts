import React from 'react';

export interface SegmentedTabOption<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SegmentedTabsProps<T extends string = string> {
  options: SegmentedTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  idPrefix?: string;
}
