import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import { NoiseOverlay } from '@/components/layout/noise-overlay';
import { SITE } from '@/lib/site';
import './globals.css';

/* Fontes self-hosted no build por next/font — sem <link> para o Google.
   Além de uma conexão a menos, evita enviar o IP do visitante ao Google (LGPD). */

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  // `metadataBase` resolve URLs relativas de Open Graph e canonical. Sem ela,
  // o card compartilhado no Instagram/WhatsApp aponta para lugar nenhum.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Onde comer hoje?`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE.name,
    title: `${SITE.name} — Onde comer hoje?`,
    description: SITE.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
  // Fase 6 refina isto por rota; aqui fica o padrão do site.
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  // Cor da barra do navegador no mobile — o papel da marca, não o branco padrão.
  themeColor: '#fff9ed',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
