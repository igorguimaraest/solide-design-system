import React, { useState } from 'react';
import { DashboardLayoutProps } from './DashboardLayout.types';
import { Sidebar } from '../../organisms/Sidebar';
import { Header } from '../../organisms/Header';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebarSections,
  headerUser,
  onSearchClick,
  onThemeToggle,
  currentTheme = 'light',
  children,
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-[var(--solide-surface-canvas)] text-solide-primary font-ui">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <div className={`${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 flex' : 'hidden lg:flex'} h-full shrink-0`}>
        <Sidebar
          sections={sidebarSections}
          isCompact={isCompact}
          onToggleCompact={() => setIsCompact(c => !c)}
        />
      </div>

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          user={headerUser}
          currentTheme={currentTheme}
          onThemeToggle={onThemeToggle}
          onSearchClick={onSearchClick}
          onMenuToggle={() => setMobileMenuOpen(o => !o)}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
