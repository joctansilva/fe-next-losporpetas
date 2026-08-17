import { cn } from '@/lib/cn';
import { controlClassName, Field } from './field';

type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'id'> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function Textarea({
  id,
  label,
  hint,
  error,
  required,
  rows = 4,
  className,
  ...props
}: TextareaProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {({ inputId, describedBy }) => (
        <textarea
          id={inputId}
          rows={rows}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={cn(controlClassName(Boolean(error)), 'resize-y py-sm', className)}
          {...props}
        />
      )}
    </Field>
  );
}
