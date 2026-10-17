import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

/** v2 (2.0.0-snapshot): breadcrumb e anterior/voltar/próximo para cada rota com specs/decor/{slug}.json. */
type Route = { label: string; path: string; parent?: string }
const root = process.cwd()
const routes: Route[] = JSON.parse(fs.readFileSync(path.join(root, 'specs/routes.json'), 'utf-8')).items
const decorSlugs = fs
  .readdirSync(path.join(root, 'specs/decor'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))

const listings: Record<string, { path: string; cards: { path: string }[] }> = {
  '/titulos-nossa-senhora': {
    path: '/titulos-nossa-senhora',
    cards: JSON.parse(fs.readFileSync(path.join(root, 'specs/content/titulos-nossa-senhora.json'), 'utf-8')).galleries,
  },
  '/ministerios': {
    path: '/ministerios',
    cards: JSON.parse(fs.readFileSync(path.join(root, 'specs/content/ministerios.json'), 'utf-8')).ministries,
  },
}

for (const slug of decorSlugs) {
  const route = routes.find((r) => r.path.endsWith('/' + slug))
  if (!route || !route.parent) continue
  const listing = listings[route.parent]
  const cards = listing.cards.filter((c) => c.path !== listing.path)
  const i = cards.findIndex((c) => c.path === route.path)
  const prev = cards[i - 1]
  const next = cards[i + 1]
  const label = (p: string) => routes.find((r) => r.path === p)!.label

  test(`fluxo v2: ${route.path}`, async ({ page }) => {
    await page.goto(route.path)
    const crumb = page.getByTestId('breadcrumb')
    await expect(crumb.locator('li')).toHaveText(['Início', label(route.parent!), route.label])
    await expect(crumb.locator('[aria-current="page"]')).toHaveText(route.label)

    const flow = page.getByTestId('section-flow')
    await expect(flow.getByTestId('section-flow-back')).toHaveAttribute('href', route.parent!)
    if (prev) await expect(flow.getByTestId('section-flow-prev')).toHaveAttribute('href', prev.path)
    else await expect(flow.getByTestId('section-flow-prev')).toHaveCount(0)
    if (next) await expect(flow.getByTestId('section-flow-next')).toHaveAttribute('href', next.path)
    else await expect(flow.getByTestId('section-flow-next')).toHaveCount(0)

    if (next) {
      await flow.getByTestId('section-flow-next').click()
      await expect(page).toHaveURL(next.path)
    }
  })
}
