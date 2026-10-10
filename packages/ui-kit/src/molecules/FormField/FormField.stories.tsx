import React from 'react';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';

export default {
  title: 'Molecules/FormField',
  component: FormField,
};

export const Default = () => (
  <div className="max-w-sm">
    <FormField id="company-name" label="Nome da Organização" isRequired>
      <Input placeholder="Ex: Solide Tecnologia Ltda" />
    </FormField>
  </div>
);

export const WithHint = () => (
  <div className="max-w-sm">
    <FormField
      id="api-endpoint"
      label="Endpoint de Produção"
      hint="Protocolo HTTPS obrigatório"
      isRequired
    >
      <Input defaultValue="https://api.solide.dev.br/v1" />
    </FormField>
  </div>
);

export const WithError = () => (
  <div className="max-w-sm">
    <FormField
      id="email-admin"
      label="E-mail do Administrador"
      isRequired
      error="O domínio corporativo precisa corresponder a @solide.com.br"
    >
      <Input defaultValue="igor@gmail.com" />
    </FormField>
  </div>
);
