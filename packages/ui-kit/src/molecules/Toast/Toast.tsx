import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ToastProps, ToastTone } from './Toast.types';
import { Icon } from '../../atoms/Icon';

const toneIcons: Record<ToastTone, string> = {
  success: 'check',
  warning: 'alert-triangle',
  error: 'x',
  info: 'info',
};

const toneColors: Record<ToastTone, string> = {
  success: 'var(--solide-success, var(--sld-status-success-text))',
  warning: 'var(--solide-warning, var(--sld-status-warning-text))',
  error: 'var(--solide-error, var(--sld-status-danger-text))',
  info: 'var(--solide-info, var(--sld-status-info-text))',
};

export const Toast: React.FC<ToastProps> = ({
  id,
  tone = 'info',
  title,
  description,
  action,
  icon,
  onDismiss,
  duration = 4000,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration !== Infinity) {
      timeoutRef.current = setTimeout(() => {
        onDismiss(id);
      }, duration);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, id, onDismiss]);

  const handleAction = () => {
    if (action?.onClick) action.onClick();
    onDismiss(id);
  };

  const springConfig = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 28,
  };

  const toneBackgrounds: Record<string, string> = {
    success: 'var(--solide-success-surface)',
    warning: 'var(--solide-warning-surface)',
    error: 'var(--solide-error-surface)',
    info: 'var(--solide-info-surface)',
  };

  const toneBorders: Record<string, string> = {
    success: 'var(--solide-success-border)',
    warning: 'var(--solide-warning-border)',
    error: 'var(--solide-error-border)',
    info: 'var(--solide-info-border)',
  };

  const toneTexts: Record<string, string> = {
    success: 'var(--solide-success-text)',
    warning: 'var(--solide-warning-text)',
    error: 'var(--solide-error-text)',
    info: 'var(--solide-info-text)',
  };



  const progressVariants = {
    initial: { scaleX: 1 },
    animate: { scaleX: 0, transition: { duration: duration / 1000, ease: 'linear' as const } }
  };

  return (
    <motion.div
      layout="position"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.92 }}
      transition={prefersReducedMotion ? { duration: 0.2 } : springConfig}
      className="pointer-events-auto relative overflow-hidden flex items-start gap-3 rounded-[var(--sld-radius-md)] p-[13px_15px] shadow-[var(--sld-shadow-lg)] w-full max-w-[360px] border"
      style={{
        backgroundColor: toneBackgrounds[tone] || 'var(--sld-surface-raised)',
        borderColor: toneBorders[tone] || 'var(--sld-border-subtle)',
        color: toneTexts[tone] || 'var(--sld-text-primary)',
      }}
      role="status"
      aria-live="polite"
    >
      <div 
        className="flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ color: toneColors[tone] }}
      >
        <Icon name={icon || toneIcons[tone]} size="sm" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold leading-tight">
          {title}
        </div>
        {description && (
          <div className="text-[12px] mt-0.5 leading-snug opacity-90">
            {description}
          </div>
        )}
        {action && (
          <button
            type="button"
            onClick={handleAction}
            className="mt-2 rounded-[var(--sld-radius-sm)] px-[9px] py-[3px] text-[11px] font-semibold cursor-pointer transition-all duration-150 sld-focus-ring inline-flex items-center gap-1 opacity-85 hover:opacity-100 bg-transparent border border-current hover:bg-current hover:text-[var(--bg-primary,var(--surface-primary))] active:opacity-70 text-inherit"
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity sld-focus-ring -mt-1 -mr-1 p-1 rounded-sm"
        aria-label="Fechar"
      >
        <Icon name="x" size="sm" />
      </button>

      {duration !== Infinity && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={progressVariants}
          className="absolute bottom-0 left-0 h-[4px] w-full origin-left z-10"
          style={{ backgroundColor: toneColors[tone] }}
        />
      )}
    </motion.div>
  );
};

Toast.displayName = 'Toast';
