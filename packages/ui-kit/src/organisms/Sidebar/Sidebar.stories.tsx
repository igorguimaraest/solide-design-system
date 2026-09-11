import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
};

export const Default = () => {
  const [activeId, setActiveId] = useState('dashboard');
  const [isCompact, setIsCompact] = useState(false);

  const sections = [
    {
      title: 'Plataforma',
      items: [
        { id: 'dashboard', label: 'Dashboard Geral', icon: 'activity', isActive: activeId === 'dashboard', onClick: () => setActiveId('dashboard') },
        { id: 'nodes', label: 'N?s de Infer?ncia', icon: 'check-circle', badge: '12', isActive: activeId === 'nodes', onClick: () => setActiveId('nodes') },
        { id: 'logs', label: 'Logs de Auditoria', icon: 'filter', isActive: activeId === 'logs', onClick: () => setActiveId('logs') },
      ]
    },
    {
      title: 'Governan?a',
      items: [
        { id: 'keys', label: 'Chaves de API', icon: 'copy', isActive: activeId === 'keys', onClick: () => setActiveId('keys') },
        { id: 'team', label: 'Time & Acessos', icon: 'user', isActive: activeId === 'team', onClick: () => setActiveId('team') },
      ]
    }
  ];

  return (
    <div className="h-[600px] flex bg-[var(--solide-surface-canvas)] border rounded-xl overflow-hidden">
      <Sidebar
        sections={sections}
        isCompact={isCompact}
        onToggleCompact={() => setIsCompact(c => !c)}
      />
      <div className="p-8 flex-1">
        <h2 className="text-xl font-bold font-display text-[var(--solide-text-primary)]">
          Se??o Ativa: {activeId}
        </h2>
      </div>
    </div>
  );
};
