import type { ReactNode } from 'react'
import Link from 'next/link'
import { InstagramCtaButton } from '@/components/ui/InstagramCtaButton'
import { OutlineGoldLink } from '@/components/ui/OutlineGoldLink'
import { ctaButtonGroupClass, outlineGoldButtonClass } from '@/lib/theme'

type CtaConfig = {
  label: string
  href: string
  style?: 'instagram' | 'primary' | 'link'
}

type CtaButtonGroupProps = {
  primary?: CtaConfig
  secondary?: { label: string; href: string }
  children?: ReactNode
  /** v2: Instagram em Azul Manto com ícone + secundário outline-manto. */
  v2?: boolean
}

export function CtaButtonGroup({ primary, secondary, children, v2 = false }: CtaButtonGroupProps) {
  if (v2) {
    if (!primary && !secondary) return null
    return (
      <div className="ctas-v2">
        {primary &&
          (primary.style === 'instagram' ? (
            <InstagramCtaButton href={primary.href} label={primary.label} variant="v2" />
          ) : (
            <Link href={primary.href} className="btn-manto">
              {primary.label}
            </Link>
          ))}
        {secondary && <OutlineGoldLink href={secondary.href} label={secondary.label} variant="outline-manto" />}
      </div>
    )
  }

  if (children) {
    return <div className={ctaButtonGroupClass()}>{children}</div>
  }

  if (!primary && !secondary) return null

  return (
    <div className={ctaButtonGroupClass()}>
      {primary &&
        (primary.style === 'instagram' ? (
          <InstagramCtaButton href={primary.href} label={primary.label} />
        ) : (
          <Link href={primary.href} className={outlineGoldButtonClass()}>
            {primary.label}
          </Link>
        ))}
      {secondary && <OutlineGoldLink href={secondary.href} label={secondary.label} />}
    </div>
  )
}
