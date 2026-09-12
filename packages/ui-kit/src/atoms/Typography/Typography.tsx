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
    'display': 'font-ui text-[length:var(--text-large-title)] leading-[var(--lh-large-title)] tracking-[var(--tracking-large-title)] font-[number:var(--weight-large-title)]',
    'h1': 'font-ui text-[length:var(--text-title1)] leading-[var(--lh-title1)] tracking-[var(--tracking-title1)] font-[number:var(--weight-title1)]',
    'h2': 'font-ui text-[length:var(--text-title2)] leading-[var(--lh-title2)] tracking-[var(--tracking-title2)] font-[number:var(--weight-title2)]',
    'h3': 'font-ui text-[length:var(--text-headline)] leading-[var(--lh-headline)] tracking-[var(--tracking-headline)] font-[number:var(--weight-headline)]',
    'body': 'font-ui text-[length:var(--text-body)] leading-[var(--lh-body)] tracking-[var(--tracking-body)] font-[number:var(--weight-body)]',
    'body-sm': 'font-ui text-[length:var(--text-body-ui)] leading-[var(--lh-body-ui)] tracking-[var(--tracking-body-ui)] font-[number:var(--weight-body-ui)]',
    'caption': 'font-ui text-[length:var(--text-caption)] leading-[var(--lh-caption)] tracking-[var(--tracking-caption)] font-[number:var(--weight-caption)]',
    'mono': 'font-mono text-[length:var(--text-dados)] leading-[var(--lh-dados)] tracking-[var(--tracking-dados)] font-[number:var(--weight-dados)]',
  };

  const toneClasses: Record<TypographyTone, string> = {
    primary: 'text-[var(--solide-text-primary)]',
    secondary: 'text-[var(--solide-text-secondary)]',
    muted: 'text-[var(--solide-text-muted)]',
    brand: 'text-[var(--sld-text-brand)]',
    danger: 'text-[var(--solide-feedback-error)]',
    success: 'text-[var(--solide-feedback-success)]',
    inverse: 'text-[var(--sld-text-inverse)]',
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
