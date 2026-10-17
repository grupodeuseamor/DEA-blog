import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Drawing } from '@/components/decor/Drawing'
import { WashiTape } from '@/components/decor/WashiTape'
import type { DecorDrawing } from '@/lib/specs/decor'

export type ListingCardProps = {
  slug: string
  title: string
  description: string
  path: string
  emoji?: string
  available?: boolean
  availableLabel?: string
  testIdPrefix?: string
}

/* ---------- v2 (desde 2.1.0-snapshot) ---------- */

type ListingCardV2Props = ListingCardProps & {
  index: number
  tape?: boolean
  year?: string | null
  drawing?: DecorDrawing
  /** Carimbo dos cards indisponíveis (decor.cards.soonStamp). */
  soonStamp?: string
}

/** Ficha v2 presa com fita, leve rotação alternada, etiqueta de ano da própria description e figurinha opcional. */
export function ListingCardV2({
  slug,
  title,
  description,
  path,
  emoji,
  available = true,
  availableLabel = 'Ver mais →',
  testIdPrefix = 'listing',
  index,
  tape = true,
  year,
  drawing,
  soonStamp,
}: ListingCardV2Props) {
  const rotate = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.6][index % 6]
  const body = (
    <>
      {tape && (
        <WashiTape
          style={{
            left: index % 2 ? 'auto' : 26,
            right: index % 2 ? 26 : 'auto',
            top: -12,
            width: 74,
            transform: `rotate(${index % 2 ? 6 : -6}deg)`,
          }}
        />
      )}
      <div className="topo">
        {emoji && (
          <span className="emoji" aria-hidden="true">
            {emoji}
          </span>
        )}
        {year && (
          <span className="ano t-titulo" data-testid="card-year">
            {year}
          </span>
        )}
      </div>
      <h2 className="t-titulo8">{title}</h2>
      <p>{description}</p>
      {available === false && soonStamp ? null : (
        <span className="mais">{available !== false ? availableLabel : 'Em breve'}</span>
      )}
      {drawing && <Drawing name={drawing} tone="manto" className="figura" />}
      {available === false && soonStamp && (
        <span className="carimbo-breve mao" data-testid="soon-stamp">
          {soonStamp}
        </span>
      )}
    </>
  )
  const style = { '--r': `${rotate}deg` } as CSSProperties
  if (available !== false) {
    return (
      <Link href={path} className="ficha" style={style} data-testid={`${testIdPrefix}-${slug}`}>
        {body}
      </Link>
    )
  }
  return (
    <div className="ficha off" style={style} data-testid={`${testIdPrefix}-${slug}`}>
      {body}
    </div>
  )
}
