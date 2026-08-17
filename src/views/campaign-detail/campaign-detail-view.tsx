import { CampaignCard } from '@/components/campaign/campaign-card';
import { CampaignCta } from '@/components/campaign/campaign-cta';
import { CampaignStatusBadge } from '@/components/campaign/campaign-status-badge';
import { CampaignSteps } from '@/components/campaign/campaign-steps';
import { PartnerSidebar } from '@/components/campaign/partner-sidebar';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Photo } from '@/components/ui/photo';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import {
  computeDisplayStatus,
  formatCents,
  formatShortDate,
  type CampaignDetail,
  type CampaignListItem,
} from '@/domain/campaign';
import { Icons, ICON_SIZE } from '@/lib/icons';

type CampaignDetailViewProps = {
  campaign: CampaignDetail;
  related: CampaignListItem[];
};

/**
 * Página da ação ou sorteio.
 *
 * Layout: `documentation/referencia/sorteio_stitch.html`. Hero em duas colunas
 * (imagem 7 / conteúdo 5), depois "Como participar" + regulamento à esquerda e
 * o parceiro à direita.
 *
 * Chega gente direto do Instagram aqui, então a página precisa responder rápido
 * três perguntas: **o que é o prêmio, até quando dá para participar e como se
 * participa.** Nessa ordem.
 */
export function CampaignDetailView({ campaign, related }: CampaignDetailViewProps) {
  const status = computeDisplayStatus(campaign);
  const endsAt = formatShortDate(campaign.endsAt);
  const value = formatCents(campaign.estimatedValueCents);

  return (
    <Container as="div" className="flex flex-col gap-xl py-lg md:py-xl">
      <section className="grid grid-cols-1 gap-lg md:grid-cols-12 md:gap-gutter">
        <div className="relative h-[300px] bg-surface-container-highest p-xs ink-border md:col-span-7 md:h-[480px]">
          <div className="relative size-full overflow-hidden bg-on-surface ink-border">
            <Photo media={campaign.cover} context="hero" priority />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-md md:col-span-5">
          <div className="flex flex-wrap items-center gap-sm">
            <CampaignStatusBadge status={status} />
            {endsAt && status !== 'ended' && (
              <span className="bg-surface-container-highest px-sm py-xs font-mono text-meta-mono uppercase ink-border">
                Encerra em {endsAt}
              </span>
            )}
            {campaign.isSponsored && <SponsoredLabel />}
          </div>

          <div className="flex flex-col gap-xs">
            <h1 className="text-headline-lg leading-none">{campaign.title}</h1>
            {campaign.subtitle && (
              <p className="text-body-lg font-medium text-on-surface-variant">
                {campaign.subtitle}
              </p>
            )}
          </div>

          {value && (
            <div className="flex flex-col gap-xs bg-surface-container-highest p-md ink-border">
              <p className="font-mono text-label-mono text-secondary uppercase">Valor estimado</p>
              <p className="text-headline-md">{value}</p>
            </div>
          )}

          <CampaignCta campaign={campaign} status={status} className="mt-sm" />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-lg border-t-2 border-on-background pt-lg md:grid-cols-12 md:gap-gutter">
        <div className="flex flex-col gap-md md:col-span-8">
          <CampaignSteps steps={campaign.mechanics} />

          {(campaign.rulesText || campaign.officialPostUrl) && (
            <div className="mt-md flex flex-col gap-sm bg-surface p-md ink-border">
              <h2 className="font-mono text-label-mono uppercase">Regulamento</h2>

              {campaign.rulesText && (
                <p className="text-body-md text-on-surface-variant">{campaign.rulesText}</p>
              )}

              {campaign.officialPostUrl && (
                <a
                  href={campaign.officialPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-sm inline-flex w-max items-center gap-xs px-md py-sm font-mono text-label-mono uppercase transition-colors ink-border hover:bg-surface-container-highest"
                >
                  Ver publicação oficial
                  <Icons.externalLink size={ICON_SIZE.sm} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-4">
          <PartnerSidebar restaurant={campaign.restaurant} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="flex flex-col gap-md border-t-2 border-on-background pt-lg">
          <SectionHeading title="Você também pode gostar" size="md" />
          <ul className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id} className="contents">
                <CampaignCard campaign={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
