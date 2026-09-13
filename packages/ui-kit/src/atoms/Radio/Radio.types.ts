import type React from 'react';

export interface RadioGroupProps<T extends string = string> {
  value: T;
  onValueChange: (value: T) => void;
  disabled?: boolean;
  name?: string;
  'aria-label'?: string;
  className?: string;
  children: React.ReactNode;
}

export interface RadioProps<T extends string = string> {
  value: T;
  disabled?: boolean;
  label: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  className?: string;
}
