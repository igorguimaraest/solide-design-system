import React, { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { spring } from '@solide/tokens/motion';
import { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  ariaLabel,
  variant = 'center',
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      if (prefersReducedMotion) {
        dialog.style.opacity = '';
        dialog.style.transform = '';
        return;
      }
      const controls = variant === 'drawer-left'
        ? animate(dialog, { opacity: [0, 1], x: ['-100%', '0%'] }, spring.default)
        : animate(dialog, { opacity: [0, 1], scale: [0.97, 1] }, spring.gentle);
      return () => controls.stop();
    }

    if (!dialog.open) return;
    if (prefersReducedMotion) {
      dialog.close();
      dialog.style.opacity = '';
      dialog.style.transform = '';
      return;
    }
    const controls = variant === 'drawer-left'
      ? animate(dialog, { opacity: 0, x: '-100%' }, spring.default)
      : animate(dialog, { opacity: 0, scale: 0.97 }, spring.gentle);
    void controls.then(() => {
      if (dialog.open) dialog.close();
      dialog.style.opacity = '';
      dialog.style.transform = '';
    });
    return () => controls.stop();
  }, [open, prefersReducedMotion, variant]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`${variant === 'drawer-left' ? 'm-0 h-dvh max-h-none w-[var(--sld-sidebar-w)] max-w-full' : 'm-auto max-w-full'} p-0 border-0 bg-[var(--sld-surface-shell)] text-solide-primary backdrop:bg-[var(--sld-surface-overlay)] ${className}`}
    >
      {children}
    </dialog>
  );
};

Modal.displayName = 'Modal';
