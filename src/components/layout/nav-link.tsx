'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { isActiveNav, type NavItem } from '@/lib/site';

type NavLinkProps = {
  item: NavItem;
  variant?: 'desktop' | 'drawer';
  onNavigate?: () => void;
};

/**
 * Link de navegação que sabe quando está na rota atual.
 *
 * É a menor ilha `"use client"` possível: existe só porque `usePathname` é um
 * hook. O `TopNav` em volta continua sendo Server Component, então o custo em
 * JavaScript é este componente e mais nada.
 *
 * `aria-current="page"` é obrigatório — a cor sozinha não comunica ao leitor de
 * tela qual seção está aberta.
 */
export function NavLink({ item, variant = 'desktop', onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActiveNav(item, pathname);

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      className={cn(
        'font-mono uppercase transition-colors',
        variant === 'desktop' && [
          'px-sm py-xs text-label-mono',
          active
            ? 'border-b-2 border-primary font-bold text-primary'
            : 'font-medium text-on-surface hover:bg-primary hover:text-on-primary',
        ],
        variant === 'drawer' && [
          'font-display text-headline-lg leading-none',
          active ? 'text-primary' : 'text-surface hover:text-primary',
        ],
      )}
    >
      {item.label}
    </Link>
  );
}
