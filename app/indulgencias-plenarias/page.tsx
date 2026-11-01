import type { Metadata } from 'next'
import { ContentPageTemplate } from '@/components/content/ContentPageTemplate'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('indulgencias-plenarias')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function IndulgenciasPlenariasPage() {
  return <ContentPageTemplate content={content} compact />
}
