import type { CampaignDetail } from '@/domain/campaign';
import { RESTAURANTS } from './restaurants';

/**
 * Campanhas de exemplo da Fase 1 — substituídas pelo banco na Fase 2.5.
 *
 * Cobrem os quatro estados que a interface precisa saber renderizar: uma
 * terminando hoje (urgência), uma ativa longa, uma agendada e uma encerrada.
 * Também cobrem dois tipos diferentes — sorteio e promoção — porque o modelo é
 * polimórfico de propósito e a UI não pode assumir que tudo é sorteio.
 */

const linkRestaurant = (slug: string) => {
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);
  if (!restaurant) return null;

  return {
    id: restaurant.id,
    slug: restaurant.slug,
    name: restaurant.name,
    neighborhood: restaurant.neighborhood.name,
    category: restaurant.category.name,
    cover: restaurant.cover,
    teaser: restaurant.teaser,
  };
};

/** Datas relativas a "hoje" para as fixtures não vencerem sozinhas. */
const today = new Date();
const atHour = (daysFromNow: number, hour: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

export const CAMPAIGNS: CampaignDetail[] = [
  // 1 — ⚠️ TERMINA HOJE: exercita o badge de urgência do layout da home.
  {
    id: 'cp1',
    slug: 'jantar-para-2-no-kuro-izakaya',
    type: 'giveaway',
    title: 'Jantar para 2 no Kuro Izakaya',
    subtitle: 'Combinado completo + sobremesa',
    description: 'Uma noite por conta da casa para você e mais alguém.',
    status: 'active',
    startsAt: atHour(-10, 9),
    endsAt: atHour(0, 23),
    cover: null,
    restaurant: linkRestaurant('kuro-izakaya'),
    isSponsored: false,
    prizeDescription: 'Combinado para duas pessoas + sobremesa',
    estimatedValueCents: 35000,
    mechanics: [
      { step: 1, text: 'Siga @losporpetas e @kuroizakaya no Instagram.' },
      { step: 2, text: 'Curta a publicação oficial do sorteio.' },
      { step: 3, text: 'Marque um amigo nos comentários.' },
      { step: 4, text: 'Confira o resultado no dia do sorteio.' },
    ],
    rulesText:
      'Prêmio intransferível, consumido no local mediante agendamento com o restaurante parceiro. Sorteio realizado e apurado no perfil oficial do LOSPORPETAS.',
    officialPostUrl: 'https://www.instagram.com/p/exemplo-kuro',
    externalEntryUrl: 'https://www.instagram.com/p/exemplo-kuro',
    seoTitle: null,
    seoDescription: null,
  },

  // 2 — ativa e longa, patrocinada. Exige rótulo "Publi".
  {
    id: 'cp2',
    slug: 'batata-gratis-no-z-deli',
    type: 'promotion',
    title: 'Batata grátis no Z Deli',
    subtitle: 'Terças e quartas, na compra de qualquer burger',
    description: 'Apresente a publicação do LOSPORPETAS e leve uma batata individual.',
    status: 'active',
    startsAt: atHour(-5, 9),
    endsAt: atHour(25, 23),
    cover: null,
    restaurant: linkRestaurant('z-deli-sandwiches'),
    isSponsored: true,
    prizeDescription: 'Batata frita individual',
    estimatedValueCents: null,
    mechanics: [
      { step: 1, text: 'Vá ao Z Deli numa terça ou quarta.' },
      { step: 2, text: 'Peça qualquer burger do cardápio.' },
      { step: 3, text: 'Mostre a publicação do LOSPORPETAS no caixa.' },
    ],
    rulesText: 'Uma batata por pessoa, por visita. Não cumulativo com outras promoções.',
    officialPostUrl: 'https://www.instagram.com/p/exemplo-zdeli',
    externalEntryUrl: null,
    seoTitle: null,
    seoDescription: null,
  },

  // 3 — agendada: ainda não começou. O CTA não pode convidar a participar.
  {
    id: 'cp3',
    slug: 'rodizio-para-dois-na-inferno-pizza',
    type: 'experience',
    title: 'Rodízio para dois na Inferno Pizza',
    subtitle: 'Noite de forno a lenha',
    description: null,
    status: 'scheduled',
    startsAt: atHour(7, 9),
    endsAt: atHour(21, 23),
    cover: null,
    restaurant: linkRestaurant('inferno-pizza-co'),
    isSponsored: false,
    prizeDescription: 'Rodízio completo para duas pessoas',
    estimatedValueCents: 24000,
    mechanics: [{ step: 1, text: 'As regras serão publicadas no início da ação.' }],
    rulesText: null,
    officialPostUrl: null,
    externalEntryUrl: null,
    seoTitle: null,
    seoDescription: null,
  },

  // 4 — ⚠️ ENCERRADA: continua acessível e indexável, mas sem CTA ativo.
  {
    id: 'cp4',
    slug: 'caixa-de-brigadeiro-da-nonna',
    type: 'giveaway',
    title: 'Caixa de brigadeiro da Nonna',
    subtitle: 'Caixa com 12 unidades',
    description: null,
    status: 'ended',
    startsAt: atHour(-40, 9),
    endsAt: atHour(-12, 23),
    cover: null,
    restaurant: linkRestaurant('doceria-da-nonna'),
    isSponsored: false,
    prizeDescription: 'Caixa com 12 brigadeiros',
    estimatedValueCents: 9000,
    mechanics: [
      { step: 1, text: 'Siga @losporpetas e @doceriadanonna.' },
      { step: 2, text: 'Comente na publicação oficial.' },
    ],
    rulesText: 'Sorteio encerrado. Resultado divulgado no perfil oficial.',
    officialPostUrl: 'https://www.instagram.com/p/exemplo-nonna',
    externalEntryUrl: null,
    seoTitle: null,
    seoDescription: null,
  },
];

export const ACTIVE_CAMPAIGNS = CAMPAIGNS.filter((campaign) => campaign.status === 'active');
