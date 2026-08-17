import { cn } from '@/lib/cn';

type CardProps = {
  as?: 'div' | 'article' | 'li';
  children: React.ReactNode;
  /** Aplica o hover que levanta o card. Use quando o card inteiro é clicável. */
  interactive?: boolean;
  /** Sombra sólida em repouso (destaque estático, sem hover). */
  raised?: boolean;
  /** Superfície de fundo. */
  surface?: 'default' | 'low' | 'lowest' | 'highest';
  className?: string;
};

const SURFACE_CLASS = {
  default: 'bg-surface',
  low: 'bg-surface-container-low',
  lowest: 'bg-surface-container-lowest',
  highest: 'bg-surface-container-highest',
} as const;

/**
 * Casca do card brutalista: borda de tinta e, opcionalmente, o hover que levanta.
 *
 * É só a casca — não sabe nada sobre restaurante ou campanha. Os componentes de
 * domínio (`RestaurantCard`, `CampaignCard`) montam o conteúdo por cima na Fase 1.
 *
 * ⚠️ `interactive` muda só a aparência. Para o card ser de fato clicável, o
 * conteúdo precisa ter um `<Link>` real — um `onClick` no `<div>` não é
 * alcançável por teclado nem anunciado como link.
 */
export function Card({
  as: Tag = 'div',
  children,
  interactive = false,
  raised = false,
  surface = 'default',
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        'ink-border flex flex-col',
        SURFACE_CLASS[surface],
        raised && 'ink-shadow',
        interactive && 'ink-lift',
        // O foco do link interno precisa aparecer mesmo com overflow-hidden.
        interactive &&
          'focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-primary',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
