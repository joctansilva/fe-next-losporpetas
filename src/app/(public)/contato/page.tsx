import type { Metadata } from 'next';
import { ContactView } from '@/views/contact/contact-view';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com o LOSPORPETAS: indique um lugar, proponha parceria ou mande um direct.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  return <ContactView />;
}
