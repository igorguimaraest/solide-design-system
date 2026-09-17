import React from 'react';
import { Typography } from './Typography';
import { TypographyProps } from './Typography.types';

export default {
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['display', 'h1', 'h2', 'h3', 'body', 'body-sm', 'caption', 'mono']
    },
    tone: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'brand', 'danger', 'success', 'inverse']
    },
    weight: {
      control: { type: 'select' },
      options: ['regular', 'medium', 'semibold', 'bold']
    },
    tabularNums: { control: 'boolean' }
  },
};

export const Display = () => (
  <Typography variant="display">Tecnologia sólida, engenharia inteligente.</Typography>
);

export const Headings = () => (
  <div className="flex flex-col gap-4">
    <Typography variant="h1">H1 ? Inter Bold (32px)</Typography>
    <Typography variant="h2">H2 ? Inter Bold (24px)</Typography>
    <Typography variant="h3">H3 ? Inter Semibold (20px)</Typography>
  </div>
);

export const BodyAndCaption = () => (
  <div className="flex flex-col gap-2 max-w-prose">
    <Typography variant="body">
      A Solide constrói ecossistemas de software escaláveis e inteligência artificial para infraestrutura crítica.
    </Typography>
    <Typography variant="body-sm" tone="secondary">
      Texto de apoio com contraste matemático garantido de 5.2:1 (padrão WCAG AA).
    </Typography>
    <Typography variant="caption" tone="muted">
      Última sincronização: hoje às 14:32 BRT
    </Typography>
  </div>
);

export const TabularNumbers = () => (
  <div className="flex flex-col gap-2 font-mono max-w-xs p-4 bg-[var(--sld-surface-sunken)] rounded-md">
    <Typography variant="mono" tabularNums>R$ 1.849.200,00</Typography>
    <Typography variant="mono" tabularNums>R$   842.100,50</Typography>
    <Typography variant="mono" tabularNums>R$    12.450,00</Typography>
  </div>
);
