import Link from 'next/link';
import { cn } from '@/lib/cn';

type ChipProps = {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  className?: string;
};

/**
 * Filtro do diretório.
 *
 * É um `<Link>`, não um `<button>`: filtro é estado de URL, então cada chip é
 * um endereço navegável. Isso dá link compartilhável, botão voltar funcionando,
 * indexação e — o principal — permite que a página siga sendo Server Component,
 * sem JavaScript para filtrar.
 *
 * `aria-current="page"` comunica a seleção a quem usa leitor de tela; só a cor
 * não comunica nada.
 */
export function Chip({ children, href, active = false, className }: ChipProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-[36px] items-center px-md py-xs font-mono text-label-mono uppercase transition-colors ink-border',
        active
          ? 'bg-primary text-on-primary'
          : 'bg-surface-bright text-on-surface hover:bg-surface-container-high',
        className,
      )}
    >
      {children}
    </Link>
  );
}
