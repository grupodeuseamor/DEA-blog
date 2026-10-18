import Link from 'next/link'
import type { Crumb } from '@/lib/specs/nav'

/** Breadcrumb v2, derivado de specs/routes.json. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null
  return (
    <nav className="c crumb" aria-label="Você está aqui" data-testid="breadcrumb">
      <ol>
        {items.map((item, i) =>
          i === items.length - 1 ? (
            <li key={item.path} aria-current="page">
              {item.label}
            </li>
          ) : (
            <li key={item.path}>
              <Link href={item.path}>{item.label}</Link>
            </li>
          ),
        )}
      </ol>
    </nav>
  )
}
