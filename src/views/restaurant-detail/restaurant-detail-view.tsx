import { Container } from '@/components/layout/container';
import { CampaignAlert } from '@/components/campaign/campaign-alert';
import { EditorialReview } from '@/components/restaurant/editorial-review';
import { ExperienceTags } from '@/components/restaurant/experience-tags';
import { Gallery } from '@/components/restaurant/gallery';
import { InfoBlock } from '@/components/restaurant/info-block';
import { RelatedRestaurants } from '@/components/restaurant/related-restaurants';
import { RestaurantHero } from '@/components/restaurant/restaurant-hero';
import type { CampaignListItem } from '@/domain/campaign';
import type { RestaurantDetail, RestaurantListItem } from '@/domain/restaurant';

type RestaurantDetailViewProps = {
  restaurant: RestaurantDetail;
  campaigns: CampaignListItem[];
  related: RestaurantListItem[];
};

/**
 * Página do restaurante — a mais importante do produto.
 *
 * É onde o tráfego do Instagram aterrissa e o que é compartilhado. Estrutura do
 * layout: hero em tela cheia, coluna editorial de 8 e barra lateral de 4.
 *
 * ⚠️ **Quase tudo aqui é opcional.** Review, galeria, tags, campanha e
 * informações somem quando não há dado, e a página continua fazendo sentido —
 * o mínimo publicável é foto de capa, nome, categoria e bairro. As fixtures
 * cobrem esses casos de propósito.
 */
export function RestaurantDetailView({
  restaurant,
  campaigns,
  related,
}: RestaurantDetailViewProps) {
  return (
    <>
      <RestaurantHero restaurant={restaurant} />

      <Container as="div" className="grid grid-cols-4 gap-gutter py-xl md:grid-cols-12">
        <div className="col-span-4 flex flex-col gap-xl md:col-span-8">
          <EditorialReview review={restaurant.review} />

          {restaurant.description && !restaurant.review && (
            <p className="text-body-lg text-on-surface-variant">{restaurant.description}</p>
          )}

          <ExperienceTags tags={restaurant.tags} />

          <Gallery media={restaurant.gallery} />
        </div>

        <div className="col-span-4 flex flex-col gap-lg">
          <CampaignAlert campaigns={campaigns} />
          <InfoBlock restaurant={restaurant} />
        </div>
      </Container>

      <RelatedRestaurants restaurants={related} />
    </>
  );
}
