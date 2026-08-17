import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata = {
  title: 'Indicar um lugar',
  description: 'Conhece um lugar que precisa aparecer no guia? Manda pra gente.',
};

/**
 * Página inteira da indicação.
 *
 * O fluxo principal é o modal aberto pelo header (Fase 3.2), mas esta rota
 * existe de propósito: funciona sem JavaScript, é linkável direto do Instagram
 * e serve de destino para quem chega pelo `<noscript>`.
 */
export default function IndicarPage() {
  return (
    <PagePlaceholder
      title="Indicar um lugar"
      phase="Fase 3.2"
      description="O formulário de sugestão. Toda indicação passa pela curadoria antes de entrar no guia."
    />
  );
}
