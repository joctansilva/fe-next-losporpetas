import { Footer } from '@/components/layout/footer';
import { TopNav } from '@/components/layout/top-nav';

/**
 * Casca das páginas públicas: header, conteúdo e rodapé.
 *
 * `(public)` é um route group — não aparece na URL. Serve para separar o que é
 * portal do que é `/admin` (Fase 5) e do que é `/dev` (só desenvolvimento),
 * que terão cascas próprias.
 *
 * O link "pular para o conteúdo" é o primeiro elemento focável da página: quem
 * navega por teclado não deveria ser obrigado a passar por todo o menu em cada
 * página para chegar ao conteúdo.
 */
export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <a
        href="#conteudo"
        className="focus:ink-border sr-only focus:not-sr-only focus:absolute focus:top-sm focus:left-sm focus:z-[300] focus:bg-surface focus:px-md focus:py-sm focus:font-mono focus:text-label-mono focus:font-bold focus:uppercase"
      >
        Pular para o conteúdo
      </a>

      <TopNav />

      <main id="conteudo" className="flex flex-1 flex-col">
        {children}
      </main>

      <Footer />
    </>
  );
}
