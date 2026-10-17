import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  /** Mantido por compatibilidade; desde 2.6.0-snapshot só existe o visual v2. */
  variant?: 'v2'
}

/** Moldura de página: fundo papel + textura (visual v2 “Caderno + Novo Lote”). */
export function PageShell({ children }: PageShellProps) {
  return (
    <main className="v2 min-h-screen" data-visual="v2">
      {children}
    </main>
  )
}
