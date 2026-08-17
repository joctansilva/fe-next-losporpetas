import { cn } from '@/lib/cn';

type BadgeTone = 'ink' | 'primary' | 'mustard' | 'muted' | 'outline' | 'success' | 'error';
type BadgeSize = 'sm' | 'md';

const TONE_CLASS: Record<BadgeTone, string> = {
  ink: 'bg-on-background text-surface', // "PARCEIRO"
  primary: 'bg-primary text-on-primary', // "ATIVO", "TOP PICK"
  mustard: 'bg-tertiary-fixed-dim text-on-background', // destaque neutro
  muted: 'bg-surface-container text-on-surface-variant', // bairro, categoria secundária
  outline: 'ink-border bg-surface text-on-surface', // faixa de preço
  success: 'bg-success text-on-primary',
  error: 'bg-error text-on-error',
};

const SIZE_CLASS: Record<BadgeSize, string> = {
  sm: 'px-xs py-[2px] text-meta-mono',
  md: 'px-sm py-xs text-label-mono',
};

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  size?: BadgeSize;
  className?: string;
};

/**
 * Etiqueta de metadado: categoria, bairro, faixa de preço, status.
 *
 * É texto, não controle. Se for clicável (filtro), use `Chip`.
 */
export function Badge({ children, tone = 'muted', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-xs font-mono font-bold uppercase',
        TONE_CLASS[tone],
        SIZE_CLASS[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
