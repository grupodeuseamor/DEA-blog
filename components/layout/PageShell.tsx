import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  /** v2: fundo papel + textura (páginas com specs/decor/{slug}.json). */
  variant?: 'legacy' | 'v2'
}

export function PageShell({ children, variant = 'legacy' }: PageShellProps) {
  if (variant === 'v2') {
    return (
      <main className="v2 min-h-screen" data-visual="v2">
        {children}
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-[#0f0f12] text-[#f2f2f2]">{children}</main>
  )
}
