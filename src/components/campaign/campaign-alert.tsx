import Link from 'next/link';
import { buttonClassName } from '@/components/ui/button';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import {
  campaignTypeLabel,
  formatShortDate,
  requiresGiveawayDisclaimer,
  type CampaignListItem,
} from '@/domain/campaign';

/**
 * Bloco "Tem ação rolando!" na página do restaurante.
 *
 * Só aparece quando há campanha ativa ligada ao lugar — é o gancho que leva
 * quem estava só olhando o restaurante para a página do sorteio.
 *
 * ⚠️ Campanha do tipo `giveaway` exibe o aviso de que a promoção acontece no
 * Instagram oficial. Não é detalhe de copy: deixa claro quem opera o sorteio,
 * que é a base da posição de "vitrine" assumida no risco R17.
 */
export function CampaignAlert({ campaigns }: { campaigns: CampaignListItem[] }) {
  if (campaigns.length === 0) return null;

  return (
    <div className="flex flex-col gap-md">
      {campaigns.map((campaign) => {
        const endsAt = formatShortDate(campaign.endsAt);

        return (
          <section
            key={campaign.id}
            className="ink-border ink-shadow relative overflow-hidden bg-primary p-md text-on-primary"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-sm">
              <div className="flex flex-wrap items-center gap-xs">
                <h2 className="text-headline-md">Tem ação rolando!</h2>
                {campaign.isSponsored && <SponsoredLabel />}
              </div>

              <p className="text-body-md">
                <strong>{campaignTypeLabel(campaign.type)}:</strong> {campaign.title}
                {campaign.subtitle && ` — ${campaign.subtitle}`}
                {endsAt && ` Até ${endsAt}.`}
              </p>

              {requiresGiveawayDisclaimer(campaign.type) && (
                <p className="font-mono text-meta-mono uppercase opacity-90">
                  Sorteio realizado via Instagram oficial
                </p>
              )}

              <Link
                href={`/sorteios/${campaign.slug}`}
                className={buttonClassName({ variant: 'secondary', className: 'self-start' })}
              >
                Ver regras
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
