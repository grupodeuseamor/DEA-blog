import type { Metadata } from 'next'
import { MinistryLandingV2 } from '@/components/ministry-landing/MinistryLandingV2'
import { loadDecor } from '@/lib/specs/decor'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('perseveranca')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function PerseverancaPage() {
  const decor = loadDecor('perseveranca')
  return <MinistryLandingV2 content={content} decor={decor} pathname="/ministerios/perseveranca" />
}
