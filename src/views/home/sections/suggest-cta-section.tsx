import Link from 'next/link';
import { buttonClassName } from '@/components/ui/button';
import { SUGGEST_CTA } from '@/lib/site';

/**
 * Faixa de CTA "Indicar um lugar".
 *
 * Fecha a home pedindo participação — é o que alimenta a fila de curadoria.
 *
 * Na Fase 3.2 este link passa a abrir o modal de sugestão; a rota `/indicar`
 * continua existindo como caminho sem JavaScript e como destino linkável do
 * Instagram.
 */
export function SuggestCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-primary px-margin-mobile py-xl text-center text-on-primary md:px-margin-desktop">
      <div aria-hidden="true" className="absolute inset-0 dot-pattern opacity-10" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="mb-md max-w-3xl text-display-xl leading-[0.9]">
          Conhece um lugar que precisa aparecer aqui?
        </h2>

        <p className="mb-lg max-w-xl text-body-lg">
          O submundo gastronômico é feito de descobertas. Se você tem aquele pico secreto incrível,
          manda pra gente.
        </p>

        <Link
          href={SUGGEST_CTA.href}
          className={buttonClassName({ variant: 'secondary', size: 'lg' })}
        >
          Indicar restaurante
        </Link>
      </div>
    </section>
  );
}
