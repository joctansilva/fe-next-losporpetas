import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icons, ICON_SIZE } from '@/lib/icons';

type PaginationProps = {
  page: number;
  totalPages: number;
  /** Monta a URL de uma página, preservando os filtros da rota. */
  buildHref: (page: number) => string;
  className?: string;
};

const ITEM_CLASS =
  'ink-border flex size-11 items-center justify-center font-mono text-label-mono font-bold transition-colors';

/**
 * Paginação numérica.
 *
 * São `<Link>`, não `<button>`: cada página é um endereço. Isso mantém o
 * diretório indexável, compartilhável e sem JavaScript.
 *
 * O `<nav>` tem rótulo, cada link diz para onde vai, e a página atual é marcada
 * com `aria-current="page"` — cor sozinha não comunica seleção.
 */
export function Pagination({ page, totalPages, buildHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(page, totalPages);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="Paginação"
      className={cn('flex items-center justify-center gap-sm', className)}
    >
      {hasPrevious ? (
        <Link
          href={buildHref(page - 1)}
          rel="prev"
          aria-label="Página anterior"
          className={cn(ITEM_CLASS, 'bg-surface hover:bg-surface-container-high')}
        >
          <Icons.chevronLeft size={ICON_SIZE.md} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className={cn(ITEM_CLASS, 'bg-surface opacity-40')}>
          <Icons.chevronLeft size={ICON_SIZE.md} />
        </span>
      )}

      {pages.map((item, index) =>
        item === 'gap' ? (
          <span
            // A lacuna não é interativa nem informativa: some para o leitor de tela.
            aria-hidden="true"
            key={`gap-${index}`}
            className="px-xs font-mono text-label-mono text-on-surface-variant"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(item)}
            aria-label={`Página ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              ITEM_CLASS,
              item === page
                ? 'bg-primary text-on-primary'
                : 'bg-surface hover:bg-surface-container-high',
            )}
          >
            {item}
          </Link>
        ),
      )}

      {hasNext ? (
        <Link
          href={buildHref(page + 1)}
          rel="next"
          aria-label="Próxima página"
          className={cn(ITEM_CLASS, 'bg-surface hover:bg-surface-container-high')}
        >
          <Icons.chevronRight size={ICON_SIZE.md} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className={cn(ITEM_CLASS, 'bg-surface opacity-40')}>
          <Icons.chevronRight size={ICON_SIZE.md} />
        </span>
      )}
    </nav>
  );
}

/**
 * Janela de páginas com reticências: 1 … 4 [5] 6 … 20.
 * Mantém primeira, última e as vizinhas da atual.
 */
function getPageWindow(page: number, totalPages: number): Array<number | 'gap'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const result: Array<number | 'gap'> = [1];

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) result.push('gap');
  for (let current = start; current <= end; current += 1) result.push(current);
  if (end < totalPages - 1) result.push('gap');

  result.push(totalPages);
  return result;
}
