import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Junta classes resolvendo conflitos do Tailwind — a última vence.
 *
 *   cn('bg-primary p-md', isActive && 'bg-surface')  →  'p-md bg-surface'
 *
 * ⚠️ O `tailwind-merge` precisa conhecer nossos tokens customizados, senão
 * classifica errado. O caso perigoso é `text-*`, que serve tanto para tamanho
 * de fonte quanto para cor: sem esta configuração, `text-body-lg text-primary`
 * seria lido como dois tamanhos em conflito e um deles cairia silenciosamente.
 *
 * Tokens declarados abaixo espelham src/styles/theme.css — ao adicionar um
 * token novo lá, adicione aqui também.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // Escala tipográfica (namespace --text-*)
      text: [
        'display-xl',
        'headline-lg',
        'headline-md',
        'body-lg',
        'body-md',
        'body-sm',
        'label-mono',
        'meta-mono',
      ],
      // Famílias (namespace --font-*)
      font: ['display', 'body', 'mono', 'sans'],
      // Escala nomeada de espaçamento (namespace --spacing-*)
      spacing: ['xs', 'base', 'sm', 'gutter', 'md', 'lg', 'xl', 'margin-mobile', 'margin-desktop'],
    },
    classGroups: {
      // Utilitários de sombra do projeto competem entre si e com shadow-*.
      shadow: ['ink-shadow', 'ink-shadow-lg', 'ink-shadow-none'],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
