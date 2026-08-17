import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { buttonClassName } from '@/components/ui/button';
import { Icons, ICON_SIZE } from '@/lib/icons';
import { SOCIAL_LINKS } from '@/lib/site';

/**
 * Página de contato.
 *
 * Enquanto não há formulário nem e-mail configurado (Fase 3), o caminho real é
 * o Instagram — que é onde a audiência já está. Melhor mandar para um canal que
 * funciona do que exibir um endereço de e-mail que ninguém lê.
 */
export function ContactView() {
  const instagram = SOCIAL_LINKS.find((link) => link.label === 'Instagram');

  return (
    <Container as="section" className="flex flex-col gap-lg py-xl">
      <header className="flex flex-col gap-sm border-b-2 border-on-background pb-md">
        <h1 className="text-display-xl leading-none">Contato</h1>
        <p className="max-w-2xl text-body-lg text-on-surface-variant">
          Sugestão de lugar, proposta de parceria ou qualquer outro papo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-md md:grid-cols-3">
        <article className="ink-border flex flex-col gap-sm bg-surface-container-low p-md">
          <Icons.add size={ICON_SIZE.lg} aria-hidden="true" className="text-primary" />
          <h2 className="text-headline-md leading-none">Indicar um lugar</h2>
          <p className="flex-grow text-body-md text-on-surface-variant">
            Conhece um restaurante que precisa entrar no guia? Manda pra gente — toda indicação
            passa pela curadoria.
          </p>
          <Link href="/indicar" className={buttonClassName({ variant: 'primary' })}>
            Indicar restaurante
          </Link>
        </article>

        <article className="ink-border flex flex-col gap-sm bg-surface-container-low p-md">
          <Icons.store size={ICON_SIZE.lg} aria-hidden="true" className="text-primary" />
          <h2 className="text-headline-md leading-none">Sou restaurante</h2>
          <p className="flex-grow text-body-md text-on-surface-variant">
            Quer conversar sobre indicação, destaque ou uma ação em conjunto?
          </p>
          <Link href="/seja-parceiro" className={buttonClassName({ variant: 'secondary' })}>
            Seja parceiro
          </Link>
        </article>

        <article className="ink-border flex flex-col gap-sm bg-surface-container-low p-md">
          <Icons.instagram size={ICON_SIZE.lg} aria-hidden="true" className="text-primary" />
          <h2 className="text-headline-md leading-none">Direct no Instagram</h2>
          <p className="flex-grow text-body-md text-on-surface-variant">
            O canal mais rápido para falar com a gente. É lá que a conversa acontece.
          </p>
          {instagram && (
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({ variant: 'secondary' })}
            >
              Abrir Instagram
              <Icons.externalLink size={ICON_SIZE.sm} aria-hidden="true" />
            </a>
          )}
        </article>
      </div>
    </Container>
  );
}
