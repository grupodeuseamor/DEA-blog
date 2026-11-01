import { expect, test } from '@playwright/test'

/** 2.9.0: página Indulgências Plenárias e chamada na home. */
test.describe('Indulgências Plenárias', () => {
  test('home tem a chamada e ela leva à página', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByTestId('home-indulgencias-cta')
    await expect(cta).toHaveText('Quer saber mais sobre uma indulgência plenária?')
    await cta.click()
    await expect(page).toHaveURL('/indulgencias-plenarias')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Indulgências Plenárias')
  })

  test('conteúdo, breadcrumb e item no menu', async ({ page }) => {
    await page.goto('/indulgencias-plenarias')
    await expect(page.getByTestId('breadcrumb').locator('li')).toHaveText(['Início', 'Indulgências Plenárias'])
    await expect(page.getByText('De 1 a 8 de novembro').first()).toBeVisible()
    await expect(page.getByText('São João Damasceno', { exact: false })).toBeVisible()
    await page.goto('/')
    await page.getByTestId('nav-desktop').getByTestId('nav-link-indulgencias-plenarias').click()
    await expect(page).toHaveURL('/indulgencias-plenarias')
  })
})
