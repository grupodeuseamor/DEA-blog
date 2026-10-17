import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Drawing } from '@/components/decor/Drawing'
import { WashiTape } from '@/components/decor/WashiTape'
import type { DecorDrawing } from '@/lib/specs/decor'
import { listingCardClass } from '@/lib/theme'

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

export function ListingCard({
  slug,
  title,
  description,
  path,
  emoji,
  available = true,
  availableLabel = 'Ver mais →',
  testIdPrefix = 'listing',
}: ListingCardProps) {
  const content = (
    <>
      {emoji && <div className="text-4xl mb-4">{emoji}</div>}
      <h2 className="font-serif text-2xl text-[#d4af37] mb-3">{title}</h2>
      <p className="leading-relaxed text-foreground/85 mb-4">{description}</p>
      {available !== false ? (
        <span className="inline-block text-sm font-semibold text-[#d4af37]">
          {availableLabel}
        </span>
      ) : (
        <span className="inline-block text-sm text-muted-foreground">Em breve</span>
      )}
    </>
  )

  if (available !== false) {
    return (
      <Link
        href={path}
        className={listingCardClass(true)}
        data-testid={`${testIdPrefix}-${slug}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className={listingCardClass(false)} data-testid={`${testIdPrefix}-${slug}`}>
      {content}
    </div>
  )
}

/* ---------- v2 (desde 2.1.0-snapshot) ---------- */

type ListingCardV2Props = ListingCardProps & {
  index: number
  tape?: boolean
  year?: string | null
  drawing?: DecorDrawing
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
      <span className="mais">{available !== false ? availableLabel : 'Em breve'}</span>
      {drawing && <Drawing name={drawing} tone="manto" className="figura" />}
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
