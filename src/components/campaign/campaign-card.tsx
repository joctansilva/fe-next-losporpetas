import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Photo } from '@/components/ui/photo';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import {
  campaignTypeLabel,
  computeDisplayStatus,
  formatShortDate,
  isCampaignOpen,
  type CampaignListItem,
} from '@/domain/campaign';
import { cn } from '@/lib/cn';
import { CampaignStatusBadge } from './campaign-status-badge';

/**
 * Card de ação/sorteio na listagem.
 *
 * Formato do bloco "Você também pode gostar" do layout: imagem, selo de status,
 * título, parceiro, divisor tracejado e CTA.
 *
 * ⚠️ Campanha encerrada é renderizada **em tom rebaixado e sem CTA ativo**, mas
 * continua acessível: é prova social e destino permanente de posts antigos do
 * Instagram. Sumir com ela quebraria links já publicados.
 */
export function CampaignCard({ campaign }: { campaign: CampaignListItem }) {
  const status = computeDisplayStatus(campaign);
  const open = isCampaignOpen(status);
  const endsAt = formatShortDate(campaign.endsAt);

  return (
    <Card
      as="article"
      interactive={open}
      surface="highest"
      className={cn('group relative overflow-hidden', !open && 'opacity-75')}
    >
      <div className="pointer-events-none absolute top-sm left-sm z-10 flex flex-col items-start gap-xs">
        <CampaignStatusBadge status={status} />
        {campaign.isSponsored && <SponsoredLabel />}
      </div>

      <div className="relative h-40 w-full overflow-hidden border-b-2 border-on-background bg-surface-dim">
        <Photo
          media={campaign.cover}
          context="card"
          className={cn(
            // `transition-filter`, não `transition-all`: animar tudo faz o
            // navegador observar propriedades que nunca mudam.
            'transition-[filter] duration-300',
            open ? 'grayscale group-hover:grayscale-0' : 'grayscale',
          )}
        />
      </div>

      <div className="flex flex-1 flex-col gap-xs p-sm">
        <p className="font-mono text-meta-mono text-on-surface-variant uppercase">
          {campaignTypeLabel(campaign.type)}
          {endsAt && ` · até ${endsAt}`}
        </p>

        <h3 className="font-display text-[1.5rem] leading-none uppercase">
          <Link
            href={`/sorteios/${campaign.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {campaign.title}
          </Link>
        </h3>

        {campaign.restaurant && (
          <p className="text-body-sm text-on-surface-variant">{campaign.restaurant.name}</p>
        )}
      </div>

      <div className="ink-dashed" />

      <div className="bg-surface p-sm">
        <span
          aria-hidden="true"
          className="ink-border flex w-full items-center justify-center py-xs font-mono text-label-mono uppercase transition-colors group-hover:bg-on-background group-hover:text-surface"
        >
          {open ? 'Participar' : 'Ver detalhes'}
        </span>
      </div>
    </Card>
  );
}
