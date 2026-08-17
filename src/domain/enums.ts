/**
 * Espelho dos enums do Postgres.
 *
 * Fonte de verdade: ../../../documentation/03-MODELO-DE-DADOS.md §2.
 * Ao alterar um enum no banco (migration), altere aqui **na mesma tarefa** —
 * caso contrário o mapper da Fase 2 aceita um valor que o TypeScript não
 * conhece e o erro só aparece em runtime.
 *
 * Usamos objeto `as const` + tipo derivado em vez de `enum` do TypeScript:
 * o `enum` gera objeto em runtime, não é serializável entre servidor e
 * cliente sem cuidado, e não aceita valores vindos do banco sem cast.
 */

export const PUBLICATION_STATUS = ['draft', 'review', 'published', 'archived'] as const;
export type PublicationStatus = (typeof PUBLICATION_STATUS)[number];

/**
 * O que o LOSPORPETAS já fez com o lugar.
 *
 * ⚠️ Este enum é a espinha dorsal da credibilidade do produto. Só `approved`
 * autoriza o carimbo. "Destacado" **não** está aqui de propósito: destaque é
 * posicional e temporal, então vive em `featured_slots`.
 */
export const CURATION_STATUS = [
  'registered', // cadastrado, sem visita
  'suggested', // veio do público, ainda não avaliado
  'visited', // visitado, sem veredito publicado
  'approved', // aprovado editorialmente → ganha o carimbo
  'rejected', // visitado e reprovado
] as const;
export type CurationStatus = (typeof CURATION_STATUS)[number];

export const PRICE_RANGE = ['1', '2', '3', '4'] as const;
export type PriceRange = (typeof PRICE_RANGE)[number];

export const PARTNERSHIP_TIER = ['listing', 'featured', 'campaign'] as const;
export type PartnershipTier = (typeof PARTNERSHIP_TIER)[number];

export const PARTNERSHIP_STATUS = ['negotiating', 'active', 'paused', 'ended'] as const;
export type PartnershipStatus = (typeof PARTNERSHIP_STATUS)[number];

export const CAMPAIGN_TYPE = ['giveaway', 'promotion', 'experience', 'coupon'] as const;
export type CampaignType = (typeof CAMPAIGN_TYPE)[number];

export const CAMPAIGN_STATUS = ['draft', 'scheduled', 'active', 'ended', 'cancelled'] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUS)[number];

export const SUGGESTION_STATUS = ['pending', 'reviewing', 'approved', 'rejected'] as const;
export type SuggestionStatus = (typeof SUGGESTION_STATUS)[number];

export const LEAD_STATUS = ['new', 'contacted', 'negotiating', 'won', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUS)[number];

export const SUBSCRIBER_STATUS = ['pending', 'confirmed', 'unsubscribed', 'bounced'] as const;
export type SubscriberStatus = (typeof SUBSCRIBER_STATUS)[number];

export const MEDIA_ROLE = ['cover', 'gallery'] as const;
export type MediaRole = (typeof MEDIA_ROLE)[number];

export const TAG_KIND = ['experience', 'feature'] as const;
export type TagKind = (typeof TAG_KIND)[number];

export const SLOT_PLACEMENT = [
  'home_hero',
  'home_highlight',
  'home_campaign',
  'directory_top',
] as const;
export type SlotPlacement = (typeof SLOT_PLACEMENT)[number];

export const USER_ROLE = ['admin', 'editor'] as const;
export type UserRole = (typeof USER_ROLE)[number];

/** Fuso do produto. O servidor roda em UTC; "hoje" precisa ser hoje no Brasil. */
export const APP_TIME_ZONE = 'America/Sao_Paulo';
