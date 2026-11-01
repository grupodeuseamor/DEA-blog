import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

/** Seção Santos: listagem no mesmo modelo de Títulos de Nossa Senhora. */
const listing = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'specs/content/santos.json'), 'utf-8'),
) as { hero: { title: string }; galleries: { slug: string; path: string }[] }

test.describe('Listagem Santos v2', () => {
  test('título, folha única e cards na ordem do JSON', async ({ page }) => {
    await page.goto('/santos')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(listing.hero.title)
    await expect(page.getByTestId('paper-sheet')).toHaveCount(1)
    const cards = page.getByTestId('gallery-grid').locator('[data-testid^="gallery-"]')
    await expect(cards).toHaveCount(listing.galleries.length)
    for (const [i, g] of listing.galleries.entries()) {
      await expect(cards.nth(i)).toHaveAttribute('data-testid', `gallery-${g.slug}`)
      await expect(cards.nth(i)).toHaveAttribute('href', g.path)
    }
  })

  test('breadcrumb e fluxo: Anterior Títulos, Próximo Ministérios', async ({ page }) => {
    await page.goto('/santos')
    await expect(page.getByTestId('breadcrumb').locator('li')).toHaveText(['Início', 'Santos'])
    const flow = page.getByTestId('section-flow')
    await expect(flow.getByTestId('section-flow-back')).toHaveAttribute('href', '/')
    await expect(flow.getByTestId('section-flow-prev')).toHaveAttribute('href', '/titulos-nossa-senhora')
    await expect(flow.getByTestId('section-flow-next')).toHaveAttribute('href', '/ministerios')
  })

  test('menu tem o link Santos', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-desktop').getByTestId('nav-link-santos').click()
    await expect(page).toHaveURL('/santos')
  })
})
