import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button';
import { Photo } from '@/components/ui/photo';
import type { CampaignRestaurant } from '@/domain/campaign';
import { Icons, ICON_SIZE } from '@/lib/icons';

/**
 * Card do restaurante parceiro, na lateral da página do sorteio.
 *
 * Não é decoração: é a conversão do fluxo. O sorteio existe para trazer a
 * pessoa até o guia, e este card é o caminho de volta ao conteúdo editorial
 * (ver documentation/04-MAPA-DE-PAGINAS-E-FLUXOS.md §5.2).
 *
 * Some quando a campanha não tem restaurante vinculado — o modelo permite ação
 * do próprio LOSPORPETAS, sem parceiro.
 */
export function PartnerSidebar({ restaurant }: { restaurant: CampaignRestaurant | null }) {
  if (!restaurant) return null;

  return (
    <section className="flex flex-col gap-md">
      <h2 className="flex items-center gap-sm text-headline-md">
        <Icons.store size={ICON_SIZE.lg} aria-hidden="true" className="text-primary" />
        Parceiro
      </h2>

      <div className="ink-border flex flex-col bg-surface-container-highest">
        <div className="relative h-48 w-full border-b-2 border-on-background bg-surface-dim">
          <Photo media={restaurant.cover} context="card" />
        </div>

        <div className="flex flex-col gap-sm p-md">
          <h3 className="text-headline-md leading-none">{restaurant.name}</h3>

          {restaurant.teaser && (
            <p className="text-body-sm text-on-surface-variant">{restaurant.teaser}</p>
          )}

          <div className="mt-xs flex flex-wrap gap-xs">
            {restaurant.category && <Badge tone="outline">{restaurant.category}</Badge>}
            {restaurant.neighborhood && <Badge tone="outline">{restaurant.neighborhood}</Badge>}
          </div>

          <Link
            href={`/restaurantes/${restaurant.slug}`}
            className={buttonClassName({
              variant: 'secondary',
              fullWidth: true,
              className: 'mt-sm',
            })}
          >
            Conhecer restaurante
          </Link>
        </div>
      </div>
    </section>
  );
}
