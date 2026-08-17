import Link from 'next/link';
import type { Tag } from '@/domain/restaurant';
import { buildDirectoryHref } from '@/lib/restaurant-filters';

/**
 * Tags de experiência ("Bom para date", "Com a galera").
 *
 * São links para o diretório filtrado, não etiquetas mortas: quem gostou do
 * clima de um lugar quer ver os outros com o mesmo clima. Isso também cria
 * ligação interna entre páginas, que ajuda no rastreamento.
 */
export function ExperienceTags({ tags }: { tags: Tag[] }) {
  const experiences = tags.filter((tag) => tag.kind === 'experience');
  if (experiences.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-sm">
      {experiences.map((tag) => (
        <li key={tag.id}>
          <Link
            href={buildDirectoryHref({ tag: tag.slug })}
            className="inline-flex rounded-full bg-surface px-sm py-xs font-mono text-label-mono text-on-surface uppercase transition-colors ink-border hover:bg-primary hover:text-on-primary"
          >
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
