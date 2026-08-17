import type { Metadata } from 'next';
import { LEGAL_IS_PROVISIONAL, TERMS_SECTIONS } from '@/content/legal';
import { LegalPageView } from '@/views/legal/legal-page-view';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Termos de uso do portal LOSPORPETAS.',
  alternates: { canonical: '/termos' },
  // Rascunho não vai para o índice do Google: texto legal provisório indexado
  // é pior que página inexistente.
  robots: LEGAL_IS_PROVISIONAL ? { index: false, follow: true } : undefined,
};

export default function TermosPage() {
  return (
    <LegalPageView
      title="Termos de uso"
      intro="As regras de uso do portal, do conteúdo editorial e das ações divulgadas aqui."
      sections={TERMS_SECTIONS}
    />
  );
}
