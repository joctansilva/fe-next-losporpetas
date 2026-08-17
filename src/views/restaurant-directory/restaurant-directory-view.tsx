import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { FilterBar } from '@/components/forms/filter-bar';
import { SearchInput } from '@/components/forms/search-input';
import { RestaurantCard } from '@/components/restaurant/restaurant-card';
import { buttonClassName } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';
import { CATEGORIES, NEIGHBORHOODS, PUBLISHED_RESTAURANTS, TAGS } from '@/fixtures/restaurants';
import { Icons } from '@/lib/icons';
import {
  applyFilters,
  buildDirectoryHref,
  hasActiveFilters,
  type RestaurantFilters,
} from '@/lib/restaurant-filters';
import { SUGGEST_CTA } from '@/lib/site';

/**
 * Diretório de restaurantes.
 *
 * ⚠️ **Fase 1: dados de `src/fixtures/` com filtro em memória.** Na Fase 2.5,
 * `applyFilters` é substituída pela RPC `search_restaurants(...)`, que devolve
 * o mesmo formato (itens + total + páginas) direto do Postgres. Nada além
 * destas linhas muda.
 *
 * Toda a página é Server Component. O único JavaScript é o `FormAutoSubmit`,
 * que apenas dispensa o clique em "Filtrar".
 */
export function RestaurantDirectoryView({ filters }: { filters: RestaurantFilters }) {
  const { items, total, totalPages, page } = applyFilters(PUBLISHED_RESTAURANTS, filters);
  const filtered = hasActiveFilters(filters);

  return (
    <Container as="div" className="flex flex-col gap-xl py-xl">
      <header className="flex flex-col items-center gap-lg border-b-2 border-on-background pb-lg">
        <div className="flex flex-col items-center gap-sm text-center">
          <h1 className="max-w-4xl text-display-xl leading-none">
            Restaurantes aprovados pelo Porpetas
          </h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant">
            Escolha uma categoria, procure pelo bairro ou descubra um lugar novo.
          </p>
        </div>

        <SearchInput defaultValue={filters.q} className="max-w-4xl" />

        <FilterBar
          filters={filters}
          categories={CATEGORIES}
          neighborhoods={NEIGHBORHOODS}
          tags={TAGS}
        />
      </header>

      {/* Contagem de resultados: `aria-live` avisa quem usa leitor de tela que
          a lista mudou — sem isso, o filtro parece não ter feito nada. */}
      <p aria-live="polite" className="font-mono text-label-mono text-on-surface-variant uppercase">
        {total === 0
          ? 'Nenhum restaurante encontrado'
          : `${total} ${total === 1 ? 'restaurante' : 'restaurantes'}`}
        {filtered && total > 0 && ' com esses filtros'}
      </p>

      {items.length === 0 ? (
        <EmptyState
          icon={Icons.search}
          title={filtered ? 'Nada com esses filtros' : 'Guia ainda em construção'}
          description={
            filtered
              ? 'Tente afrouxar a busca — ou indique o lugar que está faltando aqui.'
              : 'Em breve os primeiros restaurantes aprovados. Conhece um que precisa aparecer?'
          }
          action={
            <div className="flex flex-wrap justify-center gap-sm">
              {filtered && (
                <Link href="/restaurantes" className={buttonClassName({ variant: 'secondary' })}>
                  Limpar filtros
                </Link>
              )}
              <Link href={SUGGEST_CTA.href} className={buttonClassName({ variant: 'primary' })}>
                Indicar um lugar
              </Link>
            </div>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3 lg:gap-lg">
          {items.map((restaurant) => (
            <li key={restaurant.id} className="contents">
              <RestaurantCard restaurant={restaurant} variant="default" />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        buildHref={(target) => buildDirectoryHref({ ...filters, pagina: target })}
        className="border-t-2 border-on-background pt-lg"
      />
    </Container>
  );
}
