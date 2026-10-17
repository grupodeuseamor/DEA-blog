import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

/**
 * v2 (desde 2.2.0-snapshot): toda rota com specs/decor/{slug}.json — folha única, sem scroll horizontal
 * e nenhum detalhe decorativo (incl. foto colada) sobre parágrafo ou título, em 1440 e 390 px.
 */
type Route = { path: string }
const root = process.cwd()
const routes: Route[] = JSON.parse(fs.readFileSync(path.join(root, 'specs/routes.json'), 'utf-8')).items
const decorRoutes = fs
  .readdirSync(path.join(root, 'specs/decor'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .map((slug) => routes.find((r) => (slug === 'home' ? r.path === '/' : r.path.endsWith('/' + slug))))
  .filter((r): r is Route => Boolean(r))

for (const width of [1440, 390]) {
  for (const route of decorRoutes) {
    test(`v2 ${route.path} em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(route.path)
      await page.evaluate(() => document.fonts.ready)
      await expect(page.getByTestId('paper-sheet')).toHaveCount(1)
      expect(await page.evaluate(() => document.scrollingElement!.scrollWidth)).toBeLessThanOrEqual(width)
      const overlaps = await page.evaluate(() => {
        const boxes = (sel: string) => [...document.querySelectorAll(sel)].map((el) => el.getBoundingClientRect())
        const decor = boxes('[data-decor]')
        const text = boxes('[data-testid="paper-sheet"] p:not(.bilhete), [data-testid="paper-sheet"] h2')
        let n = 0
        for (const d of decor)
          for (const t of text) if (d.left < t.right && d.right > t.left && d.top < t.bottom && d.bottom > t.top) n++
        return n
      })
      expect(overlaps).toBe(0)
      expect(await page.locator('.pin.coracao').count()).toBeLessThanOrEqual(1)
    })
  }
}
