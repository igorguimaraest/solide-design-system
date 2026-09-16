import React from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  variant?: 'center' | 'drawer-left';
  className?: string;
}
