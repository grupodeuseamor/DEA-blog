import Image from 'next/image'
import { WashiTape } from '@/components/decor/WashiTape'

type PolaroidProps = {
  src: string
  alt: string
  caption: string
  tape?: boolean
}

/** Polaroid: foto já usada pela página + fita + legenda à mão. */
export function Polaroid({ src, alt, caption, tape = true }: PolaroidProps) {
  return (
    <figure className="polaroid" data-decor="polaroid">
      {tape && <WashiTape style={{ left: '50%', top: -14, transform: 'translateX(-50%) rotate(-5deg)' }} />}
      <div className="ph">
        <Image src={src} alt={alt} fill sizes="236px" />
      </div>
      <figcaption className="mao">{caption}</figcaption>
    </figure>
  )
}
