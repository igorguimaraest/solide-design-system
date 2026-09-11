import React from 'react';

export interface HeaderProps {
  brandTitle?: string;
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  onSearchClick?: () => void;
  onThemeToggle?: () => void;
  currentTheme?: 'light' | 'dark';
  onMenuToggle?: () => void;
  className?: string;
}
