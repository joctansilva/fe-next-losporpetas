import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { RestaurantCard } from '@/components/restaurant/restaurant-card';
import { buttonClassName } from '@/components/ui/button';
import type { RestaurantListItem } from '@/domain/restaurant';

/**
 * "Acabou de entrar no mapa" — os restaurantes publicados mais recentes.
 *
 * É a seção que exercita o card sem foto: parte do acervo entra no guia antes
 * de ter imagem própria, e o layout já previa o estado "FOTO EM BREVE".
 *
 * ⚠️ O botão do layout dizia **"Ver mapa completo"**, mas mapa interativo está
 * fora do MVP (ver documentation/05-INTEGRACOES-E-RISCOS.md §1.1). Trocado por
 * "Ver todos os restaurantes", que leva a um destino que existe. Prometer um
 * mapa que não existe é pior do que não prometer.
 */
export function FreshSection({ restaurants }: { restaurants: RestaurantListItem[] }) {
  if (restaurants.length === 0) return null;

  return (
    <Container as="section" className="bg-surface py-xl">
      <SectionHeading title="Acabou de entrar no mapa" className="mb-lg" />

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 md:grid-cols-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} variant="compact" />
        ))}
      </div>

      <div className="mt-md flex justify-center">
        <Link href="/restaurantes" className={buttonClassName({ variant: 'ghost' })}>
          Ver todos os restaurantes
        </Link>
      </div>
    </Container>
  );
}
