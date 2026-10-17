type InstagramCtaButtonProps = {
  href: string
  label: string
}

/** Botão do Instagram em Azul Manto com ícone. */
export function InstagramCtaButton({ href, label }: InstagramCtaButtonProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-manto" data-testid="instagram-cta">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
      {label}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}
