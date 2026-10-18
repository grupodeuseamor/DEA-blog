import type { CSSProperties } from 'react'
import { Pin } from '@/components/decor/Pin'

type PostItDatesProps = {
  items: { label: string; text: string }[]
  pin?: 'manto' | 'coracao'
  rotate?: number
}

/** Post-it de datas (linha do tempo curta). */
export function PostItDates({ items, pin = 'manto', rotate = 2 }: PostItDatesProps) {
  return (
    <div className="postit datas areia" style={{ '--r': `${rotate}deg` } as CSSProperties} data-decor="postit-datas">
      <Pin tone={pin} />
      <ul className={items.some((item) => item.label.length > 5) ? 'empilhado' : undefined}>
        {items.map((item) => (
          <li key={item.label}>
            <b className="t-titulo">{item.label}</b>
            <span className="mao">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
