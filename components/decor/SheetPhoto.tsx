import Image from 'next/image'
import type { CSSProperties } from 'react'
import { WashiTape } from '@/components/decor/WashiTape'

type SheetPhotoProps = {
  src: string
  alt: string
  side: 'esquerda' | 'direita'
  rotate: number
  focus: string
  caption?: string
}

/**
 * Foto colada na borda da folha única (reaproveitamento de imagem já usada pela página, desde 2.0.1-snapshot):
 * fitas washi em cantos opostos, leve inclinação e sombra suave. Em telas menores desce para baixo do texto.
 */
export function SheetPhoto({ src, alt, side, rotate, focus, caption }: SheetPhotoProps) {
  return (
    <figure
      className={`foto-colada ${side}`}
      style={{ '--r': `${rotate}deg` } as CSSProperties}
      data-decor="foto-colada"
      data-testid="sheet-photo"
    >
      <WashiTape className="canto-a" style={{ left: -22, top: -6, width: 70, transform: 'rotate(-38deg)' }} />
      <WashiTape className="canto-b" style={{ right: -22, bottom: -6, width: 70, transform: 'rotate(-38deg)' }} />
      <div className="ph">
        <Image src={src} alt={alt} fill sizes="200px" style={{ objectPosition: focus }} />
      </div>
      {caption && <figcaption className="mao">{caption}</figcaption>}
    </figure>
  )
}
