import { expect, test } from '@playwright/test'

/** 2.9.1: ícones (avatar) nos cards de Santos e polaroids da listagem; Nossa Senhora segue com emoji. */
const slugs = ['sao-joao-paulo-ii', 'sao-pier-giorgio-frassati', 'sao-jose-luis-sanchez-del-rio']

test('cards de Santos mostram ícone redondo no lugar do emoji', async ({ page }) => {
  await page.goto('/santos')
  for (const slug of slugs) {
    const card = page.getByTestId(`gallery-${slug}`)
    const img = card.getByTestId('card-icon').locator('img')
    await expect(img).toHaveCount(1)
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    await expect(card.locator('.emoji')).toHaveCount(0)
  }
})

test('listagem de Santos tem 2 polaroids com legenda', async ({ page }) => {
  await page.goto('/santos')
  const photos = page.getByTestId('gallery-photos')
  await expect(photos.locator('figure')).toHaveCount(2)
  await expect(photos.locator('figcaption', { hasText: 'Santos reunidos ao redor de São Francisco' })).toBeVisible()
  await expect(photos.locator('figcaption', { hasText: 'Os santos aos pés de Cristo crucificado e de Nossa Senhora' })).toBeVisible()
  for (const img of await photos.locator('img').all()) {
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  }
})

test('Títulos de Nossa Senhora continua com emoji, sem ícone', async ({ page }) => {
  await page.goto('/titulos-nossa-senhora')
  await expect(page.getByTestId('card-icon')).toHaveCount(0)
})
