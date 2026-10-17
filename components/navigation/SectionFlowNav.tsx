import Link from 'next/link'
import { WashiTape } from '@/components/decor/WashiTape'
import type { SectionFlow } from '@/lib/specs/nav'

/** Fluxo da seção: ← Anterior · Voltar para {listagem} · Próximo →. Fica fora da folha única. */
export function SectionFlowNav({ flow }: { flow: SectionFlow }) {
  const { back, prev, next, position, total } = flow
  return (
    <nav className="c fluxo" aria-label={`Navegação na seção ${back.label}`} data-testid="section-flow">
      <div className="lab">
        <span>Continue em {back.label}</span>
        <span>
          {position} de {total}
        </span>
      </div>
      <div className="grid">
        {prev ? (
          <Link className="fx pv" href={prev.path} data-testid="section-flow-prev">
            <WashiTape style={{ left: 18, top: -11, transform: 'rotate(-6deg)', width: 64 }} />
            <small>← Anterior</small>
            <b>{prev.label}</b>
          </Link>
        ) : (
          <span className="fx vazio" aria-hidden="true" />
        )}
        <Link className="voltar" href={back.path} data-testid="section-flow-back">
          ← Voltar para {back.label}
        </Link>
        {next ? (
          <Link className="fx nx" href={next.path} data-testid="section-flow-next">
            <WashiTape style={{ right: 18, top: -11, transform: 'rotate(5deg)', width: 64 }} />
            <small>Próximo →</small>
            <b>{next.label}</b>
          </Link>
        ) : (
          <span className="fx vazio" aria-hidden="true" />
        )}
      </div>
    </nav>
  )
}
