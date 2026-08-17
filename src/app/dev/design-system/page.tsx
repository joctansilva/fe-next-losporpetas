import { notFound } from 'next/navigation';
import { DesignSystemView } from '@/views/design-system/design-system-view';

export const metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  // Vitrine interna: em produção a rota simplesmente não existe.
  if (process.env.NODE_ENV === 'production') notFound();

  return <DesignSystemView />;
}
