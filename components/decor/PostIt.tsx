import type { CSSProperties } from 'react'
import { Pin } from '@/components/decor/Pin'

type PostItProps = {
  label: string
  text: string
  pin?: 'manto' | 'coracao'
  paper?: 'areia' | 'papel'
  rotate?: number
}

/** Post-it com tachinha: número grande (Fraunces) + frase à mão (Gochi Hand). */
export function PostIt({ label, text, pin = 'manto', paper = 'areia', rotate = -3 }: PostItProps) {
  return (
    <div className={`postit ${paper}`} style={{ '--r': `${rotate}deg` } as CSSProperties} data-decor="postit">
      <Pin tone={pin} />
      <b className={label.length > 6 ? 't-titulo longo' : 't-titulo'}>{label}</b>
      <span className="mao">{text}</span>
    </div>
  )
}
