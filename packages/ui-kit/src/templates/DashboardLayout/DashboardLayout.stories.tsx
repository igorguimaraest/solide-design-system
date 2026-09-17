import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Typography } from '../../atoms/Typography';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';

export default {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
};

export const CompleteAppShell = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarSections = [
    {
      title: 'Plataforma',
      items: [
        { id: 'overview', label: 'Visão Geral', icon: 'activity', isActive: activeTab === 'overview', onClick: () => setActiveTab('overview') },
        { id: 'nodes', label: 'Clusters de IA', icon: 'check-circle', badge: '6', isActive: activeTab === 'nodes', onClick: () => setActiveTab('nodes') },
        { id: 'keys', label: 'Chaves & Tokens', icon: 'copy', isActive: activeTab === 'keys', onClick: () => setActiveTab('keys') },
      ]
    },
    {
      title: 'Auditoria',
      items: [
        { id: 'logs', label: 'Logs de Execução', icon: 'filter', isActive: activeTab === 'logs', onClick: () => setActiveTab('logs') },
      ]
    }
  ];

  return (
    <DashboardLayout
      sidebarSections={sidebarSections}
      currentTheme={theme}
      onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      onSearchClick={() => alert('Abrir busca rápida')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h1">Painel Operacional de Telemetria</Typography>
            <Typography variant="body-sm" tone="secondary">
              Métricas de latência P99 e taxa de sucesso dos nós de inteligência artificial.
            </Typography>
          </div>
          <Button tone="primary">+ Provisionar Cluster</Button>
        </div>

        {/* Bento Grid KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-[var(--sld-surface-base)] border border-[var(--sld-border-default)] rounded-xl shadow-xs">
            <Typography variant="caption" tone="muted">LATÊNCIA P99</Typography>
            <Typography variant="h2" className="mt-1 font-mono">14.2 ms</Typography>
            <Badge tone="success" className="mt-2">Dentro do SLA</Badge>
          </div>
          <div className="p-5 bg-[var(--sld-surface-base)] border border-[var(--sld-border-default)] rounded-xl shadow-xs">
            <Typography variant="caption" tone="muted">THROUGHPUT GLOBAL</Typography>
            <Typography variant="h2" className="mt-1 font-mono">48.2k req/s</Typography>
            <Badge tone="brand" className="mt-2">Capacidade 74%</Badge>
          </div>
          <div className="p-5 bg-[var(--sld-surface-base)] border border-[var(--sld-border-default)] rounded-xl shadow-xs">
            <Typography variant="caption" tone="muted">CONFIABILIDADE</Typography>
            <Typography variant="h2" className="mt-1 font-mono">99.995%</Typography>
            <Badge tone="success" className="mt-2">Operacional</Badge>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
