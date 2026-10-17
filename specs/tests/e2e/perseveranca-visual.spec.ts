import { expect, test } from '@playwright/test'

test.describe('Perseverança — v2 (2.4.0-snapshot)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ministerios/perseveranca')
  })

  test('hero com título Ministério Perseverança', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Perseverança')
    await expect(
      page.getByText('Formar servos gentis e generosos do amor de Deus', { exact: true }),
    ).toBeVisible()
  })

  test('caminhos de formação', async ({ page }) => {
    await expect(page.locator('.ml-projetos').getByText('Formação e oração')).toBeVisible()
    await expect(page.locator('.ml-projetos').getByText('Perseverança na vocação')).toBeVisible()
  })

  test('citação e valores', async ({ page }) => {
    await expect(
      page.getByText('Servir com amor, perseverar com fé, ser gentil e generoso'),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Gentileza' })).toBeVisible()
  })

  test('v2: folha única com 6 seções (hero + 5), sem vídeo', async ({ page }) => {
    await expect(page.locator('main.v2[data-visual="v2"]')).toHaveCount(1)
    await expect(page.getByTestId('hero-v2')).toHaveCount(1)
    await expect(page.getByTestId('paper-sheet').locator('section.bloco')).toHaveCount(5)
    await expect(page.locator('#video')).toHaveCount(0)
    await expect(page.getByTestId('remote-video-embed')).toHaveCount(0)
    await expect(page.locator('.pin.coracao')).toHaveCount(1)
    // D6: foto de pessoas só onde já era usada (hero e inspiração)
    await expect(page.locator('#about img, #projects img, #values img, #quote img')).toHaveCount(0)
  })

  test('rodapé global presente', async ({ page }) => {
    await expect(page.getByTestId('site-footer')).toBeVisible()
  })
})
