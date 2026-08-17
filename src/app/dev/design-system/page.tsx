import { notFound } from 'next/navigation';
import { CATEGORY_ICONS, ICON_SIZE, Icons } from '@/lib/icons';

/**
 * Vitrine do design system — referência viva dos tokens extraídos do Stitch.
 *
 * Existe SÓ em desenvolvimento: em produção a rota responde 404, então não
 * entra no bundle servido ao público nem no sitemap.
 */

export const metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};

const BRAND_COLORS = [
  ['primary', '#9f2b15', 'CTA, links, destaques'],
  ['primary-container', '#c1432b', 'variante mais clara'],
  ['on-primary', '#ffffff', 'texto sobre primária'],
  ['tertiary-fixed-dim', '#fcbb4e', 'mostarda — badges'],
  ['tertiary', '#744e00', 'mostarda escura'],
  ['error', '#ba1a1a', 'erro de formulário'],
  ['success', '#2e6b34', 'confirmação'],
  ['warning', '#946500', 'avisos do admin'],
] as const;

const SURFACE_COLORS = [
  ['background', '#fff9ed', 'papel'],
  ['on-background', '#1f1c10', 'TINTA — todas as bordas'],
  ['surface-container-lowest', '#ffffff', 'card sobre grade'],
  ['surface-container-low', '#fbf3df', 'card padrão'],
  ['surface-container', '#f5edda', 'faixa de seção'],
  ['surface-container-high', '#efe8d4', 'faixa alternada'],
  ['surface-container-highest', '#eae2ce', 'faixa de destaque'],
  ['surface-dim', '#e1dac6', 'placeholder de imagem'],
  ['on-surface-variant', '#59413c', 'texto secundário'],
  ['outline', '#8c716b', '⚠ só borda/ícone — 3.6:1'],
  ['inverse-surface', '#343023', 'tile escuro'],
] as const;

const TYPE_SCALE = [
  ['display-xl', 'text-display-xl font-display', 'clamp 48→80px', 'Onde comer hoje?'],
  ['headline-lg', 'text-headline-lg font-display', 'clamp 36→48px', 'Destaques de hoje'],
  ['headline-md', 'text-headline-md font-display', '32px', 'Smash Bros'],
  ['body-lg', 'text-body-lg font-body', '18/28px', 'Lugares que o Porpetas provou e aprovou.'],
  ['body-md', 'text-body-md font-body', '16/24px', 'Corpo de texto padrão do produto.'],
  ['body-sm', 'text-body-sm font-body', '14/20px — token novo', 'Usado nos rodapés e legendas.'],
  ['label-mono', 'text-label-mono font-mono', '13/16px · 500', 'VER INDICAÇÃO'],
  ['meta-mono', 'text-meta-mono font-mono', '11/14px', 'PINHEIROS · $$'],
] as const;

