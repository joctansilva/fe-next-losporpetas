import { cn } from '@/lib/cn';

type StampSize = 'sm' | 'md' | 'lg';

const SIZE_CLASS: Record<StampSize, string> = {
  sm: 'size-20 text-meta-mono',
  md: 'size-28 text-body-sm',
  lg: 'size-32 md:size-36 text-body-md',
};

type StampProps = {
  size?: StampSize;
  className?: string;
};

/**
 * Carimbo "APROVADO PELO LOSPORPETAS".
 *
 * ⚠️ **REGRA DE PRODUTO — leia antes de usar.**
 *
 * Este carimbo representa curadoria editorial: alguém foi ao lugar, comeu e
 * aprovou. Ele é o único ativo real do produto.
 *
 * Renderize **apenas** quando `canShowApprovalStamp(restaurant)` for verdadeiro
 * (src/domain/restaurant.ts, a partir da Fase 1.1), função que olha somente
 * `curationStatus === 'approved'`.
 *
 * **Parceria comercial NUNCA produz este carimbo.** Restaurante parceiro que
 * não passou pela curadoria recebe `SponsoredLabel` ou o badge "PARCEIRO" —
 * nunca este. Ver documentation/03-MODELO-DE-DADOS.md §3.6 e o risco R1.
 */
export function Stamp({ size = 'md', className }: StampProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 ink-stamp items-center justify-center rounded-full bg-primary-container p-sm text-center ink-shadow ink-border',
        SIZE_CLASS[size],
        className,
      )}
    >
      <span
        className="font-display leading-none text-on-primary uppercase"
        // O texto é a informação; o desenho circular é decoração.
        aria-label="Aprovado pelo Losporpetas"
      >
        Aprovado
        <br />
        pelo
        <br />
        Losporpetas
      </span>
    </div>
  );
}
