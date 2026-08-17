import Link from 'next/link';

/**
 * Placeholder da home.
 * A Home / Descobrir real é construída na Fase 1.3 do plano de implementação.
 */
export default function Home() {
  return (
    <main className="page-container flex flex-1 flex-col items-center justify-center gap-md py-xl text-center">
      <p className="font-mono text-label-mono text-primary uppercase">Em construção</p>
      <h1 className="text-display-xl">Losporpetas</h1>
      <p className="max-w-xl text-body-lg text-on-surface-variant">
        Guia gastronômico local. A home de descoberta é construída na Fase 1 do plano de
        implementação.
      </p>
      {process.env.NODE_ENV !== 'production' && (
        <Link
          href="/dev/design-system"
          className="ink-border ink-lift-sm mt-md bg-primary px-md py-sm font-mono text-label-mono font-bold text-on-primary uppercase"
        >
          Ver o design system
        </Link>
      )}
    </main>
  );
}
