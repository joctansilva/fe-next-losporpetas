import { CAMPAIGN_TYPE, type CampaignType } from '@/domain/enums';

/**
 * Filtro de tipo da listagem de ações e sorteios.
 *
 * ⚠️ **O valor na URL é em português**, não o valor do enum: `?tipo=sorteio` e
 * não `?tipo=giveaway`. O link é compartilhado no Instagram e no WhatsApp por
 * gente que lê o que está escrito — vale as quatro linhas de mapeamento.
 *
 * O mapa é a fonte única dessa tradução: mudar aqui muda a URL, os chips e a
 * leitura, sem risco de divergirem.
 */

const TYPE_TO_SLUG: Record<CampaignType, string> = {
  giveaway: 'sorteio',
  promotion: 'promocao',
  experience: 'experiencia',
  coupon: 'cupom',
};

const SLUG_TO_TYPE = Object.fromEntries(
  Object.entries(TYPE_TO_SLUG).map(([type, slug]) => [slug, type as CampaignType]),
) as Record<string, CampaignType>;

export function campaignTypeSlug(type: CampaignType): string {
  return TYPE_TO_SLUG[type];
}

export function campaignTypeFromSlug(slug: string | null | undefined): CampaignType | null {
  if (!slug) return null;
  return SLUG_TO_TYPE[slug] ?? null;
}

/** Todos os tipos, na ordem em que aparecem nos chips. */
export const CAMPAIGN_TYPES = CAMPAIGN_TYPE;

export type CampaignFilters = {
  tipo: CampaignType | null;
};

type RawParams = Record<string, string | string[] | undefined>;

/** Lê `searchParams`. Tipo desconhecido vira "todos", nunca erro. */
export function parseCampaignFilters(params: RawParams): CampaignFilters {
  const raw = params.tipo;
  const single = Array.isArray(raw) ? raw[0] : raw;

  return { tipo: campaignTypeFromSlug(single?.trim()) };
}

/** Monta a URL da listagem. Omite o padrão, mantendo `/sorteios` limpa. */
export function buildCampaignsHref(filters: CampaignFilters): string {
  if (!filters.tipo) return '/sorteios';
  return `/sorteios?tipo=${campaignTypeSlug(filters.tipo)}`;
}
