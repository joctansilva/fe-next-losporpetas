import type { EditorialReview as Review } from '@/domain/restaurant';

/**
 * "Por que está aqui?" — a curadoria editorial.
 *
 * É o diferencial do produto: o texto que explica por que o lugar merece estar
 * no guia. Some inteira quando não há review — restaurante pode entrar no guia
 * com teaser curto enquanto a visita não vira texto.
 *
 * ⚠️ **O corpo é markdown no banco, mas aqui é renderizado como parágrafos de
 * texto puro.** Nada de `dangerouslySetInnerHTML`: o ESLint proíbe
 * (`react/no-danger`) e conteúdo editorial não justifica abrir essa porta.
 * Quando o admin ganhar editor rico (Fase 5), entra um renderizador de markdown
 * de verdade — que sanitiza — e este componente passa a usá-lo.
 */
export function EditorialReview({ review }: { review: Review | null }) {
  if (!review) return null;

  const paragraphs = review.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="flex flex-col gap-md">
      <h2 className="border-b-2 border-on-background pb-xs text-headline-lg">
        {review.headline ?? 'Por que está aqui?'}
      </h2>

      <div className="flex flex-col gap-md border-l-4 border-primary pl-md text-body-lg text-on-surface-variant">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {review.verdict && <p className="text-body-lg font-bold text-primary">{review.verdict}</p>}
      </div>

      {review.visitedAt && (
        <p className="font-mono text-meta-mono text-on-surface-variant uppercase">
          Visitado em{' '}
          <time dateTime={review.visitedAt}>
            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(
              new Date(`${review.visitedAt}T12:00:00-03:00`),
            )}
          </time>
        </p>
      )}
    </section>
  );
}
