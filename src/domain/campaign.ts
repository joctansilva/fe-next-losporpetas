import { APP_TIME_ZONE, type CampaignStatus, type CampaignType } from './enums';
import type { Media, Taxonomy } from './restaurant';

/* ========================================================================== *
 * TIPOS
 * ========================================================================== */

/** Um passo do "Como participar". Guardado em `campaigns.mechanics` (jsonb). */
export type CampaignStep = {
  step: number;
  text: string;
};

export type CampaignRestaurant = Taxonomy & {
  neighborhood: string | null;
  category: string | null;
  cover: Media | null;
  teaser: string | null;
};

export type CampaignListItem = {
  id: string;
  slug: string;
  type: CampaignType;
  title: string;
  subtitle: string | null;
  status: CampaignStatus;
  /** ISO datetime. */
  startsAt: string | null;
  endsAt: string | null;
  cover: Media | null;
  restaurant: CampaignRestaurant | null;
  isSponsored: boolean;
};

export type CampaignDetail = CampaignListItem & {
  description: string | null;
  prizeDescription: string | null;
  estimatedValueCents: number | null;
  mechanics: CampaignStep[];
  rulesText: string | null;
  officialPostUrl: string | null;
  externalEntryUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

/* ========================================================================== *
 * ESTADO EXIBIDO
 * ========================================================================== */

/**
 * O que a interface mostra — derivado do status gravado **e** das datas.
 *
 * `ending_today` não existe no banco: é calculado, porque é informação de
 * urgência ("TERMINA HOJE" no layout da home) que muda sozinha com o relógio.
 */
export type CampaignDisplayStatus =
  | 'scheduled' // ainda não começou
  | 'active' // rolando
  | 'ending_today' // rolando, encerra hoje
  | 'ended' // encerrada
  | 'cancelled'; // cancelada
export type CampaignDisplayStatusInput = {
  status: CampaignStatus;
  startsAt: string | null;
  endsAt: string | null;
};

/**
 * Calcula o estado a ser exibido.
 *
 * A data manda sobre o status gravado: uma campanha marcada como `active` cujo
 * `endsAt` já passou aparece como **encerrada**, mesmo que o cron ainda não
 * tenha rodado. Sem isso o site mostraria "PARTICIPE" num sorteio vencido —
 * que é pior do que mostrar "encerrado" cedo demais.
 *
 * ⚠️ `now` é injetado de propósito: torna a função testável e determinística.
 * Nunca chame `new Date()` dentro de regra de negócio sem permitir a injeção.
 */
export function computeDisplayStatus(
  campaign: CampaignDisplayStatusInput,
  now: Date = new Date(),
): CampaignDisplayStatus {
  if (campaign.status === 'cancelled') return 'cancelled';
  if (campaign.status === 'ended') return 'ended';

  const nowMs = now.getTime();

  if (campaign.endsAt) {
    const endsMs = Date.parse(campaign.endsAt);
    if (!Number.isNaN(endsMs) && endsMs <= nowMs) return 'ended';
  }

  if (campaign.status === 'draft') return 'scheduled';

  if (campaign.startsAt) {
    const startsMs = Date.parse(campaign.startsAt);
    if (!Number.isNaN(startsMs) && startsMs > nowMs) return 'scheduled';
  } else if (campaign.status === 'scheduled') {
    return 'scheduled';
  }

  if (campaign.endsAt && isSameDayInAppTimeZone(new Date(campaign.endsAt), now)) {
    return 'ending_today';
  }

  return 'active';
}

/** A campanha aceita participação agora? */
export function isCampaignOpen(status: CampaignDisplayStatus): boolean {
  return status === 'active' || status === 'ending_today';
}

const DISPLAY_STATUS_LABEL: Record<CampaignDisplayStatus, string> = {
  scheduled: 'Em breve',
  active: 'Ativo',
  ending_today: 'Termina hoje',
  ended: 'Encerrado',
  cancelled: 'Cancelado',
};

export function campaignStatusLabel(status: CampaignDisplayStatus): string {
  return DISPLAY_STATUS_LABEL[status];
}

const TYPE_LABEL: Record<CampaignType, string> = {
  giveaway: 'Sorteio',
  promotion: 'Promoção',
  experience: 'Experiência',
  coupon: 'Cupom',
};

export function campaignTypeLabel(type: CampaignType): string {
  return TYPE_LABEL[type];
}

/**
 * O aviso "Sorteio realizado via Instagram oficial" é obrigatório em campanhas
 * do tipo `giveaway`: deixa claro quem opera a promoção.
 *
 * Ver documentation/05-INTEGRACOES-E-RISCOS.md — risco R17 (responsabilidade
 * legal de sorteio, Lei 5.768/71).
 */
export function requiresGiveawayDisclaimer(type: CampaignType): boolean {
  return type === 'giveaway';
}

/* ========================================================================== *
 * APRESENTAÇÃO
 * ========================================================================== */

/** `"2026-08-20T23:59:00Z"` → `"20/08"` — o formato curto do layout. */
export function formatShortDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    timeZone: APP_TIME_ZONE,
  }).format(date);
}

/** `35000` → `"R$ 350,00"` */
export function formatCents(cents: number | null | undefined): string | null {
  if (cents === null || cents === undefined) return null;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

/** Ordena os passos do "Como participar" pelo campo `step`. */
export function sortedMechanics(mechanics: CampaignStep[]): CampaignStep[] {
  return [...mechanics].sort((a, b) => a.step - b.step);
}

/**
 * Duas datas caem no mesmo dia **no fuso do produto**?
 *
 * ⚠️ Não dá para comparar por UTC. O servidor roda em UTC; um sorteio que
 * encerra às 21h de Brasília é meia-noite do dia seguinte em UTC. Comparar sem
 * fuso faria o site anunciar "termina hoje" no dia errado — e, pior, faria a
 * campanha parecer encerrada enquanto ainda está valendo para quem está aqui.
 */
function isSameDayInAppTimeZone(a: Date, b: Date): boolean {
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return false;

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.format(a) === formatter.format(b);
}
