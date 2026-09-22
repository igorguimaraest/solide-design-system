import React, { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Alert } from './Alert';

export default {
  title: 'Molecules/Alert',
  component: Alert,
  argTypes: {
    tone: { control: { type: 'select' }, options: ['success', 'warning', 'danger', 'info'] },
    dismissible: { control: 'boolean' },
  },
};

export const Success = () => (
  <Alert
    tone="success"
    title="Conciliação bancária concluída"
    description="Todos os 142 lançamentos foram conciliados automaticamente sem divergências."
  />
);

export const WarningWithAction = () => (
  <Alert
    tone="warning"
    title="Certificado Digital A1 próximo do vencimento"
    description="Expira em 4 dias úteis. Renove a chave criptográfica para manter a emissão ininterrupta."
    action={<Button tone="warning" size="sm">Renovar Certificado</Button>}
  />
);

export const DangerWithAction = () => (
  <Alert
    tone="danger"
    title="Rejeição SEFAZ: Código 539"
    description="A nota fiscal já consta como autorizada na base estadual. Corrija a numeração para retransmitir."
    action={<Button tone="danger" size="sm">Corrigir e retransmitir</Button>}
  />
);

export const Info = () => (
  <Alert
    tone="info"
    title="Ambiente de Contingência SVC-AN ativo"
    description="O tráfego fiscal está roteado com redundância nacional."
  />
);

export const Dismissible = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Alert
        open={visible}
        dismissible
        tone="info"
        title="Sincronização concluída"
        description="Os dados foram atualizados há poucos instantes."
        onDismiss={() => setVisible(false)}
      />
      {!visible && <Button variant="ghost" onClick={() => setVisible(true)}>Mostrar alerta</Button>}
    </>
  );
};
