import React, { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

export default { title: 'Atoms/Radio', component: Radio };

export const States = () => {
  const [value, setValue] = useState('production');
  return (
    <RadioGroup value={value} onValueChange={setValue} aria-label="Ambiente">
      <Radio value="production" label="Produção" description="Cluster principal" />
      <Radio value="staging" label="Homologação" description="Testes integrados" />
      <Radio value="local" label="Local" disabled />
    </RadioGroup>
  );
};

export const Dark = () => <div data-theme="dark" className="bg-[var(--sld-surface-card)] p-6"><RadioGroup value="selected" onValueChange={() => {}} aria-label="Exemplo dark"><Radio value="selected" label="Selecionado" /></RadioGroup></div>;
