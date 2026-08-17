import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { priceLabel } from '@/domain/restaurant';
import {
  getRestaurantBySlug,
  listActiveCampaignsByRestaurant,
  listPublishedSlugs,
  listRelatedRestaurants,
} from '@/fixtures/queries';
import { RestaurantDetailView } from '@/views/restaurant-detail/restaurant-detail-view';

/** Gera as páginas no build — é a rota que precisa ser instantânea. */
export async function generateStaticParams() {
  const slugs = await listPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/restaurantes/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return { title: 'Restaurante não encontrado' };

  const price = priceLabel(restaurant.priceRange);
  const title =
    restaurant.seoTitle ??
    `${restaurant.name} — ${restaurant.category.name} em ${restaurant.neighborhood.name}`;
  const description =
    restaurant.seoDescription ??
    restaurant.teaser ??
    `${restaurant.name}: ${restaurant.category.name} em ${restaurant.neighborhood.name}${price ? `, ${price}` : ''}. Aprovado pelo LOSPORPETAS.`;

  return {
    title,
    description,
    alternates: { canonical: `/restaurantes/${restaurant.slug}` },
    openGraph: { title, description, type: 'website', url: `/restaurantes/${restaurant.slug}` },
  };
}

export default async function RestaurantePage({ params }: PageProps<'/restaurantes/[slug]'>) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  // Slug inexistente, rascunho ou arquivado → 404 de verdade, nunca página
  // vazia. Na Fase 2.5 entra antes disto a checagem de slug antigo (301).
  if (!restaurant) notFound();

  const [campaigns, related] = await Promise.all([
    listActiveCampaignsByRestaurant(restaurant.id),
    listRelatedRestaurants(restaurant),
  ]);

  return <RestaurantDetailView restaurant={restaurant} campaigns={campaigns} related={related} />;
}
