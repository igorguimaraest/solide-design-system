import React from 'react';

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
  hasDot?: boolean;
  children: React.ReactNode;
}
