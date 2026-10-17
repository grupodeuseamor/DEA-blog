import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

const home = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'specs/content/home.json'), 'utf-8'))

test.describe('Home — v2 (2.5.0-snapshot)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hero v2 com carrossel', async ({ page }) => {
    await expect(page.locator('main.v2[data-visual="v2"]')).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Grupo Deus É Amor')
    await expect(page.getByTestId('hero-background-carousel')).toBeVisible()
    await expect(page.getByTestId('breadcrumb')).toHaveCount(0)
  })

  test('folha única, convite das quintas e CTAs', async ({ page }) => {
    const sheet = page.getByTestId('paper-sheet')
    await expect(sheet).toHaveCount(1)
    await expect(sheet.locator('section.bloco')).toHaveCount(2)
    await expect(sheet.locator('section.bloco.hl')).toHaveCount(1)
    await expect(sheet.locator('section.bloco.hl')).toContainText('Venha participar')
    await expect(page.locator('[data-decor="postit"]')).toContainText('19h30 · Auditório Dona Guilhermina')
    await expect(page.locator('.pin.coracao')).toHaveCount(1)
    await expect(page.getByTestId('instagram-cta')).toHaveAttribute('href', /instagram\.com\/grupodeuseamor/)
    await expect(sheet.getByRole('link', { name: 'Títulos de Nossa Senhora' })).toHaveAttribute('href', '/titulos-nossa-senhora')
    await expect(page.locator('main')).not.toContainText('DEA Ajuda')
    // D6: nenhuma foto de pessoas em lugar novo (só o carrossel do hero)
    await expect(sheet.locator('img')).toHaveCount(0)
  })

  test('Continue navegando + botão preview', async ({ page }) => {
    const flow = page.getByTestId('section-flow')
    await expect(flow).toContainText('Continue navegando')
    await expect(flow.getByTestId('section-flow-next')).toHaveAttribute('href', '/titulos-nossa-senhora')
    await expect(flow.getByTestId('section-flow-prev')).toHaveCount(0)
    await expect(flow.getByTestId('section-flow-back')).toHaveCount(0)
    const preview = page.getByTestId('home-preview-ministerios')
    if (home.previewCta) {
      await expect(preview).toHaveCount(1)
      await expect(preview).toContainText('preview')
      await expect(preview).toHaveAttribute('href', home.previewCta.href)
      await preview.click()
      await expect(page).toHaveURL('/ministerios')
    } else {
      await expect(preview).toHaveCount(0)
    }
  })

  test('rodapé com logo, cruz e copyright', async ({ page }) => {
    const footer = page.getByTestId('site-footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByAltText('Grupo Deus É Amor')).toBeVisible()
    await expect(footer.getByTestId('footer-copyright')).toContainText('Grupo Deus É Amor')
    await expect(footer.getByTestId('footer-easter-egg')).toContainText('Ministério DEA Programadores')
    const pillars = footer.getByTestId('footer-pillars')
    await expect(pillars).toContainText('Amizade')
    await expect(pillars).toContainText('Humildade')
    await expect(pillars).not.toContainText('Compromisso')
  })
})
