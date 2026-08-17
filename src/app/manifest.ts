import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Web app manifest.
 *
 * O tráfego vem majoritariamente do Instagram, no celular — quem salvar o
 * portal na tela inicial deve ver o nome e as cores da marca, não "localhost"
 * com ícone genérico.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff9ed',
    theme_color: '#fff9ed',
    lang: SITE.locale,
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
  };
}
