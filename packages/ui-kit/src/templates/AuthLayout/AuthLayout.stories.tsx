import React from 'react';
import { AuthLayout } from './AuthLayout';
import { FormField } from '../../molecules/FormField';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

export default {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
};

export const LoginScreen = () => (
  <AuthLayout
    title="Acessar Plataforma"
    subtitle="Entre com suas credenciais corporativas Solide."
    footerText="Não possui chave de acesso? Contate o administrador de infraestrutura."
  >
    <FormField id="auth-email" label="E-mail Corporativo" isRequired>
      <Input placeholder="seu.nome@solide.dev.br" />
    </FormField>
    <FormField id="auth-password" label="Senha de Acesso" isRequired>
      <Input type="password" placeholder="••••••••••••" />
    </FormField>
    <Button tone="primary" className="w-full mt-2">
      Entrar no Sistema
    </Button>
  </AuthLayout>
);
