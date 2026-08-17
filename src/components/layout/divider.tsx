import { cn } from '@/lib/cn';

type DividerProps = {
  /**
   * `solid` — linha de tinta de 2px, separa seções.
   * `thick` — faixa preenchida, separa blocos grandes (usada na home).
   * `dashed` — tracejada, separa conteúdo dentro de um card (tickets, listas).
   */
  variant?: 'solid' | 'thick' | 'dashed';
  className?: string;
};

/**
 * Divisor horizontal.
 *
 * É decoração, não estrutura: por isso `role="presentation"` e `aria-hidden`.
 * Separação semântica de conteúdo é papel de heading e landmark, não de linha.
 */
export function Divider({ variant = 'solid', className }: DividerProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        'w-full',
        variant === 'solid' && 'border-t-2 border-on-background',
        variant === 'thick' && 'h-2 border-t-2 border-on-background bg-on-background',
        variant === 'dashed' && 'ink-dashed',
        className,
      )}
    />
  );
}
