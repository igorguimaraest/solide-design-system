import React from 'react';
import { Icon } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'arrow-right', 'arrow-left', 'chevron-down', 'check', 'search',
        'x', 'alert-triangle', 'info', 'check-circle', 'copy', 'trash',
        'menu', 'user', 'sun', 'moon', 'activity', 'filter'
      ]
    },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg', 24, 32] }
  }
};

export const Default = () => <Icon name="search" size="md" />;

export const Sizes = () => (
  <div className="flex items-center gap-4 text-[var(--solide-text-primary)]">
    <Icon name="check-circle" size="sm" />
    <Icon name="check-circle" size="md" />
    <Icon name="check-circle" size="lg" />
    <Icon name="check-circle" size={24} />
    <Icon name="check-circle" size={32} />
  </div>
);

export const SemanticGallery = () => (
  <div className="grid grid-cols-4 gap-4 max-w-sm text-sm">
    <div className="flex items-center gap-2 text-[var(--solide-text-success)]"><Icon name="check-circle" /> Sucesso</div>
    <div className="flex items-center gap-2 text-[var(--solide-text-warning)]"><Icon name="alert-triangle" /> Aviso</div>
    <div className="flex items-center gap-2 text-[var(--solide-text-danger)]"><Icon name="x" /> Erro</div>
    <div className="flex items-center gap-2 text-[var(--solide-text-brand)]"><Icon name="info" /> Info</div>
  </div>
);
