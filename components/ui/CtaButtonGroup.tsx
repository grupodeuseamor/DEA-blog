import Link from 'next/link'
import { InstagramCtaButton } from '@/components/ui/InstagramCtaButton'
import { OutlineLink } from '@/components/ui/OutlineLink'

type CtaConfig = {
  label: string
  href: string
  style?: 'instagram' | 'primary' | 'link'
}

type CtaButtonGroupProps = {
  primary?: CtaConfig
  secondary?: { label: string; href: string }
}

/** CTAs de seção: principal (Instagram ou Azul Manto) + secundário com contorno. */
export function CtaButtonGroup({ primary, secondary }: CtaButtonGroupProps) {
  if (!primary && !secondary) return null
  return (
    <div className="ctas-v2">
      {primary &&
        (primary.style === 'instagram' ? (
          <InstagramCtaButton href={primary.href} label={primary.label} />
        ) : (
          <Link href={primary.href} className="btn-manto">
            {primary.label}
          </Link>
        ))}
      {secondary && <OutlineLink href={secondary.href} label={secondary.label} />}
    </div>
  )
}
