import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button, buttonClassName } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select } from '@/components/ui/select';
import { RestaurantCardSkeleton } from '@/components/ui/skeleton';
import { SponsoredLabel } from '@/components/ui/sponsored-label';
import { Stamp } from '@/components/ui/stamp';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORY_ICONS, ICON_SIZE, Icons } from '@/lib/icons';
import { ModalDemo } from './modal-demo';

/**
 * Vitrine do design system — referência viva dos tokens extraídos do Stitch.
 *
 * A rota (`src/app/dev/design-system/page.tsx`) cuida de metadata e de barrar
 * o acesso em produção; aqui mora só a composição da página.
 */

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
      <h2 className="border-x-0 border-t-0 pb-xs text-headline-md ink-border">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ token, hex, note }: { token: string; hex: string; note: string }) {
  return (
    <div className="flex flex-col ink-border">
      <div className="h-16 w-full" style={{ backgroundColor: `var(--color-${token})` }} />
      <div className="flex flex-col gap-xs border-t-2 border-on-background bg-surface-container-lowest p-sm">
        <code className="font-mono text-label-mono">{token}</code>
        <code className="font-mono text-meta-mono text-on-surface-variant">{hex}</code>
        <span className="text-meta-mono text-on-surface-variant">{note}</span>
      </div>
    </div>
  );
}

