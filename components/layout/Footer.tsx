import Image from 'next/image'
import { Drawing } from '@/components/decor/Drawing'
import { loadContent } from '@/lib/specs/loader'

/** Rodapé global v2: Azul Noite, cruz desenhada, pilares, easter egg e copyright mantidos. */
export function Footer() {
  const instagram = loadContent('home').footerInstagram
  return (
    <footer className="v2-footer" data-testid="site-footer">
      <Drawing name="cruz" className="cruz" strokeWidth={2.2} />
      <div className="lg">
        <Image src="/brand/logo-cruz-coracao-areia.svg" alt="Grupo Deus É Amor" width={36} height={45} loading="eager" />
      </div>
      <p className="nome">Grupo Deus É Amor</p>
      <p className="min" data-testid="footer-easter-egg">
        Ministério DEA Programadores
      </p>
      <p className="pil" data-testid="footer-pillars">
        Evangelização • Amizade • Humildade • Serviço
      </p>
      <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 underline underline-offset-4">
        {instagram.label}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
      <p className="cp" data-testid="footer-copyright">
        © 2026 Grupo Deus É Amor. Todos os direitos reservados.
      </p>
    </footer>
  )
}
