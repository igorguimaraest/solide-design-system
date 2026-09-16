import React, { useState } from 'react';
import { DashboardLayoutProps } from './DashboardLayout.types';
import { Sidebar } from '../../organisms/Sidebar';
import { Header } from '../../organisms/Header';
import { Modal } from '../../molecules/Modal';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebarSections, headerUser, onSearchClick, onThemeToggle,
  currentTheme = 'light', children,
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleMenu = () => {
    if (window.matchMedia('(max-width: 1023px)').matches) setIsDrawerOpen(true);
    else setIsCompact(value => !value);
  };
  const mobileSections = sidebarSections.map(section => ({...section, items: section.items.map(item => ({...item, onClick: () => { item.onClick?.(); setIsDrawerOpen(false); }}))}));
  return (
    <div data-theme={currentTheme} className="sld-ui min-h-screen w-full flex flex-col bg-[var(--sld-surface-shell)] text-solide-primary font-ui">
      <Header user={headerUser} currentTheme={currentTheme} onThemeToggle={onThemeToggle} onSearchClick={onSearchClick} onMenuToggle={toggleMenu} />
      <div className="flex flex-1 min-w-0">
        <div className="hidden lg:flex shrink-0">
          <Sidebar sections={sidebarSections} isCompact={isCompact} onToggleCompact={() => setIsCompact(value => !value)} />
        </div>
        <main className="flex-1 min-w-0 mb-[var(--sld-app-shell-main-offset)] mr-[var(--sld-app-shell-main-offset)] p-[var(--sld-space-4)] lg:py-[var(--sld-app-shell-main-padding-block)] lg:px-[var(--sld-app-shell-main-padding-inline)] flex flex-col gap-[var(--sld-app-shell-main-gap)] bg-[var(--sld-surface-card)] rounded-r-[var(--sld-radius-xl)] shadow-[var(--sld-app-shell-main-shadow)]">
          {children}
        </main>
      </div>
      <Modal open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} ariaLabel="Navegação principal" variant="drawer-left">
        <button type="button" autoFocus className="sld-focus-ring p-3" onClick={() => setIsDrawerOpen(false)}>Fechar navegação</button>
        <Sidebar sections={mobileSections} />
      </Modal>
    </div>
  );
};
DashboardLayout.displayName = 'DashboardLayout';
