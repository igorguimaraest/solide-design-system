import React from 'react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';
import { Icon } from '../Icon';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: { type: 'select' }, options: ['solid', 'outline', 'ghost'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    tone: { control: { type: 'select' }, options: ['primary', 'secondary', 'danger', 'warning'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Default = (args: ButtonProps) => <Button {...args}>Salvar Alterações</Button>;

export const Secondary = () => <Button tone="secondary">Cancelar</Button>;

export const Outline = () => <Button variant="outline">Exportar Dados</Button>;

export const Ghost = () => <Button variant="ghost">Ver Detalhes</Button>;

export const Danger = () => <Button tone="danger">Excluir Registro</Button>;

export const Warning = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <Button tone="warning">Renovar Certificado (Default)</Button>
      <Button tone="warning" disabled>Renovar Certificado (Disabled)</Button>
    </div>
    <p className="text-sm text-[var(--sld-text-secondary)]">Interaja com os botões para verificar o hover e active.</p>
  </div>
);

export const Loading = () => <Button isLoading>Processando</Button>;

export const Disabled = () => <Button disabled>Desabilitado</Button>;

export const WithIcons = () => (
  <div className="flex items-center gap-3">
    <Button leftIcon={<Icon name="arrow-left" size="sm" />}>Voltar</Button>
    <Button rightIcon={<Icon name="arrow-right" size="sm" />}>Avançar</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex items-center gap-3">
    <Button size="sm">Pequeno (32px)</Button>
    <Button size="md">Médio (40px)</Button>
    <Button size="lg">Grande (48px)</Button>
  </div>
);
