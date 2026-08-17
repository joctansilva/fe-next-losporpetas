import { PRICE_RANGE, type PriceRange } from '@/domain/enums';
import type { RestaurantListItem } from '@/domain/restaurant';

/**
 * Filtros do diretório — leitura e escrita de `searchParams`.
 *
 * ⚠️ **Filtro é estado de URL, não estado de React.** Consequências: o link é
 * compartilhável, o botão voltar funciona, o resultado é cacheável e a página
 * segue sendo Server Component. Nenhum `useState` participa disto.
 *
 * Funções puras de propósito: dá para testar sem montar componente nem subir
 * banco, e a mesma lógica serve à página, aos chips e à paginação.
 */

export const SORT_OPTIONS = ['recentes', 'nome'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const SORT_LABEL: Record<SortOption, string> = {
  recentes: 'Mais recentes',
  nome: 'Nome (A-Z)',
};

/** 24 por página, como definido em documentation/04-MAPA-DE-PAGINAS-E-FLUXOS.md §2.2. */
export const PAGE_SIZE = 24;

export type RestaurantFilters = {
  q: string | null;
  categoria: string | null;
  bairro: string | null;
  preco: PriceRange | null;
  tag: string | null;
  ordenar: SortOption;
  pagina: number;
};

export const EMPTY_FILTERS: RestaurantFilters = {
  q: null,
  categoria: null,
  bairro: null,
  preco: null,
  tag: null,
  ordenar: 'recentes',
  pagina: 1,
};

type RawParams = Record<string, string | string[] | undefined>;

function readParam(params: RawParams, key: string): string | null {
  const value = params[key];
  const single = Array.isArray(value) ? value[0] : value;
  const trimmed = single?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Lê `searchParams` para um objeto tipado.
 *
 * Tolerante de propósito: parâmetro desconhecido, valor inválido ou página
 * absurda caem no padrão em vez de quebrar a página. A URL é escrita por
 * qualquer um — inclusive por um bot testando `?pagina=-999`.
 */
export function parseFilters(params: RawParams): RestaurantFilters {
  const rawSort = readParam(params, 'ordenar');
  const rawPage = Number.parseInt(readParam(params, 'pagina') ?? '1', 10);
  const rawPrice = readParam(params, 'preco');

  return {
    q: readParam(params, 'q'),
    categoria: readParam(params, 'categoria'),
    bairro: readParam(params, 'bairro'),
    preco: PRICE_RANGE.includes(rawPrice as PriceRange) ? (rawPrice as PriceRange) : null,
    tag: readParam(params, 'tag'),
    ordenar: SORT_OPTIONS.includes(rawSort as SortOption) ? (rawSort as SortOption) : 'recentes',
    pagina: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
  };
}

/**
 * Monta a URL do diretório a partir dos filtros.
 *
 * Omite tudo que está no padrão — assim `/restaurantes` continua sendo
 * `/restaurantes`, e não `/restaurantes?ordenar=recentes&pagina=1`. URL limpa
 * importa: é ela que vai para o canonical e para o compartilhamento.
 */
export function buildDirectoryHref(filters: Partial<RestaurantFilters>): string {
  const params = new URLSearchParams();

  if (filters.q) params.set('q', filters.q);
  if (filters.categoria) params.set('categoria', filters.categoria);
  if (filters.bairro) params.set('bairro', filters.bairro);
  if (filters.preco) params.set('preco', filters.preco);
  if (filters.tag) params.set('tag', filters.tag);
  if (filters.ordenar && filters.ordenar !== 'recentes') params.set('ordenar', filters.ordenar);
  if (filters.pagina && filters.pagina > 1) params.set('pagina', String(filters.pagina));

  const query = params.toString();
  return query ? `/restaurantes?${query}` : '/restaurantes';
}

/** Há algum filtro aplicado? Decide o `noindex` e o texto do estado vazio. */
export function hasActiveFilters(filters: RestaurantFilters): boolean {
  return Boolean(filters.q || filters.categoria || filters.bairro || filters.preco || filters.tag);
}

/**
 * Normaliza texto para busca: minúsculas e sem acento.
 *
 * Sem isto, quem digita "japones" não acha "Japonês" — e ninguém digita acento
 * no celular. No banco quem faz esse trabalho é o `to_tsvector('portuguese')`.
 */
export function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export type FilterResult = {
  items: RestaurantListItem[];
  total: number;
  totalPages: number;
  page: number;
};

/**
 * Aplica filtros, ordenação e paginação em memória.
 *
 * ⚠️ **Temporário da Fase 1.** Na Fase 2.5 isto vira a função SQL
 * `search_restaurants(...)`, que faz o mesmo trabalho no banco, com índice e
 * contagem numa única ida. Está aqui para que a UI do diretório possa ser
 * construída e testada antes do schema existir — o contrato de entrada e saída
 * é o mesmo que o repositório vai expor.
 */
export function applyFilters(
  restaurants: RestaurantListItem[],
  filters: RestaurantFilters,
): FilterResult {
  const query = filters.q ? normalize(filters.q) : null;

  const matched = restaurants.filter((restaurant) => {
    if (filters.categoria && restaurant.category.slug !== filters.categoria) return false;
    if (filters.bairro && restaurant.neighborhood.slug !== filters.bairro) return false;
    if (filters.preco && restaurant.priceRange !== filters.preco) return false;

    if (query) {
      const haystack = normalize(
        `${restaurant.name} ${restaurant.teaser ?? ''} ${restaurant.category.name} ${restaurant.neighborhood.name}`,
      );
      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  const sorted = matched.toSorted((a, b) =>
    filters.ordenar === 'nome'
      ? a.name.localeCompare(b.name, 'pt-BR')
      : (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  // Página além do fim mostra a última — melhor que uma grade vazia sem explicação.
  const page = Math.min(filters.pagina, totalPages);
  const start = (page - 1) * PAGE_SIZE;

  return {
    items: sorted.slice(start, start + PAGE_SIZE),
    total: sorted.length,
    totalPages,
    page,
  };
}
