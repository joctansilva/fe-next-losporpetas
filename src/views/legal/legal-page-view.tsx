import { Container } from '@/components/layout/container';
import { LEGAL_IS_PROVISIONAL, LEGAL_UPDATED_AT, type LegalSection } from '@/content/legal';

type LegalPageViewProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * Casca das páginas legais (`/termos`, `/privacidade`).
 *
 * ⚠️ Enquanto `LEGAL_IS_PROVISIONAL` for `true`, a página exibe um aviso
 * **visível** de que o texto é rascunho. Texto jurídico genérico com aparência
 * de definitivo é pior que a ausência dele: cria uma promessa que a operação
 * não cumpre, e quem lê não tem como saber disso.
 *
 * As rotas também saem com `noindex` nesse estado — ver a rota correspondente.
 */
export function LegalPageView({ title, intro, sections }: LegalPageViewProps) {
  return (
    <Container as="article" className="flex flex-col gap-lg py-xl">
      <header className="flex flex-col gap-sm border-b-2 border-on-background pb-md">
        <h1 className="text-display-xl leading-none">{title}</h1>
        <p className="max-w-3xl text-body-lg text-on-surface-variant">{intro}</p>
        <p className="font-mono text-meta-mono text-on-surface-variant uppercase">
          Última atualização:{' '}
          <time dateTime={LEGAL_UPDATED_AT}>
            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(
              new Date(`${LEGAL_UPDATED_AT}T12:00:00-03:00`),
            )}
          </time>
        </p>
      </header>

      {LEGAL_IS_PROVISIONAL && (
        <aside
          role="note"
          className="ink-border ink-shadow flex flex-col gap-xs bg-tertiary-fixed-dim p-md text-on-background"
        >
          <p className="font-display text-headline-md leading-none">Texto provisório</p>
          <p className="text-body-md">
            Este documento é um rascunho de estrutura e ainda não passou por revisão jurídica. Será
            substituído por versão definitiva antes de o portal começar a coletar dados por
            formulário.
          </p>
        </aside>
      )}

      <div className="flex max-w-3xl flex-col gap-lg">
        {sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-sm">
            <h2 className="text-headline-md">{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body-md text-on-surface-variant">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Container>
  );
}
