import type {
  CurationStatus,
  PartnershipStatus,
  PartnershipTier,
  PriceRange,
  PublicationStatus,
} from './enums';

/* ========================================================================== *
 * TIPOS
 * ========================================================================== */

export type Media = {
  id: string;
  storagePath: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl: string | null;
  credit: string | null;
};

export type Taxonomy = {
  id: string;
  slug: string;
  name: string;
};

export type Tag = Taxonomy & {
  kind: 'experience' | 'feature';
};

export type Partnership = {
  id: string;
  tier: PartnershipTier;
  status: PartnershipStatus;
  /** ISO date (YYYY-MM-DD) ou null para "sem data definida". */
  startsAt: string | null;
  endsAt: string | null;
};

export type EditorialReview = {
  id: string;
  headline: string | null;
  /** Markdown. */
  body: string;
  verdict: string | null;
  visitedAt: string | null;
};

export type OpeningPeriod = {
  /** 0 = domingo … 6 = sábado, igual a `Date.getDay()`. */
  days: number[];
  /** "HH:MM" em 24h. */
  open: string;
  close: string;
};

export type OpeningHours = {
  periods: OpeningPeriod[];
  note?: string;
};

/**
 * O que um card precisa saber. Deliberadamente menor que `RestaurantDetail`:
 * uma listagem carrega 24 destes, então galeria, horários e review ficam de fora.
 */
export type RestaurantListItem = {
  id: string;
  slug: string;
  name: string;
  teaser: string | null;
  category: Taxonomy;
  neighborhood: Taxonomy;
  priceRange: PriceRange | null;
  curationStatus: CurationStatus;
  status: PublicationStatus;
  publishedAt: string | null;
  cover: Media | null;
  partnerships: Partnership[];
};

