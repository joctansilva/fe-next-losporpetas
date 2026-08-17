import { cn } from '@/lib/cn';

type ContainerProps = {
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'nav' | 'article';
  children: React.ReactNode;
  className?: string;
};

/**
 * Largura máxima (1280px) e margens do layout — 16px no mobile, 40px no desktop.
 *
 * Existe para que `max-w-[1280px] mx-auto px-4 md:px-10` não seja reescrito em
 * cada seção. Quando a medida mudar, muda num lugar só.
 */
export function Container({ as: Tag = 'div', children, className }: ContainerProps) {
  return <Tag className={cn('page-container', className)}>{children}</Tag>;
}
