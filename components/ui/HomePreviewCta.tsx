import Link from 'next/link'
import type { HomeContent } from '@/lib/specs/types'

/**
 * Botão preview da home para /ministerios (2.5.0-snapshot, item 5a). Experimental e isolado:
 * para remover, apague `previewCta` de specs/content/home.json — o botão some sozinho.
 */
export function HomePreviewCta({ cta }: { cta?: HomeContent['previewCta'] }) {
  if (!cta) return null
  return (
    <Link href={cta.href} className="btn-outline-manto preview-cta" data-testid="home-preview-ministerios">
      {cta.label}
      <span className="etiqueta-preview mao">{cta.badge}</span>
    </Link>
  )
}
