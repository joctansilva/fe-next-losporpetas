import Link from 'next/link';
import { buttonClassName } from '@/components/ui/button';
import { MAIN_NAV, SITE, SUGGEST_CTA } from '@/lib/site';
import { MobileDrawer } from './mobile-drawer';
import { NavLink } from './nav-link';

/**
 * Header do site — idêntico nos 5 layouts do Stitch.
 *
 * É Server Component: as únicas partes que precisam de JavaScript são o
 * `NavLink` (por causa do `usePathname`) e o `MobileDrawer` (estado). O resto
 * — logo, CTA, estrutura — não custa nada ao cliente.
 *
 * `sticky` com `--z-sticky` (50), abaixo do ruído (100) e dos overlays (200+).
 */
export function TopNav() {
  return (
    <header
      className="sticky top-0 border-b-2 border-on-background bg-surface"
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      <div className="page-container flex items-center justify-between gap-md py-base">
        <div className="flex items-center gap-lg">
          <Link
            href="/"
            className="font-display text-headline-md tracking-tighter text-primary uppercase transition-colors hover:text-primary-container"
          >
            {SITE.name}
          </Link>

          <nav aria-label="Menu principal" className="hidden items-center gap-md md:flex">
            {MAIN_NAV.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-sm">
          <Link
            href={SUGGEST_CTA.href}
            className={buttonClassName({
              variant: 'secondary',
              className: 'hidden md:inline-flex',
            })}
          >
            {SUGGEST_CTA.label}
          </Link>

          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
