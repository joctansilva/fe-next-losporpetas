/**
 * Textura de ruído sobre a página inteira — parte da identidade "papel
 * envelhecido" do produto.
 *
 * Duas correções em relação ao Stitch:
 *
 * 1. z-index. Lá era `9999`, o que deixava o ruído ACIMA de modais e drawers.
 *    Aqui usa `--z-noise` (100), que fica acima do conteúdo e abaixo de
 *    qualquer overlay (200+).
 * 2. O SVG é uma constante em módulo, serializada uma única vez — não é
 *    recriada a cada render.
 *
 * É Server Component: não tem estado nem evento, então não custa JS ao cliente.
 */

const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-5"
      style={{
        zIndex: 'var(--z-noise)',
        backgroundImage: `url("${NOISE_SVG}")`,
      }}
    />
  );
}
