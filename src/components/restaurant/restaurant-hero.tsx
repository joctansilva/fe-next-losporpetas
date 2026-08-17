import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button';
import { Photo } from '@/components/ui/photo';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import { Stamp } from '@/components/ui/stamp';
import {
  canShowApprovalStamp,
  directionsUrl,
  instagramUrl,
  isPartner,
  priceLabel,
  type RestaurantDetail,
} from '@/domain/restaurant';
import { Icons, ICON_SIZE } from '@/lib/icons';

/**
 * Topo da página do restaurante.
 *
 * É a primeira impressão de quem chega do Instagram — o layout aposta em foto
 * grande, nome enorme e dois caminhos de saída ("Ver Instagram" e
 * "Como chegar").
 *
 * ⚠️ **O gradiente escuro é funcional, não decorativo.** O texto é branco sobre
 * foto arbitrária; sem a camada escura não há contraste garantido, e nenhuma
 * foto pode ser confiada para isso.
 *
 * Cada CTA some quando o dado não existe (restaurante sem Instagram, sem
 * endereço e sem coordenada). Botão que não leva a lugar nenhum é pior que
 * botão ausente.
 */
export function RestaurantHero({ restaurant }: { restaurant: RestaurantDetail }) {
  const approved = canShowApprovalStamp(restaurant);
  const partner = isPartner(restaurant);
  const instagram = instagramUrl(restaurant.instagramHandle);
  const directions = directionsUrl(restaurant);
  const price = priceLabel(restaurant.priceRange);

  return (
    <section className="relative flex min-h-[70vh] w-full items-end border-b-2 border-on-background md:min-h-[36rem]">
      <div className="absolute inset-0 bg-surface-dim">
        <Photo media={restaurant.cover} context="fullWidth" priority />
      </div>

      {/* Camada de contraste — sem ela o texto branco pode sumir na foto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
      />

      <div className="page-container relative z-10 flex flex-col items-end justify-between gap-md pb-lg md:flex-row">
        <div className="flex w-full flex-col gap-sm text-white md:w-2/3">
          <div className="flex flex-wrap items-center gap-sm">
            <Badge tone="mustard" size="md">
              {restaurant.category.name}
            </Badge>
            <Badge tone="ink" size="md" className="border-2 border-white">
              {restaurant.neighborhood.name}
            </Badge>
            {price && (
              <Badge tone="ink" size="md" className="border-2 border-white">
                {price}
              </Badge>
            )}
            {partner && <SponsoredLabel kind="partner" />}
          </div>

          <h1 className="text-display-xl text-white drop-shadow-md">{restaurant.name}</h1>

          {restaurant.addressLine && (
            <p className="max-w-2xl text-body-lg text-white/90">
              {restaurant.addressLine} — {restaurant.neighborhood.name}, {restaurant.city} -{' '}
              {restaurant.state}
            </p>
          )}

          {(instagram || directions) && (
            <div className="mt-xs flex flex-wrap gap-sm">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({ variant: 'primary' })}
                >
                  <Icons.instagram size={ICON_SIZE.sm} aria-hidden="true" />
                  Ver Instagram
                </a>
              )}

              {directions && (
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({ variant: 'inverse' })}
                >
                  <Icons.directions size={ICON_SIZE.sm} aria-hidden="true" />
                  Como chegar
                </a>
              )}
            </div>
          )}
        </div>

        {approved && <Stamp size="lg" className="hidden shrink-0 md:flex" />}
      </div>
    </section>
  );
}
