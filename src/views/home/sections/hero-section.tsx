import { Container } from '@/components/layout/container';
import { Stamp } from '@/components/ui/stamp';
import { Icons, ICON_SIZE } from '@/lib/icons';

/**
 * Hero da home: a pergunta que traz o usuário e a busca gigante.
 *
 * ⚠️ A busca é um `<form method="get" action="/restaurantes">`, não um campo
 * controlado por React. Consequências: funciona sem JavaScript, a navegação é
 * uma troca de rota (não um fetch), o resultado é uma URL compartilhável e a
 * seção inteira continua sendo Server Component.
 *
 * O botão "minha localização" do layout do Stitch foi **removido**, não
 * escondido: depende de geolocalização e ordenação por distância, que estão
 * fora do MVP (ver Fase 7). Botão que não faz nada é pior que botão ausente.
 */
export function HeroSection() {
  return (
    <Container
      as="section"
      className="relative flex min-h-[60vh] flex-col items-center justify-center py-xl text-center"
    >
      <div className="relative z-10 w-full max-w-4xl">
        <Stamp
          size="lg"
          className="absolute -top-12 -right-4 z-0 opacity-90 md:-top-16 md:-right-12"
        />

        <h1 className="relative z-10 mb-sm text-display-xl leading-[0.85] md:text-[7.5rem]">
          Onde comer hoje?
        </h1>

        <p className="mx-auto mb-xl max-w-2xl text-body-lg text-on-surface-variant">
          Lugares que o Porpetas provou, aprovou e colocou no mapa.
        </p>

        <form
          action="/restaurantes"
          method="get"
          role="search"
          className="ink-border ink-shadow ink-lift flex w-full items-center bg-surface-container-lowest p-md"
        >
          <label htmlFor="busca-home" className="sr-only">
            Buscar por restaurante, bairro ou categoria
          </label>

          <Icons.search
            size={ICON_SIZE.xl}
            aria-hidden="true"
            className="mr-md shrink-0 text-primary"
          />

          <input
            id="busca-home"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Buscar por restaurante, bairro ou categoria..."
            className="w-full min-w-0 border-none bg-transparent p-0 font-display text-[1.5rem] text-on-background uppercase placeholder:text-on-surface-variant/50 focus:ring-0 focus:outline-none md:text-headline-md"
          />

          <button
            type="submit"
            aria-label="Buscar"
            className="ink-border ml-sm flex size-11 shrink-0 items-center justify-center bg-surface-container-highest transition-colors hover:bg-primary hover:text-on-primary"
          >
            <Icons.arrowRight size={ICON_SIZE.md} aria-hidden="true" />
          </button>
        </form>
      </div>
    </Container>
  );
}
