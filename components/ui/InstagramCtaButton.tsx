import { instagramButtonClass } from '@/lib/theme'

type InstagramCtaButtonProps = {
  href: string
  label: string
  /** v2: botão Azul Manto com ícone (sem o gradiente do Instagram). */
  variant?: 'v1' | 'v2'
}

export function InstagramCtaButton({ href, label, variant = 'v1' }: InstagramCtaButtonProps) {
  if (variant === 'v2') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-manto" data-testid="instagram-cta">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
        {label}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={instagramButtonClass()}>
      {label}
    </a>
  )
}
