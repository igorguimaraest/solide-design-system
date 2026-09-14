import React from 'react';
import { ModalHeaderProps } from './ModalHeader.types';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  showGrabber = false,
  onClose,
  className = '',
}) => {
  return (
    <div className={`flex flex-col font-ui ${className}`}>
      {showGrabber && (
        <div
          className="w-9 h-1 rounded-full bg-[var(--border-secondary)] dark:bg-[var(--border-secondary)] mx-auto mb-3"
          aria-hidden="true"
        />
      )}
      <div className="flex items-start justify-between pb-4 border-b border-[var(--sld-border-default)]">
      <div className="flex flex-col gap-0.5">
        <Typography variant="h3" tone="primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body-sm" tone="secondary">
            {subtitle}
          </Typography>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar diálogo"
          className="p-1.5 rounded-[var(--sld-radius-md)] text-[var(--solide-text-muted)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[var(--solide-text-primary)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--sld-action-ghost-hover)] sld-focus-ring transition-colors"
        >
          <Icon name="x" size="md" />
        </button>
      )}
      </div>
    </div>
  );
};

ModalHeader.displayName = 'ModalHeader';
