import React from 'react';

export type IconSize = 'sm' | 'md' | 'lg' | number;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: IconSize;
  className?: string;
  'aria-label'?: string;
}
