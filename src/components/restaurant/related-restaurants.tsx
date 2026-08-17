import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import type { RestaurantListItem } from '@/domain/restaurant';
import { RestaurantCard } from './restaurant-card';

/**
 * "Conheça mais lugares aprovados".
 *
 * Fecha a página oferecendo um próximo passo — sem isso o visitante que veio do
 * Instagram lê uma página e vai embora. É a seção que transforma uma visita em
 * navegação pelo guia.
 */
export function RelatedRestaurants({ restaurants }: { restaurants: RestaurantListItem[] }) {
  if (restaurants.length === 0) return null;

  return (
    <Container as="section" className="border-t-2 border-on-background py-xl">
      <SectionHeading title="Conheça mais lugares aprovados" className="mb-md" />

      <ul className="grid grid-cols-1 gap-md md:grid-cols-3">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="contents">
            <RestaurantCard restaurant={restaurant} variant="mini" />
          </li>
        ))}
      </ul>
    </Container>
  );
}
