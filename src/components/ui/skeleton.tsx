import { cn } from '@/lib/cn';

type SkeletonProps = {
  variant?: 'text' | 'title' | 'image' | 'card';
  className?: string;
};

const VARIANT_CLASS = {
  text: 'h-4 w-full',
  title: 'h-8 w-2/3',
  image: 'h-48 w-full',
  card: 'h-72 w-full',
} as const;

/**
 * Placeholder de carregamento.
 *
 * `aria-hidden`: quem usa leitor de tela não deve ouvir uma lista de caixas
 * cinzas. O anúncio do carregamento é feito pelo container, com `aria-busy`.
 *
 * A pulsação respeita `prefers-reduced-motion` pela regra global do globals.css.
 */
export function Skeleton({ variant = 'text', className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('ink-border animate-pulse bg-surface-dim', VARIANT_CLASS[variant], className)}
    />
  );
}

/** Esqueleto de um card de restaurante, usado nos `loading.tsx` do diretório. */
export function RestaurantCardSkeleton() {
  return (
    <div className="ink-border flex flex-col bg-surface-container-low">
      <div className="h-56 animate-pulse border-b-2 border-on-background bg-surface-dim" />
      <div className="flex flex-col gap-sm p-md">
        <Skeleton variant="title" />
        <Skeleton className="w-1/3" />
        <Skeleton />
        <Skeleton className="w-4/5" />
      </div>
    </div>
  );
}
