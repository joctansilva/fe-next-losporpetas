import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Photo } from '@/components/ui/photo';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import { Stamp } from '@/components/ui/stamp';
import { canShowApprovalStamp, isPartner, priceLabel } from '@/domain/restaurant';
import type { RestaurantListItem } from '@/domain/restaurant';
import { cn } from '@/lib/cn';
import { Icons, ICON_SIZE } from '@/lib/icons';

/**
 * `hero`    — 2 colunas, "Destaques de hoje" na home
 * `default` — 3 colunas, diretório
 * `compact` — 4 colunas, "Acabou de entrar no mapa"
 * `mini`    — relacionados, na página do restaurante
 */
type CardVariant = 'hero' | 'default' | 'compact' | 'mini';

type RestaurantCardProps = {
  restaurant: RestaurantListItem;
  variant?: CardVariant;
  /** Etiqueta livre do layout ("TOP PICK"). */
  highlight?: string;
  /** Veio de um slot patrocinado — exige rótulo "Publi". */
  sponsored?: boolean;
  /** `true` só no card de LCP da página. */
  priority?: boolean;
  className?: string;
};

const IMAGE_HEIGHT: Record<CardVariant, string> = {
  hero: 'h-64 md:h-80',
  default: 'h-56',
  compact: 'h-32',
  mini: 'aspect-video',
};

const TITLE_CLASS: Record<CardVariant, string> = {
  hero: 'text-[clamp(2rem,5vw,3rem)]',
  default: 'text-headline-md',
  compact: 'text-[1.5rem]',
  mini: 'text-[1.5rem]',
};

/**
 * Card de restaurante — uma implementação para as 4 densidades do layout.
 *
 * São o mesmo dado e a mesma semântica em tamanhos diferentes; quatro
 * componentes separados divergiriam em três meses.
 *
 * ⚠️ **Carimbo × selo de parceiro.** O carimbo sai de `canShowApprovalStamp`,
 * que olha só a curadoria editorial. O selo "PARCEIRO" sai de `isPartner`, que
 * olha só o comercial. São independentes de propósito — ver o risco R1 e
 * documentation/03-MODELO-DE-DADOS.md §3.6.
 *
 * O card inteiro parece clicável, mas quem carrega o link é o título: assim o
 * leitor de tela anuncia um link com nome útil, em vez de "link" sem contexto.
 */
export function RestaurantCard({
  restaurant,
  variant = 'default',
  highlight,
  sponsored = false,
  priority = false,
  className,
}: RestaurantCardProps) {
  const href = `/restaurantes/${restaurant.slug}`;
  const approved = canShowApprovalStamp(restaurant);
  const partner = isPartner(restaurant);
  const price = priceLabel(restaurant.priceRange);
  const isCompact = variant === 'compact' || variant === 'mini';

  return (
    <Card
      as="article"
      interactive
      surface={variant === 'compact' ? 'lowest' : 'default'}
      className={cn('group relative overflow-hidden', className)}
    >
      {/* Etiquetas sobre a imagem */}
      <div className="pointer-events-none absolute top-sm left-sm z-10 flex flex-col items-start gap-xs">
        {sponsored && <SponsoredLabel />}
        {partner && !sponsored && <Badge tone="ink">Parceiro</Badge>}
      </div>

      {highlight && (
        <div className="pointer-events-none absolute top-sm right-sm z-10">
          <Badge
            tone="primary"
            className="ink-border shadow-[2px_2px_0_0_var(--color-on-background)]"
          >
            {highlight}
          </Badge>
        </div>
      )}

      <div
        className={cn(
          'relative w-full overflow-hidden border-b-2 border-on-background bg-surface-dim',
          IMAGE_HEIGHT[variant],
        )}
      >
        <Photo
          media={restaurant.cover}
          context={variant === 'hero' ? 'hero' : variant === 'compact' ? 'compact' : 'card'}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {approved && variant === 'hero' && (
          <Stamp size="sm" className="absolute right-md bottom-md z-10" />
        )}
      </div>

      <div className={cn('flex flex-1 flex-col gap-sm', isCompact ? 'p-sm' : 'p-md')}>
        <div className="flex items-start justify-between gap-sm">
          <h3 className={cn('font-display leading-none', TITLE_CLASS[variant])}>
            {/* `after:absolute inset-0` faz o card inteiro clicável sem aninhar
                links nem criar um <div onClick> inacessível. */}
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {restaurant.name}
            </Link>
          </h3>

          {price && !isCompact && <Badge tone="outline">{price}</Badge>}
        </div>

        <div className="flex flex-wrap items-center gap-xs">
          <span className="font-mono text-meta-mono font-bold text-primary uppercase">
            {restaurant.category.name}
          </span>
          <span className="font-mono text-meta-mono text-on-surface-variant uppercase">
            · {restaurant.neighborhood.name}
          </span>
          {price && isCompact && (
            <span className="font-mono text-meta-mono text-on-surface-variant">· {price}</span>
          )}
        </div>

        {restaurant.teaser && !isCompact && (
          <p className="line-clamp-2 text-body-md text-on-surface-variant">{restaurant.teaser}</p>
        )}

        {variant === 'hero' && (
          <span
            aria-hidden="true"
            className={cn(buttonClassName({ variant: 'primary', fullWidth: true }), 'mt-auto')}
          >
            Descobrir
          </span>
        )}

        {variant === 'default' && (
          <span
            aria-hidden="true"
            className={cn(
              buttonClassName({ variant: 'secondary', fullWidth: true }),
              'mt-auto group-hover:bg-primary group-hover:text-on-primary',
            )}
          >
            Ver indicação
            <Icons.arrowRight size={ICON_SIZE.sm} />
          </span>
        )}

        {isCompact && (
          <span aria-hidden="true" className="mt-auto flex justify-end pt-sm text-on-background">
            <Icons.arrowRight
              size={ICON_SIZE.sm}
              className="rounded-full border-2 border-on-background p-xs"
            />
          </span>
        )}
      </div>
    </Card>
  );
}
