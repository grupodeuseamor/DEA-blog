'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isNavItemActive } from '@/lib/specs/nav'
import { navLinkV2 } from '@/lib/theme'
import type { NavTreeItem } from '@/lib/specs/nav'

type NavDropdownProps = {
  item: NavTreeItem
}

export function NavDropdown({ item }: NavDropdownProps) {
  const pathname = usePathname()
  const isActive = isNavItemActive(pathname, item.path)

  if (item.children.length === 0) {
    return (
      <Link
        href={item.path}
        className={navLinkV2(isActive)}
        aria-current={pathname === item.path ? 'page' : undefined}
        data-testid={`nav-link-${item.path === '/' ? 'home' : item.path.slice(1).replace(/\//g, '-')}`}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="relative group" data-testid={`nav-dropdown-${item.path.slice(1)}`}>
      <Link
        href={item.path}
        className={navLinkV2(isActive)}
        aria-current={pathname === item.path ? 'page' : undefined}
      >
        {item.label}
        <i aria-hidden="true">▾</i>
      </Link>

      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50">
        <div
          className="dd nav-scroll-invisible max-h-[min(70vh,calc(100dvh-5rem))]"
          data-testid="nav-dropdown-scroll"
        >
          {item.children.map((child) => {
            const childActive = pathname === child.path
            return (
              <Link
                key={child.path}
                href={child.path}
                className={childActive ? 'on' : undefined}
                aria-current={childActive ? 'page' : undefined}
                data-testid={`nav-link-${child.path.slice(1).replace(/\//g, '-')}`}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
