import React from 'react';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'mono';

export type TypographyTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'brand'
  | 'danger'
  | 'success'
  | 'inverse';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TypographyProps<C extends React.ElementType = 'p'> = {
  as?: C;
  variant?: TypographyVariant;
  tone?: TypographyTone;
  weight?: TypographyWeight;
  tabularNums?: boolean;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'className' | 'children'>;
