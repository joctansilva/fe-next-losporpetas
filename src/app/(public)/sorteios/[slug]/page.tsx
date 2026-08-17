import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { campaignTypeLabel } from '@/domain/campaign';
import {
  getCampaignBySlug,
  listPublishedCampaignSlugs,
  listRelatedCampaigns,
} from '@/fixtures/queries';
import { CampaignDetailView } from '@/views/campaign-detail/campaign-detail-view';

export async function generateStaticParams() {
  const slugs = await listPublishedCampaignSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/sorteios/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) return { title: 'Ação não encontrada' };

  const title = campaign.seoTitle ?? campaign.title;
  const description =
    campaign.seoDescription ??
    campaign.subtitle ??
    `${campaignTypeLabel(campaign.type)} do LOSPORPETAS${campaign.restaurant ? ` com ${campaign.restaurant.name}` : ''}.`;

  return {
    title,
    description,
    alternates: { canonical: `/sorteios/${campaign.slug}` },
    openGraph: { title, description, type: 'website', url: `/sorteios/${campaign.slug}` },
  };
}

export default async function SorteioPage({ params }: PageProps<'/sorteios/[slug]'>) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  // Rascunho e slug inexistente caem aqui. Campanha encerrada **não** cai:
  // continua acessível de propósito, como destino de posts antigos.
  if (!campaign) notFound();

  const related = await listRelatedCampaigns(campaign.id);

  return <CampaignDetailView campaign={campaign} related={related} />;
}
