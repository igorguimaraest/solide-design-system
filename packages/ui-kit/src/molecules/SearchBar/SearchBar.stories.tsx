import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
};

export const Default = () => (
  <div className="p-4 bg-[var(--solide-surface-canvas)] rounded-lg">
    <SearchBar placeholder="Buscar transa??es, APIs ou documentos..." />
  </div>
);

export const Controlled = () => {
  const [term, setTerm] = useState('Solide');
  return (
    <div className="p-4 flex flex-col gap-2">
      <SearchBar
        value={term}
        onChange={setTerm}
        placeholder="Digite para filtrar..."
      />
      <span className="text-xs text-[var(--solide-text-secondary)]">
        Termo ativo: <strong>{term}</strong>
      </span>
    </div>
  );
};
