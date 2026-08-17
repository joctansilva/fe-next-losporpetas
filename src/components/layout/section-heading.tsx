import Link from 'next/link';
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  title: string;
  /** Nível real do heading no documento. O tamanho visual vem de `size`. */
  as?: 'h1' | 'h2' | 'h3';
  size?: 'display' | 'lg' | 'md';
  /** Link opcional à direita — o "Ver todos" dos layouts. */
  action?: { label: string; href: string };
  /** Linha de tinta sob o título, como na página do restaurante. */
  underline?: boolean;
  className?: string;
};

const SIZE_CLASS = {
  display: 'text-display-xl',
  lg: 'text-headline-lg',
  md: 'text-headline-md',
} as const;

/**
 * Título de seção com ação opcional à direita.
 *
 * ⚠️ `as` e `size` são propositalmente separados: o nível do heading é decidido
 * pela hierarquia do documento, nunca pelo tamanho que ele deve ter na tela.
 * Trocar `h2` por `h3` só porque "ficou grande demais" quebra a navegação de
 * quem usa leitor de tela.
 */
export function SectionHeading({
  title,
  as: Tag = 'h2',
  size = 'lg',
  action,
  underline = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-sm',
        underline && 'border-b-2 border-on-background pb-xs',
        className,
      )}
    >
      <Tag className={cn('leading-none', SIZE_CLASS[size])}>{title}</Tag>

      {action && (
        <Link
          href={action.href}
          className="font-mono text-label-mono font-bold text-primary underline transition-colors hover:text-on-background"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
