import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

/** v2 (2.0.0-snapshot): página piloto Nossa Senhora Aparecida (folha única, piloto v2c). */
const ROUTE = '/titulos-nossa-senhora/nossa-senhora-aparecida'
const content = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'specs/content/nossa-senhora-aparecida.json'), 'utf-8'),
)

test.describe('Aparecida v2', () => {
  test('hero v2, folha única com as 5 seções e detalhes', async ({ page }) => {
    await page.goto(ROUTE)
    await expect(page.locator('main')).toHaveAttribute('data-visual', 'v2')
    await expect(page.getByTestId('hero-v2').locator('h1')).toHaveText(content.hero.title)

    const sheets = page.getByTestId('paper-sheet')
    await expect(sheets).toHaveCount(1)
    const titles = sheets.locator('section.bloco h2')
    await expect(titles).toHaveText(content.sections.map((s: { title: string }) => s.title))
    await expect(sheets.locator('section.bloco.hl')).toHaveCount(1)

    await expect(page.locator('[data-decor="polaroid"]')).toHaveCount(1)
    await expect(page.locator('[data-decor="carimbo"]')).toHaveCount(1)
    await expect(page.locator('[data-decor="postit"]')).toHaveCount(2)
    await expect(page.locator('[data-decor="postit-datas"]')).toHaveCount(1)
    await expect(page.locator('[data-decor="bilhete"]')).toHaveCount(2)
    await expect(page.locator('.pin.coracao')).toHaveCount(1)
  })

  for (const width of [1440, 390]) {
    test(`sem scroll horizontal e nenhum detalhe cobre texto em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(ROUTE)
      await page.evaluate(() => document.fonts.ready)
      const scrollWidth = await page.evaluate(() => document.scrollingElement!.scrollWidth)
      expect(scrollWidth).toBeLessThanOrEqual(width)

      const overlaps = await page.evaluate(() => {
        const boxes = (sel: string) => [...document.querySelectorAll(sel)].map((el) => el.getBoundingClientRect())
        const decor = boxes('[data-decor]')
        const text = boxes('[data-testid="paper-sheet"] p:not(.bilhete), [data-testid="paper-sheet"] h2')
        let n = 0
        for (const d of decor)
          for (const t of text)
            if (d.left < t.right && d.right > t.left && d.top < t.bottom && d.bottom > t.top) n++
        return n
      })
      expect(overlaps).toBe(0)
    })
  }
})
