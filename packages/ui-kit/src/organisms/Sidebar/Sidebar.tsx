import React from 'react';
import { SidebarProps } from './Sidebar.types';
import { Icon } from '../../atoms/Icon';

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  isCompact = false,
  onToggleCompact,
  className = '',
}) => {
  return (
    <aside
      className={`${isCompact ? 'w-[var(--sld-sidebar-w-compact)]' : 'w-[var(--sld-sidebar-w)]'} h-full bg-[var(--sld-surface-shell)] flex flex-col justify-between transition-all duration-[var(--sld-durationBase)] motion-reduce:transition-none select-none font-ui shrink-0 ${className}`}
    >
      <div className="flex flex-col pt-[var(--sld-app-shell-sidebar-padding-block-start)] pb-[var(--sld-app-shell-sidebar-padding-block-end)]">
        {sections.map((sec, idx) => (
          <div key={idx} className="mb-5 last:mb-0">
            {sec.title && !isCompact && (
              <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-wider text-solide-tertiary">
                {sec.title}
              </div>
            )}

            <nav className="flex flex-col gap-[var(--sld-app-shell-sidebar-gap)] px-[var(--sld-app-shell-sidebar-padding-inline)]">
              {sec.items.map(item => {
                const active = !!item.isActive;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    aria-current={active ? "page" : undefined}
                    aria-label={isCompact ? item.label : undefined}
                    title={isCompact ? item.label : undefined}
                    className={`relative flex items-center ${isCompact ? 'justify-center px-0' : 'justify-between px-3'} h-[var(--sld-sidebar-nav-h)] rounded-[var(--sld-radius-md)] text-sm font-medium transition-colors sld-focus-ring ${
                      active
                        ? 'bg-[var(--sld-selection-bg)] text-[var(--sld-selection-text)] font-semibold'
                        : 'text-solide-secondary hover:bg-[var(--sld-action-ghost-hover)] hover:text-solide-primary'
                    }`}
                  >
                    {/* Aba Indicadora T?til Solide */}
                    {active && (
                      <span
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-[3px] bg-[var(--sld-action-primary-bg)]"
                        aria-hidden="true"
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <Icon
                        name={item.icon}
                        size="md"
                        className={active ? 'text-[var(--sld-selection-text)]' : 'text-solide-tertiary'}
                      />
                      {!isCompact && <span>{item.label}</span>}
                    </div>

                    {!isCompact && item.badge !== undefined && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                          active
                            ? 'bg-[var(--sld-action-primary-bg)] text-[var(--sld-action-primary-text)]'
                            : 'bg-solide-surface-sunken text-solide-secondary'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {onToggleCompact && (
        <div className="p-3 border-t border-solide-subtle">
          <button
            type="button"
            onClick={onToggleCompact}
            className="w-full flex items-center justify-center p-2 rounded-[var(--sld-radius-md)] text-solide-tertiary hover:bg-[var(--sld-action-ghost-hover)] hover:text-solide-primary transition-colors sld-focus-ring"
            aria-label={isCompact ? 'Expandir barra lateral' : 'Recolher barra lateral'}
          >
            <Icon name={isCompact ? 'chevron-right' : 'chevron-down'} size="sm" />
            {!isCompact && <span className="ml-2 text-xs">Recolher Barra</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
