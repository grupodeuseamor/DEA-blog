import { cn } from '@/lib/utils'

/** Visual tokens — keep in sync with app/globals.css and corpus-criste-base.mdc */
export const colors = {
  background: '#0f0f12',
  foreground: '#f2f2f2',
  gold: '#d4af37',
  goldMuted: '#f0d891',
  surface: '#1b1b20',
  wine: '#8b2332',
} as const

export const heroOverlayDefault =
  'linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.82))'

export const heroOverlayCompact =
  'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.88))'

export const listingHeroOverlay =
  'linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.82))'

export const shadowCard = '0 8px 30px rgba(0,0,0,0.25)'

export const shadowLogoGold = '0 0 30px rgba(212,175,55,0.4)'

export const carouselIntervalMs = 5500

export function goldText(className?: string) {
  return cn('text-[#d4af37]', className)
}

/** Glow dourado no título do ministério (hero ministry-landing) */
export function ministryNameGlow(className?: string) {
  return cn(
    'text-shadow-[0_0_32px_rgba(212,175,55,0.65),0_0_64px_rgba(212,175,55,0.35)]',
    className,
  )
}

export function goldBorderSubtle(className?: string) {
  return cn('border border-[rgba(212,175,55,0.15)]', className)
}

export function surfaceCardBase(className?: string) {
  return cn(
    'p-6 md:p-10 rounded-2xl mb-8 border border-[rgba(212,175,55,0.15)] shadow-card',
    className,
  )
}

export function surfaceCardDefault(className?: string) {
  return cn(surfaceCardBase(), 'bg-[#1b1b20]', className)
}

export function surfaceCardHighlight(className?: string) {
  return cn(
    surfaceCardBase(),
    'bg-gradient-to-br from-[rgba(124,31,42,0.35)] to-[rgba(212,175,55,0.08)]',
    className,
  )
}

export function contentContainer(className?: string) {
  return cn('max-w-[1100px] w-[92%] mx-auto', className)
}

export function contentContainerNarrow(className?: string) {
  return cn('max-w-[900px] w-full', className)
}

export function sectionTitleClass(className?: string) {
  return cn('font-serif text-3xl md:text-4xl mb-5 text-[#d4af37]', className)
}

export function paragraphClass(className?: string) {
  return cn('mb-4 leading-relaxed', className)
}

export function outlineGoldButtonClass(className?: string) {
  return cn(
    'inline-block px-7 py-3.5 rounded-full font-semibold border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.1)] transition-colors',
    className,
  )
}

export function instagramButtonClass(className?: string) {
  return cn(
    'inline-block px-7 py-3.5 rounded-full text-white font-semibold bg-instagram-gradient',
    className,
  )
}

export function ctaButtonGroupClass(className?: string) {
  return cn(
    'text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center',
    className,
  )
}

export function navLinkClass(isActive: boolean, variant: 'desktop' | 'mobile-top' | 'mobile-child') {
  if (variant === 'desktop') {
    return cn(
      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-[rgba(212,175,55,0.15)] text-[#d4af37]'
        : 'text-foreground/90 hover:text-[#d4af37]',
    )
  }
  if (variant === 'mobile-top') {
    return cn(
      'block rounded-lg px-4 py-2.5 text-sm font-medium',
      isActive
        ? 'bg-[rgba(212,175,55,0.15)] text-[#d4af37]'
        : 'text-foreground/90',
    )
  }
  return cn(
    'block rounded-lg px-6 py-2 text-sm',
    isActive
      ? 'bg-[rgba(212,175,55,0.12)] text-[#d4af37]'
      : 'text-foreground/85',
  )
}

export function navDropdownParentClass(isActive: boolean) {
  return cn(
    'block rounded-lg px-4 py-2.5 text-sm font-semibold',
    isActive ? 'bg-[rgba(212,175,55,0.15)] text-[#d4af37]' : 'text-[#d4af37]',
  )
}

export function listingCardClass(isAvailable: boolean) {
  return cn(
    'block p-8 rounded-2xl border border-[rgba(212,175,55,0.15)] bg-[#1b1b20] transition-all',
    isAvailable
      ? 'hover:border-[rgba(212,175,55,0.4)] hover:shadow-lg hover:scale-[1.02]'
      : 'opacity-60 cursor-not-allowed',
  )
}

export function listingGradientClass(gradient: 'gold' | 'wine') {
  return gradient === 'wine'
    ? 'bg-gradient-to-b from-[rgba(124,31,42,0.25)] to-[#0f0f12]'
    : 'bg-gradient-to-b from-[rgba(212,175,55,0.12)] to-[#0f0f12]'
}

export function paragraphKey(text: string) {
  return text.slice(0, 40)
}

/* ---------- v2 (desde 2.0.0-snapshot): classes compostas. Cores só por token (app/globals.css). ---------- */

export const paperCard = 'bg-folha border border-manto/10 rounded-[18px] shadow-sm'
export const postItBase = 'postit areia'
export const handNote = 'bilhete mao'
export const buttonManto =
  'inline-flex items-center justify-center rounded-full bg-manto px-7 py-4 font-semibold text-papel'
export const buttonOutlineManto =
  'inline-flex items-center justify-center rounded-full border-[1.5px] border-manto px-7 py-4 font-semibold text-manto'

/** Link do menu v2: pílula Azul Manto no item ativo. */
export function navLinkV2(isActive: boolean, className?: string) {
  return cn('nl', isActive && 'on', className)
}
