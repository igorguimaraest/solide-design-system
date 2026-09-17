import React from 'react';
import { Input } from './Input';
import { InputProps } from './Input.types';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    inputSize: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    isInvalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export const Default = (args: InputProps) => (
  <div className="max-w-sm">
    <Input placeholder="Digite seu e-mail corporativo..." {...args} />
  </div>
);

export const WithLeftIcon = () => (
  <div className="max-w-sm">
    <Input
      placeholder="Buscar projetos ou APIs..."
      leftIcon={
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      }
    />
  </div>
);

export const Invalid = () => (
  <div className="max-w-sm">
    <Input isInvalid defaultValue="email-invalido@dominio" aria-describedby="error-hint" />
    <span id="error-hint" className="text-xs text-[var(--sld-text-danger)] mt-1.5 block">
      Formato de e-mail corporativo inválido.
    </span>
  </div>
);

export const Disabled = () => (
  <div className="max-w-sm">
    <Input disabled defaultValue="API-KEY-0982-XXXX-PROD" />
  </div>
);

export const Sizes = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <Input inputSize="sm" placeholder="Input Pequeno (32px)" />
    <Input inputSize="md" placeholder="Input Médio (40px)" />
    <Input inputSize="lg" placeholder="Input Grande (48px)" />
  </div>
);
