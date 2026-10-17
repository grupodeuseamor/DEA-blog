import { cn } from '@/lib/utils'

/** Tempo de cada foto do carrossel do hero (crossfade CSS). */
export const carouselIntervalMs = 5500

/* Classes compostas do visual v2 (desde 2.0.0-snapshot). Cores só por token (app/globals.css). */

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
