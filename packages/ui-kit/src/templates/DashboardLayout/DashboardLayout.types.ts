import React from 'react';
import { NavSection } from '../../organisms/Sidebar/Sidebar.types';

export interface DashboardLayoutProps {
  sidebarSections: NavSection[];
  headerUser?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  onSearchClick?: () => void;
  onThemeToggle?: () => void;
  currentTheme?: 'light' | 'dark';
  children: React.ReactNode;
}