export type RestaurantDetail = RestaurantListItem & {
  description: string | null;
  addressLine: string | null;
  addressExtra: string | null;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  whatsapp: string | null;
  instagramHandle: string | null;
  websiteUrl: string | null;
  openingHours: OpeningHours | null;
  tags: Tag[];
  gallery: Media[];
  review: EditorialReview | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

/* ========================================================================== *
 * REGRAS — EDITORIAL × COMERCIAL
 *
 * A separação mais importante do produto. Ver
 * ../../../documentation/03-MODELO-DE-DADOS.md §3.6 e o risco R1.
 * ========================================================================== */

/**
 * O restaurante pode exibir o carimbo "APROVADO PELO LOSPORPETAS"?
 *
 * ⚠️ **Olha SOMENTE a curadoria editorial.** Não recebe, não consulta e não
 * deve nunca considerar parceria comercial, destaque pago ou valor de contrato.
 *
 * O carimbo é o único ativo real do produto: significa que alguém foi ao lugar,
 * comeu e aprovou. No dia em que dinheiro produzir carimbo, o portal vira
 * diretório pago e a audiência percebe.
 *
 * Se algum dia bater a vontade de adicionar um `|| isPartner(...)` aqui, a
 * resposta é não.
 */
export function canShowApprovalStamp(restaurant: { curationStatus: CurationStatus }): boolean {
  return restaurant.curationStatus === 'approved';
}

/** A parceria está vigente na data informada? */
export function isPartnershipActive(partnership: Partnership, now: Date = new Date()): boolean {
  if (partnership.status !== 'active') return false;

  const today = toIsoDate(now);
  if (partnership.startsAt && partnership.startsAt > today) return false;
  if (partnership.endsAt && partnership.endsAt < today) return false;

  return true;
}

/**
 * O restaurante é parceiro comercial hoje?
 *
 * Derivado das parcerias vigentes — nunca um booleano guardado na tabela do
 * restaurante. Parceria tem vigência, e um booleano não expira sozinho.
 *
 * ⚠️ Ser parceiro **não** dá direito ao carimbo. As duas coisas convivem:
 * um restaurante pode ser parceiro sem ser aprovado, e vice-versa.
 */
export function isPartner(
  restaurant: { partnerships: Partnership[] },
  now: Date = new Date(),
): boolean {
  return restaurant.partnerships.some((partnership) => isPartnershipActive(partnership, now));
}

/** O restaurante está visível para o público? */
export function isPubliclyVisible(restaurant: {
  status: PublicationStatus;
  curationStatus: CurationStatus;
}): boolean {
  // Espelha a constraint `published_needs_approval` do banco: dinheiro não
  // publica restaurante, e nem um bug de aplicação deveria conseguir.
  return restaurant.status === 'published' && restaurant.curationStatus === 'approved';
}

/* ========================================================================== *
 * APRESENTAÇÃO
 * ========================================================================== */

/** `'2'` → `'$$'`. Retorna null quando a faixa não foi informada. */
export function priceLabel(range: PriceRange | null | undefined): string | null {
  if (!range) return null;
  return '$'.repeat(Number(range));
}

const PRICE_DESCRIPTION: Record<PriceRange, string> = {
  '1': 'Até R$ 40 por pessoa',
  '2': 'De R$ 40 a R$ 80 por pessoa',
  '3': 'De R$ 80 a R$ 150 por pessoa',
  '4': 'Acima de R$ 150 por pessoa',
};

/** Texto acessível da faixa de preço — `$$` sozinho não diz nada em leitor de tela. */
export function priceDescription(range: PriceRange | null | undefined): string | null {
  return range ? PRICE_DESCRIPTION[range] : null;
}

const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

export type FormattedOpeningPeriod = {
  /** "Dom a Qui", "Sex e Sáb", "Seg" */
  days: string;
  /** "12h às 23h", "12h30 às 00h" */
  hours: string;
};

/**
 * Transforma o `jsonb` de horários no texto que aparece na página.
 *
 * Agrupa dias consecutivos ("Dom a Qui"), usa "e" para dois dias soltos
 * ("Sex e Sáb") e omite os minutos quando são zero — que é como o layout do
 * Stitch mostra ("12h às 23h", não "12:00 às 23:00").
 */
export function formatOpeningHours(
  hours: OpeningHours | null | undefined,
): FormattedOpeningPeriod[] {
  if (!hours?.periods?.length) return [];

  return hours.periods
    .filter((period) => period.days.length > 0)
    .map((period) => ({
      days: formatDayRange(period.days),
      hours: `${formatTime(period.open)} às ${formatTime(period.close)}`,
    }));
}

function formatDayRange(days: number[]): string {
  const sorted = [...new Set(days)].sort((a, b) => a - b);
  const names = sorted.map((day) => DAY_NAMES[day] ?? '').filter(Boolean);

  if (names.length === 0) return '';
  if (names.length === 1) return names[0] as string;

  const isConsecutive = sorted.every(
    (day, index) => index === 0 || day === (sorted[index - 1] as number) + 1,
  );

  if (!isConsecutive) return names.join(', ');
  if (names.length === 2) return `${names[0]} e ${names[1]}`;

  return `${names[0]} a ${names[names.length - 1]}`;
}

/** `"12:00"` → `"12h"` · `"12:30"` → `"12h30"` */
function formatTime(time: string): string {
  const [hour = '', minute = ''] = time.split(':');
  return minute === '00' ? `${hour}h` : `${hour}h${minute}`;
}

/** Data local (não UTC) no formato `YYYY-MM-DD`, para comparar com datas do banco. */
function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Link universal "Como chegar".
 *
 * Sem SDK e sem chave de API: abre o app de mapas no celular e o site no
 * desktop. Prefere coordenadas; cai para o endereço quando não há geocoding.
 * Ver documentation/05-INTEGRACOES-E-RISCOS.md §1.1.
 */
export function directionsUrl(restaurant: {
  name: string;
  latitude: number | null;
  longitude: number | null;
  addressLine: string | null;
  city: string;
  state: string;
}): string | null {
  if (restaurant.latitude !== null && restaurant.longitude !== null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;
  }

  if (restaurant.addressLine) {
    const query = `${restaurant.name}, ${restaurant.addressLine}, ${restaurant.city} - ${restaurant.state}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  return null;
}

/** URL do perfil no Instagram a partir do handle (gravado sem `@`). */
export function instagramUrl(handle: string | null | undefined): string | null {
  if (!handle) return null;
  return `https://www.instagram.com/${handle.replace(/^@/, '')}`;
}
