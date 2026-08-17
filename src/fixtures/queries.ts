import type { CampaignDetail, CampaignListItem } from '@/domain/campaign';
import { computeDisplayStatus, isCampaignOpen } from '@/domain/campaign';
import type { CampaignType } from '@/domain/enums';
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

/* -------------------------------------------------------------------------- *
 * Campanhas
 * -------------------------------------------------------------------------- */

/**
 * Ações e sorteios separados por situação.
 *
 * O rascunho fica de fora: campanha não publicada não aparece no site. As
 * encerradas continuam acessíveis de propósito — são prova social e destino
 * permanente de posts antigos do Instagram.
 */
export async function listCampaigns(type: CampaignType | null = null): Promise<{
  open: CampaignListItem[];
  closed: CampaignListItem[];
}> {
  const visible = CAMPAIGNS.filter(
    (campaign) => campaign.status !== 'draft' && (!type || campaign.type === type),
  );

  const open = visible
    .filter((campaign) => computeDisplayStatus(campaign) !== 'ended')
    // Quem encerra antes aparece primeiro: é a informação mais urgente.
    .toSorted((a, b) => (a.endsAt ?? '').localeCompare(b.endsAt ?? ''));

  const closed = visible
    .filter((campaign) => computeDisplayStatus(campaign) === 'ended')
    .toSorted((a, b) => (b.endsAt ?? '').localeCompare(a.endsAt ?? ''));

  return { open, closed };
}

export async function getCampaignBySlug(slug: string): Promise<CampaignDetail | null> {
  const campaign = CAMPAIGNS.find((item) => item.slug === slug);
  return campaign && campaign.status !== 'draft' ? campaign : null;
}

export async function listPublishedCampaignSlugs(): Promise<string[]> {
  return CAMPAIGNS.filter((campaign) => campaign.status !== 'draft').map(
    (campaign) => campaign.slug,
  );
}

/** "Você também pode gostar": outras campanhas rolando. */
export async function listRelatedCampaigns(
  campaignId: string,
  limit = 3,
): Promise<CampaignListItem[]> {
  return CAMPAIGNS.filter(
    (campaign) =>
      campaign.id !== campaignId &&
      campaign.status !== 'draft' &&
      isCampaignOpen(computeDisplayStatus(campaign)),
  ).slice(0, limit);
}
