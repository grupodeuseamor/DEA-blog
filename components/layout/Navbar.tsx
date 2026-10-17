'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NavDropdown } from '@/components/layout/NavDropdown'
import { buildNavTree, isNavItemActive } from '@/lib/specs/nav'
import type { RoutesSpec } from '@/lib/specs/types'

type NavbarProps = {
  routes: RoutesSpec
}

/** Menu global v2 (papel translúcido, pílula Azul Manto no item ativo). Mesmas opções de specs/routes.json. */
export function Navbar({ routes }: NavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navTree = buildNavTree(routes)

  return (
    <header className="v2-header">
      <div className="bar">
        <Link href="/" className="brand shrink-0">
          <Image src="/brand/logo-cruz-coracao.svg" alt="Grupo Deus É Amor" width={26} height={33} priority />
          <span className="hidden sm:block">Deus É Amor</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1.5"
          aria-label="Navegação principal"
          data-testid="nav-desktop"
        >
          {navTree.map((item) => (
            <NavDropdown key={item.path} item={item} />
          ))}
        </nav>

        <button
          type="button"
          className="menu-btn md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          data-testid="nav-mobile-toggle"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="mob md:hidden" aria-label="Navegação mobile" data-testid="nav-mobile">
          <div
            className="nav-scroll-invisible mx-auto max-h-[calc(100dvh-4.5rem)] max-w-[1100px] w-[92%] space-y-1 py-4"
            data-testid="nav-mobile-scroll"
          >
            {navTree.map((item) => {
              const isActive = isNavItemActive(pathname, item.path)
              const exact = pathname === item.path
              return (
                <div key={item.path} className="space-y-1">
                  <Link
                    href={item.path}
                    className={`top${exact ? ' on' : ''}`}
                    aria-current={exact ? 'page' : undefined}
                    data-active={isActive || undefined}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`nav-mobile-link-${item.path === '/' ? 'home' : item.path.slice(1)}`}
                  >
                    {item.label}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`child${pathname === child.path ? ' on' : ''}`}
                      aria-current={pathname === child.path ? 'page' : undefined}
                      onClick={() => setMobileOpen(false)}
                      data-testid={`nav-mobile-link-${child.path.slice(1).replace(/\//g, '-')}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
