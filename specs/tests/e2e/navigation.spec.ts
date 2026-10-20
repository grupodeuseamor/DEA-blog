import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

type RouteItem = { label: string; path: string; parent?: string }

function loadRoutes(): RouteItem[] {
  const filePath = path.join(process.cwd(), 'specs', 'routes.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return data.items
}

const routes = loadRoutes()
const topLevelRoutes = routes.filter((route) => !route.parent)
const childRoutes = routes.filter((route) => route.parent)

test.describe('Navbar horizontal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('exibe links de topo Home, Títulos de Nossa Senhora e Ministérios', async ({ page }) => {
    const desktopNav = page.getByTestId('nav-desktop')
    await expect(desktopNav.getByTestId('nav-link-home')).toBeVisible()
    await expect(desktopNav.getByTestId('nav-dropdown-titulos-nossa-senhora')).toBeVisible()
    await expect(desktopNav.getByTestId('nav-dropdown-ministerios')).toBeVisible()
    await expect(desktopNav.getByRole('link', { name: 'Participe', exact: true })).toHaveAttribute('href', '/#primeira-vez')
  })

  for (const route of topLevelRoutes) {
    test(`navega para ${route.label} (${route.path}) via link de topo`, async ({
      page,
    }) => {
      const hasChildren = routes.some((item) => item.parent === route.path)
      const testId =
        route.path === '/'
          ? 'nav-link-home'
          : hasChildren ? `nav-dropdown-${route.path.slice(1)}` : `nav-link-${route.path.slice(1).replace(/\//g, '-')}`

      await page.getByTestId('nav-desktop').getByTestId(testId).click()
      await expect(page).toHaveURL(route.path)
    })
  }
})

test.describe('Navbar dropdowns', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
  })

  for (const route of childRoutes) {
    test(`navega para ${route.label} (${route.path}) via dropdown`, async ({
      page,
    }) => {
      const parentSlug = route.parent!.slice(1)
      const childTestId = `nav-link-${route.path.slice(1).replace(/\//g, '-')}`

      await page.getByTestId(`nav-dropdown-${parentSlug}`).hover()
      await page.getByTestId('nav-desktop').getByTestId(childTestId).click()
      await expect(page).toHaveURL(route.path)
    })
  }
})

test.describe('Navbar mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
  })

  for (const route of routes) {
    test(`navega para ${route.label} (${route.path}) via menu mobile`, async ({
      page,
    }) => {
      await page.getByTestId('nav-mobile-toggle').click()
      const mobileNav = page.getByTestId('nav-mobile')

      const testId =
        route.path === '/'
          ? 'nav-mobile-link-home'
          : route.parent
            ? `nav-mobile-link-${route.path.slice(1).replace(/\//g, '-')}`
            : `nav-mobile-link-${route.path.slice(1)}`

      const link = mobileNav.getByTestId(testId)
      await expect(link).toBeVisible()
      await link.scrollIntoViewIfNeeded()
      await link.evaluate((el: HTMLElement) => el.click())
      await expect(page).toHaveURL(route.path)
    })
  }
})
