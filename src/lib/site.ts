/**
 * Configuração do site.
 *
 * Fonte única de nome, URL, navegação e links sociais. Os 5 layouts do Stitch
 * divergiam entre si no rodapé (um tinha TikTok, outro Twitter e Newsletter) —
 * aqui existe uma versão só, e mudar um link é mudar um lugar.
 */

export const SITE = {
  name: 'LOSPORPETAS',
  tagline: 'O guia subterrâneo da cidade',
  description:
    'Guia gastronômico local com curadoria do LOSPORPETAS. Lugares provados, aprovados e colocados no mapa.',
  /** Usada em metadata, Open Graph, canonical e sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'pt-BR',
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Casa também as sub-rotas (ex.: /restaurantes/[slug]). */
  matchPrefix?: boolean;
};

/** Navegação principal — idêntica nos 5 layouts do Stitch. */
export const MAIN_NAV: NavItem[] = [
  { label: 'Descobrir', href: '/' },
  { label: 'Restaurantes', href: '/restaurantes', matchPrefix: true },
  { label: 'Sorteios', href: '/sorteios', matchPrefix: true },
  { label: 'Seja parceiro', href: '/seja-parceiro' },
];

/** CTA fixo do header. Na Fase 3 passa a abrir o modal de sugestão. */
export const SUGGEST_CTA = {
  label: 'Indicar um lugar',
  href: '/indicar',
} as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/losporpetas' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@losporpetas' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Termos de Uso', href: '/termos' },
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Contato', href: '/contato' },
] as const;

/**
 * O item de navegação corresponde à rota atual?
 *
 * Pura de propósito: dá para testar sem montar componente, e a mesma regra
 * serve ao menu desktop e ao drawer mobile.
 */
export function isActiveNav(item: NavItem, pathname: string): boolean {
  if (item.href === '/') return pathname === '/';
  if (item.matchPrefix) return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return pathname === item.href;
}
