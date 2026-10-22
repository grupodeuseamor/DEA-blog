import { expect, test } from '@playwright/test'

for (const width of [1440, 390]) {
  test(`participação: apresentação, âncoras, encontro, mapa e Instagram em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.clock.install({ time: new Date('2026-10-19T12:00:00Z') })
    await page.goto('/')
    const hero = page.getByTestId('hero-v2')
    await expect(hero).toContainText('Grupo de oração jovem · Maringá · desde 2000')
    const about = hero.getByRole('link', { name: 'Conhecer o grupo', exact: true })
    await expect(about).toHaveAttribute('href', '/#sobre-o-grupo')
    await about.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/#sobre-o-grupo')
    await expect(page.locator('#sobre-o-grupo')).toContainText('Evangelizando jovens desde o ano 2000')

    await hero.getByRole('link', { name: 'Quero participar', exact: true }).click()
    await expect(page).toHaveURL('/#primeira-vez')
    const invitation = page.locator('#primeira-vez')
    await expect(invitation.getByRole('heading', { name: 'Venha participar', exact: true })).toBeVisible()
    const meeting = page.getByTestId('next-meeting')
    await expect(meeting.locator('time').first()).toHaveAttribute('datetime', '2026-10-22')
    await expect(meeting).toContainText('19:30 às 21:00')
    await expect(meeting).toContainText('Av. Tiradentes, 710')
    const calendar = new URL((await meeting.getByRole('link', { name: 'Adicionar ao Google Agenda' }).getAttribute('href'))!)
    expect(calendar.hostname).toBe('calendar.google.com')
    expect(calendar.searchParams.get('dates')).toBe('20261022T193000/20261022T210000')
    expect(calendar.searchParams.get('ctz')).toBe('America/Sao_Paulo')
    expect(calendar.searchParams.get('location')).toContain('Auditório Dona Guilhermina')
    await expect(meeting.getByRole('link', { name: 'Abrir no Google Maps' })).toHaveAttribute('href', /www\.google\.com\/maps\/search\//)
    const map = meeting.locator('iframe')
    await expect(map).toHaveAttribute('title', 'Auditório Dona Guilhermina — Google Maps')
    expect(new URL((await map.getAttribute('src'))!).searchParams.get('q')).toContain('710')
    await expect(map).toHaveAttribute('loading', 'lazy')
    expect(await map.evaluate((element) => element.getBoundingClientRect().width)).toBeLessThan(width)

    const instagram = page.getByTestId('site-footer').getByRole('link', { name: 'Instagram · @grupodeuseamor (abre em nova aba)', exact: true })
    await expect(instagram)
      .toHaveAttribute('href', 'https://www.instagram.com/grupodeuseamor/')
    for (const link of [instagram, meeting.getByRole('link', { name: 'Adicionar ao Google Agenda (abre em nova aba)', exact: true }), meeting.getByRole('link', { name: 'Abrir no Google Maps (abre em nova aba)', exact: true })]) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)

    // O mesmo convite é alcançável a partir de uma página interna.
    await page.goto('/ministerios')
    if (width < 768) await page.getByTestId('nav-mobile-toggle').click()
    const nav = page.getByTestId(width < 768 ? 'nav-mobile' : 'nav-desktop')
    await nav.getByRole('link', { name: 'Participe', exact: true }).click()
    await expect(page).toHaveURL('/#primeira-vez')
    await expect(page.locator('#primeira-vez')).toBeInViewport()
    if (width < 768) await expect(page.getByTestId('nav-mobile')).toHaveCount(0)
  })
}

test('data e Agenda pulam feriados e se atualizam com a página aberta', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-06-01T12:00:00Z') })
  await page.goto('/')
  const meeting = page.getByTestId('next-meeting')
  await expect(meeting.locator('time').first()).toHaveAttribute('datetime', '2026-06-11')
  await expect(meeting.getByRole('link', { name: 'Adicionar ao Google Agenda' })).toHaveAttribute('href', /20260611T193000/)
  await page.clock.setSystemTime(new Date('2026-06-11T22:31:00Z'))
  await page.clock.runFor(30_000)
  await expect(meeting.locator('time').first()).toHaveAttribute('datetime', '2026-06-18')
  await expect(meeting.getByRole('link', { name: 'Adicionar ao Google Agenda' })).toHaveAttribute('href', /20260618T193000/)
})
