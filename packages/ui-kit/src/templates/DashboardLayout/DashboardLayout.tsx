import React, { useRef, useState } from 'react';
import { DashboardLayoutProps } from './DashboardLayout.types';
import { Sidebar } from '../../organisms/Sidebar';
import { Header } from '../../organisms/Header';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebarSections, headerUser, onSearchClick, onThemeToggle,
  currentTheme = 'light', children,
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const toggleMenu = () => {
    if (window.matchMedia('(max-width: 1023px)').matches) drawer.current?.showModal();
    else setIsCompact(value => !value);
  };
  const mobileSections = sidebarSections.map(section => ({...section, items: section.items.map(item => ({...item, onClick: () => { item.onClick?.(); drawer.current?.close(); }}))}));
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
      <dialog ref={drawer} aria-label="Navegação principal" className="m-0 h-dvh max-h-none w-[var(--sld-sidebar-w)] max-w-full p-0 border-0 bg-[var(--sld-surface-shell)] text-solide-primary backdrop:bg-[var(--sld-surface-overlay)]" onClick={event => { if(event.target === event.currentTarget) drawer.current?.close(); }}>
        <button type="button" autoFocus className="sld-focus-ring p-3" onClick={() => drawer.current?.close()}>Fechar navegação</button>
        <Sidebar sections={mobileSections} />
      </dialog>
    </div>
  );
};
DashboardLayout.displayName = 'DashboardLayout';
