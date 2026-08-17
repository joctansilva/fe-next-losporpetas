import Image from 'next/image';
import type { Media } from '@/domain/restaurant';
import { cn } from '@/lib/cn';
import { IMAGE_SIZES, isPlaceholder, storageUrl, type ImageSizeContext } from '@/lib/images';

type PhotoProps = {
  media: Media | null;
  /** Define o `sizes` — sem ele o mobile baixa imagem de desktop. */
  context: ImageSizeContext;
  /** `true` só na imagem de LCP da página. Nunca em mais de uma. */
  priority?: boolean;
  className?: string;
};

/**
 * Foto de restaurante ou campanha, com o estado vazio do layout.
 *
 * O produto é feito de fotos, mas foto é opcional no modelo de dados — o layout
 * do Stitch já previa o card sem imagem ("FOTO EM BREVE"). Este componente
 * concentra as duas situações, para que nenhuma tela precise decidir de novo.
 *
 * ⚠️ `alt` vem sempre de `media.alt`, obrigatório no banco. Nunca inventar aqui:
 * texto alternativo é conteúdo editorial, não detalhe de implementação.
 */
export function Photo({ media, context, priority = false, className }: PhotoProps) {
  if (!media) return <PhotoPlaceholder className={className} />;

  return (
    <Image
      src={storageUrl(media)}
      alt={media.alt}
      fill
      sizes={IMAGE_SIZES[context]}
      priority={priority}
      // Placeholders da Fase 1 são SVG; o otimizador do Next não processa SVG
      // sem `dangerouslyAllowSVG`, que não vale ligar por causa de um temporário.
      unoptimized={isPlaceholder(media)}
      placeholder={media.blurDataUrl ? 'blur' : 'empty'}
      blurDataURL={media.blurDataUrl ?? undefined}
      className={cn('object-cover', className)}
    />
  );
}

/**
 * Estado sem foto — vem do layout da home, seção "Acabou de entrar no mapa".
 *
 * `aria-hidden` porque não acrescenta nada a quem usa leitor de tela: o nome do
 * restaurante já está no card, e "foto em breve" é ruído.
 */
export function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex size-full items-center justify-center bg-secondary-fixed select-none',
        className,
      )}
    >
      <span className="font-display text-headline-md text-on-surface/30 uppercase">
        Foto em breve
      </span>
    </div>
  );
}
