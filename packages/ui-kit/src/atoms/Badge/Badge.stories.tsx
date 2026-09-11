import React from 'react';
import { Badge } from './Badge';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info', 'brand', 'neutral']
    },
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
    hasDot: { control: 'boolean' }
  }
};

export const Default = (args: BadgeProps) => <Badge {...args}>Ativo / Produ??o</Badge>;

export const StatusPills = () => (
  <div className="flex flex-wrap gap-2">
    <Badge tone="success">Operacional</Badge>
    <Badge tone="warning">Aten??o Q3</Badge>
    <Badge tone="error">Falha no Cluster</Badge>
    <Badge tone="info">Sincronizando</Badge>
    <Badge tone="brand">Solide v3.3</Badge>
    <Badge tone="neutral">Em Espera</Badge>
  </div>
);

export const WithoutDot = () => (
  <div className="flex gap-2">
    <Badge tone="brand" hasDot={false}>BETA</Badge>
    <Badge tone="neutral" hasDot={false}>V1.0.4</Badge>
  </div>
);
