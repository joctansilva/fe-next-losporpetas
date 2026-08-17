import type { Metadata } from 'next';
import { PartnerView } from '@/views/partner/partner-view';

export const metadata: Metadata = {
  title: 'Seja parceiro',
  description:
    'Coloque seu restaurante no mapa do LOSPORPETAS: indicação editorial, destaque e ações em conjunto.',
  alternates: { canonical: '/seja-parceiro' },
};

export default function SejaParceiroPage() {
  return <PartnerView />;
}
