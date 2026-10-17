import Image from 'next/image'
import type { DecorBackdrop } from '@/lib/specs/decor'

/**
 * Fundo esmaecido com uma imagem que a página JÁ usa (reaproveitamento opcional, desde 2.1.0-snapshot).
 * Legibilidade: imagem em escala de cinza com opacidade baixa + véu de papel (tokens --veu-*) sob o texto.
 */
export function ImageBackdrop({ src, backdrop }: { src: string; backdrop: DecorBackdrop }) {
  return (
    <div
      className={`fundo-img ${backdrop.strength} ${backdrop.side}`}
      aria-hidden="true"
      data-testid="image-backdrop"
    >
      <Image src={src} alt="" fill sizes="(max-width: 760px) 100vw, 1000px" />
      <span className="veu" />
    </div>
  )
}