export function DesignSystemView() {
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
          <div className="bg-surface-container-lowest p-md ink-border">
            <code className="font-mono text-label-mono">ink-border</code>
            <p className="mt-xs text-body-sm text-on-surface-variant">2px sólidos de tinta.</p>
          </div>
          <div className="bg-surface-container-lowest p-md ink-shadow ink-border">
            <code className="font-mono text-label-mono">ink-shadow</code>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Sólida e deslocada, nunca desfocada.
            </p>
          </div>
          <div className="ink-lift cursor-pointer bg-surface-container-lowest p-md ink-border">
            <code className="font-mono text-label-mono">ink-lift</code>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Passe o mouse: o card levanta. Respeita movimento reduzido.
            </p>
          </div>
        </div>
        <div className="mt-sm pt-sm ink-dashed">
          <code className="font-mono text-label-mono">ink-dashed</code>
        </div>
        <div className="mt-md flex flex-wrap items-center gap-lg">
          <div className="flex size-28 ink-stamp items-center justify-center rounded-full bg-primary-container p-sm text-center ink-shadow ink-border">
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

      <Section title="Button">
        <div className="flex flex-wrap items-center gap-md">
          <Button variant="primary">Descobrir</Button>
          <Button variant="secondary">Indicar um lugar</Button>
          <Button variant="ghost">Ver mapa completo</Button>
          <Button disabled>Sorteio encerrado</Button>
        </div>
        <div className="mt-md flex flex-wrap items-center gap-md">
          <Button size="sm">Pequeno</Button>
          <Button size="md">Médio</Button>
          <Button size="lg">Grande</Button>
          <Link href="/dev/design-system" className={buttonClassName({ variant: 'secondary' })}>
            Link com cara de botão
          </Link>
        </div>
        <div className="mt-md bg-on-background p-md">
          <Button variant="inverse">Sobre fundo escuro</Button>
        </div>
        <p className="mt-md text-body-sm text-on-surface-variant">
          Navegue com <kbd className="px-xs font-mono text-meta-mono ink-border">Tab</kbd> — o
          contorno de foco vem do <code>:focus-visible</code> global. Navegação usa{' '}
          <code>buttonClassName()</code> num <code>&lt;Link&gt;</code>; ação usa{' '}
          <code>&lt;Button&gt;</code>.
        </p>
      </Section>

      <Section title="Badge, Chip, Stamp e SponsoredLabel">
        <div className="flex flex-wrap items-center gap-sm">
          <Badge tone="primary">Top pick</Badge>
          <Badge tone="ink">Parceiro</Badge>
          <Badge tone="mustard">Termina hoje</Badge>
          <Badge tone="muted">Pinheiros</Badge>
          <Badge tone="outline">$$</Badge>
          <Badge tone="success">Aprovado</Badge>
          <Badge tone="error">Encerrado</Badge>
        </div>

        <div className="mt-md flex flex-wrap items-center gap-sm">
          <Chip href="/dev/design-system" active>
            Todos
          </Chip>
          <Chip href="/dev/design-system">Hamburgueria</Chip>
          <Chip href="/dev/design-system">Pizza</Chip>
          <Chip href="/dev/design-system">Japonês</Chip>
        </div>

        <div className="mt-lg flex flex-wrap items-center gap-lg">
          <Stamp size="sm" />
          <Stamp size="md" />
          <div className="flex items-center gap-sm">
            <SponsoredLabel kind="publi" />
            <SponsoredLabel kind="partner" />
          </div>
        </div>

        <p className="mt-md max-w-2xl text-body-sm text-on-surface-variant">
          ⚠️ O <code>Stamp</code> é curadoria editorial e só aparece quando{' '}
          <code>curationStatus === &apos;approved&apos;</code>. Parceria comercial nunca o produz —
          nesse caso vale o <code>SponsoredLabel</code>, que é obrigatório em slot patrocinado.
        </p>
      </Section>

      <Section title="Card">
        <div className="grid grid-cols-1 gap-md md:grid-cols-3">
          <Card className="p-md">
            <h3 className="text-headline-md">Padrão</h3>
            <p className="mt-xs text-body-sm text-on-surface-variant">Só a borda de tinta.</p>
          </Card>
          <Card raised surface="lowest" className="p-md">
            <h3 className="text-headline-md">Raised</h3>
            <p className="mt-xs text-body-sm text-on-surface-variant">Sombra sólida em repouso.</p>
          </Card>
          <Card interactive surface="low" className="p-md">
            <h3 className="text-headline-md">Interactive</h3>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Passe o mouse — o card levanta.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Campos de formulário">
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <Input id="ds-nome" label="Nome do restaurante" required placeholder="Smash Bros" />
          <Input
            id="ds-email"
            label="E-mail"
            type="email"
            hint="Só usamos para responder sua sugestão."
          />
          <Input
            id="ds-erro"
            label="WhatsApp"
            required
            defaultValue="119"
            error="Informe um número com DDD e 9 dígitos."
          />
          <Select
            id="ds-bairro"
            label="Bairro"
            placeholder="Todos"
            options={[
              { value: 'centro', label: 'Centro' },
              { value: 'pinheiros', label: 'Pinheiros' },
              { value: 'mooca', label: 'Mooca' },
            ]}
          />
          <Textarea
            id="ds-motivo"
            label="Por que vale a visita?"
            hint="Duas ou três linhas bastam."
            className="md:col-span-2"
          />
        </div>
      </Section>

      <Section title="Modal">
        <ModalDemo />
        <p className="mt-md max-w-2xl text-body-sm text-on-surface-variant">
          Construído sobre o <code>&lt;dialog&gt;</code> nativo. Abra e teste{' '}
          <strong>só com o teclado</strong>:{' '}
          <kbd className="px-xs font-mono text-meta-mono ink-border">Tab</kbd> fica preso dentro,{' '}
          <kbd className="px-xs font-mono text-meta-mono ink-border">Esc</kbd> fecha, e o foco volta
          para o botão que abriu.
        </p>
      </Section>

      <Section title="EmptyState e Skeleton">
        <EmptyState
          icon={Icons.search}
          title="Nada encontrado"
          description="Nenhum restaurante bate com esses filtros. Que tal indicar um lugar que faltou?"
          action={<Button variant="secondary">Limpar filtros</Button>}
        />
        <div className="mt-md grid grid-cols-1 gap-md md:grid-cols-3">
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
        </div>
      </Section>

      <Section title="Pagination">
        <Pagination page={1} totalPages={3} buildHref={(p) => `?pagina=${p}`} />
        <div className="mt-md">
          <Pagination page={5} totalPages={20} buildHref={(p) => `?pagina=${p}`} />
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
              className="flex flex-col items-center gap-xs bg-surface-container-lowest p-sm ink-border"
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
