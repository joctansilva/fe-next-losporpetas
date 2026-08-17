import Link from 'next/link';
import { CampaignCard } from '@/components/campaign/campaign-card';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { buttonClassName } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { campaignTypeLabel, type CampaignListItem } from '@/domain/campaign';
import { Icons } from '@/lib/icons';
import { buildCampaignsHref, CAMPAIGN_TYPES, type CampaignFilters } from '@/lib/campaign-filters';

type CampaignListViewProps = {
  filters: CampaignFilters;
  open: CampaignListItem[];
  closed: CampaignListItem[];
};

/**
 * Listagem de ações e sorteios.
 *
 * ⚠️ **Esta página não tem layout do Stitch** — só a de detalhe tem. Montada
 * com os componentes existentes, seguindo a estrutura exigida pelo briefing
 * (seção 4.4): ativos primeiro, encerrados depois, cada ação com status e
 * período.
 *
 * As encerradas ficam visíveis de propósito: são prova social e destino
 * permanente dos posts antigos do Instagram. Escondê-las quebraria links já
 * publicados.
 *
 * O filtro por tipo existe porque o modelo é polimórfico — nem toda ação é
 * sorteio. Os chips são `<Link>`, então filtrar não custa JavaScript.
 */
export function CampaignListView({ filters, open, closed }: CampaignListViewProps) {
  const isEmpty = open.length === 0 && closed.length === 0;

  return (
    <Container as="div" className="flex flex-col gap-xl py-xl">
      <header className="flex flex-col items-center gap-md border-b-2 border-on-background pb-lg text-center">
        <h1 className="text-display-xl leading-none">Ações &amp; Sorteios</h1>
        <p className="max-w-2xl text-body-lg text-on-surface-variant">
          O que está rolando com os parceiros do Porpetas — e o que já rolou.
        </p>

        <div className="flex flex-wrap justify-center gap-sm">
          <Chip href={buildCampaignsHref({ tipo: null })} active={!filters.tipo}>
            Tudo
          </Chip>
          {CAMPAIGN_TYPES.map((type) => (
            <Chip
              key={type}
              href={buildCampaignsHref({ tipo: type })}
              active={filters.tipo === type}
            >
              {campaignTypeLabel(type)}
            </Chip>
          ))}
        </div>
      </header>

      {isEmpty && (
        <EmptyState
          icon={Icons.campaign}
          title={filters.tipo ? 'Nada desse tipo por enquanto' : 'Nenhuma ação no momento'}
          description="Fique de olho — as ações aparecem aqui assim que abrem. Enquanto isso, tem restaurante novo no guia."
          action={
            <div className="flex flex-wrap justify-center gap-sm">
              {filters.tipo && (
                <Link href="/sorteios" className={buttonClassName({ variant: 'secondary' })}>
                  Ver todas
                </Link>
              )}
              <Link href="/restaurantes" className={buttonClassName({ variant: 'primary' })}>
                Explorar restaurantes
              </Link>
            </div>
          }
        />
      )}

      {open.length > 0 && (
        <section className="flex flex-col gap-md">
          <SectionHeading title="Rolando agora" />
          <ul className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {open.map((campaign) => (
              <li key={campaign.id} className="contents">
                <CampaignCard campaign={campaign} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {closed.length > 0 && (
        <section className="flex flex-col gap-md border-t-2 border-on-background pt-lg">
          <SectionHeading title="Já encerradas" size="md" />
          <ul className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {closed.map((campaign) => (
              <li key={campaign.id} className="contents">
                <CampaignCard campaign={campaign} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
