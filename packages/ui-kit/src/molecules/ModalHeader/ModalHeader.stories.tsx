import React from 'react';
import { ModalHeader } from './ModalHeader';

export default {
  title: 'Molecules/ModalHeader',
  component: ModalHeader,
};

export const Default = () => (
  <div className="p-6 bg-[var(--sld-surface-card)] border border-[var(--sld-border-default)] rounded-xl max-w-lg shadow-md">
    <ModalHeader
      title="Nova Chave de API de Produ??o"
      subtitle="Configure o n?vel de privil?gio e limite de requisi??es por segundo."
      onClose={() => alert('Fechar modal')}
    />
  </div>
);

export const DestructiveDialog = () => (
  <div className="p-6 bg-[var(--sld-surface-card)] border border-[var(--sld-border-danger)] rounded-xl max-w-lg shadow-md">
    <ModalHeader
      title="Confirmar Desativa??o do Cluster"
      subtitle="Esta a??o desconectar? todos os n?s de infer?ncia imediatamente."
      onClose={() => alert('Fechar')}
    />
  </div>
);
