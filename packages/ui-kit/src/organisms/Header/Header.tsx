import { logoLight, logoDark } from '../../assets/logos';
import React from 'react';
import { HeaderProps } from './Header.types';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';

export const Header: React.FC<HeaderProps> = ({
  brandTitle = 'Solide',
  user = { name: 'Igor Guimarães', role: 'Fundador / Engenharia' },
  onSearchClick,
  onThemeToggle,
  currentTheme = 'light',
  onMenuToggle,
  className = '',
}) => {
  return (
    <header className={`h-[var(--sld-header-h)] pl-[var(--sld-app-shell-header-padding-inline-start)] pr-[var(--sld-app-shell-header-padding-inline-end)] bg-[var(--sld-surface-shell)] flex items-center justify-between sticky top-0 z-40  font-ui ${className}`}>
      <div className="flex items-center gap-4 shrink-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-1.5 rounded-[var(--sld-radius-md)] text-solide-secondary hover:text-solide-primary hover:bg-[var(--sld-action-ghost-hover)] sld-focus-ring"
            aria-label="Alternar navegação"
          >
            <Icon name="menu" size="md" />
          </button>
        )}

        <div className="flex items-center gap-2.5 select-none">
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <img src={logoLight} alt="Solide" className="w-full h-full object-contain sld-logo-light" />
            <img src={logoDark} alt="Solide" className="w-full h-full object-contain sld-logo-dark" />
          </div>
          <Typography variant="h3" tone="primary" className="tracking-tight text-base">
            {brandTitle}
          </Typography>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {onSearchClick && (
          <button
            type="button"
            onClick={onSearchClick}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-solide-tertiary bg-solide-surface-sunken border border-solide-subtle rounded-[var(--sld-radius-md)] hover:border-solide-strong transition-colors sld-focus-ring"
          >
            <Icon name="search" size="sm" />
            <span>Buscar no sistema...</span>
            <kbd className="ml-2 font-mono px-1 py-0.5 bg-solide-surface border border-solide-subtle rounded text-[10px]">
              ?K
            </kbd>
          </button>
        )}

        {onThemeToggle && (
          <button
            type="button"
            onClick={onThemeToggle}
            aria-label={`Mudar para modo ${currentTheme === 'light' ? 'escuro' : 'claro'}`}
            className="p-2 rounded-[var(--sld-radius-md)] text-solide-secondary hover:text-solide-primary hover:bg-[var(--sld-action-ghost-hover)] sld-focus-ring transition-colors"
          >
            <Icon name={currentTheme === 'light' ? 'moon' : 'sun'} size="md" />
          </button>
        )}

        {user && (
          <div className="flex items-center gap-2.5 pl-2 border-l border-solide-subtle">
            <div className="w-8 h-8 rounded-full bg-solide-surface-elevated text-solide-primary flex items-center justify-center text-xs font-semibold select-none border border-solide-subtle">
              {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-solide-primary leading-none">
                {user.name}
              </span>
              <span className="text-[10px] text-solide-tertiary leading-tight mt-0.5">
                {user.role}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

Header.displayName = 'Header';
