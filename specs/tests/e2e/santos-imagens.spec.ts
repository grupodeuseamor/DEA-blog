import { expect, test } from '@playwright/test'

/** 2.9.0: fotos dos santos com legendas, carregando de /images. */
const pages = {
  '/santos/sao-jose-luis-sanchez-del-rio': ['Joselito com o estandarte do Sagrado Coração', 'Joselito erguendo a cruz diante dos soldados'],
  '/santos/sao-pier-giorgio-frassati': ['Trilha São Pier Giorgio Frassati', 'Pier Giorgio Frassati sorrindo'],
  '/santos/sao-joao-paulo-ii': ['São João Paulo II coroando a imagem de Nossa Senhora.', 'João Paulo II abençoando'],
}

for (const [path, captions] of Object.entries(pages)) {
  test(`legendas e imagens em ${path}`, async ({ page }) => {
    await page.goto(path)
    for (const caption of captions) {
      await expect(page.locator('figcaption', { hasText: caption }).first()).toBeAttached()
    }
    const figs = page.locator('figure img')
    expect(await figs.count()).toBeGreaterThan(0)
    for (const img of await figs.all()) {
      await img.scrollIntoViewIfNeeded()
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    }
  })
}
