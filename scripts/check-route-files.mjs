// @ts-check
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Guarda da convenção de rotas.
 *
 * `src/app/` é a pasta de ROTAS. Arquivo de rota deve ser fino: metadata,
 * `generateStaticParams`, guardas e a composição da view — e nada mais.
 * Componentes, markup e regra que compõem a página vivem em `src/views/`
 * (composição de página) ou `src/components/` (peças reutilizáveis).
 *
 * Por quê: rota é o contorno da aplicação, não o lugar do produto. Misturar as
 * duas coisas espalha markup por uma árvore cuja forma é ditada pela URL, o que
 * torna reuso e teste desnecessariamente difíceis.
 *
 * Este script existe porque convenção que não é verificada vira exceção em três
 * semanas — mesma lógica das regras de fronteira do ESLint.
 */

const APP_DIR = 'src/app';
const MAX_LINES = 80;

/** Arquivos que o App Router reconhece. Só estes podem morar em src/app/. */
const ROUTE_FILES = new Set([
  'page.tsx',
  'layout.tsx',
  'template.tsx',
  'loading.tsx',
  'error.tsx',
  'global-error.tsx',
  'not-found.tsx',
  'default.tsx',
  'forbidden.tsx',
  'unauthorized.tsx',
  'route.ts',
  'sitemap.ts',
  'robots.ts',
  'manifest.ts',
  'opengraph-image.tsx',
  'twitter-image.tsx',
  'icon.tsx',
  'apple-icon.tsx',
]);

/** Assets estáticos que o Next serve a partir de src/app/. */
const STATIC_ASSETS = /\.(svg|png|jpg|jpeg|ico|webp|txt|xml)$/;

/** Arquivos onde o limite de linhas se aplica (os que renderizam UI). */
const SIZE_LIMITED = new Set(['page.tsx', 'layout.tsx', 'template.tsx', 'default.tsx']);

const problems = [];

/** @param {string} dir */
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);

    if (statSync(fullPath).isDirectory()) {
      walk(fullPath);
      continue;
    }

    const relativePath = relative(process.cwd(), fullPath).replaceAll('\\', '/');

    if (!ROUTE_FILES.has(entry) && !STATIC_ASSETS.test(entry)) {
      problems.push(
        `${relativePath}\n` +
          `    Só arquivos de rota do App Router podem morar em ${APP_DIR}/.\n` +
          `    Componente de página → src/views/   ·   peça reutilizável → src/components/`,
      );
      continue;
    }

    if (SIZE_LIMITED.has(entry)) {
      const lines = readFileSync(fullPath, 'utf8').split('\n').length;
      if (lines > MAX_LINES) {
        problems.push(
          `${relativePath}\n` +
            `    ${lines} linhas (limite: ${MAX_LINES}). Arquivo de rota está grosso demais.\n` +
            `    Extraia a composição da página para src/views/ e deixe aqui só\n` +
            `    metadata, generateStaticParams, guardas e o render da view.`,
        );
      }
    }
  }
}

walk(APP_DIR);

if (problems.length > 0) {
  console.error(`\n✖ Convenção de rotas violada (${problems.length}):\n`);
  for (const problem of problems) console.error(`  ${problem}\n`);
  console.error(`  Ver: ../documentation/02-ARCHITECTURE-PROPOSAL.md §3.1\n`);
  process.exit(1);
}

console.log('✓ Convenção de rotas ok — src/app/ contém apenas arquivos de rota, e finos.');
