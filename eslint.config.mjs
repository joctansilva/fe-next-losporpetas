import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Mensagens das regras de fronteira.
 * A arquitetura está documentada em ../documentation/02-ARCHITECTURE-PROPOSAL.md §3.1.
 */
const MSG = {
  domainPure:
    'src/domain/ é puro: sem React, sem Next, sem Supabase. Regra de negócio não pode ' +
    'depender de framework nem de infraestrutura. Mova a dependência para src/server/ ou src/lib/.',
  componentsNoServer:
    'Componentes não importam de src/server/. Busque os dados na página (Server Component) ' +
    'ou na Server Action e passe por props.',
  serviceClientOnly:
    'createServiceClient ignora RLS e usa a service-role key. Só pode ser usado dentro de ' +
    'src/server/. Em código público use createAnonClient ou createServerClient.',
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  /* ---------------------------------------------------------------- *
   * Acessibilidade (0.2.3)                                            *
   * O plugin jsx-a11y já vem registrado por eslint-config-next, então  *
   * aqui só ativamos o conjunto "recommended" de regras — espalhar o   *
   * flatConfig inteiro tentaria redefinir o plugin e quebra o ESLint.  *
   * ---------------------------------------------------------------- */
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },

  /* ---------------------------------------------------------------- *
   * Regras gerais do projeto                                          *
   * ---------------------------------------------------------------- */
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      // O portal é feito de fotos: peso de imagem é risco de produto (risco R6).
      '@next/next/no-img-element': 'error',

      // Nada enviado por usuário é renderizado como HTML (segurança, risco R19).
      'react/no-danger': 'error',

      // Segredos e RLS: a service-role key nunca sai de src/server/.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/server/supabase/service', '@/server/supabase/service'],
              importNames: ['createServiceClient'],
              message: MSG.serviceClientOnly,
            },
          ],
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- *
   * Fronteira: src/domain/ é puro (0.2.4)                             *
   * ---------------------------------------------------------------- */
  {
    files: ['src/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'react',
                'react/*',
                'react-dom',
                'react-dom/*',
                'next',
                'next/*',
                '@supabase/*',
                '@/server',
                '@/server/*',
                '**/server/**',
                '@/components',
                '@/components/*',
                '**/components/**',
              ],
              message: MSG.domainPure,
            },
          ],
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- *
   * Fronteira: componentes não acessam a camada de dados (0.2.4)      *
   * ---------------------------------------------------------------- */
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/server', '@/server/*', '**/server/**', '@supabase/*'],
              message: MSG.componentsNoServer,
            },
          ],
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- *
   * src/server/ pode importar tudo — é a camada de infraestrutura     *
   * ---------------------------------------------------------------- */
  {
    files: ['src/server/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Artefatos gerados pela CLI do Supabase (edge runtime, branches).
    'supabase/.temp/**',
    'supabase/.branches/**',
    // Tipos gerados a partir do schema — reescritos por `pnpm db:types`.
    'src/server/supabase/database.types.ts',
  ]),
]);

export default eslintConfig;
