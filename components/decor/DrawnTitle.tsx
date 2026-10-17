import type { CSSProperties } from 'react'
import { Drawing, ScribbleUnderline } from '@/components/decor/Drawing'
import type { DecorDrawing } from '@/lib/specs/decor'

const titleDrawingStyle: Partial<Record<DecorDrawing, { tone: 'manto' | 'ceu'; style: CSSProperties }>> = {
  onda: { tone: 'ceu', style: { width: 84, height: 26, marginLeft: 14, verticalAlign: 'middle' } },
  coroa: { tone: 'manto', style: { width: 52, height: 42, marginLeft: 14, verticalAlign: -4, transform: 'rotate(8deg)' } },
}

/** Título de seção (Fraunces, Azul Manto) com sublinhado rabiscado em Azul Céu + desenho opcional. */
export function DrawnTitle({ title, drawing }: { title: string; drawing?: DecorDrawing }) {
  const d = drawing ? titleDrawingStyle[drawing] ?? { tone: 'manto' as const, style: { width: 44, height: 40, marginLeft: 14, verticalAlign: 'middle' } } : null
  return (
    <h2 className="t-titulo8">
      <span className="tt">
        {title}
        <ScribbleUnderline />
      </span>
      {drawing && d && <Drawing name={drawing} tone={d.tone} style={d.style} />}
    </h2>
  )
}
