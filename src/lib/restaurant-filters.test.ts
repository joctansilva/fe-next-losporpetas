import { describe, expect, it } from 'vitest';
import type { RestaurantListItem } from '@/domain/restaurant';
import {
  applyFilters,
  buildDirectoryHref,
  EMPTY_FILTERS,
  hasActiveFilters,
  normalize,
  PAGE_SIZE,
  parseFilters,
} from './restaurant-filters';

const restaurant = (
  overrides: Partial<RestaurantListItem> & { id: string; name: string },
): RestaurantListItem => ({
  slug: overrides.name.toLowerCase().replaceAll(' ', '-'),
  teaser: null,
  category: { id: 'c1', slug: 'hamburgueria', name: 'Hamburgueria' },
  neighborhood: { id: 'n1', slug: 'centro', name: 'Centro' },
  priceRange: '2',
  curationStatus: 'approved',
  status: 'published',
  publishedAt: '2026-08-01T10:00:00-03:00',
  cover: null,
  partnerships: [],
  ...overrides,
});

describe('parseFilters', () => {
  it('lê os parâmetros conhecidos', () => {
    const filters = parseFilters({
      q: 'burger',
      categoria: 'pizza',
      bairro: 'centro',
      preco: '3',
      ordenar: 'nome',
      pagina: '2',
    });

    expect(filters).toEqual({
      q: 'burger',
      categoria: 'pizza',
      bairro: 'centro',
      preco: '3',
      tag: null,
      ordenar: 'nome',
      pagina: 2,
    });
  });

  it('cai no padrão quando não há parâmetro', () => {
    expect(parseFilters({})).toEqual(EMPTY_FILTERS);
  });

  /**
   * 🔒 A URL é escrita por qualquer um, inclusive por bot testando entrada
   * inválida. Nada aqui pode quebrar a página.
   */
  it('ignora valores inválidos em vez de quebrar', () => {
    const filters = parseFilters({
      preco: '99',
      ordenar: 'drop table',
      pagina: '-5',
    });

    expect(filters.preco).toBeNull();
    expect(filters.ordenar).toBe('recentes');
    expect(filters.pagina).toBe(1);
  });

  it('ignora página não numérica', () => {
    expect(parseFilters({ pagina: 'abc' }).pagina).toBe(1);
  });

  it('usa o primeiro valor quando o parâmetro vem repetido', () => {
    expect(parseFilters({ categoria: ['pizza', 'bar'] }).categoria).toBe('pizza');
  });

  it('trata string vazia como ausência', () => {
    expect(parseFilters({ q: '   ' }).q).toBeNull();
  });
});

describe('buildDirectoryHref', () => {
  it('omite valores padrão — a URL limpa é a canônica', () => {
    expect(buildDirectoryHref({ ordenar: 'recentes', pagina: 1 })).toBe('/restaurantes');
    expect(buildDirectoryHref({})).toBe('/restaurantes');
  });

  it('inclui só o que foi escolhido', () => {
    expect(buildDirectoryHref({ categoria: 'pizza', pagina: 3 })).toBe(
      '/restaurantes?categoria=pizza&pagina=3',
    );
  });

  it('faz ida e volta com parseFilters', () => {
    const original = {
      ...EMPTY_FILTERS,
      categoria: 'bar',
      bairro: 'centro',
      ordenar: 'nome' as const,
    };
    const href = buildDirectoryHref(original);
    const params = Object.fromEntries(new URL(href, 'http://x').searchParams);

    expect(parseFilters(params)).toEqual(original);
  });
});

describe('hasActiveFilters', () => {
  it('ordenação e página não contam como filtro', () => {
    expect(hasActiveFilters({ ...EMPTY_FILTERS, ordenar: 'nome', pagina: 4 })).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, categoria: 'pizza' })).toBe(true);
  });
});

describe('normalize', () => {
  it('remove acento e caixa — ninguém digita acento no celular', () => {
    expect(normalize('Japonês')).toBe('japones');
    expect(normalize('AÇAÍ')).toBe('acai');
  });
});

