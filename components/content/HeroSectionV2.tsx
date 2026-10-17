import Image from 'next/image'
import { Drawing, ScribbleUnderline } from '@/components/decor/Drawing'
import type { PageDecor } from '@/lib/specs/decor'
import type { heroSchema } from '@/lib/specs/types'
import type { z } from 'zod'

type HeroData = z.infer<typeof heroSchema>

/** Posições dos desenhos do hero (máx. 3), como no piloto v2c. Só os brilhinhos se mexem. */
const slots = [
  { left: '7%', top: 48, width: 58, height: 58, tone: 'areia' as const, rotate: 0, desktopOnly: false },
  { right: '9%', top: 70, width: 40, height: 40, tone: 'ceu' as const, rotate: 14, desktopOnly: false },
  { right: '7%', bottom: 46, width: 74, height: 56, tone: 'areia' as const, rotate: 0, desktopOnly: true },
]

function splitUnderline(title: string, word?: string) {
  if (!word) return null
  const i = title.lastIndexOf(word)
  if (i < 0) return null
  return { before: title.slice(0, i), word, after: title.slice(i + word.length) }
}

/** Hero v2: foto do JSON com tratamento “azul de carimbo” (token --overlay-hero), título Fraunces com sublinhado. */
export function HeroSectionV2({ hero, decor }: { hero: HeroData; decor: PageDecor }) {
  const parts = splitUnderline(hero.title, decor.hero.underline)
  return (
    <section className="hero" data-testid="hero-v2">
      <div className="bg">
        <Image src={hero.backgroundImage} alt="" fill priority sizes="100vw" />
      </div>
      <div className="ov" />
      <div className="ov2" />
      {decor.hero.drawings.map((name, i) => {
        const { tone, rotate, desktopOnly, ...pos } = slots[i]
        return (
          <Drawing
            key={name}
            name={name}
            tone={tone}
            animated={name === 'brilhinhos' || name === 'brilho'}
            className={desktopOnly ? 'hz dsk-only' : 'hz'}
            style={{ ...pos, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
          />
        )
      })}
      <div className="in">
        {hero.logo && (
          <div className="selo" role="img" aria-label={hero.logo.alt}>
            <Drawing name="logo" strokeWidth={2} style={{ ['--logo-fundo' as string]: 'var(--color-manto)' }} />
          </div>
        )}
        <h1 className="t-titulo">
          {parts ? (
            <>
              {parts.before}
              <span className="tt">
                {parts.word}
                <ScribbleUnderline />
              </span>
              {parts.after}
            </>
          ) : (
            hero.title
          )}
        </h1>
        {hero.subtitle && <p className="sub">{hero.subtitle}</p>}
        {hero.quote && <p className="q">&ldquo;{hero.quote}&rdquo;</p>}
      </div>
    </section>
  )
}
