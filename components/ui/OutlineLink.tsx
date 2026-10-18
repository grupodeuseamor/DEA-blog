import Link from 'next/link'

type OutlineLinkProps = {
  href: string
  label: string
}

/** Link secundário com contorno Azul Manto (`outline-manto`). */
export function OutlineLink({ href, label }: OutlineLinkProps) {
  return (
    <Link href={href} className="btn-outline-manto">
      {label}
    </Link>
  )
}
