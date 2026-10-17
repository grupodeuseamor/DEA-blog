import { HeroSection } from '@/components/content/HeroSection'
import { HeroSectionV2 } from '@/components/content/HeroSectionV2'
import { SectionRenderer } from '@/components/content/SectionRenderer'
import { SectionRendererV2 } from '@/components/content/SectionRendererV2'
import { PaperSheet } from '@/components/decor/PaperSheet'
import { PageShell } from '@/components/layout/PageShell'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { SectionFlowNav } from '@/components/navigation/SectionFlowNav'
import { loadDecor } from '@/lib/specs/decor'
import { loadContent, loadRoutes } from '@/lib/specs/loader'
import { getBreadcrumb, getSectionFlow } from '@/lib/specs/nav'
import { contentContainer } from '@/lib/theme'
import type { ContentPage } from '@/lib/specs/types'

type ContentPageTemplateProps = {
  content: ContentPage
  compact?: boolean
}

/** Listagem de cada seção (ordem de anterior/próximo). */
export function loadListing(pathname: string) {
  if (pathname.startsWith('/titulos-nossa-senhora/')) {
    const listing = loadContent('titulos-nossa-senhora')
    return { path: '/titulos-nossa-senhora', cards: listing.galleries }
  }
  if (pathname.startsWith('/ministerios/')) {
    const listing = loadContent('ministerios')
    return { path: '/ministerios', cards: listing.ministries }
  }
  return null
}

export function ContentPageTemplate({ content, compact = false }: ContentPageTemplateProps) {
  const decor = loadDecor(content.slug)

  if (decor) {
    const routes = loadRoutes()
    const route = routes.items.find(
      (item) => item.path === '/' + content.slug || item.path.endsWith('/' + content.slug),
    )
    const pathname = content.slug === 'home' ? '/' : route?.path ?? '/' + content.slug
    const listing = loadListing(pathname)
    const flow = listing ? getSectionFlow(pathname, routes, listing) : null
    const imageAlt = content.hero.title

    return (
      <PageShell variant="v2">
        <Breadcrumb items={getBreadcrumb(pathname, routes)} />
        <HeroSectionV2 hero={content.hero} decor={decor} />
        <div className="c secs">
          <PaperSheet label={content.hero.title}>
            <SectionRendererV2
              sections={content.sections}
              blocks={decor.blocks}
              sheetPhotos={decor.sheetPhotos}
              content={content}
              imageAlt={imageAlt}
            />
          </PaperSheet>
        </div>
        {flow && <SectionFlowNav flow={flow} />}
      </PageShell>
    )
  }

  return (
    <PageShell>
      <HeroSection hero={content.hero} compact={compact} />

      <div className={`${contentContainer()} py-16`}>
        {content.sections.map((section) => (
          <SectionRenderer
            key={
              section.type === 'quote'
                ? section.text.slice(0, 30)
                : section.title
            }
            section={section}
          />
        ))}
      </div>
    </PageShell>
  )
}
