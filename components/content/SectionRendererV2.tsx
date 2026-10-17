import { Fragment } from 'react'
import { DecorAside } from '@/components/decor/DecorAside'
import { DrawnTitle } from '@/components/decor/DrawnTitle'
import { highlightText } from '@/components/decor/Highlight'
import { SectionBreak } from '@/components/decor/SectionBreak'
import type { DecorBlock } from '@/lib/specs/decor'
import type { ContentSection } from '@/lib/specs/types'

type Props = {
  sections: ContentSection[]
  blocks: DecorBlock[]
  content: unknown
  imageAlt: string
}

/**
 * Seções v2 dentro da folha única: sem card próprio; highlight vira bloco Areia interno;
 * coluna lateral com DecorAside; marcas no texto; citação com margem vermelha de caderno.
 */
export function SectionRendererV2({ sections, blocks, content, imageAlt }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        const block = blocks.find((b) => b.target === `sections[${i}]`)
        const key = section.type === 'quote' ? section.text.slice(0, 30) : section.title
        const marks = block?.marks ?? []
        return (
          <Fragment key={key}>
            {i > 0 && <SectionBreak />}
            {section.type === 'quote' ? (
              <section className="bloco" data-section-index={i}>
                <blockquote className="ql margem-caderno">{section.text}</blockquote>
              </section>
            ) : (
              <section
                className={section.variant === 'highlight' ? 'bloco hl' : 'bloco'}
                data-section-index={i}
              >
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
              </section>
            )}
          </Fragment>
        )
      })}
    </>
  )
}
