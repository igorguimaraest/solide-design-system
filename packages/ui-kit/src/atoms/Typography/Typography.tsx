import React from 'react';
import { TypographyProps, TypographyVariant, TypographyTone, TypographyWeight } from './Typography.types';

export function Typography<C extends React.ElementType = 'p'>({
  as,
  variant = 'body',
  tone = 'primary',
  weight,
  tabularNums = false,
  children,
  className = '',
  ...props
}: TypographyProps<C>) {
  const Component = as || (
    variant === 'display' || variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'caption' ? 'span' :
    variant === 'mono' ? 'code' : 'p'
  );

  const variantClasses: Record<TypographyVariant, string> = {
    display: 'font-display text-4xl leading-tight tracking-tight font-bold',
    h1: 'font-display text-3xl leading-snug tracking-tight font-bold',
    h2: 'font-display text-2xl leading-normal tracking-tight font-semibold',
    h3: 'font-sans text-xl leading-normal font-semibold',
    body: 'font-sans text-base leading-relaxed',
    'body-sm': 'font-sans text-sm leading-normal',
    caption: 'font-sans text-xs leading-normal',
    mono: 'font-mono text-sm leading-normal',
  };

  const toneClasses: Record<TypographyTone, string> = {
    primary: 'text-[var(--solide-text-primary)]',
    secondary: 'text-[var(--solide-text-secondary)]',
    muted: 'text-[var(--solide-text-muted)]',
    brand: 'text-[var(--solide-text-primary)]',
    danger: 'text-[var(--solide-feedback-error)]',
    success: 'text-[var(--solide-feedback-success)]',
    inverse: 'text-[var(--solide-bg-canvas)]',
  };

  const weightClasses: Record<TypographyWeight, string> = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const customWeight = weight ? weightClasses[weight] : '';
  const numClass = tabularNums ? 'tabular-nums font-feature-settings-tnum' : '';

  return (
    <Component
      className={`${variantClasses[variant]} ${toneClasses[tone]} ${customWeight} ${numClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
