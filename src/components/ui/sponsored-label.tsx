import { cn } from '@/lib/cn';

type SponsoredLabelProps = {
  /** `publi` para destaque pago; `partner` para vínculo comercial declarado. */
  kind?: 'publi' | 'partner';
  className?: string;
};

/**
 * Rótulo de conteúdo comercial.
 *
 * ⚠️ **OBRIGATÓRIO, não opcional.**
 *
 * Todo card renderizado a partir de um `featured_slots` com
 * `is_sponsored = true` precisa exibir este rótulo. Isso não é escolha de
 * design — é o que:
 *
 * 1. mantém o carimbo "APROVADO" valendo alguma coisa (risco R1);
 * 2. cumpre a exigência do CONAR de sinalizar publicidade de influenciador.
 *
 * Se em algum momento a alternativa for "fica feio com o rótulo", a resposta é
 * mudar o design do rótulo — não escondê-lo.
 */
export function SponsoredLabel({ kind = 'publi', className }: SponsoredLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-on-background px-xs py-[2px] font-mono text-meta-mono font-bold tracking-wider text-surface uppercase',
        className,
      )}
    >
      {kind === 'publi' ? 'Publi' : 'Parceiro'}
    </span>
  );
}
