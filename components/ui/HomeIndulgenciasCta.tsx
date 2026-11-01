import Link from 'next/link'
import type { HomeContent } from '@/lib/specs/types'

/**
 * Chamada da home para /indulgencias-plenarias (2.9.0). Isolada e opcional:
 * para remover, apague `indulgenciasCta` de specs/content/home.json.
 */
export function HomeIndulgenciasCta({ cta }: { cta?: HomeContent['indulgenciasCta'] }) {
  if (!cta) return null
  return (
    <p className="indulgencias-cta">
      <Link href={cta.href} className="btn-outline-manto" data-testid="home-indulgencias-cta">
        {cta.label}
      </Link>
    </p>
  )
}