const SPACING = [
  ['xs', '4px'],
  ['base', '8px'],
  ['sm', '12px'],
  ['gutter', '16px'],
  ['md', '24px'],
  ['margin-desktop', '40px'],
  ['lg', '48px'],
  ['xl', '80px'],
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-md">
      <h2 className="ink-border border-x-0 border-t-0 pb-xs text-headline-md">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ token, hex, note }: { token: string; hex: string; note: string }) {
  return (
    <div className="ink-border flex flex-col">
      <div className="h-16 w-full" style={{ backgroundColor: `var(--color-${token})` }} />
      <div className="flex flex-col gap-xs border-t-2 border-on-background bg-surface-container-lowest p-sm">
        <code className="font-mono text-label-mono">{token}</code>
        <code className="font-mono text-meta-mono text-on-surface-variant">{hex}</code>
        <span className="text-meta-mono text-on-surface-variant">{note}</span>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="page-container flex flex-col gap-xl py-xl">
      <header className="flex flex-col gap-sm">
        <p className="font-mono text-label-mono text-primary uppercase">
          Apenas em desenvolvimento
        </p>
        <h1 className="text-display-xl">Design system</h1>
        <p className="max-w-2xl text-body-lg text-on-surface-variant">
          Tokens extraídos dos 5 layouts do Stitch. Esta página é a referência viva — se algo aqui
          divergir do layout original, o layout é que manda.
        </p>
      </header>

      <Section title="Cores da marca">
        <div className="grid grid-cols-2 gap-gutter md:grid-cols-4">
          {BRAND_COLORS.map(([token, hex, note]) => (
            <Swatch key={token} token={token} hex={hex} note={note} />
          ))}
        </div>
      </Section>

      <Section title="Superfícies">
        <div className="grid grid-cols-2 gap-gutter md:grid-cols-4">
          {SURFACE_COLORS.map(([token, hex, note]) => (
            <Swatch key={token} token={token} hex={hex} note={note} />
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <div className="flex flex-col gap-md">
          {TYPE_SCALE.map(([token, className, size, sample]) => (
            <div
              key={token}
              className="flex flex-col gap-xs border-b border-dashed border-outline pb-md"
            >
              <div className="flex flex-wrap items-baseline gap-sm">
                <code className="font-mono text-label-mono text-primary">{token}</code>
                <span className="font-mono text-meta-mono text-on-surface-variant">{size}</span>
              </div>
              <p className={className}>{sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Bordas, sombras e interação">
        <div className="grid grid-cols-1 gap-md md:grid-cols-3">
          <div className="ink-border bg-surface-container-lowest p-md">
            <code className="font-mono text-label-mono">ink-border</code>
            <p className="mt-xs text-body-sm text-on-surface-variant">2px sólidos de tinta.</p>
          </div>
          <div className="ink-border ink-shadow bg-surface-container-lowest p-md">
            <code className="font-mono text-label-mono">ink-shadow</code>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Sólida e deslocada, nunca desfocada.
            </p>
          </div>
          <div className="ink-border ink-lift cursor-pointer bg-surface-container-lowest p-md">
            <code className="font-mono text-label-mono">ink-lift</code>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Passe o mouse: o card levanta. Respeita movimento reduzido.
            </p>
          </div>
        </div>
        <div className="ink-dashed mt-sm pt-sm">
          <code className="font-mono text-label-mono">ink-dashed</code>
        </div>
        <div className="mt-md flex flex-wrap items-center gap-lg">
          <div className="ink-border ink-stamp ink-shadow flex size-28 items-center justify-center rounded-full bg-primary-container p-sm text-center">
            <span className="font-display text-body-sm leading-none text-on-primary">
              Aprovado
              <br />
              pelo
              <br />
              Losporpetas
            </span>
          </div>
          <code className="font-mono text-label-mono">ink-stamp · rounded-full</code>
        </div>
      </Section>

      <Section title="Botões e foco">
        <div className="flex flex-wrap items-center gap-md">
          <button
            type="button"
            className="ink-border ink-lift-sm bg-primary px-md py-sm font-mono text-label-mono font-bold text-on-primary uppercase"
          >
            Descobrir
          </button>
          <button
            type="button"
            className="ink-border ink-lift-sm bg-surface px-md py-sm font-mono text-label-mono font-bold text-on-surface uppercase"
          >
            Indicar um lugar
          </button>
          <button
            type="button"
            disabled
            className="ink-border bg-surface-dim px-md py-sm font-mono text-label-mono font-bold text-on-surface-variant uppercase opacity-50"
          >
            Encerrado
          </button>
          <p className="text-body-sm text-on-surface-variant">
            Navegue com <kbd className="ink-border px-xs font-mono text-meta-mono">Tab</kbd> — o
            contorno de foco é obrigatório e vem do <code>:focus-visible</code> global.
          </p>
        </div>
      </Section>

      <Section title="Espaçamento">
        <div className="flex flex-col gap-sm">
          {SPACING.map(([token, value]) => (
            <div key={token} className="flex items-center gap-md">
              <code className="w-40 shrink-0 font-mono text-label-mono">{token}</code>
              <div className="h-4 bg-primary" style={{ width: `var(--spacing-${token})` }} />
              <span className="font-mono text-meta-mono text-on-surface-variant">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Ícones de interface">
        <div className="grid grid-cols-3 gap-gutter sm:grid-cols-5 md:grid-cols-8">
          {Object.entries(Icons).map(([name, Icon]) => (
            <div
              key={name}
              className="ink-border flex flex-col items-center gap-xs bg-surface-container-lowest p-sm"
            >
              <Icon size={ICON_SIZE.lg} aria-hidden="true" />
              <code className="text-center font-mono text-meta-mono break-all">{name}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Ícones de categoria">
        <div className="grid grid-cols-2 gap-gutter sm:grid-cols-3 md:grid-cols-6">
          {Object.entries(CATEGORY_ICONS).map(([name, Icon]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-xs border-2 border-surface bg-inverse-surface p-md text-surface"
            >
              <Icon size={ICON_SIZE.display} aria-hidden="true" />
              <code className="text-center font-mono text-meta-mono break-all">{name}</code>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
