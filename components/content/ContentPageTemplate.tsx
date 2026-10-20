import { HeroSectionV2 } from '@/components/content/HeroSectionV2'
import { SectionRendererV2 } from '@/components/content/SectionRendererV2'
import { PaperSheet } from '@/components/decor/PaperSheet'
import { PageShell } from '@/components/layout/PageShell'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { SectionFlowNav } from '@/components/navigation/SectionFlowNav'
import { loadDecor } from '@/lib/specs/decor'
import { loadContent, loadMeetingSchedule, loadRoutes } from '@/lib/specs/loader'
import { getBreadcrumb, getEntryFlow, getSectionFlow } from '@/lib/specs/nav'
import { HomePreviewCta } from '@/components/ui/HomePreviewCta'
import { CtaButtonGroup } from '@/components/ui/CtaButtonGroup'
import { NextMeeting } from '@/components/content/NextMeeting'
import type { ContentPage, HomeContent } from '@/lib/specs/types'

type ContentPageTemplateProps = {
  content: ContentPage
  /** Sem efeito desde 2.6.0-snapshot (era o hero compacto da 1.1.0); mantido para não mexer nas pages. */
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

export function ContentPageTemplate({ content }: ContentPageTemplateProps) {
  const home = content.slug === 'home' ? content as HomeContent : null
  const decor = loadDecor(content.slug)
  const routes = loadRoutes()
  const route = routes.items.find(
    (item) => item.path === '/' + content.slug || item.path.endsWith('/' + content.slug),
  )
  const pathname = content.slug === 'home' ? '/' : route?.path ?? '/' + content.slug
  const listing = loadListing(pathname)
  const preview = content.slug === 'home' && 'previewCta' in content ? (content as HomeContent).previewCta : undefined
  const entry = pathname === '/' ? getEntryFlow(routes) : null
  const flow = listing
    ? getSectionFlow(pathname, routes, listing)
    : entry
      ? { ...entry, extra: <HomePreviewCta cta={preview} /> }
      : null
  const imageAlt = content.hero.title

  return (
    <PageShell variant="v2">
      <Breadcrumb items={getBreadcrumb(pathname, routes)} />
      <HeroSectionV2 hero={content.hero} decor={decor}>
        {home && (
          <>
            <p className="hero-identification">{home.presentation.identification}</p>
            <CtaButtonGroup primary={home.presentation.participate} secondary={home.presentation.about} />
          </>
        )}
      </HeroSectionV2>
      <div className="c secs">
        <PaperSheet label={content.hero.title}>
          <SectionRendererV2
            sections={content.sections}
            blocks={decor.blocks}
            sheetPhotos={decor.sheetPhotos}
            content={content}
            imageAlt={imageAlt}
            sectionExtras={home ? { 'primeira-vez': <NextMeeting schedule={loadMeetingSchedule()} labels={home.meetingLabels} /> } : undefined}
          />
        </PaperSheet>
      </div>
      {flow && <SectionFlowNav flow={flow} heading={flow.entry ? 'Continue navegando' : undefined} />}
    </PageShell>
  )
}
