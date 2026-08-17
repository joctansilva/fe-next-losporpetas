'use client';

import { useEffect, useId, useRef } from 'react';
import { cn } from '@/lib/cn';
import { Icons, ICON_SIZE } from '@/lib/icons';

type ModalSize = 'sm' | 'md' | 'lg';

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: 'max-w-md', // 448px — confirmação, alerta
  md: 'max-w-2xl', // 672px — formulários (indicar um lugar, filtros)
  lg: 'max-w-4xl', // 896px — conteúdo denso, galeria
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Rodapé opcional para ações (ex.: botão de enviar). */
  footer?: React.ReactNode;
  size?: ModalSize;
  className?: string;
};

/**
 * Modal acessível construído sobre o `<dialog>` nativo.
 *
 * Escolhi o elemento nativo em vez de uma implementação própria porque
 * `showModal()` entrega de graça — e sem bug sutil — exatamente o que é difícil
 * de acertar na mão:
 *
 * - **foco preso** dentro do diálogo enquanto ele está aberto;
 * - **Esc fecha** (evento `cancel`);
 * - **foco devolvido** ao elemento que abriu, ao fechar;
 * - o resto da página fica inerte para leitores de tela;
 * - backdrop estilizável por `::backdrop`.
 *
 * O que precisa ser feito à mão está abaixo: travar o scroll do body e fechar
 * ao clicar fora.
 *
 * ⚠️ **Cuidado ao mexer no `display`.** O navegador esconde o diálogo fechado
 * com `dialog:not([open]) { display: none }`, que é estilo de UA — qualquer
 * `display` vindo de classe do autor ganha dele e o modal fechado aparece na
 * tela. Por isso o layout usa a variante `open:flex`, que só se aplica quando o
 * atributo `open` está presente.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Abre/fecha via API do elemento — `open` como atributo NÃO ativa o modo
  // modal (não prende foco, não cria backdrop). Só `showModal()` faz isso.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Trava o scroll do fundo enquanto aberto.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    /**
     * O jsx-a11y trata <dialog> como elemento não-interativo e reclama do
     * onClick sem um listener de teclado equivalente. É falso positivo aqui:
     * o fechamento por teclado já existe e é nativo (Esc → onCancel), além do
     * botão "Fechar" explícito. O clique no backdrop é um atalho de mouse que
     * duplica caminhos já acessíveis — adicionar um onKeyDown só para calar a
     * regra criaria um handler morto.
     */
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // `cancel` cobre o Esc; sem isto o diálogo fecharia sozinho e o estado
      // do React continuaria achando que está aberto.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      // Clique no backdrop: o alvo é o próprio <dialog> apenas quando o clique
      // cai fora do conteúdo, já que o conteúdo está nos filhos.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        'ink-border ink-shadow-lg m-auto w-[calc(100vw-2rem)] bg-surface p-0 text-on-surface',
        // `open:flex` e não `flex`: ver o aviso sobre display no comentário acima.
        'max-h-[min(90dvh,48rem)] open:flex open:flex-col',
        'backdrop:bg-on-background/70',
        SIZE_CLASS[size],
        className,
      )}
    >
      <header className="flex shrink-0 items-start justify-between gap-md border-b-2 border-on-background bg-surface-container-highest p-md">
        <h2 id={titleId} className="text-headline-md leading-none">
          {title}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="ink-border flex size-11 shrink-0 items-center justify-center bg-surface transition-colors hover:bg-primary hover:text-on-primary"
        >
          <Icons.close size={ICON_SIZE.md} aria-hidden="true" />
        </button>
      </header>

      {/* min-h-0 é o que permite o filho encolher e rolar dentro do flex. */}
      <div className="min-h-0 flex-1 overflow-y-auto p-md">{children}</div>

      {footer && (
        <footer className="flex shrink-0 flex-wrap justify-end gap-sm border-t-2 border-on-background bg-surface-container-low p-md">
          {footer}
        </footer>
      )}
    </dialog>
  );
}
