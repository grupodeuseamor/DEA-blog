import type { Metadata } from 'next'
import { MinistryLandingAbout } from '@/components/ministry-landing/MinistryLandingAbout'
import { MinistryLandingHero } from '@/components/ministry-landing/MinistryLandingHero'
import { MinistryLandingInspiration } from '@/components/ministry-landing/MinistryLandingInspiration'
import { MinistryLandingProjects } from '@/components/ministry-landing/MinistryLandingProjects'
import { MinistryLandingQuote } from '@/components/ministry-landing/MinistryLandingQuote'
import { MinistryLandingValues } from '@/components/ministry-landing/MinistryLandingValues'
import { MinistryLandingV2 } from '@/components/ministry-landing/MinistryLandingV2'
import { loadDecor } from '@/lib/specs/decor'
import { loadContent } from '@/lib/specs/loader'

const content = loadContent('perseveranca')

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

export default function PerseverancaPage() {
  const decor = loadDecor('perseveranca')
  if (decor) return <MinistryLandingV2 content={content} decor={decor} pathname="/ministerios/perseveranca" />

  const { hero, about, projects, inspiration, values, quote } = content

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MinistryLandingHero hero={hero} />
      <MinistryLandingAbout about={about} />
      <MinistryLandingProjects projects={projects} />
      <MinistryLandingInspiration inspiration={inspiration} />
      <MinistryLandingValues values={values} />
      <MinistryLandingQuote quote={quote} />
    </main>
  )
}
