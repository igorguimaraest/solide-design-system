import React from 'react';
import { createRoot } from 'react-dom/client';
import { Checkbox } from '../../packages/ui-kit/src/atoms/Checkbox/Checkbox';
import { Radio, RadioGroup } from '../../packages/ui-kit/src/atoms/Radio/Radio';
import { Switch } from '../../packages/ui-kit/src/atoms/Switch/Switch';
import '../../preview/style.css';

function Fixture() {
  return (
    <main>
      <Checkbox checked onCheckedChange={() => {}} label="Checkbox selecionado" />
      <Checkbox checked={false} indeterminate onCheckedChange={() => {}} label="Checkbox indeterminado" />
      <Checkbox checked={false} onCheckedChange={() => {}} label="Checkbox não selecionado" />
      <Checkbox checked onCheckedChange={() => {}} disabled label="Checkbox desabilitado" />

      <RadioGroup value="selected" onValueChange={() => {}} aria-label="Radio VC-02">
        <Radio value="selected" label="Radio selecionado" />
        <Radio value="default" label="Radio não selecionado" />
        <Radio value="disabled" label="Radio desabilitado" disabled />
      </RadioGroup>

      <Switch checked onCheckedChange={() => {}} label="Switch ligado" />
      <Switch checked={false} onCheckedChange={() => {}} label="Switch desligado" />
      <Switch checked onCheckedChange={() => {}} disabled label="Switch desabilitado" />
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Fixture />);
