import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { Badge } from '../../atoms/Badge';

export default {
  title: 'Organisms/DataTable',
  component: DataTable,
};

interface Transaction {
  id: string;
  client: string;
  service: string;
  status: 'active' | 'warning' | 'error';
  amount: string;
}

const SAMPLE_DATA: Transaction[] = [
  { id: 'SLD-8921', client: 'Apex AI Infraestrutura', service: 'Cluster GPU Dedicado', status: 'active', amount: 'R$ 38.400,00' },
  { id: 'SLD-8922', client: 'Banco Linear Seguros', service: 'API Gateway Resiliente', status: 'active', amount: 'R$ 14.800,00' },
  { id: 'SLD-8923', client: 'Fintech Quantum Pay', service: 'Pipeline de Liquida??o BACEN', status: 'warning', amount: 'R$ 62.150,00' },
  { id: 'SLD-8924', client: 'Nexus Log?stica Inteligente', service: 'Roteador IoT Tempo Real', status: 'error', amount: 'R$ 9.200,00' },
];

export const Default = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['SLD-8921']);
  const [page, setPage] = useState(1);

  const columns = [
    { key: 'id', header: 'C?digo', sortable: true },
    { key: 'client', header: 'Cliente / Organiza??o', sortable: true },
    { key: 'service', header: 'Servi?o Ativo' },
    {
      key: 'status',
      header: 'Status Operacional',
      render: (row: Transaction) => (
        <Badge tone={row.status === 'active' ? 'success' : row.status === 'warning' ? 'warning' : 'error'}>
          {row.status === 'active' ? 'Operacional' : row.status === 'warning' ? 'Sob Carga' : 'Falha'}
        </Badge>
      )
    },
    { key: 'amount', header: 'Volume Mensal', isNumeric: true, sortable: true }
  ];

  return (
    <div className="p-6 bg-[var(--sld-surface-canvas)] rounded-xl">
      <DataTable
        columns={columns}
        data={SAMPLE_DATA}
        keyField="id"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        currentPage={page}
        totalCount={48}
        pageSize={10}
        onPageChange={setPage}
      />
    </div>
  );
};
