import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata = {
  title: 'Ações e sorteios',
  description: 'Ações e sorteios ativos e encerrados do LOSPORPETAS e seus parceiros.',
};

export default function SorteiosPage() {
  return (
    <PagePlaceholder
      title="Ações e sorteios"
      phase="Fase 1.6"
      description="Tudo o que está rolando agora e o que já encerrou, separados por status."
    />
  );
}
