import React from 'react';
import { ModalHeader } from './ModalHeader';

export default {
  title: 'Molecules/ModalHeader',
  component: ModalHeader,
};

export const Default = () => (
  <div className="p-6 bg-[var(--sld-surface-card)] border border-[var(--sld-border-default)] rounded-xl max-w-lg shadow-md">
    <ModalHeader
      title="Nova Chave de API de Produção"
      subtitle="Configure o nível de privilégio e limite de requisições por segundo."
      onClose={() => alert('Fechar modal')}
    />
  </div>
);

export const DestructiveDialog = () => (
  <div className="p-6 bg-[var(--sld-surface-card)] border border-[var(--sld-border-danger)] rounded-xl max-w-lg shadow-md">
    <ModalHeader
      title="Confirmar Desativação do Cluster"
      subtitle="Esta ação desconectará todos os nós de inferência imediatamente."
      onClose={() => alert('Fechar')}
    />
  </div>
);
