'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button, buttonClassName } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

/**
 * Erro do diretório, com caminho de saída.
 *
 * ⚠️ A mensagem técnica **não** vai para a tela: `error.message` pode conter
 * detalhe de infraestrutura, e o visitante não tem o que fazer com isso. Vai
 * para o console agora e, na Fase 6, para o monitor de erros.
 */
export function DirectoryError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('[diretório] falha ao carregar', error);
  }, [error]);

  return (
    <Container as="div" className="py-xl">
      <EmptyState
        title="Não foi possível carregar os restaurantes"
        description="Deu ruim do nosso lado. Tente de novo em instantes — se persistir, volte mais tarde."
        action={
          <div className="flex flex-wrap justify-center gap-sm">
            <Button onClick={reset}>Tentar de novo</Button>
            <Link href="/" className={buttonClassName({ variant: 'secondary' })}>
              Voltar para a home
            </Link>
          </div>
        }
      />
    </Container>
  );
}
