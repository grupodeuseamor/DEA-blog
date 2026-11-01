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

  test('3 santos na ordem pedida, e card leva à página', async ({ page }) => {
    expect(listing.galleries.map((g) => g.slug)).toEqual([
      'sao-joao-paulo-ii',
      'sao-pier-giorgio-frassati',
      'sao-jose-luis-sanchez-del-rio',
    ])
    await page.goto('/santos')
    await page.getByTestId('gallery-sao-pier-giorgio-frassati').click()
    await expect(page).toHaveURL('/santos/sao-pier-giorgio-frassati')
    const flow = page.getByTestId('section-flow')
    await expect(flow.getByTestId('section-flow-back')).toHaveAttribute('href', '/santos')
    await expect(flow.getByTestId('section-flow-prev')).toHaveAttribute('href', '/santos/sao-joao-paulo-ii')
    await expect(flow.getByTestId('section-flow-next')).toHaveAttribute('href', '/santos/sao-jose-luis-sanchez-del-rio')
    await expect(page.getByText('São Pier Giorgio Frassati, rogai por nós!')).toBeVisible()
  })

  test('menu tem o link Santos', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-desktop').getByTestId('nav-dropdown-santos').click()
    await expect(page).toHaveURL('/santos')
  })
})
