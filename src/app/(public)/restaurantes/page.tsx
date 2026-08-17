import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata = {
  title: 'Restaurantes',
  description: 'Todos os restaurantes aprovados pelo Porpetas, com busca e filtros.',
};

export default function RestaurantesPage() {
  return (
    <PagePlaceholder
      title="Restaurantes"
      phase="Fase 1.4"
      description="O diretório completo, com busca, filtros por categoria, bairro, faixa de preço e tipo de experiência."
    />
  );
}
