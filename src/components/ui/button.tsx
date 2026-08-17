import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'ink-border bg-primary text-on-primary ink-lift-sm',
  secondary: 'ink-border bg-surface text-on-surface ink-lift-sm hover:bg-surface-container-high',
  ghost: 'border-b-2 border-on-background bg-transparent text-on-background hover:text-primary',
  inverse: 'ink-border-inverse bg-transparent text-surface hover:bg-surface hover:text-on-surface',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  // min-h garante o alvo de toque de 44px no mobile mesmo com texto curto.
  sm: 'px-sm py-xs text-meta-mono min-h-[36px]',
  md: 'px-md py-sm text-label-mono min-h-[44px]',
  lg: 'px-lg py-md text-body-md min-h-[52px]',
};

const BASE_CLASS =
  'inline-flex items-center justify-center gap-xs font-mono font-bold uppercase tracking-wide ' +
  'transition-colors disabled:cursor-not-allowed disabled:opacity-50 ' +
  'disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none';

/**
 * Classes do botão, sem o componente.
 *
 * Use quando o elemento precisa ser outra coisa — tipicamente um `<Link>`:
 *
 *   <Link href="/restaurantes" className={buttonClassName({ variant: 'primary' })}>
 *
 * Isso resolve o mesmo problema que um `asChild` resolveria, sem exigir
 * `React.cloneElement` nem empurrar o componente para o cliente. Navegação é
 * `<a>`, ação é `<button>` — a distinção importa para teclado, leitor de tela
 * e para abrir em nova aba.
 */
export function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return cn(BASE_CLASS, VARIANT_CLASS[variant], SIZE_CLASS[size], fullWidth && 'w-full', className);
}

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      // `type` padrão é 'button': sem isso, um botão dentro de <form> submete
      // sem querer — bug clássico e difícil de rastrear.
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}
