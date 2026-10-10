import React, { useState } from 'react';
import { Switch } from './Switch';

export default { title: 'Atoms/Switch', component: Switch };

export const States = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <Switch checked={checked} onCheckedChange={setChecked} label="Sincronização fiscal" description="Atualização automática" />
      <Switch checked onCheckedChange={() => {}} size="compact" label="Compacto" />
      <Switch checked={false} onCheckedChange={() => {}} label="Desligado" />
      <Switch checked onCheckedChange={() => {}} disabled label="Ligado e desabilitado" />
    </div>
  );
};

export const Dark = () => <div data-theme="dark" className="bg-[var(--sld-surface-card)] p-6"><Switch checked onCheckedChange={() => {}} label="Controle ligado" /></div>;
