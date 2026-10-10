import React from 'react';
import { EmptyState } from './EmptyState';

export default {
  title: 'Organisms/EmptyState',
  component: EmptyState,
};

export const NoResults = () => (
  <div className="p-8 bg-[var(--sld-surface-base)] border border-dashed rounded-xl">
    <EmptyState
      icon="search"
      title="Nenhum registro encontrado"
      description="Não encontramos nenhuma API ou chave correspondente aos filtros ativos. Tente ajustar os termos de pesquisa."
      actionLabel="Limpar Filtros"
      onAction={() => alert('Filtros limpos')}
      secondaryActionLabel="Ver Documentação"
      onSecondaryAction={() => alert('Abrir docs')}
    />
  </div>
);

export const FirstProject = () => (
  <div className="p-8 bg-[var(--sld-surface-base)] border rounded-xl">
    <EmptyState
      icon="activity"
      title="Crie seu primeiro projeto Solide"
      description="Comece provisionando uma infraestrutura de IA ou configure um gateway de integração resiliente."
      actionLabel="+ Novo Projeto"
      onAction={() => alert('Novo projeto')}
    />
  </div>
);
