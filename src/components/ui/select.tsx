import { cn } from '@/lib/cn';
import { Icons, ICON_SIZE } from '@/lib/icons';
import { controlClassName, Field } from './field';

type SelectOption = { value: string; label: string };

type SelectProps = Omit<React.ComponentProps<'select'>, 'id' | 'children'> & {
  id: string;
  label: string;
  options: SelectOption[];
  /** Primeira opção, sem valor — ex.: "Todos", "Qualquer". */
  placeholder?: string;
  hint?: string;
  error?: string;
};

export function Select({
  id,
  label,
  options,
  placeholder,
  hint,
  error,
  required,
  className,
  ...props
}: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {({ inputId, describedBy }) => (
        <div className="relative">
          <select
            id={inputId}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className={cn(
              controlClassName(Boolean(error)),
              // A seta nativa é removida para caber a do nosso conjunto de ícones;
              // o padding à direita reserva o espaço dela.
              'cursor-pointer appearance-none pr-xl',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Icons.chevronDown
            size={ICON_SIZE.md}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-sm -translate-y-1/2 text-on-surface"
          />
        </div>
      )}
    </Field>
  );
}
