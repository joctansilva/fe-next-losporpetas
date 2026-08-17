'use client';

import { DirectoryError } from '@/views/restaurant-directory/directory-error';

/**
 * Fronteira de erro do diretório.
 *
 * `error.tsx` precisa ser Client Component (exigência do Next) e receber
 * `reset` para permitir uma nova tentativa sem recarregar a página inteira.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <DirectoryError error={error} reset={reset} />;
}
