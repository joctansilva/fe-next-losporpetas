import type { CampaignListItem } from '@/domain/campaign';
import { computeDisplayStatus, isCampaignOpen } from '@/domain/campaign';
import type { RestaurantDetail, RestaurantListItem } from '@/domain/restaurant';
import { CAMPAIGNS } from './campaigns';
import { PUBLISHED_RESTAURANTS, RESTAURANTS } from './restaurants';

/**
 * Consultas sobre as fixtures.
 *
 * ⚠️ **Camada temporária da Fase 1.** As assinaturas aqui são exatamente as
 * que `src/server/repositories/` vai expor na Fase 2.5 (ver
 * documentation/02-ARCHITECTURE-PROPOSAL.md §5.2). A troca é substituir os
 * imports; nenhuma página nem componente muda.
 *
 * Por isso as funções são `async` mesmo sem precisar: quando virarem consulta
 * ao Postgres, a assinatura já é a mesma.
 */

/** Restaurante publicado por slug. `null` quando não existe ou não é público. */
export async function getRestaurantBySlug(slug: string): Promise<RestaurantDetail | null> {
  return PUBLISHED_RESTAURANTS.find((restaurant) => restaurant.slug === slug) ?? null;
}

/** Slugs para `generateStaticParams` — só o que é público. */
export async function listPublishedSlugs(): Promise<string[]> {
  return PUBLISHED_RESTAURANTS.map((restaurant) => restaurant.slug);
}

/**
 * Restaurantes relacionados: mesma categoria primeiro, depois mesmo bairro.
 *
 * Completa com os mais recentes quando não há relacionado suficiente — a seção
 * ficar curta é pior que mostrar um lugar de outra categoria.
 */
export async function listRelatedRestaurants(
  restaurant: RestaurantDetail,
  limit = 3,
): Promise<RestaurantListItem[]> {
  const others = PUBLISHED_RESTAURANTS.filter((item) => item.id !== restaurant.id);

  const score = (item: RestaurantListItem) =>
    (item.category.id === restaurant.category.id ? 2 : 0) +
    (item.neighborhood.id === restaurant.neighborhood.id ? 1 : 0);

  return others
    .toSorted(
      (a, b) => score(b) - score(a) || (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
    )
    .slice(0, limit);
}

/** Campanhas rolando ligadas ao restaurante. */
export async function listActiveCampaignsByRestaurant(
  restaurantId: string,
): Promise<CampaignListItem[]> {
  return CAMPAIGNS.filter(
    (campaign) =>
      campaign.restaurant?.id === restaurantId && isCampaignOpen(computeDisplayStatus(campaign)),
  );
}

/** Usada só em desenvolvimento, para conferir os casos não publicados. */
export async function listAllRestaurants(): Promise<RestaurantDetail[]> {
  return RESTAURANTS;
}
