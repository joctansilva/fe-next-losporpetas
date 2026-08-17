import Form from 'next/form';
import { cn } from '@/lib/cn';
import { Icons, ICON_SIZE } from '@/lib/icons';

type SearchInputProps = {
  /** Preserva o termo atual ao recarregar a página filtrada. */
  defaultValue?: string | null;
  /** Filtros a manter ao buscar — entram como campos ocultos. */
  preserve?: Record<string, string | null>;
  placeholder?: string;
  className?: string;
};

/**
 * Busca do diretório.
 *
 * `next/form` sobre `/restaurantes`: sem JavaScript é um GET comum; com
 * JavaScript, navegação client-side e prefetch do resultado.
 *
 * Buscar **zera os outros filtros por padrão** — quem digita um nome quer achar
 * aquilo, não continuar preso a um recorte anterior. O que precisar sobreviver
 * passa por `preserve`.
 */
export function SearchInput({
  defaultValue,
  preserve,
  placeholder = 'Buscar restaurante ou bairro…',
  className,
}: SearchInputProps) {
  return (
    <Form action="/restaurantes" role="search" className={cn('relative w-full', className)}>
      {preserve &&
        Object.entries(preserve).map(
          ([key, value]) => value && <input key={key} type="hidden" name={key} value={value} />,
        )}

      <label htmlFor="busca-diretorio" className="sr-only">
        Buscar restaurante ou bairro
      </label>

      <Icons.search
        size={ICON_SIZE.xl}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-md -translate-y-1/2 text-on-surface-variant"
      />

      <input
        id="busca-diretorio"
        name="q"
        type="search"
        defaultValue={defaultValue ?? ''}
        autoComplete="off"
        placeholder={placeholder}
        className="w-full bg-surface-bright py-md pr-md pl-[3.5rem] font-mono text-body-lg text-on-surface uppercase transition-shadow ink-border placeholder:text-on-surface-variant focus:border-primary focus:shadow-[4px_4px_0_0_var(--color-primary)]"
      />
    </Form>
  );
}
