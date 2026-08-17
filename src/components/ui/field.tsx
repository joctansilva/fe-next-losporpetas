import { cn } from '@/lib/cn';

export type FieldProps = {
  /** Sempre visível. Placeholder não substitui label. */
  label: string;
  /** Texto de ajuda, exibido antes de haver erro. */
  hint?: string;
  /** Mensagem de erro. Presente = campo inválido. */
  error?: string;
  required?: boolean;
  children: (ids: { inputId: string; describedBy: string | undefined }) => React.ReactNode;
  id: string;
  className?: string;
};

/**
 * Moldura compartilhada dos campos de formulário: label, ajuda e erro.
 *
 * Concentra num lugar só o que é fácil errar campo a campo:
 *
 * - a label é sempre visível e associada por `htmlFor` (placeholder some ao
 *   digitar, então não serve de rótulo);
 * - ajuda e erro são ligados por `aria-describedby`, senão o leitor de tela
 *   anuncia o campo sem dizer o que está errado;
 * - o erro tem `role="alert"`, para ser anunciado quando aparece;
 * - o campo obrigatório é marcado por texto ("obrigatório"), não só pelo
 *   asterisco vermelho — cor sozinha não comunica.
 */
export function Field({
  label,
  hint,
  error,
  required = false,
  children,
  id,
  className,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-xs', className)}>
      <label htmlFor={id} className="font-mono text-label-mono text-on-surface uppercase">
        {label}
        {required && (
          <span className="ml-xs text-primary">
            <span aria-hidden="true">*</span>
            <span className="sr-only">(obrigatório)</span>
          </span>
        )}
      </label>

      {children({ inputId: id, describedBy })}

      {hint && !error && (
        <p id={hintId} className="text-body-sm text-on-surface-variant">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-body-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Classe compartilhada pelos controles, para input/textarea/select não divergirem. */
export const controlClassName = (hasError: boolean, className?: string) =>
  cn(
    'ink-border w-full bg-surface-container-lowest px-sm py-xs font-body text-body-md text-on-surface',
    'min-h-[44px] transition-colors placeholder:text-on-surface-variant/60',
    'disabled:cursor-not-allowed disabled:opacity-50',
    hasError && 'border-error',
    className,
  );
