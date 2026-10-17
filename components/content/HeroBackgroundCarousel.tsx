import Image from 'next/image'
import type { CSSProperties } from 'react'
import { carouselIntervalMs } from '@/lib/theme'

type HeroBackgroundCarouselProps = {
  images: string[]
}

export function HeroBackgroundCarousel({ images }: HeroBackgroundCarouselProps) {
  const durationSec = (images.length * carouselIntervalMs) / 1000
  const duration = `${durationSec}s`

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      data-testid="hero-background-carousel"
      style={{ '--carousel-duration': duration } as CSSProperties}
      aria-hidden="true"
    >
      {images.map((src, index) => (
        <div
          key={src}
          className="hero-carousel-slide absolute inset-0"
          style={{
            animationDelay: `${index * (carouselIntervalMs / 1000)}s`,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  )
}
