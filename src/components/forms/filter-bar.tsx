import Form from 'next/form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Select } from '@/components/ui/select';
import type { PriceRange } from '@/domain/enums';
import type { Tag, Taxonomy } from '@/domain/restaurant';
import { priceLabel } from '@/domain/restaurant';
import {
  buildDirectoryHref,
  hasActiveFilters,
  SORT_LABEL,
  SORT_OPTIONS,
  type RestaurantFilters,
} from '@/lib/restaurant-filters';
import { FormAutoSubmit } from './form-auto-submit';

type FilterBarProps = {
  filters: RestaurantFilters;
  categories: Taxonomy[];
  neighborhoods: Taxonomy[];
  tags: Tag[];
};

const PRICE_OPTIONS: PriceRange[] = ['1', '2', '3', '4'];

/**
 * Barra de filtros do diretório.
 *
 * Duas mecânicas, ambas sem estado de React:
 *
 * - **Chips de categoria são `<Link>`.** Cada chip é um endereço; clicar é
 *   navegar. Indexável, compartilhável, sem JavaScript.
 * - **Selects vivem num `<Form>` do `next/form`.** Sem JS, é um formulário GET
 *   comum e funciona pelo botão "Filtrar". Com JS, o `next/form` faz navegação
 *   client-side e prefetch, e o `FormAutoSubmit` dispensa o clique.
 *
 * ⚠️ Os campos que não estão no formulário (busca e categoria, que vêm dos
 * chips e da barra de busca) entram como `<input type="hidden">`. Sem isso,
 * aplicar um filtro de bairro apagaria silenciosamente a categoria escolhida.
 *
 * `pagina` fica de fora de propósito: mudar filtro deve voltar para a página 1.
 */
export function FilterBar({ filters, categories, neighborhoods, tags }: FilterBarProps) {
  const showClear = hasActiveFilters(filters);

  return (
    <div className="flex flex-col gap-md">
      {/* Categorias — links, não botões */}
      <div className="flex flex-wrap justify-center gap-sm">
        <Chip
          href={buildDirectoryHref({ ...filters, categoria: null, pagina: 1 })}
          active={!filters.categoria}
        >
          Todos
        </Chip>

        {categories.map((category) => (
          <Chip
            key={category.id}
            href={buildDirectoryHref({ ...filters, categoria: category.slug, pagina: 1 })}
            active={filters.categoria === category.slug}
          >
            {category.name}
          </Chip>
        ))}
      </div>

      <Form action="/restaurantes" className="flex flex-wrap items-end justify-between gap-md">
        {/* Preserva o que não está nos selects. */}
        {filters.q && <input type="hidden" name="q" value={filters.q} />}
        {filters.categoria && <input type="hidden" name="categoria" value={filters.categoria} />}

        <div className="flex flex-wrap gap-sm">
          <Select
            id="filtro-bairro"
            name="bairro"
            label="Bairro"
            placeholder="Todos"
            defaultValue={filters.bairro ?? ''}
            options={neighborhoods.map((item) => ({ value: item.slug, label: item.name }))}
          />

          <Select
            id="filtro-preco"
            name="preco"
            label="Faixa de preço"
            placeholder="Qualquer"
            defaultValue={filters.preco ?? ''}
            options={PRICE_OPTIONS.map((range) => ({
              value: range,
              label: priceLabel(range) ?? range,
            }))}
          />

          <Select
            id="filtro-tag"
            name="tag"
            label="Tipo de experiência"
            placeholder="Qualquer"
            defaultValue={filters.tag ?? ''}
            options={tags
              .filter((tag) => tag.kind === 'experience')
              .map((tag) => ({ value: tag.slug, label: tag.name }))}
          />
        </div>

        <div className="flex flex-wrap items-end gap-sm">
          <Select
            id="filtro-ordenar"
            name="ordenar"
            label="Ordenar por"
            defaultValue={filters.ordenar}
            options={SORT_OPTIONS.map((option) => ({ value: option, label: SORT_LABEL[option] }))}
          />

          <Button type="submit" variant="secondary">
            Filtrar
          </Button>

          {showClear && (
            <Link
              href="/restaurantes"
              className="pb-sm font-mono text-label-mono text-primary underline underline-offset-4"
            >
              Limpar
            </Link>
          )}
        </div>

        <FormAutoSubmit />
      </Form>
    </div>
  );
}
