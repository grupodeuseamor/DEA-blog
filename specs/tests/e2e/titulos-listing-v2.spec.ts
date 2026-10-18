import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

/** v2 (2.1.0-snapshot): listagem Títulos de Nossa Senhora na folha única. */
const listing = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'specs/content/titulos-nossa-senhora.json'), 'utf-8'),
) as { galleries: { slug: string; path: string; description: string }[] }
const YEAR = /\b(1[0-9]{3}|20[0-9]{2})\b/

test.describe('Listagem Títulos v2', () => {
  test('10 cards na ordem do JSON, dentro de uma folha única, com etiqueta de ano só quando há ano', async ({ page }) => {
    await page.goto('/titulos-nossa-senhora')
    await expect(page.getByTestId('paper-sheet')).toHaveCount(1)
    const cards = page.getByTestId('paper-sheet').locator('[data-testid^="gallery-nossa"]')
    await expect(cards).toHaveCount(listing.galleries.length)
    for (const [i, g] of listing.galleries.entries()) {
      const card = cards.nth(i)
      await expect(card).toHaveAttribute('data-testid', `gallery-${g.slug}`)
      await expect(card).toHaveAttribute('href', g.path)
      const year = g.description.match(YEAR)?.[1]
      if (year) await expect(card.getByTestId('card-year')).toHaveText(year)
      else await expect(card.getByTestId('card-year')).toHaveCount(0)
    }
  })

  test('breadcrumb e fluxo: Voltar para Início, Próximo Ministérios', async ({ page }) => {
    await page.goto('/titulos-nossa-senhora')
    await expect(page.getByTestId('breadcrumb').locator('li')).toHaveText(['Início', 'Títulos de Nossa Senhora'])
    const flow = page.getByTestId('section-flow')
    await expect(flow.getByTestId('section-flow-back')).toHaveAttribute('href', '/')
    await expect(flow.getByTestId('section-flow-prev')).toHaveCount(0)
    await expect(flow.getByTestId('section-flow-next')).toHaveAttribute('href', '/ministerios')
  })

  test('card leva à página certa', async ({ page }) => {
    await page.goto('/titulos-nossa-senhora')
    await page.getByTestId('gallery-nossa-senhora-la-salette').click()
    await expect(page).toHaveURL('/titulos-nossa-senhora/nossa-senhora-la-salette')
  })

  for (const width of [1440, 390]) {
    test(`páginas da Exec 2 sem scroll horizontal e sem detalhe sobre texto em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      for (const slug of ['nossa-senhora-auxiliadora', 'nossa-senhora-medjugorje', 'nossa-senhora-la-salette']) {
        await page.goto(`/titulos-nossa-senhora/${slug}`)
        await page.evaluate(() => document.fonts.ready)
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
        expect(overlaps, slug).toBe(0)
      }
    })
  }
})
