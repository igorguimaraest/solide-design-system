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
      className={`${isCompact ? 'w-[var(--sld-sidebar-w-compact,68px)]' : 'w-[var(--sld-sidebar-w,256px)]'} h-full min-h-screen bg-solide-surface border-r border-solide-subtle flex flex-col justify-between transition-all duration-200 select-none font-ui shrink-0 ${className}`}
    >
      <div className="flex flex-col py-4">
        {sections.map((sec, idx) => (
          <div key={idx} className="mb-5 last:mb-0">
            {sec.title && !isCompact && (
              <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-wider text-solide-tertiary">
                {sec.title}
              </div>
            )}

            <nav className="flex flex-col gap-0.5 px-2">
              {sec.items.map(item => {
                const active = !!item.isActive;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    title={isCompact ? item.label : undefined}
                    className={`relative flex items-center ${isCompact ? 'justify-center px-0' : 'justify-between px-3'} h-[var(--sld-sidebar-nav-h,40px)] rounded-[var(--sld-radius-md,8px)] text-sm font-medium transition-colors sld-focus-ring ${
                      active
                        ? 'bg-[var(--solide-color-primary-50)] text-[var(--solide-action-primary-bg)] font-semibold'
                        : 'text-solide-secondary hover:bg-[var(--sld-action-ghost-hover,rgba(15,23,42,0.05))] hover:text-solide-primary'
                    }`}
                  >
                    {/* Aba Indicadora T?til Solide */}
                    {active && (
                      <span
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-[3px] bg-[var(--solide-action-primary-bg)]"
                        aria-hidden="true"
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <Icon
                        name={item.icon}
                        size="md"
                        className={active ? 'text-[var(--solide-action-primary-bg)]' : 'text-solide-tertiary'}
                      />
                      {!isCompact && <span>{item.label}</span>}
                    </div>

                    {!isCompact && item.badge !== undefined && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                          active
                            ? 'bg-[var(--solide-action-primary-bg)] text-white'
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
            className="w-full flex items-center justify-center p-2 rounded-[var(--sld-radius-md,8px)] text-solide-tertiary hover:bg-[var(--sld-action-ghost-hover,rgba(15,23,42,0.05))] hover:text-solide-primary transition-colors sld-focus-ring"
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
