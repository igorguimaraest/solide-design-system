import React from 'react';
import { BadgeProps, BadgeTone, BadgeSize } from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  tone = 'neutral',
  size = 'md',
  hasDot = true,
  children,
  className = '',
  ...props
}) => {
  const toneClasses: Record<BadgeTone, { container: string; dot: string }> = {
    success: {
      container: 'bg-[var(--sld-status-success-bg)] text-[var(--sld-status-success-text)] border-[var(--sld-status-success-border)]',
      dot: 'bg-[var(--sld-status-success-icon)]'
    },
    warning: {
      container: 'bg-[var(--sld-status-warning-bg)] text-[var(--sld-status-warning-text)] border-[var(--sld-status-warning-border)]',
      dot: 'bg-[var(--sld-status-warning-icon)]'
    },
    error: {
      container: 'bg-[var(--sld-status-danger-bg)] text-[var(--sld-status-danger-text)] border-[var(--sld-status-danger-border)]',
      dot: 'bg-[var(--sld-status-danger-icon)]'
    },
    info: {
      container: 'bg-[var(--sld-status-info-bg)] text-[var(--sld-status-info-text)] border-[var(--sld-status-info-border)]',
      dot: 'bg-[var(--sld-status-info-icon)]'
    },
    brand: {
      container: 'bg-[var(--sld-status-brand-bg)] text-[var(--sld-status-brand-text)] border-[var(--sld-status-brand-border)]',
      dot: 'bg-[var(--sld-status-brand-icon)]'
    },
    neutral: {
      container: 'bg-[var(--sld-status-neutral-bg)] text-[var(--sld-status-neutral-text)] border-[var(--sld-status-neutral-border)]',
      dot: 'bg-[var(--sld-status-neutral-icon)]'
    }
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'h-5 px-1.5 text-[11px] gap-1',
    md: 'h-[var(--sld-badge-h)] px-[var(--sld-badge-px)] text-[12px] gap-1.5'
  };

  const config = toneClasses[tone];

  return (
    <span
      className={`inline-flex items-center font-medium font-ui rounded-[var(--sld-radius-full)] border ${config.container} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {hasDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};

Badge.displayName = 'Badge';
