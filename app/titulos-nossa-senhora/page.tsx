import type { Metadata } from 'next'
import { ListingPageTemplate } from '@/components/content/ListingPageTemplate'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('titulos-nossa-senhora')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function TitulosNossaSenhoraPage() {
  return (
    <ListingPageTemplate
      hero={content.hero}
      items={content.galleries}
      testIdPrefix="gallery"
      slug={content.slug}
    />
  )
}
