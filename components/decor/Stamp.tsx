import { useId } from 'react'
import { drawings } from '@/components/decor/drawings'
import type { DecorDrawing } from '@/lib/specs/decor'

type StampProps = {
  text: string
  center?: string
  centerDrawing?: DecorDrawing
}

/** Carimbo circular (tinta via filtro #stamp) com texto em textPath. */
export function Stamp({ text, center, centerDrawing }: StampProps) {
  const id = `cp-${useId().replace(/:/g, '')}`
  const ring = `${text} ·`.toUpperCase()
  // Ajusta o anel ao perímetro (2π·72 ≈ 452): espaçamento uniforme e fonte menor quando o texto é longo.
  const fontSize = Math.min(17.5, 440 / (ring.length * 0.66))
  return (
    <svg className="carimbo" viewBox="0 0 200 200" role="img" aria-label={`Carimbo: ${text}`} data-decor="carimbo">
      <defs>
        <path id={id} d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" />
      </defs>
      <g filter="url(#stamp)">
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="2" />
        <text className="anel" fill="currentColor" style={{ fontSize }} textLength={440} lengthAdjust="spacing">
          <textPath href={`#${id}`} startOffset="0">
            {ring}
          </textPath>
        </text>
        {center && (
          <text className="centro" x="100" y="96" textAnchor="middle" fill="currentColor">
            {center}
          </text>
        )}
        {centerDrawing && !center && (
          <svg
            x="76"
            y="56"
            width="48"
            height="48"
            viewBox={drawings[centerDrawing].viewBox}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: drawings[centerDrawing].body }}
          />
        )}
        <path d="M80 112h40" stroke="currentColor" strokeWidth="2" />
        <path
          d="M100 120l3 6 6.5 1-4.7 4.6 1.1 6.5-5.9-3.1-5.9 3.1 1.1-6.5-4.7-4.6 6.5-1z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
