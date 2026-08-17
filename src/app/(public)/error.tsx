'use client';

import { ErrorView } from '@/views/errors/error-view';

/** Fronteira de erro das páginas públicas — mantém header e rodapé no lugar. */
export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorView error={error} reset={reset} />;
}
