import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { buttonClassName } from '@/components/ui/button';

/**
 * Home / Descobrir.
 *
 * ⚠️ Ainda é um marcador — a home real (hero, destaques, categorias, novidades,
 * ações e CTA de indicação) é construída na Fase 1.3, a partir de
 * `documentation/referencia/home_stitch.html`.
 */
export function HomeView() {
  return (
    <Container
      as="section"
      className="flex flex-1 flex-col items-center justify-center gap-md py-xl text-center"
    >
      <p className="font-mono text-label-mono text-primary uppercase">Em construção · Fase 1.3</p>
      <h1 className="text-display-xl">Onde comer hoje?</h1>
      <p className="max-w-xl text-body-lg text-on-surface-variant">
        Lugares que o Porpetas provou, aprovou e colocou no mapa.
      </p>

      {process.env.NODE_ENV !== 'production' && (
        <Link
          href="/dev/design-system"
          className={buttonClassName({ variant: 'secondary', className: 'mt-md' })}
        >
          Ver o design system
        </Link>
      )}
    </Container>
  );
}
