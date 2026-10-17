import { Fragment } from 'react'
import { DecorAside } from '@/components/decor/DecorAside'
import { DrawnTitle } from '@/components/decor/DrawnTitle'
import { ImageBackdrop } from '@/components/decor/ImageBackdrop'
import { SheetPhoto } from '@/components/decor/SheetPhoto'
import { highlightText } from '@/components/decor/Highlight'
import { SectionBreak } from '@/components/decor/SectionBreak'
import { resolveImageRef, type DecorBlock, type PageDecor } from '@/lib/specs/decor'
import type { ContentSection } from '@/lib/specs/types'

type Props = {
  sections: ContentSection[]
  blocks: DecorBlock[]
  sheetPhotos?: PageDecor['sheetPhotos']
  content: unknown
  imageAlt: string
}

/**
 * Seções v2 dentro da folha única: sem card próprio; highlight vira bloco Areia interno;
 * coluna lateral com DecorAside; marcas no texto; citação com margem vermelha de caderno.
 */
export function SectionRendererV2({ sections, blocks, sheetPhotos = [], content, imageAlt }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        const block = blocks.find((b) => b.target === `sections[${i}]`)
        const key = section.type === 'quote' ? section.text.slice(0, 30) : section.title
        const marks = block?.marks ?? []
        const backdropSrc = block?.backdrop ? resolveImageRef(content, block.backdrop.image) : null
        const photo = sheetPhotos.find((p) => p.after === `sections[${i}]`)
        const photoSrc = photo ? resolveImageRef(content, photo.image) : null
        const sheetPhoto =
          photo && photoSrc ? (
            <SheetPhoto
              src={photoSrc}
              alt={imageAlt}
              side={photo.side}
              rotate={photo.rotate}
              focus={photo.focus}
              caption={photo.caption}
            />
          ) : null
        const backdrop = block?.backdrop && backdropSrc ? <ImageBackdrop src={backdropSrc} backdrop={block.backdrop} /> : null
        return (
          <Fragment key={key}>
            {i > 0 && <SectionBreak />}
            {section.type === 'quote' ? (
              <section className="bloco" data-section-index={i}>
                <blockquote className="ql margem-caderno">{section.text}</blockquote>
              </section>
            ) : (
              <section
                className={['bloco', section.variant === 'highlight' && 'hl', backdrop && 'com-fundo']
                  .filter(Boolean)
                  .join(' ')}
                data-section-index={i}
              >
                {backdrop}
                <div className="row">
                  <div className="txt">
                    <DrawnTitle title={section.title} drawing={block?.titleDrawing} />
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{highlightText(p, marks)}</p>
                    ))}
                    {section.quote && <blockquote className="ql margem-caderno">{section.quote}</blockquote>}
                  </div>
                  <DecorAside items={block?.side ?? []} content={content} imageAlt={imageAlt} index={i} />
                </div>
                {sheetPhoto}
              </section>
            )}
          </Fragment>
        )
      })}
    </>
  )
}
