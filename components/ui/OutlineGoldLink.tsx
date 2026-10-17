import Link from 'next/link'
import { outlineGoldButtonClass } from '@/lib/theme'

type OutlineGoldLinkProps = {
  href: string
  label: string
  /** v2: contorno Azul Manto (`buttonOutlineManto`). */
  variant?: 'gold' | 'outline-manto'
}

export function OutlineGoldLink({ href, label, variant = 'gold' }: OutlineGoldLinkProps) {
  return (
    <Link href={href} className={variant === 'outline-manto' ? 'btn-outline-manto' : outlineGoldButtonClass()}>
      {label}
    </Link>
  )
}
