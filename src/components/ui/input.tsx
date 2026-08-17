import { controlClassName, Field } from './field';

type InputProps = Omit<React.ComponentProps<'input'>, 'id'> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ id, label, hint, error, required, className, ...props }: InputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {({ inputId, describedBy }) => (
        <input
          id={inputId}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={controlClassName(Boolean(error), className)}
          {...props}
        />
      )}
    </Field>
  );
}
