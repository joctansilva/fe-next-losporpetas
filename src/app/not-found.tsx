import { Footer } from '@/components/layout/footer';
import { TopNav } from '@/components/layout/top-nav';
import { NotFoundView } from '@/views/errors/not-found-view';

export const metadata = {
  title: 'Página não encontrada',
};

/**
 * 404 global — responde por qualquer rota não encontrada.
 *
 * ⚠️ Monta o header e o rodapé explicitamente: este arquivo vive na raiz de
 * `src/app/`, fora do grupo `(public)`, então **não herda a casca do portal**.
 * Sem isso, quem cai num link quebrado fica numa página sem navegação nenhuma.
 */
export default function NotFound() {
  return (
    <>
      <TopNav />
      <main className="flex flex-1 flex-col">
        <NotFoundView />
      </main>
      <Footer />
    </>
  );
}
