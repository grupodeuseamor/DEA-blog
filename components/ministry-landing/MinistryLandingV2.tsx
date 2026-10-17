import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { loadListing } from '@/components/content/ContentPageTemplate'
import { HeroSectionV2 } from '@/components/content/HeroSectionV2'
import { DecorAside } from '@/components/decor/DecorAside'
import { Drawing } from '@/components/decor/Drawing'
import { DrawnTitle } from '@/components/decor/DrawnTitle'
import { highlightText } from '@/components/decor/Highlight'
import { PaperSheet } from '@/components/decor/PaperSheet'
import { PostIt } from '@/components/decor/PostIt'
import { SectionBreak } from '@/components/decor/SectionBreak'
import { WashiTape } from '@/components/decor/WashiTape'
import { PageShell } from '@/components/layout/PageShell'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { SectionFlowNav } from '@/components/navigation/SectionFlowNav'
import { RemoteVideoEmbed } from '@/components/ui/RemoteVideoEmbed'
import type { DecorDrawing, PageDecor } from '@/lib/specs/decor'
import { loadRoutes } from '@/lib/specs/loader'
import { getBreadcrumb, getSectionFlow } from '@/lib/specs/nav'
import type { MinistryLandingContent } from '@/lib/specs/types'

/** Ícones dos valores → desenhos da biblioteca (spec 2.4.0). */
const valueDrawing: Record<MinistryLandingContent['values']['items'][number]['icon'], DecorDrawing> = {
  heart: 'coracao',
  users: 'louvor',
  smile: 'brilhinhos',
  cross: 'cruz',
}

type Props = { content: MinistryLandingContent; decor: PageDecor; pathname: string }

/**
 * Ministry-landing v2 (opt-in via specs/decor/{slug}.json): hero com carrossel em tratamento
 * azul de carimbo, todas as seções numa folha única, decoração lateral por alvo e navegação.
 * D6: nenhuma foto de pessoas em lugar novo — a polaroid usa a imagem que a própria seção
 * “inspiração” já usava. D8: a imagem externa (Vercel Blob) segue referenciada como está.
 */
export function MinistryLandingV2({ content, decor, pathname }: Props) {
  const routes = loadRoutes()
  const listing = loadListing(pathname)
  const flow = listing ? getSectionFlow(pathname, routes, listing) : null
  const { hero, about, video, projects, inspiration, values, quote } = content
  const title = `${hero.highlight} ${hero.title}`
  const block = (target: string) => decor.blocks.find((b) => b.target === target)
  const side = (target: string, i: number) => (
    <DecorAside items={block(target)?.side ?? []} content={content} imageAlt={title} index={i} />
  )
  const marks = (target: string) => block(target)?.marks ?? []

  const sections: { id: string; node: ReactNode }[] = [
    {
      id: 'about',
      node: (
        <div className="row">
          <div className="txt">
            <DrawnTitle title={about.title} drawing={block('about')?.titleDrawing} />
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{highlightText(p, marks('about'))}</p>
            ))}
            {about.highlight && <p className="ml-destaque">{about.highlight}</p>}
          </div>
          {side('about', 0)}
        </div>
      ),
    },
    ...(video
      ? [
          {
            id: 'video',
            node: (
              <div className="row">
                <div className="txt">
                  <DrawnTitle title={`${video.title} ${video.titleHighlight}`} drawing={block('video')?.titleDrawing} />
                  <p>{highlightText(video.description, marks('video'))}</p>
                  <div className="ml-video">
                    <WashiTape style={{ left: -10, top: -12, transform: 'rotate(-28deg)' }} />
                    <WashiTape style={{ right: -10, top: -12, transform: 'rotate(26deg)' }} />
                    <div className="aspect-video">
                      <RemoteVideoEmbed url={video.url} title={`${video.title} ${video.titleHighlight}`} />
                    </div>
                  </div>
                </div>
                {side('video', 1)}
              </div>
            ),
          },
        ]
      : []),
    {
      id: 'projects',
      node: (
        <div className="row">
          <div className="txt">
            <DrawnTitle title={`${projects.title} ${projects.titleHighlight}`} drawing={block('projects')?.titleDrawing} />
            <p>{highlightText(projects.description, marks('projects'))}</p>
            <div className="ml-projetos">
              {projects.items.map((item, i) => (
                <PostIt
                  key={item.title}
                  label={item.title}
                  text={item.description}
                  pin="manto"
                  paper={i % 2 ? 'papel' : 'areia'}
                  rotate={[-2.5, 2, 1.5, -2][i % 4]}
                />
              ))}
            </div>
          </div>
          {side('projects', 2)}
        </div>
      ),
    },
    {
      id: 'inspiration',
      node: (
        <div className="row">
          <div className="txt">
            <DrawnTitle title={`${inspiration.title} ${inspiration.titleHighlight}`} drawing={block('inspiration')?.titleDrawing} />
            {inspiration.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{highlightText(p, marks('inspiration'))}</p>
            ))}
          </div>
          {side('inspiration', 3)}
        </div>
      ),
    },
    {
      id: 'values',
      node: (
        <div className="row">
          <div className="txt">
            <DrawnTitle title={`${values.title} ${values.titleHighlight}`} drawing={block('values')?.titleDrawing} />
            <ul className="ml-valores">
              {values.items.map((v, i) => (
                <li key={v.title} style={{ '--r': `${i % 2 ? 1.5 : -1.5}deg` } as CSSProperties}>
                  <span className="ic">
                    <Drawing name={valueDrawing[v.icon]} tone={i % 2 ? 'ceu' : 'manto'} style={{ width: 40, height: 40 }} />
                  </span>
                  <h3 className="t-titulo">{v.title}</h3>
                  <p>{v.description}</p>
                </li>
              ))}
            </ul>
          </div>
          {side('values', 4)}
        </div>
      ),
    },
    {
      id: 'quote',
      node: (
        <div className="row">
          <div className="txt">
            <blockquote className="ql margem-caderno">
              {quote.text}
              <cite className="ml-autor mao">— {quote.author}</cite>
            </blockquote>
          </div>
          {side('quote', 5)}
        </div>
      ),
    },
  ]

  return (
    <PageShell variant="v2">
      <Breadcrumb items={getBreadcrumb(pathname, routes)} />
      <HeroSectionV2 hero={{ ...hero, title, subtitle: hero.subtitle }} decor={decor}>
        <p className="ml-tagline">{hero.tagline}</p>
        <a className="ml-cta" href={hero.ctaHref}>
          {hero.ctaLabel}
        </a>
      </HeroSectionV2>
      <div className="c secs">
        <PaperSheet label={title}>
          {sections.map((s, i) => (
            <Fragment key={s.id}>
              {i > 0 && <SectionBreak />}
              <section id={s.id} className="bloco" data-section-index={i}>
                {s.node}
              </section>
            </Fragment>
          ))}
        </PaperSheet>
      </div>
      {flow && <SectionFlowNav flow={flow} />}
    </PageShell>
  )
}

