import { Container } from './container';

type PagePlaceholderProps = {
  title: string;
  phase: string;
  description: string;
};

/**
 * Marcador temporário de rota.
 *
 * Existe para que a navegação da Fase 1.2 seja testável de verdade — um menu
 * cujos links dão 404 não dá para validar. Cada página real das fases 1.3 a 1.7
 * substitui um destes.
 *
 * Se este componente ainda existir quando a Fase 1 fechar, alguma rota ficou
 * para trás.
 */
export function PagePlaceholder({ title, phase, description }: PagePlaceholderProps) {
  return (
    <Container as="section" className="flex flex-1 flex-col justify-center gap-sm py-xl">
      <p className="font-mono text-label-mono text-primary uppercase">Em construção · {phase}</p>
      <h1 className="text-display-xl">{title}</h1>
      <p className="max-w-2xl text-body-lg text-on-surface-variant">{description}</p>
    </Container>
  );
}
