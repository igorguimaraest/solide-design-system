import React from 'react';
import { EmptyStateProps } from './EmptyState.types';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search',
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto font-ui ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[var(--sld-surface-sunken)] border border-[var(--sld-border-default)] text-[var(--solide-text-muted)] flex items-center justify-center mb-4 shadow-xs">
        <Icon name={icon} size="lg" />
      </div>

      <Typography variant="h3" tone="primary" className="mb-2">
        {title}
      </Typography>

      <Typography variant="body-sm" tone="secondary" className="mb-6 leading-relaxed">
        {description}
      </Typography>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {actionLabel && (
          <Button onClick={onAction} tone="primary">
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && (
          <Button onClick={onSecondaryAction} variant="outline">
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
