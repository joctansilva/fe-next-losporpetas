import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import { NoiseOverlay } from '@/components/layout/noise-overlay';
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
  title: {
    default: 'LOSPORPETAS — Onde comer hoje?',
    template: '%s | LOSPORPETAS',
  },
  description:
    'Guia gastronômico local com curadoria do LOSPORPETAS. Lugares provados, aprovados e colocados no mapa.',
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
