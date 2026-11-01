import type { Metadata } from 'next'
import { ContentPageTemplate } from '@/components/content/ContentPageTemplate'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('sao-jose-luis-sanchez-del-rio')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function SaoJoseLuisSanchezDelRioPage() {
  return <ContentPageTemplate content={content} compact />
}
