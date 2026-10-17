import { HeroSectionV2 } from '@/components/content/HeroSectionV2'
import { PaperSheet } from '@/components/decor/PaperSheet'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { SectionFlowNav } from '@/components/navigation/SectionFlowNav'
import { ListingCardV2 } from '@/components/ui/ListingCard'
import { loadDecor } from '@/lib/specs/decor'
import { loadRoutes } from '@/lib/specs/loader'
import { getBreadcrumb, getTopLevelFlow } from '@/lib/specs/nav'
import { PageShell } from '@/components/layout/PageShell'
import type { ListingCardProps } from '@/components/ui/ListingCard'

export type ListingItem = ListingCardProps

type ListingHero = {
  title: string
  subtitle: string
  backgroundImage?: string
}

type ListingPageTemplateProps = {
  hero: ListingHero
  items: ListingItem[]
  testIdPrefix?: string
  availableLabel?: string
  /** Slug do conteúdo (specs/decor/{slug}.json obrigatório). */
  slug: string
}

const YEAR = /\b(1[0-9]{3}|20[0-9]{2})\b/

export function ListingPageTemplate({
  hero,
  items,
  testIdPrefix = 'listing',
  availableLabel = 'Ver mais →',
  slug,
}: ListingPageTemplateProps) {
  const decor = loadDecor(slug)
  const routes = loadRoutes()
  const pathname = '/' + slug
  const flow = getTopLevelFlow(pathname, routes)
  const cards = decor.cards
  return (
    <PageShell variant="v2">
      <Breadcrumb items={getBreadcrumb(pathname, routes)} />
      <HeroSectionV2 hero={{ title: hero.title, subtitle: hero.subtitle, backgroundImage: hero.backgroundImage }} decor={decor} />
      <div className="c secs">
        <PaperSheet label={hero.title}>
          <div className="fichas" data-testid={`${testIdPrefix}-grid`}>
            {items.map((item, index) => (
              <ListingCardV2
                key={item.slug}
                {...item}
                index={index}
                availableLabel={availableLabel}
                testIdPrefix={testIdPrefix}
                tape={cards?.tape ?? true}
                year={cards?.yearFromDescription ? (item.description.match(YEAR)?.[1] ?? null) : null}
                drawing={cards?.drawings[item.slug]}
                soonStamp={cards?.soonStamp}
              />
            ))}
          </div>
        </PaperSheet>
      </div>
      {flow && <SectionFlowNav flow={flow} heading="Continue navegando" />}
    </PageShell>
  )
}
