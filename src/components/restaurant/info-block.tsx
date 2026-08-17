import { buttonClassName } from '@/components/ui/button';
import {
  directionsUrl,
  formatOpeningHours,
  priceDescription,
  priceLabel,
  type RestaurantDetail,
} from '@/domain/restaurant';
import { Icons, ICON_SIZE, type LucideIcon } from '@/lib/icons';

/**
 * Bloco de informações práticas: endereço, horário, preço médio e contato.
 *
 * ⚠️ **Cada linha some quando o dado não existe.** É a regra mais importante
 * aqui: metade das fixtures não tem telefone, um terço não tem horário, e o
 * cadastro real vai ser igual. Um bloco com "Horário: —" comunica descuido.
 *
 * O mini-mapa é um placeholder com o botão "Como chegar" por cima: mapa
 * interativo está fora do MVP e não vale 200 KB de JavaScript por uma imagem
 * decorativa (ver 05-INTEGRACOES-E-RISCOS.md §1.1). A imagem estática entra na
 * Fase 7.
 */
export function InfoBlock({ restaurant }: { restaurant: RestaurantDetail }) {
  const hours = formatOpeningHours(restaurant.openingHours);
  const price = priceLabel(restaurant.priceRange);
  const directions = directionsUrl(restaurant);

  const hasAnyInfo =
    restaurant.addressLine || hours.length > 0 || price || restaurant.phone || directions;

  if (!hasAnyInfo) return null;

  return (
    <aside className="ink-border flex flex-col gap-md bg-surface-container-low p-md">
      <h2 className="border-b-2 border-on-background pb-xs text-headline-md">Informações</h2>

      <ul className="flex flex-col gap-sm text-body-md">
        {restaurant.addressLine && (
          <InfoRow icon={Icons.location} label="Endereço">
            <span>{restaurant.addressLine}</span>
            {restaurant.addressExtra && <span>{restaurant.addressExtra}</span>}
            <span className="text-body-sm text-on-surface-variant">
              {restaurant.neighborhood.name}, {restaurant.city} - {restaurant.state}
            </span>
          </InfoRow>
        )}

        {hours.length > 0 && (
          <InfoRow icon={Icons.schedule} label="Horário">
            {hours.map((period) => (
              <span key={period.days}>
                {period.days}: {period.hours}
              </span>
            ))}
            {restaurant.openingHours?.note && (
              <span className="text-body-sm text-on-surface-variant">
                {restaurant.openingHours.note}
              </span>
            )}
          </InfoRow>
        )}

        {price && (
          <InfoRow icon={Icons.price} label="Preço médio">
            <span>
              {price}
              {priceDescription(restaurant.priceRange) && (
                <span className="text-body-sm text-on-surface-variant">
                  {' '}
                  · {priceDescription(restaurant.priceRange)}
                </span>
              )}
            </span>
          </InfoRow>
        )}

        {restaurant.phone && (
          <InfoRow icon={Icons.phone} label="Contato">
            <a href={`tel:${restaurant.phone.replace(/\D/g, '')}`} className="underline">
              {restaurant.phone}
            </a>
          </InfoRow>
        )}
      </ul>

      {directions && (
        <div className="ink-border relative flex h-40 items-center justify-center bg-surface-variant">
          <Icons.map
            size={ICON_SIZE.display}
            aria-hidden="true"
            className="absolute text-on-surface/20"
          />
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName({ variant: 'primary', className: 'relative z-10' })}
          >
            <Icons.directions size={ICON_SIZE.sm} aria-hidden="true" />
            Como chegar
          </a>
        </div>
      )}
    </aside>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-sm border-b-2 border-on-background/20 pb-sm">
      <Icon size={ICON_SIZE.md} aria-hidden="true" className="mt-xs shrink-0" />
      <div className="flex flex-col">
        <span className="font-bold">{label}</span>
        {children}
      </div>
    </li>
  );
}
