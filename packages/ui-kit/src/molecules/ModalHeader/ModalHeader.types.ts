import React from 'react';

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  showGrabber?: boolean;
  onClose?: () => void;
  className?: string;
}
