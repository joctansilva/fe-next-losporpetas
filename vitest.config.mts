import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Testes do domínio.
 *
 * `src/domain/` é código puro — sem React, sem Next, sem Supabase — então roda
 * em Node, sem ambiente de navegador e sem mock de infraestrutura. É essa
 * pureza que torna a regra de negócio testável de verdade.
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
