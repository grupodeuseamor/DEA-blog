import type { Metadata } from 'next'
import { MinistryLandingAbout } from '@/components/ministry-landing/MinistryLandingAbout'
import { MinistryLandingHero } from '@/components/ministry-landing/MinistryLandingHero'
import { MinistryLandingInspiration } from '@/components/ministry-landing/MinistryLandingInspiration'
import { MinistryLandingProjects } from '@/components/ministry-landing/MinistryLandingProjects'
import { MinistryLandingQuote } from '@/components/ministry-landing/MinistryLandingQuote'
import { MinistryLandingValues } from '@/components/ministry-landing/MinistryLandingValues'
import { MinistryLandingVideo } from '@/components/ministry-landing/MinistryLandingVideo'
import { MinistryLandingV2 } from '@/components/ministry-landing/MinistryLandingV2'
import { loadDecor } from '@/lib/specs/decor'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('dea-ajuda')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function DeaAjudaPage() {
  const decor = loadDecor('dea-ajuda')
  if (decor) return <MinistryLandingV2 content={content} decor={decor} pathname="/ministerios/dea-ajuda" />

  const { hero, about, video, projects, inspiration, values, quote } = content

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MinistryLandingHero hero={hero} />
      <MinistryLandingAbout about={about} />
      {video ? <MinistryLandingVideo video={video} /> : null}
      <MinistryLandingProjects projects={projects} />
      <MinistryLandingInspiration inspiration={inspiration} />
      <MinistryLandingValues values={values} />
      <MinistryLandingQuote quote={quote} />
    </main>
  )
}
