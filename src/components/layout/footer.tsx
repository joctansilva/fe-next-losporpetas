import Link from 'next/link';
import { LEGAL_LINKS, SITE, SOCIAL_LINKS } from '@/lib/site';

/**
 * Rodapé do site.
 *
 * Versão unificada: os 5 layouts do Stitch divergiam entre si (um listava
 * TikTok, outro Twitter e Newsletter, e a ordem dos blocos mudava). A lista de
 * links vive em `lib/site.ts`.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-2 border-on-background bg-surface-container-highest">
      <div className="page-container flex flex-col items-center justify-between gap-md py-lg md:flex-row">
        <p className="font-display text-headline-lg text-on-background uppercase">{SITE.name}</p>

        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap justify-center gap-md md:justify-end"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-meta-mono text-on-secondary-fixed-variant uppercase transition-colors hover:text-primary"
            >
              {social.label}
            </a>
          ))}

          {LEGAL_LINKS.map((legal) => (
            <Link
              key={legal.href}
              href={legal.href}
              className="font-mono text-meta-mono text-on-secondary-fixed-variant uppercase transition-colors hover:text-primary"
            >
              {legal.label}
            </Link>
          ))}
        </nav>

        <p className="text-center font-mono text-meta-mono text-on-secondary-fixed-variant uppercase md:text-right">
          © {year} {SITE.name}. {SITE.tagline}.
        </p>
      </div>
    </footer>
  );
}
