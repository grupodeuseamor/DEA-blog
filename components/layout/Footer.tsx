import Image from 'next/image'
import { Drawing } from '@/components/decor/Drawing'

/** Rodapé global v2: Azul Noite, cruz desenhada, pilares, easter egg e copyright mantidos. */
export function Footer() {
  return (
    <footer className="v2-footer" data-testid="site-footer">
      <Drawing name="cruz" className="cruz" strokeWidth={2.2} />
      <div className="lg">
        <Image src="/brand/logo-cruz-coracao-areia.svg" alt="Grupo Deus É Amor" width={36} height={45} />
      </div>
      <p className="nome">Grupo Deus É Amor</p>
      <p className="min" data-testid="footer-easter-egg">
        Ministério DEA Programadores
      </p>
      <p className="pil" data-testid="footer-pillars">
        Evangelização • Amizade • Humildade • Serviço
      </p>
      <p className="cp" data-testid="footer-copyright">
        © 2026 Grupo Deus É Amor. Todos os direitos reservados.
      </p>
    </footer>
  )
}
