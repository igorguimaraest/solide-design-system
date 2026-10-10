export type ThemeMode = 'light' | 'dark';

export interface ThemeToggleProps {
  value: ThemeMode;
  onValueChange: (value: ThemeMode) => void;
  disabled?: boolean;
  'aria-label'?: string;
}