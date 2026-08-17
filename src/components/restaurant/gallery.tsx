import { Photo } from '@/components/ui/photo';
import type { Media } from '@/domain/restaurant';
import { cn } from '@/lib/cn';

/**
 * Galeria "Conheça o lugar".
 *
 * Grade assimétrica do layout: a primeira foto ocupa um quadrado grande e as
 * demais entram como faixas 2:1 ao lado. Some inteira sem fotos.
 *
 * ⚠️ Adapta-se à quantidade real. O layout do Stitch assumia exatamente 3
 * fotos; na prática um restaurante pode ter 1, 2 ou 8. Com uma foto só, ela
 * ocupa a largura inteira em vez de deixar buraco na grade.
 *
 * Sem lightbox por enquanto: abrir a foto em tela cheia exige estado, e o
 * componente inteiro viraria client. Entra na Fase 6, se a métrica justificar.
 */
export function Gallery({ media }: { media: Media[] }) {
  if (media.length === 0) return null;

  const [first, ...rest] = media;
  if (!first) return null;

  return (
    <section className="flex flex-col gap-md">
      <h2 className="border-b-2 border-on-background pb-xs text-headline-md">Conheça o lugar</h2>

      <div className="grid grid-cols-2 gap-sm md:grid-cols-4">
        <figure
          className={cn(
            'ink-border relative overflow-hidden bg-surface-dim',
            rest.length > 0
              ? 'col-span-2 row-span-2 aspect-square'
              : 'col-span-2 aspect-video md:col-span-4',
          )}
        >
          <Photo
            media={first}
            context="card"
            className="transition-transform duration-500 hover:scale-105"
          />
        </figure>

        {rest.map((item) => (
          <figure
            key={item.id}
            className="ink-border relative col-span-2 aspect-[2/1] overflow-hidden bg-surface-dim"
          >
            <Photo
              media={item}
              context="card"
              className="transition-transform duration-500 hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
