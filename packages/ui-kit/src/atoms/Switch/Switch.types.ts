import type React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'defaultChecked' | 'onChange' | 'size'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  size?: 'default' | 'compact';
  label?: React.ReactNode;
  description?: React.ReactNode;
}
