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
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!dialog || !backdrop || !content) return;

    if (open) {
      if (!dialog.open) {
        if (variant === 'drawer-left') {
          content.style.transform = 'translateX(-100%)';
          content.style.opacity = '0';
        } else {
          content.style.transform = 'scale(0.97)';
          content.style.opacity = '0';
        }
        backdrop.style.opacity = '0';
        dialog.showModal();
      }
      if (prefersReducedMotion) {
        backdrop.style.opacity = '1';
        content.style.opacity = '1';
        content.style.transform = 'none';
        return;
      }
      const bCtrl = animate(backdrop, { opacity: [0, 1] }, { duration: 0.2 });
      const cCtrl = variant === 'drawer-left'
        ? animate(content, { opacity: [0, 1], x: ['-100%', '0%'] }, { type: 'tween', duration: 0.18, ease: [0.16, 1, 0.3, 1] })
        : animate(content, { opacity: [0, 1], scale: [0.97, 1] }, spring.gentle);
      return () => {
        bCtrl.stop();
        cCtrl.stop();
      };
    }

    if (!dialog.open) return;
    if (prefersReducedMotion) {
      dialog.close();
      return;
    }
    
    const bCtrl = animate(backdrop, { opacity: 0 }, { duration: 0.2 });
    const cCtrl = variant === 'drawer-left'
      ? animate(content, { opacity: 0, x: '-100%' }, { type: 'tween', duration: 0.18, ease: [0.16, 1, 0.3, 1] })
      : animate(content, { opacity: 0, scale: 0.97 }, spring.gentle);
      
    void Promise.all([bCtrl, cCtrl]).then(() => {
      if (dialog.open) dialog.close();
      backdrop.style.opacity = '';
      content.style.opacity = '';
      content.style.transform = '';
    });
    
    return () => {
      bCtrl.stop();
      cCtrl.stop();
    };
  }, [open, prefersReducedMotion, variant]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="p-0 m-0 border-0 w-dvw h-dvh max-w-none max-h-none bg-transparent backdrop:bg-transparent overflow-hidden"
    >
      <div 
        ref={backdropRef}
        className="fixed inset-0 bg-[var(--sld-surface-overlay)]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        className={`fixed ${variant === 'drawer-left' ? 'top-0 left-0 h-dvh w-[var(--sld-sidebar-w)]' : 'inset-0 m-auto h-fit w-fit max-w-full'} bg-[var(--sld-surface-shell)] text-solide-primary ${className}`}
      >
        {children}
      </div>
    </dialog>
  );
};

Modal.displayName = 'Modal';

