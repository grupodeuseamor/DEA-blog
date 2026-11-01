import type { Metadata } from 'next'
import { ListingPageTemplate } from '@/components/content/ListingPageTemplate'
import { loadContent } from '@/lib/specs/loader'

/**
 * Seção Santos — listagem no mesmo modelo de /titulos-nossa-senhora.
 *
 * Como adicionar um santo (ex.: slug `sao-francisco-de-assis`), seguindo o modelo nossa-senhora-<x>:
 * 1. specs/content/santos.json → novo item em `galleries` (slug, title, description, path `/santos/<slug>`, emoji?, icon? (/images/icons/<slug>.webp, avatar ~160px), available).
 *    A ordem dos itens define Anterior/Próximo.
 * 2. specs/content/<slug>.json → meta, hero (title, subtitle, quote?, backgroundImage, logo?) e sections (card/quote),
 *    igual a specs/content/nossa-senhora-aparecida.json.
 * 3. lib/specs/types.ts → schema `<slug>ContentSchema = contentPageSchema.extend({ slug: z.literal('<slug>'), sections: ... })`,
 *    tipo, `ContentSlug` e `contentSchemas`; lib/specs/loader.ts → import, `ContentMap`, `case` em loadContent e lista do validateAllSpecs.
 * 4. specs/decor/<slug>.json → decoração v2 (obrigatória), frases copiadas do conteúdo.
 * 5. public/images/<slug>.png → imagem do hero.
 * 6. app/santos/<slug>/page.tsx → `loadContent('<slug>')` + `<ContentPageTemplate content={content} compact />`.
 * 7. specs/routes.json → `{ "label": "...", "path": "/santos/<slug>", "parent": "/santos" }` (vira item do dropdown).
 * Validar: npm run test:specs → npm run build → CI=1 npm run test:e2e.
 */
const content = loadContent('santos')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function SantosPage() {
  return (
    <ListingPageTemplate
      hero={content.hero}
      items={content.galleries}
      testIdPrefix="gallery"
      slug={content.slug}
      photos={(content.photos ?? []).map((src, i) => ({ src, caption: content.photoCaptions?.[i] ?? '' }))}
    />
  )
}
