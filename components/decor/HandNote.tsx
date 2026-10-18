import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/** Bilhete à mão (Gochi Hand, Azul Manto). A frase vem sempre do conteúdo da página. */
export function HandNote({ text, rotate = -2, className }: { text: string; rotate?: number; className?: string }) {
  return (
    <p className={cn('bilhete mao', className)} style={{ '--r': `${rotate}deg` } as CSSProperties}>
      {text}
    </p>
  )
}
