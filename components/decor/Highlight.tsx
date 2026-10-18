import type { ReactNode } from 'react'

export type HighlightMark = { text: string; kind: 'marca' | 'circulo' | 'sublinhado' }

/** Aplica marca-texto, círculo à mão ou sublinhado por substring exata (1ª ocorrência) num parágrafo. */
export function highlightText(paragraph: string, marks: HighlightMark[]): ReactNode {
  type Hit = { start: number; end: number; mark: HighlightMark }
  const hits: Hit[] = []
  for (const mark of marks) {
    const start = paragraph.indexOf(mark.text)
    if (start < 0) continue
    const end = start + mark.text.length
    if (hits.some((h) => start < h.end && end > h.start)) continue
    hits.push({ start, end, mark })
  }
  if (!hits.length) return paragraph
  hits.sort((a, b) => a.start - b.start)
  const out: ReactNode[] = []
  let cursor = 0
  hits.forEach(({ start, end, mark }, i) => {
    if (start > cursor) out.push(paragraph.slice(cursor, start))
    const frag = paragraph.slice(start, end)
    if (mark.kind === 'circulo') {
      out.push(
        <span className="circ" key={i}>
          {frag}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 4C80 3 97 10 97 20S78 37 50 37 3 31 3 20 20 5 50 4c9 0 15 1 19 3" />
          </svg>
        </span>,
      )
    } else if (mark.kind === 'sublinhado') {
      out.push(<span className="sublinha" key={i}>{frag}</span>)
    } else {
      out.push(<mark className="marca" key={i}>{frag}</mark>)
    }
    cursor = end
  })
  if (cursor < paragraph.length) out.push(paragraph.slice(cursor))
  return out
}
