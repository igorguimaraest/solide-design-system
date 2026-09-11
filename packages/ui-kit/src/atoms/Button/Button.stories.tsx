import React from 'react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: { type: 'select' }, options: ['solid', 'outline', 'ghost'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    tone: { control: { type: 'select' }, options: ['primary', 'secondary', 'danger'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Default = (args: ButtonProps) => <Button {...args}>Salvar Altera??es</Button>;

export const Secondary = () => <Button tone="secondary">Cancelar</Button>;

export const Outline = () => <Button variant="outline">Exportar Dados</Button>;

export const Ghost = () => <Button variant="ghost">Ver Detalhes</Button>;

export const Danger = () => <Button tone="danger">Excluir Registro</Button>;

export const Loading = () => <Button isLoading>Processando</Button>;

export const Disabled = () => <Button disabled>Desabilitado</Button>;

export const WithIcons = () => (
  <div className="flex items-center gap-3">
    <Button leftIcon={<span>?</span>}>Voltar</Button>
    <Button rightIcon={<span>?</span>}>Avan?ar</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex items-center gap-3">
    <Button size="sm">Pequeno (32px)</Button>
    <Button size="md">M?dio (40px)</Button>
    <Button size="lg">Grande (48px)</Button>
  </div>
);
