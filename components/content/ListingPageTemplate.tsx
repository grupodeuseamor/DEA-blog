import { HeroSectionV2 } from '@/components/content/HeroSectionV2'
import { PaperSheet } from '@/components/decor/PaperSheet'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { SectionFlowNav } from '@/components/navigation/SectionFlowNav'
import { ListingCardV2 } from '@/components/ui/ListingCard'
import { loadDecor } from '@/lib/specs/decor'
import { loadRoutes } from '@/lib/specs/loader'
import { getBreadcrumb, getTopLevelFlow } from '@/lib/specs/nav'
import { PageShell } from '@/components/layout/PageShell'
import { BackgroundImageLayer } from '@/components/ui/BackgroundImageLayer'
import { GradientOverlay } from '@/components/ui/GradientOverlay'
import { ListingCard, type ListingCardProps } from '@/components/ui/ListingCard'
import { contentContainer, listingGradientClass, listingHeroOverlay } from '@/lib/theme'

export type ListingItem = ListingCardProps

type ListingHero = {
  title: string
  subtitle: string
  backgroundImage?: string
}

type ListingPageTemplateProps = {
  hero: ListingHero
  items: ListingItem[]
  gradient?: 'gold' | 'wine'
  testIdPrefix?: string
  availableLabel?: string
  /** v2: slug do conteúdo; com specs/decor/{slug}.json a listagem entra no visual v2. */
  slug?: string
}

const YEAR = /\b(1[0-9]{3}|20[0-9]{2})\b/

export function ListingPageTemplate({
  hero,
  items,
  gradient = 'gold',
  testIdPrefix = 'listing',
  availableLabel = 'Ver mais →',
  slug,
}: ListingPageTemplateProps) {
  const decor = slug ? loadDecor(slug) : null
  if (decor) {
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
  return (
    <PageShell>
      <section
        className={`min-h-[50vh] flex justify-center items-center p-8 pt-28 text-center relative isolate overflow-hidden ${
          hero.backgroundImage ? '' : listingGradientClass(gradient)
        }`}
      >
        {hero.backgroundImage && (
          <>
            <BackgroundImageLayer src={hero.backgroundImage} />
            <GradientOverlay overlay={listingHeroOverlay} />
          </>
        )}
        <div className="relative z-10 max-w-[800px]">
          <h1 className="font-serif text-5xl md:text-6xl text-[#d4af37] mb-4">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <div className={`${contentContainer()} py-16`}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <ListingCard
              key={item.slug}
              {...item}
              availableLabel={availableLabel}
              testIdPrefix={testIdPrefix}
            />
          ))}
        </div>
      </div>
    </PageShell>
  )
}
