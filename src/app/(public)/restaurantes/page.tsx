import type { Metadata } from 'next';
import { hasActiveFilters, parseFilters } from '@/lib/restaurant-filters';
import { RestaurantDirectoryView } from '@/views/restaurant-directory/restaurant-directory-view';

/**
 * O `robots` depende dos filtros, então precisa ser `generateMetadata` e não um
 * objeto `metadata` estático — este é avaliado uma vez, no build.
 */
export async function generateMetadata({
  searchParams,
}: PageProps<'/restaurantes'>): Promise<Metadata> {
  const filters = parseFilters(await searchParams);

  return {
    title: 'Restaurantes',
    description:
      'Todos os restaurantes aprovados pelo Porpetas. Busque por nome, categoria, bairro ou faixa de preço.',
    // A canônica é sempre a URL sem filtro.
    alternates: { canonical: '/restaurantes' },
    // Combinação de filtros não é indexável: geraria conteúdo duplicado e
    // desperdício de crawl budget (risco R14). `follow` continua ligado para
    // os links dos cards seguirem sendo rastreados.
    robots: hasActiveFilters(filters) ? { index: false, follow: true } : undefined,
  };
}

export default async function RestaurantesPage({ searchParams }: PageProps<'/restaurantes'>) {
  return <RestaurantDirectoryView filters={parseFilters(await searchParams)} />;
}
