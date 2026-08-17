'use client';

import { ErrorView } from '@/views/errors/error-view';
import '@/styles/globals.css';

/**
 * Erro no próprio layout raiz — o último recurso.
 *
 * ⚠️ Substitui o documento inteiro, então precisa trazer `<html>` e `<body>`
 * por conta própria e importar o CSS: nada do layout raiz está disponível aqui.
 *
 * Sem header nem rodapé de propósito — se o layout quebrou, insistir em montá-lo
 * quebraria de novo.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-background text-on-background antialiased">
        <ErrorView error={error} reset={reset} standalone />
      </body>
    </html>
  );
}
