import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { RestaurantCard } from '@/components/restaurant/restaurant-card';
import type { RestaurantListItem } from '@/domain/restaurant';

type HighlightsSectionProps = {
  restaurants: RestaurantListItem[];
  /** Slots patrocinados exigem o rótulo "Publi" no card. */
  sponsoredIds?: string[];
};

/**
 * "Destaques de hoje" — a curadoria manual da home.
 *
 * Na Fase 2 os itens vêm de `featured_slots`; aqui chegam por prop. A seção
 * **some inteira** quando não há destaque: melhor ausente do que com um buraco.
 *
 * O primeiro card recebe `priority` por ser a maior imagem acima da dobra — é o
 * LCP da home. Só ele: `priority` em várias imagens anula o próprio efeito.
 */
export function HighlightsSection({ restaurants, sponsoredIds = [] }: HighlightsSectionProps) {
  if (restaurants.length === 0) return null;

  return (
    <section className="w-full bg-surface-container-highest py-xl">
      <Container>
        <SectionHeading
          title="Destaques de hoje"
          size="display"
          action={{ label: 'Ver todos', href: '/restaurantes' }}
          className="mb-lg"
        />

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              variant="hero"
              highlight={index === 0 ? 'Top pick' : undefined}
              sponsored={sponsoredIds.includes(restaurant.id)}
              priority={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
