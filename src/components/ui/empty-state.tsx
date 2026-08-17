import { cn } from '@/lib/cn';
import type { LucideIcon } from '@/lib/icons';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Ação de saída — sempre ofereça uma. */
  action?: React.ReactNode;
  className?: string;
};

/**
 * Estado vazio.
 *
 * Toda lista precisa de um. Um grid que simplesmente não renderiza nada parece
 * um bug para o usuário — ele não sabe se o filtro zerou, se falhou ou se ainda
 * está carregando.
 *
 * A regra: dizer o que aconteceu e oferecer um caminho de saída (limpar filtro,
 * indicar um lugar, voltar ao diretório).
 */
export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-sm bg-surface-container-low px-md py-xl text-center ink-border',
        className,
      )}
    >
      {Icon && <Icon size={48} aria-hidden="true" className="text-on-surface-variant" />}

      <h3 className="text-headline-md leading-none">{title}</h3>

      {description && (
        <p className="max-w-md text-body-md text-on-surface-variant">{description}</p>
      )}

      {action && <div className="mt-sm">{action}</div>}
    </div>
  );
}
