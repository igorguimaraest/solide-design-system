import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { spring } from '@solide/tokens/motion';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { AlertProps, AlertTone } from './Alert.types';

const toneStyles: Record<AlertTone, React.CSSProperties> = {
  success: { backgroundColor: 'var(--sld-status-success-bg)', borderColor: 'var(--sld-status-success-border)', color: 'var(--sld-status-success-text)' },
  warning: { backgroundColor: 'var(--sld-status-warning-bg)', borderColor: 'var(--sld-status-warning-border)', color: 'var(--sld-status-warning-text)' },
  danger: { backgroundColor: 'var(--sld-status-danger-bg)', borderColor: 'var(--sld-status-danger-border)', color: 'var(--sld-status-danger-text)' },
  info: { backgroundColor: 'var(--sld-status-info-bg)', borderColor: 'var(--sld-status-info-border)', color: 'var(--sld-status-info-text)' },
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
  open = true,
  onDismiss,
  className = '',
  ...props
}) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  const focusAfterDismissRef = useRef<HTMLElement | null>(null);
  const [rendered, setRendered] = useState(open);
  const showDismiss = dismissible && Boolean(onDismiss) && open;

  openRef.current = open;

  useEffect(() => {
    const alert = alertRef.current;

    if (open) {
      if (!rendered) {
        setRendered(true);
        return;
      }
      if (!alert || alert.style.opacity === '') return;

      const controls = animate(alert, { opacity: 1 }, spring.snappy);
      void controls.then(() => {
        if (openRef.current) alert.style.opacity = '';
      });
      return () => controls.stop();
    }

    if (!rendered || !alert) return;

    const controls = animate(alert, { opacity: 0 }, spring.snappy);
    void controls.then(() => {
      if (openRef.current) return;
      setRendered(false);
      alert.style.opacity = '';
      const focusTarget = focusAfterDismissRef.current;
      if (focusTarget?.isConnected) focusTarget.focus();
      focusAfterDismissRef.current = null;
    });
    return () => controls.stop();
  }, [open, rendered]);

  if (!rendered) return null;

  const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (document.activeElement === event.currentTarget) {
      const focusable = Array.from(document.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      const currentIndex = focusable.indexOf(event.currentTarget);
      focusAfterDismissRef.current = focusable
        .slice(currentIndex + 1)
        .find((element) => !alertRef.current?.contains(element)) ?? null;
    }
    onDismiss?.();
  };

  return (
    <div
      {...props}
      ref={alertRef}
      role={tone === 'success' || tone === 'info' ? 'status' : 'alert'}
      aria-hidden={!open}
      data-state={open ? 'open' : 'closing'}
      className={`flex items-start gap-[var(--sld-space-3)] rounded-[var(--sld-radius-md)] border p-[var(--sld-space-4)] ${className}`}
      style={toneStyles[tone]}
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
          onClick={handleDismiss}
        />
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
