'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonClassName } from '@/components/ui/button';
import { Icons, ICON_SIZE } from '@/lib/icons';
import { MAIN_NAV, SITE, SOCIAL_LINKS, SUGGEST_CTA } from '@/lib/site';
import { NavLink } from './nav-link';

/**
 * Menu mobile.
 *
 * ⚠️ **Não existe nos layouts do Stitch** — lá o botão hamburger está marcado
 * como "decorativo/placeholder" nos 5 arquivos. Desenhado aqui seguindo a
 * estética: painel de tinta ocupando a tela inteira, links em Bebas grande,
 * exatamente como a faixa escura da seção de categorias da home.
 *
 * Sobre o `<dialog>`: mesma decisão do `Modal`. `showModal()` entrega foco
 * preso, `Esc` e devolução do foco ao hamburger — de graça e sem bug sutil.
 *
 * ⚠️ O layout usa `open:flex`, não `flex`: o navegador esconde diálogo fechado
 * com `dialog:not([open]) { display: none }`, que é estilo de UA, e qualquer
 * `display` do autor ganharia dele — deixando o menu visível o tempo todo.
 */
export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const titleId = useId();

  /**
   * Fecha ao trocar de rota — a navegação do Next não desmonta o componente,
   * então sem isto o menu ficaria aberto por cima da página nova. Isso também
   * cobre voltar/avançar do navegador, que um `onClick` no link não pegaria.
   *
   * É o padrão "ajustar estado durante o render" do React, e não um efeito:
   * `setState` dentro de `useEffect` provoca um segundo render depois da
   * pintura — o usuário chegaria a ver o menu aberto piscando na rota nova.
   * Aqui o React descarta o render em andamento e refaz antes de pintar.
   */
  const [routeAtRender, setRouteAtRender] = useState(pathname);
  if (routeAtRender !== pathname) {
    setRouteAtRender(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="ink-border flex size-11 items-center justify-center bg-surface text-on-surface transition-colors hover:bg-primary hover:text-on-primary md:hidden"
      >
        <Icons.menu size={ICON_SIZE.lg} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-on-background p-0 text-surface backdrop:bg-on-background/80 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b-2 border-surface px-margin-mobile py-base">
          <span
            id={titleId}
            className="font-display text-headline-md tracking-tighter text-primary uppercase"
          >
            {SITE.name}
          </span>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="flex size-11 items-center justify-center border-2 border-surface bg-transparent text-surface transition-colors hover:bg-surface hover:text-on-surface"
          >
            <Icons.close size={ICON_SIZE.lg} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Menu principal"
          className="flex flex-1 flex-col justify-center gap-md px-margin-mobile"
        >
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              variant="drawer"
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>

        <div className="flex flex-col gap-md border-t-2 border-surface px-margin-mobile py-md">
          <Link
            href={SUGGEST_CTA.href}
            onClick={() => setOpen(false)}
            className={buttonClassName({ variant: 'primary', size: 'lg', fullWidth: true })}
          >
            {SUGGEST_CTA.label}
          </Link>

          <div className="flex gap-md">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-label-mono text-surface uppercase transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
