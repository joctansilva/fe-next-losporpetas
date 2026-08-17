import { sortedMechanics, type CampaignStep } from '@/domain/campaign';
import { Icons, ICON_SIZE } from '@/lib/icons';

/**
 * "Como participar" — os passos numerados do layout.
 *
 * É uma lista ordenada de verdade (`<ol>`), não `<div>`s com número escrito: a
 * ordem é a informação, e o leitor de tela precisa anunciar "1 de 4".
 *
 * Os passos vêm de `campaigns.mechanics` (jsonb), então cada campanha define os
 * seus — inclusive tipos que não são sorteio, com mecânica completamente
 * diferente. Some quando não há passo cadastrado.
 */
export function CampaignSteps({ steps }: { steps: CampaignStep[] }) {
  if (steps.length === 0) return null;

  const ordered = sortedMechanics(steps);

  return (
    <section className="flex flex-col gap-md">
      <h2 className="flex items-center gap-sm text-headline-md">
        <Icons.campaign size={ICON_SIZE.lg} aria-hidden="true" className="text-primary" />
        Como participar
      </h2>

      <ol className="ink-border flex flex-col bg-surface-container-highest">
        {ordered.map((step, index) => (
          <li
            key={step.step}
            className={
              index < ordered.length - 1
                ? 'flex items-start gap-md border-b-2 border-on-background p-md'
                : 'flex items-start gap-md p-md'
            }
          >
            <span
              aria-hidden="true"
              className="font-display text-headline-md leading-none text-primary"
            >
              {String(step.step).padStart(2, '0')}
            </span>
            <p className="flex-grow text-body-md">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
