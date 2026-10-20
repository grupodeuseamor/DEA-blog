import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'

/**
 * 2.7.0 — teste de links (local, sem Actions). Percorre as 15 rotas de specs/routes.json,
 * coleta todos os <a href> (menu, rodapé, breadcrumb, fluxo, cards, botão preview, CTAs):
 * - internos: destino precisa existir em routes.json e responder 200; âncoras (#id) precisam existir na página de destino;
 * - externos: só https e formato válido (listados no log). Checagem de rede opcional com LINKS_CHECK_EXTERNAL=1 (falha de rede não quebra).
 */
type Route = { path: string; label: string }
const routes: Route[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'specs/routes.json'), 'utf-8')).items.filter((route: Route) => !route.path.includes('#'))
const known = new Set(routes.map((r) => r.path))

test('links internos e externos das 15 rotas', async ({ page, request, baseURL }) => {
  test.setTimeout(180_000)
  const internal = new Map<string, Set<string>>() // destino -> páginas de origem
  const anchors: { from: string; target: string; id: string }[] = []
  const external = new Map<string, Set<string>>()
  const origin = new URL(baseURL!).origin

  for (const route of routes) {
    await page.goto(route.path)
    const hrefs = await page.$$eval('a[href]', (els) => els.map((a) => a.getAttribute('href')!))
    expect(hrefs.length, `nenhum link em ${route.path}`).toBeGreaterThan(0)
    for (const href of hrefs) {
      const url = new URL(href, origin + route.path)
      if (url.origin === origin) {
        const target = url.pathname.replace(/\/$/, '') || '/'
        if (!internal.has(target)) internal.set(target, new Set())
        internal.get(target)!.add(route.path)
        if (url.hash) anchors.push({ from: route.path, target, id: decodeURIComponent(url.hash.slice(1)) })
      } else {
        if (!external.has(url.href)) external.set(url.href, new Set())
        external.get(url.href)!.add(route.path)
      }
    }
  }

  for (const [target, from] of internal) {
    expect(known.has(target), `${target} (em ${[...from].join(', ')}) não existe em routes.json`).toBe(true)
    const res = await request.get(target, { maxRedirects: 0 })
    expect(res.status(), `${target} respondeu ${res.status()}`).toBe(200)
  }
  for (const a of anchors) {
    await page.goto(a.target)
    await expect(page.locator(`[id="${a.id}"]`), `âncora #${a.id} (de ${a.from}) ausente em ${a.target}`).toHaveCount(1)
  }
  for (const [href, from] of external) {
    const url = new URL(href)
    expect(url.protocol, `link externo sem https: ${href} (em ${[...from].join(', ')})`).toBe('https:')
    expect(url.hostname).toMatch(/\./)
  }
  console.log(`internos: ${internal.size} destinos · âncoras: ${anchors.length} · externos: ${[...external.keys()].join(' | ') || 'nenhum'}`)

  if (process.env.LINKS_CHECK_EXTERNAL) {
    for (const href of external.keys()) {
      try {
        const res = await request.fetch(href, { method: 'HEAD', maxRedirects: 5, timeout: 10_000 })
        console.log(`externo ${res.status()} ${href}`)
      } catch (e) {
        console.log(`externo (falha de rede, ignorada) ${href}: ${(e as Error).message.split('\n')[0]}`)
      }
    }
  }
})

test('embeds externos (iframe/img) usam https', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path)
    const srcs = await page.$$eval('iframe[src], img[src]', (els) => els.map((e) => e.getAttribute('src')!))
    for (const src of srcs.filter((s) => /^[a-z]+:/i.test(s))) expect(src, `${src} em ${route.path}`).toMatch(/^https:\/\//)
  }
})
