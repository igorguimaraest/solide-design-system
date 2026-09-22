import React from 'react';

export type AlertTone = 'success' | 'warning' | 'danger' | 'info';

export type AlertProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  tone: AlertTone;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  open?: boolean;
  onDismiss?: () => void;
};
