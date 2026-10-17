import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/** Fita adesiva (washi tape) em Azul Céu. Posição/rotação por `style` (sem cor). */
export function WashiTape({ className, style }: { className?: string; style?: CSSProperties }) {
  return <span className={cn('fita', className)} style={style} aria-hidden="true" />
}
