import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { buttonClassName } from '@/components/ui/button';

/**
 * Página 404.
 *
 * O tráfego vem do Instagram, onde **posts publicados não podem ser editados**.
 * Um link antigo que aponta para um lugar removido vai cair aqui para sempre —
 * então esta página precisa oferecer caminhos, não só informar o erro.
 */
export function NotFoundView() {
  return (
    <Container
      as="section"
      className="flex flex-1 flex-col items-center justify-center gap-md py-xl text-center"
    >
      <p className="font-display text-display-xl leading-none text-primary">404</p>

      <h1 className="text-headline-lg">Esse prato saiu do cardápio</h1>

      <p className="max-w-xl text-body-lg text-on-surface-variant">
        A página que você procurou não existe mais ou nunca existiu. Acontece — o guia muda,
        restaurante fecha, ação encerra.
      </p>

      <div className="mt-md flex flex-wrap justify-center gap-sm">
        <Link href="/restaurantes" className={buttonClassName({ variant: 'primary' })}>
          Ver restaurantes
        </Link>
        <Link href="/" className={buttonClassName({ variant: 'secondary' })}>
          Voltar para a home
        </Link>
      </div>
    </Container>
  );
}
