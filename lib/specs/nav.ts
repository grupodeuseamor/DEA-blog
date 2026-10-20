import type { RoutesSpec } from './types'

export type NavTreeItem = {
  label: string
  path: string
  children: NavTreeItem[]
}

export function buildNavTree(routes: RoutesSpec): NavTreeItem[] {
  return routes.items
    .filter((item) => !item.parent)
    .map((item) => ({
      label: item.label,
      path: item.path,
      children: routes.items
        .filter((child) => child.parent === item.path)
        .map((child) => ({
          label: child.label,
          path: child.path,
          children: [],
        })),
    }))
}

export function resolveActivePath(pathname: string, routes: RoutesSpec): string {
  const exact = routes.items.find((item) => item.path === pathname)
  if (exact) return exact.path

  const nestedMatches = routes.items
    .filter((item) => item.path !== '/' && pathname.startsWith(item.path))
    .sort((a, b) => b.path.length - a.path.length)

  return nestedMatches[0]?.path ?? '/'
}

export function isNavItemActive(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

/* ---------- v2 (desde 2.0.0-snapshot): breadcrumb e navegação de fluxo ---------- */

export type Crumb = { label: string; path: string }

/** Início › {pais conforme routes.json} › página atual. A raiz usa o rótulo “Início”. */
export function getBreadcrumb(pathname: string, routes: RoutesSpec): Crumb[] {
  const chain: Crumb[] = []
  let current = routes.items.find((item) => item.path === pathname)
  while (current) {
    chain.unshift({ label: current.label, path: current.path })
    const parent = current.parent
    current = parent ? routes.items.find((item) => item.path === parent) : undefined
  }
  if (pathname !== '/') chain.unshift({ label: 'Início', path: '/' })
  return chain
}

export type FlowLink = { label: string; path: string }

export type SectionFlow = {
  back: FlowLink
  prev?: FlowLink
  next?: FlowLink
  /** Posição (1..total) da página na listagem. */
  position: number
  total: number
  /** Modo entrada (home): sem anterior/voltar. */
  entry?: boolean
  /** Extras renderizados ao lado do card (ex.: botão preview). */
  extra?: import('react').ReactNode
}

type ListingCard = { title: string; path: string }

/**
 * Anterior/próximo na ordem dos cards da listagem (titulos-nossa-senhora.json / ministerios.json).
 * Ignora cards cujo path é a própria listagem (Louvor, Intercessão). Sem volta circular.
 * Rótulos sempre de routes.json (fallback: título do card).
 */
export function getSectionFlow(
  pathname: string,
  routes: RoutesSpec,
  listing: { path: string; cards: ListingCard[] },
): SectionFlow | null {
  const cards = listing.cards.filter((card) => card.path !== listing.path)
  const index = cards.findIndex((card) => card.path === pathname)
  if (index < 0) return null
  const label = (card: ListingCard) =>
    routes.items.find((item) => item.path === card.path)?.label ?? card.title
  const toLink = (card?: ListingCard) => (card ? { label: label(card), path: card.path } : undefined)
  const backLabel = routes.items.find((item) => item.path === listing.path)?.label ?? listing.path
  return {
    back: { label: backLabel, path: listing.path },
    prev: toLink(cards[index - 1]),
    next: toLink(cards[index + 1]),
    position: index + 1,
    total: cards.length,
  }
}

/** Fluxo de entrada da home: card para o 1º item de topo do menu (rótulo de routes.json). */
export function getEntryFlow(routes: RoutesSpec): SectionFlow | null {
  const first = routes.items.find((item) => !item.parent && item.path !== '/' && !item.path.includes('#'))
  if (!first) return null
  return { back: { label: 'Início', path: '/' }, next: { label: first.label, path: first.path }, position: 1, total: 1, entry: true }
}

/**
 * Fluxo de uma listagem de topo (ex.: /titulos-nossa-senhora): Voltar = Início; anterior/próximo = itens de topo
 * do menu (sem a Home), na ordem de routes.json. Sem volta circular.
 */
export function getTopLevelFlow(pathname: string, routes: RoutesSpec): SectionFlow | null {
  const tops = routes.items.filter((item) => !item.parent && item.path !== '/' && !item.path.includes('#'))
  const index = tops.findIndex((item) => item.path === pathname)
  if (index < 0) return null
  const toLink = (item?: { label: string; path: string }) => (item ? { label: item.label, path: item.path } : undefined)
  return {
    back: { label: 'Início', path: '/' },
    prev: toLink(tops[index - 1]),
    next: toLink(tops[index + 1]),
    position: index + 1,
    total: tops.length,
  }
}
