import type { Metadata } from 'next'
import { MinistryLandingV2 } from '@/components/ministry-landing/MinistryLandingV2'
import { loadDecor } from '@/lib/specs/decor'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('dea-ajuda')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function DeaAjudaPage() {
  const decor = loadDecor('dea-ajuda')
  return <MinistryLandingV2 content={content} decor={decor} pathname="/ministerios/dea-ajuda" />
}
