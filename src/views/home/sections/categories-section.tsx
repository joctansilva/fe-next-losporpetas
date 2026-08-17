import Link from 'next/link';
import { Container } from '@/components/layout/container';
import type { Taxonomy } from '@/domain/restaurant';
import { getCategoryIcon, Icons, ICON_SIZE } from '@/lib/icons';

type CategoryTile = Taxonomy & { icon?: string | null };

type CategoriesSectionProps = {
  categories: CategoryTile[];
  /** Quantos ladrilhos antes do "Ver todas". O layout mostra 5 + 1. */
  limit?: number;
};

/**
 * "Explore por categoria" — a faixa escura da home.
 *
 * Cada ladrilho é um link real para `/categorias/[slug]`, então a seção também
 * distribui autoridade interna para as páginas de cauda longa (Fase 2.5).
 *
 * O último ladrilho é sempre "Ver todas", como no layout.
 */
export function CategoriesSection({ categories, limit = 5 }: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  const visible = categories.slice(0, limit);

  return (
    <section className="w-full bg-on-background py-xl text-surface">
      <Container>
        <h2 className="mb-lg text-center text-headline-lg text-surface">Explore por categoria</h2>

        <ul className="grid grid-cols-2 gap-sm md:grid-cols-4 md:gap-md lg:grid-cols-6">
          {visible.map((category) => {
            const Icon = getCategoryIcon(category.icon);

            return (
              <li key={category.id} className="contents">
                <Link
                  href={`/categorias/${category.slug}`}
                  className="group flex aspect-square flex-col items-center justify-center border-2 border-surface bg-inverse-surface p-md transition-colors hover:border-primary hover:bg-primary"
                >
                  <Icon
                    size={ICON_SIZE.display}
                    aria-hidden="true"
                    className="mb-xs transition-transform group-hover:scale-110"
                  />
                  <span className="text-center font-mono text-label-mono font-bold uppercase">
                    {category.name}
                  </span>
                </Link>
              </li>
            );
          })}

          <li className="contents">
            <Link
              href="/restaurantes"
              className="group flex aspect-square flex-col items-center justify-center border-2 border-surface bg-inverse-surface p-md transition-colors hover:border-surface hover:bg-surface hover:text-on-surface"
            >
              <Icons.arrowRight
                size={ICON_SIZE.display}
                aria-hidden="true"
                className="mb-xs transition-transform group-hover:scale-110"
              />
              <span className="text-center font-mono text-label-mono font-bold uppercase">
                Ver todas
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
