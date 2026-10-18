import { expect, test } from '@playwright/test'

test.describe('DEA Ajuda — v2 (2.4.0-snapshot)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ministerios/dea-ajuda', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    })
  })

  test('hero com título DEA Ajuda', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEA')
    await expect(page.getByTestId('hero-v2').getByText('Transformando Fé em Caridade')).toBeVisible()
    await expect(page.getByTestId('hero-background-carousel')).toBeVisible()
  })

  test('seção vídeo com embed Google Drive', async ({ page }) => {
    const videoSection = page.locator('#video')
    await expect(videoSection).toBeVisible()
    await expect(videoSection.getByText('Conheça nossa')).toBeVisible()

    const embed = page.getByTestId('remote-video-embed')
    await expect(embed).toBeVisible()
    const iframe = embed.locator('iframe')
    await expect(iframe).toBeVisible()
    await expect(iframe).toHaveAttribute(
      'src',
      /drive\.google\.com\/file\/d\/18YZiBEn4ZjvhszcY707vQlaJxlb4o-ai\/preview/,
    )
  })

  test('projetos realizados', async ({ page }) => {
    await expect(page.locator('.ml-projetos').getByText('Prova Rústica Tiradentes')).toBeVisible()
    await expect(page.locator('.ml-projetos').getByText('Campanha do Agasalho')).toBeVisible()
  })

  test('citação e valores', async ({ page }) => {
    await expect(page.getByText('Santa Teresa de Calcutá')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Solidariedade' }),
    ).toBeVisible()
  })

  test('v2: folha única com 7 seções (hero + 6) e navegação', async ({ page }) => {
    await expect(page.locator('main.v2[data-visual="v2"]')).toHaveCount(1)
    await expect(page.getByTestId('paper-sheet')).toHaveCount(1)
    await expect(page.getByTestId('paper-sheet').locator('section.bloco')).toHaveCount(6)
    await expect(page.getByTestId('hero-v2')).toHaveCount(1)
    await expect(page.locator('.margem-caderno')).toContainText('pequenas coisas com muito amor')
    await expect(page.locator('#projects .pin.coracao')).toHaveCount(1)
    await expect(page.locator('.pin.coracao')).toHaveCount(1)
    // D8: imagem externa (Vercel Blob) da inspiração mantida como está, em polaroid
    await expect(page.locator('#inspiration img[src*="blob.vercel-storage.com"]')).toHaveCount(1)
    await expect(page.locator('#about img, #video img, #projects img, #values img, #quote img')).toHaveCount(0)
  })

  test('rodapé global presente', async ({ page }) => {
    await expect(page.getByTestId('site-footer')).toBeVisible()
  })
})
