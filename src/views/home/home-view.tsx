import { Divider } from '@/components/layout/divider';
import { computeDisplayStatus, isCampaignOpen } from '@/domain/campaign';
import { CAMPAIGNS } from '@/fixtures/campaigns';
import { CATEGORIES, PUBLISHED_RESTAURANTS } from '@/fixtures/restaurants';
import { CampaignsSection } from './sections/campaigns-section';
import { CategoriesSection } from './sections/categories-section';
import { FreshSection } from './sections/fresh-section';
import { HeroSection } from './sections/hero-section';
import { HighlightsSection } from './sections/highlights-section';
import { SuggestCtaSection } from './sections/suggest-cta-section';

/**
 * Home / Descobrir.
 *
 * A pergunta é "onde eu vou comer hoje?", então a página é sobre descoberta —
 * não sobre o influenciador. Ordem das seções conforme
 * `documentation/referencia/home_stitch.html`.
 *
 * ⚠️ **Fase 1: os dados vêm de `src/fixtures/`.** Na Fase 2.5 cada bloco abaixo
 * passa a chamar um repositório, com as consultas em `Promise.all` — quatro
 * queries independentes não podem virar cascata. Nenhuma seção sabe de onde o
 * dado veio: recebem tudo por prop, então a troca é local a este arquivo.
 */
export function HomeView() {
  // Destaques: na Fase 2 vêm de `featured_slots`; aqui, os dois mais recentes.
  const highlights = PUBLISHED_RESTAURANTS.slice(0, 2);

  // "Acabou de entrar no mapa": publicados mais recentes primeiro.
  const fresh = [...PUBLISHED_RESTAURANTS]
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
    .slice(0, 4);

  // Campanhas rolando, com as que encerram antes na frente.
  const activeCampaigns = CAMPAIGNS.filter((campaign) =>
    isCampaignOpen(computeDisplayStatus(campaign)),
  )
    .sort((a, b) => (a.endsAt ?? '').localeCompare(b.endsAt ?? ''))
    .slice(0, 2);

  return (
    <>
      <HeroSection />
      <Divider variant="thick" />

      <HighlightsSection restaurants={highlights} />
      <Divider />

      <CategoriesSection categories={CATEGORIES} />
      <Divider />

      <FreshSection restaurants={fresh} />
      <Divider />

      <CampaignsSection campaigns={activeCampaigns} />
      <Divider />

      <SuggestCtaSection />
      <Divider variant="thick" />
    </>
  );
}
