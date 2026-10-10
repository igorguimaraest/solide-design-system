import React, { useState } from 'react';
import { Button } from '../../atoms/Button';
import { ModalHeader } from '../ModalHeader';
import { Modal } from './Modal';

export default { title: 'Molecules/Modal', component: Modal };

export function CenteredDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
      <Modal open={open} onClose={() => setOpen(false)} ariaLabel="Detalhes do registro" className="rounded-[var(--sld-radius-xl)] p-[var(--sld-space-4)]">
        <ModalHeader title="Detalhes do registro" subtitle="Informações de cadastro" onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
