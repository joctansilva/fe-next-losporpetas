import type { Media } from '@/domain/restaurant';

/**
 * Resolução de URL de imagem e tamanhos por contexto.
 *
 * Isola o fornecedor de storage: hoje as imagens vêm de placeholders locais,
 * na Fase 2 passam a vir do Supabase Storage e, se o egress virar problema
 * (risco R9), a entrega migra para outro CDN sem tocar em componente nenhum.
 */

/** Placeholders locais da Fase 1 — não existe bucket ainda. */
const PLACEHOLDER_PREFIX = 'placeholder/';

export function isPlaceholder(media: Media): boolean {
  return media.storagePath.startsWith(PLACEHOLDER_PREFIX);
}

/**
 * URL pública da imagem.
 *
 * ⚠️ Fase 1: caminhos `placeholder/*` viram arquivos de `public/placeholder/`.
 * Fase 2.5: passam a ser resolvidos contra o Supabase Storage.
 */
export function storageUrl(media: Media): string {
  if (isPlaceholder(media)) {
    return `/${media.storagePath}.svg`;
  }

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  return `${base}/storage/v1/object/public/${media.bucket ?? 'restaurants'}/${media.storagePath}`;
}

/**
 * Valor do atributo `sizes` por contexto.
 *
 * ⚠️ Sem `sizes` correto, o navegador baixa a imagem de desktop no celular — e
 * o portal é feito de fotos (risco R6). Cada entrada abaixo descreve a largura
 * que a imagem realmente ocupa em cada breakpoint.
 */
export const IMAGE_SIZES = {
  /** Card grande de destaque: 1 coluna no mobile, 2 no desktop. */
  hero: '(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw',
  /** Card padrão do diretório: 1 → 2 → 3 colunas. */
  card: '(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw',
  /** Card compacto: 1 → 2 → 4 colunas. */
  compact: '(min-width: 1280px) 300px, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw',
  /** Miniatura de relacionados. */
  mini: '(min-width: 768px) 33vw, 100vw',
  /** Imagem de topo da página do restaurante — ocupa a largura inteira. */
  fullWidth: '100vw',
} as const;

export type ImageSizeContext = keyof typeof IMAGE_SIZES;
