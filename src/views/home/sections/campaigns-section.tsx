import { Container } from '@/components/layout/container';
import { CampaignTicket } from '@/components/campaign/campaign-ticket';
import type { CampaignListItem } from '@/domain/campaign';

/**
 * "Ações & Sorteios" — o motor de engajamento na home.
 *
 * Some inteira quando não há campanha rolando, como as demais seções opcionais.
 *
 * O `notchColor` acompanha o fundo desta seção: sem isso, o furo lateral do
 * ticket vira um círculo sobreposto em vez de um recorte.
 */
export function CampaignsSection({ campaigns }: { campaigns: CampaignListItem[] }) {
  if (campaigns.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-surface-container py-xl">
      <Container>
        <h2 className="mb-lg text-center text-headline-lg">Ações &amp; Sorteios</h2>

        <div className="flex flex-col items-center justify-center gap-lg md:flex-row md:items-stretch">
          {campaigns.map((campaign) => (
            <CampaignTicket
              key={campaign.id}
              campaign={campaign}
              notchColor="var(--color-surface-container)"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
