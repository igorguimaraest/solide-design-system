import React from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { AlertProps, AlertTone } from './Alert.types';

const toneClasses: Record<AlertTone, string> = {
  success: 'bg-[var(--sld-status-success-bg)] border-[var(--sld-status-success-border)] text-[var(--sld-status-success-text)]',
  warning: 'bg-[var(--sld-status-warning-bg)] border-[var(--sld-status-warning-border)] text-[var(--sld-status-warning-text)]',
  danger: 'bg-[var(--sld-status-danger-bg)] border-[var(--sld-status-danger-border)] text-[var(--sld-status-danger-text)]',
  info: 'bg-[var(--sld-status-info-bg)] border-[var(--sld-status-info-border)] text-[var(--sld-status-info-text)]',
};

const toneIcons: Record<AlertTone, string> = {
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'circle-x',
  info: 'info',
};

export const Alert: React.FC<AlertProps> = ({
  tone,
  title,
  description,
  action,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const showDismiss = dismissible && Boolean(onDismiss);

  return (
    <div
      {...props}
      role={tone === 'success' || tone === 'info' ? 'status' : 'alert'}
      className={`flex items-start gap-[var(--sld-space-3)] rounded-[var(--sld-radius-md)] border p-[var(--sld-space-4)] ${toneClasses[tone]} ${className}`}
    >
      <Icon name={toneIcons[tone]} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="font-ui text-[length:var(--text-body-ui)] leading-[var(--lh-body-ui)] tracking-[var(--tracking-body-ui)] font-[number:var(--weight-body-ui)] font-semibold">
          {title}
        </div>
        {description && (
          <div className="mt-[var(--sld-space-1)] font-ui text-[length:var(--text-caption)] leading-[var(--lh-caption)] tracking-[var(--tracking-caption)] font-[number:var(--weight-caption)]">
            {description}
          </div>
        )}
        {action && <div className="mt-[var(--sld-space-2)]">{action}</div>}
      </div>
      {showDismiss && (
        <Button
          aria-label="Fechar alerta"
          leftIcon={<Icon name="x" size="sm" />}
          size="sm"
          variant="ghost"
          onClick={onDismiss}
        />
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
