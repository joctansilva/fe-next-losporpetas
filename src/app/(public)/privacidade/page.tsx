import type { Metadata } from 'next';
import { LEGAL_IS_PROVISIONAL, PRIVACY_SECTIONS } from '@/content/legal';
import { LegalPageView } from '@/views/legal/legal-page-view';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Como o LOSPORPETAS trata os dados pessoais enviados pelos formulários do portal.',
  alternates: { canonical: '/privacidade' },
  robots: LEGAL_IS_PROVISIONAL ? { index: false, follow: true } : undefined,
};

export default function PrivacidadePage() {
  return (
    <LegalPageView
      title="Privacidade"
      intro="Quais dados coletamos, para quê, por quanto tempo e como você pede a exclusão."
      sections={PRIVACY_SECTIONS}
    />
  );
}
