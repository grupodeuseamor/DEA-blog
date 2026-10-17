import type { ReactNode } from 'react'
import { WashiTape } from '@/components/decor/WashiTape'

/** Folha única creme com duas fitas no topo: todas as seções da página ficam aqui dentro. */
export function PaperSheet({ label, children }: { label: string; children: ReactNode }) {
  return (
    <article className="folha" aria-label={label} data-testid="paper-sheet">
      <WashiTape className="esq" style={{ left: 46, top: -13, transform: 'rotate(-4deg)', width: 110 }} />
      <WashiTape className="dir" style={{ right: 46, top: -13, transform: 'rotate(5deg)', width: 110 }} />
      {children}
    </article>
  )
}
