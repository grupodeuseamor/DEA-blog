import { expect, test } from '@playwright/test'

test.describe('Ministérios — listagem v2 (2.4.0-snapshot)', () => {
  test('fichas, carimbo "em breve" e fluxo de topo', async ({ page }) => {
    await page.goto('/ministerios')
    await expect(page.getByTestId('paper-sheet')).toHaveCount(1)
    await expect(page.getByTestId('soon-stamp')).toHaveCount(2)
    await expect(page.getByTestId('ministry-louvor').getByTestId('soon-stamp')).toHaveText('em breve')
    await expect(page.getByTestId('ministry-intercessao').locator('a')).toHaveCount(0)
    await expect(page.locator('a[data-testid="ministry-dea-ajuda"]')).toHaveAttribute('href', '/ministerios/dea-ajuda')
    const nav = page.getByTestId('section-flow')
    await expect(nav.getByTestId('section-flow-prev')).toContainText('Títulos de Nossa Senhora')
    await expect(nav.getByTestId('section-flow-back')).toHaveAttribute('href', '/')
    await expect(nav.getByTestId('section-flow-next')).toHaveCount(0)
  })
})
