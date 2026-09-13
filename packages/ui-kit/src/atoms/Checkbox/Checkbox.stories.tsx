import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

export default { title: 'Atoms/Checkbox', component: Checkbox };

export const States = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <Checkbox checked={checked} onCheckedChange={setChecked} label="Backup em nuvem" description="Snapshot criptografado diário" />
      <Checkbox checked={false} indeterminate onCheckedChange={() => {}} label="Seleção parcial" description="14 de 28 itens selecionados" />
      <Checkbox checked={false} onCheckedChange={() => {}} label="Não selecionado" />
      <Checkbox checked onCheckedChange={() => {}} disabled label="Selecionado e desabilitado" />
    </div>
  );
};

export const Dark = () => <div data-theme="dark" className="bg-[var(--sld-surface-card)] p-6"><Checkbox checked onCheckedChange={() => {}} label="Controle selecionado" /></div>;
