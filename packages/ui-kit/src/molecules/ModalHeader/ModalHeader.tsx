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
          className="w-9 h-1 rounded-full bg-[var(--border-secondary,#E5E5EA)] dark:bg-[var(--border-secondary,#38383A)] mx-auto mb-3"
          aria-hidden="true"
        />
      )}
      <div className="flex items-start justify-between pb-4 border-b border-[var(--solide-border-default)]">
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
          aria-label="Fechar di?logo"
          className="p-1.5 rounded-[var(--sld-radius-md,8px)] text-[var(--solide-text-muted)] hover:text-[var(--solide-text-primary)] hover:bg-[var(--sld-action-ghost-hover,rgba(15,23,42,0.05))] sld-focus-ring transition-colors"
        >
          <Icon name="x" size="md" />
        </button>
      )}
      </div>
    </div>
  );
};

ModalHeader.displayName = 'ModalHeader';
