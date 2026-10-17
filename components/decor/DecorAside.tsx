import { Drawing } from '@/components/decor/Drawing'
import { HandNote } from '@/components/decor/HandNote'
import { Polaroid } from '@/components/decor/Polaroid'
import { PostIt } from '@/components/decor/PostIt'
import { PostItDates } from '@/components/decor/PostItDates'
import { Stamp } from '@/components/decor/Stamp'
import { Sticker } from '@/components/decor/Sticker'
import { resolveImageRef, type DecorSideItem } from '@/lib/specs/decor'

type DecorAsideProps = {
  items: DecorSideItem[]
  content: unknown
  imageAlt: string
  /** Índice do bloco: alterna a inclinação dos post-its como no piloto. */
  index: number
}

const noteDrawing = {
  gota: { tone: 'ceu' as const, style: { width: 42, height: 42 }, className: undefined },
  seta: {
    tone: 'manto' as const,
    style: { width: 56, height: 42, transform: 'scaleX(-1) rotate(-10deg)' },
    className: 'dsk-only',
  },
  onda: { tone: 'ceu' as const, style: { width: 70, height: 22 }, className: undefined },
  aspas: { tone: 'ceu' as const, style: { width: 40, height: 27 }, className: undefined },
  brilhinhos: { tone: 'ceu' as const, style: { width: 40, height: 40 }, className: undefined },
}

/** Coluna lateral de um bloco (máx. 2 itens). No mobile desce para baixo do texto (nunca por cima). */
export function DecorAside({ items, content, imageAlt, index }: DecorAsideProps) {
  if (!items.length) return null
  return (
    <aside className="side" data-testid="decor-aside">
      {items.map((item, i) => {
        const key = `${item.kind}-${i}`
        switch (item.kind) {
          case 'polaroid': {
            const src = resolveImageRef(content, item.image)
            return src ? (
              <Polaroid key={key} src={src} alt={imageAlt} caption={item.caption} tape={item.tape} />
            ) : null
          }
          case 'carimbo':
            return <Stamp key={key} text={item.text} center={item.center} centerDrawing={item.centerDrawing} />
          case 'postit':
            return (
              <PostIt
                key={key}
                label={item.label}
                text={item.text}
                pin={item.pin}
                paper={item.paper}
                rotate={index % 2 === 1 ? -4 : 3}
              />
            )
          case 'postit-datas':
            return <PostItDates key={key} items={item.items} pin={item.pin} />
          case 'bilhete': {
            const d = item.drawing ? noteDrawing[item.drawing as keyof typeof noteDrawing] : undefined
            return (
              <div className="nota-com-desenho" key={key} data-decor="bilhete">
                {item.drawing && (
                  <Drawing
                    name={item.drawing}
                    tone={d?.tone ?? 'manto'}
                    style={d?.style ?? { width: 42, height: 42 }}
                    className={d?.className}
                  />
                )}
                <HandNote text={item.text} rotate={index % 2 === 1 ? 3 : -3} />
              </div>
            )
          }
          case 'figurinha':
            return <Sticker key={key} drawings={item.drawings} tape={item.tape} text={item.text} />
        }
      })}
    </aside>
  )
}
