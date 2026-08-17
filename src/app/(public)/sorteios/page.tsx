import type { Metadata } from 'next';
import { listCampaigns } from '@/fixtures/queries';
import { parseCampaignFilters } from '@/lib/campaign-filters';
import { CampaignListView } from '@/views/campaign-list/campaign-list-view';

export async function generateMetadata({
  searchParams,
}: PageProps<'/sorteios'>): Promise<Metadata> {
  const { tipo } = parseCampaignFilters(await searchParams);

  return {
    title: 'Ações e sorteios',
    description:
      'Ações, sorteios e experiências do LOSPORPETAS com restaurantes parceiros. Veja o que está rolando agora.',
    alternates: { canonical: '/sorteios' },
    // Recorte por tipo não é indexável: mesmo conteúdo em outra ordem (risco R14).
    robots: tipo ? { index: false, follow: true } : undefined,
  };
}

export default async function SorteiosPage({ searchParams }: PageProps<'/sorteios'>) {
  const filters = parseCampaignFilters(await searchParams);
  const { open, closed } = await listCampaigns(filters.tipo);

  return <CampaignListView filters={filters} open={open} closed={closed} />;
}
