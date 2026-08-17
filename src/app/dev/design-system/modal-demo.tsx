'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';

type OpenSize = 'sm' | 'md' | 'lg' | null;

/**
 * Demonstração do Modal — única ilha client desta página.
 *
 * Valida o critério de pronto da Fase 0.5: o modal precisa ser operável só com
 * teclado (Tab preso dentro, Esc fecha, foco volta ao gatilho).
 */
export function ModalDemo() {
  const [open, setOpen] = useState<OpenSize>(null);

  return (
    <>
      <div className="flex flex-wrap gap-md">
        <Button variant="secondary" onClick={() => setOpen('sm')}>
          Modal sm
        </Button>
        <Button onClick={() => setOpen('md')}>Indicar um lugar (md)</Button>
        <Button variant="secondary" onClick={() => setOpen('lg')}>
          Modal lg
        </Button>
      </div>

      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        size={open ?? 'md'}
        title="Indicar um lugar"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(null)}>
              Cancelar
            </Button>
            <Button onClick={() => setOpen(null)}>Enviar sugestão</Button>
          </>
        }
      >
        <div className="flex flex-col gap-md">
          <p className="text-body-md text-on-surface-variant">
            Manda a sugestão. O Porpetas avalia e, se aprovar, entra no guia.
          </p>

          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <Input
              id="demo-nome"
              label="Nome do restaurante"
              required
              placeholder="Ex.: Hamburgueria Fumaça"
            />
            <Input id="demo-bairro" label="Bairro" hint="Se não souber o nome exato, tudo bem." />
          </div>

          <Textarea id="demo-motivo" label="Por que vale a visita?" rows={3} />
        </div>
      </Modal>
    </>
  );
}
