'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button, buttonClassName } from '@/components/ui/button';

type ErrorViewProps = {
  error: Error & { digest?: string };
  reset: () => void;
  /** `true` quando a casca do portal não está disponível (erro no layout raiz). */
  standalone?: boolean;
};

/**
 * Tela de erro do portal.
 *
 * ⚠️ A mensagem técnica **não** vai para a tela: pode conter detalhe de
 * infraestrutura, e o visitante não tem o que fazer com ela. Vai para o console
 * agora e, na Fase 6, para o monitor de erros.
 *
 * O `digest` é exibido em letra miúda de propósito — é o identificador que
 * permite achar o erro no log quando alguém reportar "deu pau na página".
 */
export function ErrorView({ error, reset, standalone = false }: ErrorViewProps) {
  useEffect(() => {
    console.error('[erro]', error);
  }, [error]);

  return (
    <Container
      as="section"
      className="flex flex-1 flex-col items-center justify-center gap-md py-xl text-center"
    >
      <p className="font-display text-display-xl leading-none text-primary">Ops</p>

      <h1 className="text-headline-lg">Queimou alguma coisa na cozinha</h1>

      <p className="max-w-xl text-body-lg text-on-surface-variant">
        Deu erro do nosso lado ao montar esta página. Tente de novo — se insistir, é problema nosso
        e já estamos sabendo.
      </p>

      <div className="mt-md flex flex-wrap justify-center gap-sm">
        <Button onClick={reset}>Tentar de novo</Button>
        {!standalone && (
          <Link href="/" className={buttonClassName({ variant: 'secondary' })}>
            Voltar para a home
          </Link>
        )}
      </div>

      {error.digest && (
        <p className="mt-sm font-mono text-meta-mono text-on-surface-variant">
          Código do erro: {error.digest}
        </p>
      )}
    </Container>
  );
}
