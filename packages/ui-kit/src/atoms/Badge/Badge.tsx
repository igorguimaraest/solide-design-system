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
      container: 'bg-[var(--solide-color-success-50)] text-[var(--solide-color-success-700)] border-[var(--solide-color-success-200)]',
      dot: 'bg-[var(--solide-color-success-600)]'
    },
    warning: {
      container: 'bg-[var(--solide-color-warning-50)] text-[var(--solide-color-warning-700)] border-[var(--solide-color-warning-200)]',
      dot: 'bg-[var(--solide-color-warning-600)]'
    },
    error: {
      container: 'bg-[var(--solide-color-error-50)] text-[var(--solide-color-error-700)] border-[var(--solide-color-error-200)]',
      dot: 'bg-[var(--solide-color-error-600)]'
    },
    info: {
      container: 'bg-[var(--solide-color-info-50)] text-[var(--solide-color-info-700)] border-[var(--solide-color-info-200)]',
      dot: 'bg-[var(--solide-color-info-600)]'
    },
    brand: {
      container: 'bg-[var(--solide-color-primary-50)] text-[var(--solide-color-primary-700)] border-[var(--solide-color-primary-200)]',
      dot: 'bg-[var(--solide-color-primary-600)]'
    },
    neutral: {
      container: 'bg-[var(--solide-color-neutral-100)] text-[var(--solide-color-neutral-700)] border-[var(--solide-color-neutral-200)]',
      dot: 'bg-[var(--solide-color-neutral-500)]'
    }
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'h-5 px-1.5 text-[11px] gap-1',
    md: 'h-[var(--sld-badge-h,22px)] px-[var(--sld-badge-px,8px)] text-[12px] gap-1.5'
  };

  const config = toneClasses[tone];

  return (
    <span
      className={`inline-flex items-center font-medium font-ui rounded-[var(--sld-radius-full,9999px)] border ${config.container} ${sizeClasses[size]} ${className}`}
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