describe('applyFilters', () => {
  const list = [
    restaurant({ id: '1', name: 'Smash Bros', publishedAt: '2026-08-10T10:00:00-03:00' }),
    restaurant({
      id: '2',
      name: 'Napoli Centrale',
      category: { id: 'c2', slug: 'pizza', name: 'Pizza' },
      publishedAt: '2026-08-12T10:00:00-03:00',
    }),
    restaurant({
      id: '3',
      name: 'Kuro Izakaya',
      category: { id: 'c3', slug: 'japones', name: 'Japonês' },
      neighborhood: { id: 'n2', slug: 'liberdade', name: 'Liberdade' },
      priceRange: '3',
      publishedAt: '2026-08-11T10:00:00-03:00',
    }),
  ];

  it('sem filtro devolve tudo, do mais recente para o mais antigo', () => {
    const result = applyFilters(list, EMPTY_FILTERS);
    expect(result.total).toBe(3);
    expect(result.items.map((r) => r.name)).toEqual([
      'Napoli Centrale',
      'Kuro Izakaya',
      'Smash Bros',
    ]);
  });

  it('filtra por categoria, bairro e preço', () => {
    expect(applyFilters(list, { ...EMPTY_FILTERS, categoria: 'pizza' }).total).toBe(1);
    expect(applyFilters(list, { ...EMPTY_FILTERS, bairro: 'liberdade' }).total).toBe(1);
    expect(applyFilters(list, { ...EMPTY_FILTERS, preco: '3' }).total).toBe(1);
  });

  it('combina filtros', () => {
    expect(
      applyFilters(list, { ...EMPTY_FILTERS, categoria: 'pizza', bairro: 'liberdade' }).total,
    ).toBe(0);
  });

  it('busca sem acento encontra resultado acentuado', () => {
    expect(applyFilters(list, { ...EMPTY_FILTERS, q: 'japones' }).total).toBe(1);
  });

  it('busca também no bairro e na categoria, não só no nome', () => {
    expect(applyFilters(list, { ...EMPTY_FILTERS, q: 'liberdade' }).total).toBe(1);
  });

  it('ordena por nome quando pedido', () => {
    const result = applyFilters(list, { ...EMPTY_FILTERS, ordenar: 'nome' });
    expect(result.items.map((r) => r.name)).toEqual([
      'Kuro Izakaya',
      'Napoli Centrale',
      'Smash Bros',
    ]);
  });

  it('não muta a lista original', () => {
    const input = [...list];
    applyFilters(input, { ...EMPTY_FILTERS, ordenar: 'nome' });
    expect(input[0]?.name).toBe('Smash Bros');
  });

  describe('paginação', () => {
    const many = Array.from({ length: PAGE_SIZE * 2 + 5 }, (_, index) =>
      restaurant({ id: `r${index}`, name: `Restaurante ${index}` }),
    );

    it('divide em páginas de PAGE_SIZE', () => {
      const result = applyFilters(many, EMPTY_FILTERS);
      expect(result.items).toHaveLength(PAGE_SIZE);
      expect(result.total).toBe(PAGE_SIZE * 2 + 5);
      expect(result.totalPages).toBe(3);
    });

    it('a última página traz o resto', () => {
      const result = applyFilters(many, { ...EMPTY_FILTERS, pagina: 3 });
      expect(result.items).toHaveLength(5);
    });

    it('página além do fim mostra a última, não uma grade vazia', () => {
      const result = applyFilters(many, { ...EMPTY_FILTERS, pagina: 999 });
      expect(result.page).toBe(3);
      expect(result.items).toHaveLength(5);
    });

    it('lista vazia ainda tem uma página', () => {
      const result = applyFilters([], EMPTY_FILTERS);
      expect(result.totalPages).toBe(1);
      expect(result.items).toEqual([]);
    });
  });
});
