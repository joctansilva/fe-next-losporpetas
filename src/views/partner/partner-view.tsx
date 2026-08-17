import { Container } from '@/components/layout/container';
import { Divider } from '@/components/layout/divider';
import { PartnerLeadForm } from '@/components/forms/partner-lead-form';
import { Badge } from '@/components/ui/badge';
import { Stamp } from '@/components/ui/stamp';
import { cn } from '@/lib/cn';

/**
 * Área comercial — `/seja-parceiro`.
 *
 * Layout: `documentation/referencia/seja_parceiro_stitch.html`.
 *
 * ⚠️ Os três níveis são conteúdo **estático** nesta fase, como decidido em
 * documentation/04 §2.7: só viram dado administrável se passarem a mudar com
 * frequência. Preço não aparece de propósito — a conversa é caso a caso.
 *
 * ⚠️ O nível "Indicação" precisa deixar explícito que **não se compra**: é a
 * mesma separação editorial × comercial do risco R1, dita na página onde o
 * dinheiro entra na conversa. Se essa frase sumir daqui, o produto começa a
 * vender o que não pode vender.
 */

const TIERS = [
  {
    level: 'Nível 1',
    title: 'Indicação',
    quote: 'Seu restaurante entrou no radar.',
    description:
      'Lugares aprovados pela nossa curadoria ganham espaço orgânico no guia. Não é vendido: depende de visita e de aprovação editorial.',
    surface: 'bg-surface',
    badge: null,
  },
  {
    level: 'Nível 2',
    title: 'Destaque',
    quote: 'Mais visibilidade para o seu restaurante.',
    description:
      'Posicionamento premium nas listas e em campanhas sazonais, sempre identificado como conteúdo patrocinado.',
    surface: 'bg-surface-variant',
    badge: 'Popular',
  },
  {
    level: 'Collab',
    title: 'Sorteio',
    quote: 'Transforme seu restaurante em uma experiência.',
    description:
      'Criação conjunta de ações e sorteios. Levamos nossa audiência direto para a sua mesa.',
    surface: 'bg-tertiary-fixed',
    badge: null,
  },
] as const;

export function PartnerView() {
  return (
    <>
      <Container
        as="section"
        className="grid grid-cols-1 items-center gap-lg py-xl md:grid-cols-12"
      >
        <div className="md:col-span-8 md:pr-lg">
          <h1 className="mb-sm text-display-xl leading-[0.9]">
            Coloque seu restaurante no <span className="text-primary">mapa.</span>
          </h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant">
            Faça parte das indicações, ações e experiências do LOSPORPETAS. O guia da gastronomia
            local que conecta lugares autênticos a quem tem fome de verdade.
          </p>
        </div>

        <div className="relative flex justify-center md:col-span-4">
          <Stamp size="lg" />
        </div>
      </Container>

      <Divider />

      <Container as="section" className="py-xl">
        <h2 className="mb-lg text-headline-md">Tipos de parceria</h2>

        <ul className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {TIERS.map((tier) => (
            <li key={tier.title} className="contents">
              <article
                className={cn(
                  'relative flex h-full ink-lift flex-col p-md ink-border',
                  tier.surface,
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3 -left-3 z-10 -rotate-6">
                    <Badge tone="ink" size="md">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <p className="mb-xs w-max border border-current px-xs py-[2px] font-mono text-meta-mono text-primary uppercase">
                  {tier.level}
                </p>

                <h3 className="mb-xs text-headline-md leading-none">{tier.title}</h3>

                <p className="mb-sm text-body-md font-bold text-on-surface">
                  &ldquo;{tier.quote}&rdquo;
                </p>

                <p className="flex-grow text-body-md text-on-surface-variant">{tier.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <Divider />

      <Container as="section" className="grid grid-cols-1 gap-gutter py-xl md:grid-cols-12">
        <div className="flex flex-col justify-center md:col-span-5 md:pr-lg">
          <h2 className="mb-sm text-display-xl leading-none">Quer conversar?</h2>
          <p className="text-body-lg text-on-surface-variant">
            Preencha a comanda ao lado. Nossa curadoria analisa o perfil do restaurante e entra em
            contato para discutir a melhor forma de colocá-lo no mapa.
          </p>
        </div>

        <div className="md:col-span-7">
          <PartnerLeadForm />
        </div>
      </Container>
    </>
  );
}
