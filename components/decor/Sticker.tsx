import { Drawing } from '@/components/decor/Drawing'
import { HandNote } from '@/components/decor/HandNote'
import { WashiTape } from '@/components/decor/WashiTape'
import type { DecorDrawing } from '@/lib/specs/decor'

type StickerProps = {
  drawings: DecorDrawing[]
  tape?: boolean
  text?: string
}

const sizes: Partial<Record<DecorDrawing, { w: number; h: number }>> = {
  lirio: { w: 60, h: 70 },
  vela: { w: 46, h: 58 },
  estrela: { w: 40, h: 40 },
  'coracao-chama': { w: 46, h: 54 },
}

/** Figurinha: desenho(s) num adesivo de papel; com `text` vira figurinha redonda com bilhete. */
export function Sticker({ drawings, tape = false, text }: StickerProps) {
  return (
    <div className={text ? 'figurinha cir' : 'figurinha'} data-decor="figurinha">
      {tape && <WashiTape style={{ left: 8, top: -10, transform: 'rotate(-24deg)', width: 70 }} />}
      {drawings.map((name, i) => {
        const s = sizes[name] ?? { w: 48, h: 48 }
        const accent = drawings.length > 1 && i === 0
        return (
          <Drawing
            key={name}
            name={name}
            tone={accent ? 'ceu' : 'manto'}
            style={{ width: s.w, height: s.h, transform: accent ? 'rotate(-10deg)' : undefined }}
          />
        )
      })}
      {text && <HandNote text={text} rotate={-4} />}
    </div>
  )
}
