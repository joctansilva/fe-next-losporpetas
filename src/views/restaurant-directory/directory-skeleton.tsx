import { Container } from '@/components/layout/container';
import { RestaurantCardSkeleton, Skeleton } from '@/components/ui/skeleton';

/**
 * Esqueleto do diretório, exibido enquanto a página carrega.
 *
 * `aria-busy` no container e `aria-hidden` nos blocos: quem usa leitor de tela
 * ouve "carregando", não uma lista de caixas cinzas.
 */
export function DirectorySkeleton() {
  return (
    <Container as="div" className="flex flex-col gap-xl py-xl" aria-busy="true">
      <span className="sr-only" role="status">
        Carregando restaurantes…
      </span>

      <header className="flex flex-col items-center gap-lg border-b-2 border-on-background pb-lg">
        <Skeleton variant="title" className="h-12 w-full max-w-2xl" />
        <Skeleton className="h-12 w-full max-w-4xl" />

        <div className="flex flex-wrap justify-center gap-sm">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-28" />
          ))}
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3 lg:gap-lg">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className="contents">
            <RestaurantCardSkeleton />
          </li>
        ))}
      </ul>
    </Container>
  );
}
