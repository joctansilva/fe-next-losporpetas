import Link from 'next/link';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import { computeDisplayStatus, formatShortDate, type CampaignListItem } from '@/domain/campaign';
import { cn } from '@/lib/cn';
import { CampaignStatusBadge } from './campaign-status-badge';

type CampaignTicketProps = {
  campaign: CampaignListItem;
  /** Cor do "furo" lateral — deve ser a cor do fundo da seção. */
  notchColor?: string;
  className?: string;
};

/**
 * Card de ação/sorteio no formato de canhoto de ingresso — o da home.
 *
 * O selo circular à esquerda usa o tipo da campanha como texto curto, no lugar
 * do "50% OFF" que estava chumbado no layout do Stitch: o modelo é polimórfico
 * e nem toda ação é desconto.
 *
 * `notchColor` existe porque o furo lateral só parece furo se tiver a cor do
 * fundo atrás — e o componente não tem como saber em que seção foi colocado.
 */
export function CampaignTicket({ campaign, notchColor, className }: CampaignTicketProps) {
  const status = computeDisplayStatus(campaign);
  const endsAt = formatShortDate(campaign.endsAt);

  return (
    <article
      className={cn(
        'ticket-shape ink-border ink-lift group relative flex w-full max-w-md flex-col items-center gap-md bg-surface-container-highest p-md md:flex-row',
        className,
      )}
      style={notchColor ? ({ '--ticket-notch': notchColor } as React.CSSProperties) : undefined}
    >
      <div
        aria-hidden="true"
        className="flex size-24 shrink-0 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-on-background bg-primary text-on-primary"
      >
        <span className="font-display text-[1.75rem] leading-none uppercase">
          {campaign.type === 'giveaway' ? 'Sorteio' : 'Ação'}
        </span>
      </div>

      <div className="flex-grow border-t-2 border-dashed border-on-background pt-md text-center md:border-t-0 md:border-l-2 md:pt-0 md:pl-md md:text-left">
        <h3 className="font-display text-[1.75rem] leading-none uppercase">
          <Link
            href={`/sorteios/${campaign.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {campaign.title}
          </Link>
        </h3>

        {campaign.restaurant && (
          <p className="mt-xs font-mono text-meta-mono text-on-surface-variant uppercase">
            No {campaign.restaurant.name}
          </p>
        )}

        <div className="mt-sm flex flex-wrap items-center justify-center gap-xs md:justify-start">
          <CampaignStatusBadge status={status} />
          {campaign.isSponsored && <SponsoredLabel />}
          {endsAt && status !== 'ended' && (
            <span className="font-mono text-meta-mono text-on-surface-variant uppercase">
              Até {endsAt}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
