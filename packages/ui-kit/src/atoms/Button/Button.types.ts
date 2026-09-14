import React from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTone = 'primary' | 'secondary' | 'danger' | 'warning';

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  shape?: 'rounded' | 'pill';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
};

export type StandardButtonProps = BaseButtonProps & {
  tone?: 'primary' | 'secondary' | 'danger';
  variant?: ButtonVariant;
};

export type WarningButtonProps = BaseButtonProps & {
  tone: 'warning';
  variant?: 'solid';
};

export type ButtonProps = StandardButtonProps | WarningButtonProps;
