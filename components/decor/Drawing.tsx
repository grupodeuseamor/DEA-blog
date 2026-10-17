import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { drawings, logoDrawing, type DrawingDef } from '@/components/decor/drawings'
import type { DecorDrawing } from '@/lib/specs/decor'

export type DrawingTone = 'manto' | 'ceu' | 'areia' | 'coracao' | 'noite'

const toneClass: Record<DrawingTone, string> = {
  manto: 'text-manto',
  ceu: 'text-ceu',
  areia: 'text-areia',
  coracao: 'text-coracao',
  noite: 'text-noite',
}

type DrawingProps = {
  name: DecorDrawing | 'logo'
  tone?: DrawingTone
  className?: string
  style?: CSSProperties
  strokeWidth?: number
  animated?: boolean
}

/** Desenho à mão inline (aria-hidden). Cor via currentColor + classe de token. */
export function Drawing({ name, tone, className, style, strokeWidth, animated }: DrawingProps) {
  const def: DrawingDef = name === 'logo' ? logoDrawing : drawings[name]
  return (
    <svg
      className={cn('d', animated && 'anim', tone && toneClass[tone], className)}
      viewBox={def.viewBox}
      style={{ ...(strokeWidth ? { strokeWidth } : null), ...style }}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: def.body }}
    />
  )
}

/** Sublinhado rabiscado (Azul Céu) posicionado sob um título `.tt`. */
export function ScribbleUnderline() {
  return (
    <svg className="sub" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 11c38-7 78-8 118-3s92 6 176-5" style={{ strokeWidth: 4 }} />
      <path d="M30 15c50-4 110-4 200-6" style={{ strokeWidth: 2, opacity: 0.6 }} />
    </svg>
  )
}
