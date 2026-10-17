import type { Metadata } from 'next'
import { ListingPageTemplate } from '@/components/content/ListingPageTemplate'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('ministerios')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function MinisteriosPage() {
  return (
    <ListingPageTemplate
      slug="ministerios"
      hero={content.hero}
      items={content.ministries}
      gradient="wine"
      testIdPrefix="ministry"
      availableLabel="Saiba mais →"
    />
  )
}
