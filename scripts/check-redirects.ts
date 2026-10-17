/**
 * 2.7.0 — redirects (sem Actions).
 *   npm run test:redirects                       → validação estática de vercel.json (+ next.config, se houver redirects)
 *   npm run test:redirects:remote -- <baseUrl>   → confere status/Location contra o preview ou a produção
 * O `next start` local não aplica o vercel.json; por isso localmente a validação é estática.
 * Domínios (apex → www, dea-blog.vercel.app → www) não estão no repo: só existem na Vercel e são
 * conferidos no modo remoto quando o baseUrl é o domínio oficial (ou com --domains).
 */
import fs from 'fs'
import path from 'path'

type Redirect = { source: string; destination: string; permanent?: boolean; statusCode?: number }
const root = process.cwd()
const routes: string[] = JSON.parse(fs.readFileSync(path.join(root, 'specs/routes.json'), 'utf-8')).items.map((r: { path: string }) => r.path)
const redirects: Redirect[] = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf-8')).redirects ?? []
const nextConfig = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf-8')

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)
const expectedStatus = (r: Redirect) => r.statusCode ?? (r.permanent === false ? 307 : 308)
/** Aplica a regra a um caminho concreto (suporta `:param` e `:param*`). */
function apply(r: Redirect, pathname: string): string | null {
  const names: string[] = []
  const re = new RegExp(
    '^' +
      r.source.replace(/\/:(\w+)\*/g, (_, n) => (names.push(n), '(?:/(.*))?')).replace(/:(\w+)/g, (_, n) => (names.push(n), '([^/]+)')) +
      '$',
  )
  const m = pathname.match(re)
  if (!m) return null
  let dest = r.destination
  names.forEach((n, i) => {
    dest = dest.replace(new RegExp(`/:${n}\\*?`), m[i + 1] ? `/${m[i + 1]}` : '')
  })
  return dest
}
/** Exemplos concretos de cada regra: para `:path*`, todas as rotas filhas do destino. */
function samples(r: Redirect): { from: string; to: string }[] {
  if (!r.source.includes(':')) return [{ from: r.source, to: r.destination }]
  const base = r.destination.split('/:')[0]
  const srcBase = r.source.split('/:')[0]
  return routes
    .filter((p) => p.startsWith(base + '/'))
    .map((p) => ({ from: srcBase + p.slice(base.length), to: p }))
}

function staticCheck() {
  if (/redirects\s*\(/.test(nextConfig)) fail('next.config.mjs tem redirects(): incluir no teste')
  const sources = new Set<string>()
  for (const r of redirects) {
    if (sources.has(r.source)) fail(`origem duplicada: ${r.source}`)
    sources.add(r.source)
    if (routes.includes(r.source)) fail(`origem ${r.source} é uma rota real (sombrearia a página)`)
    if (![301, 302, 307, 308].includes(expectedStatus(r))) fail(`${r.source}: status inválido`)
    const list = samples(r)
    if (!list.length) fail(`${r.source}: nenhum destino concreto em routes.json`)
    for (const s of list) {
      if (apply(r, s.from) !== s.to) fail(`${r.source}: ${s.from} deveria ir para ${s.to}`)
      if (!routes.includes(s.to)) fail(`${r.source}: destino ${s.to} não existe em routes.json`)
      // sem loop / sem cadeia: o destino não pode casar com outra regra
      for (const other of redirects) if (apply(other, s.to)) fail(`cadeia/loop: ${s.from} → ${s.to} → ${apply(other, s.to)}`)
    }
  }
  const total = redirects.reduce((n, r) => n + samples(r).length, 0)
  console.log(`estático: ${redirects.length} regras do vercel.json, ${total} caminhos concretos verificados`)
}

async function head(url: string) {
  const res = await fetch(url, { method: 'GET', redirect: 'manual' })
  return { status: res.status, location: res.headers.get('location') }
}
const sameTarget = (loc: string | null, base: string, to: string) => !!loc && new URL(loc, base).href.replace(/\/$/, '') === new URL(to, base).href.replace(/\/$/, '')

const WWW = 'https://www.grupodeuseamor.com.br'
const ALIASES = ['grupodeuseamor.com.br', 'dea-blog.vercel.app']

/** Domínio alias (apex / dea-blog.vercel.app): toda URL vai em 308 para o www, preservando o caminho. */
async function aliasCheck(base: string) {
  let ok = 0
  const paths = [...routes, ...redirects.flatMap((r) => samples(r).map((s) => s.from))]
  for (const p of paths) {
    try {
      const { status, location } = await head(base + p)
      if (status !== 308 || !sameTarget(location, base, WWW + p)) fail(`alias ${base}${p}: ${status} ${location} (esperado 308 para ${WWW}${p})`)
      else ok++
    } catch (e) {
      fail(`alias ${base}${p}: erro de rede ${(e as Error).message}`)
    }
  }
  console.log(`alias ${base}: ${ok}/${paths.length} caminhos em 308 para ${WWW} preservando o caminho`)
}

async function remoteCheck(baseUrl: string, domains: boolean) {
  const base = baseUrl.replace(/\/$/, '')
  if (ALIASES.includes(new URL(base).hostname)) return aliasCheck(base)
  let ok = 0
  for (const r of redirects) {
    for (const s of samples(r)) {
      try {
        const { status, location } = await head(base + s.from)
        if (status !== expectedStatus(r) && status !== 301 && status !== 308) fail(`${base}${s.from}: status ${status} (esperado ${expectedStatus(r)})`)
        else if (!sameTarget(location, base, s.to)) fail(`${base}${s.from}: Location ${location} (esperado ${s.to})`)
        else ok++
        if (status !== expectedStatus(r) && (status === 301 || status === 308)) console.log(`aviso: ${s.from} respondeu ${status} (configurado ${expectedStatus(r)})`)
      } catch (e) {
        fail(`${base}${s.from}: erro de rede ${(e as Error).message}`)
      }
    }
  }
  for (const p of routes) {
    const { status } = await head(base + p).catch(() => ({ status: 0 }))
    if (status !== 200) fail(`${base}${p}: rota respondeu ${status}`)
    else ok++
  }
  if (domains) {
    const www = WWW
    for (const [from, label] of [
      ['https://grupodeuseamor.com.br', 'apex → www'],
      ['https://dea-blog.vercel.app', 'dea-blog.vercel.app → www'],
    ] as const) {
      for (const p of ['/', '/titulos-nossa-senhora/nossa-senhora-aparecida']) {
        try {
          const { status, location } = await head(from + p)
          if (![301, 307, 308].includes(status) || !sameTarget(location, from, www + p)) fail(`${label}: ${from}${p} → ${status} ${location} (esperado 308 para ${www}${p})`)
          else (ok++, console.log(`${label}: ${from}${p} → ${status} ${location}`))
        } catch (e) {
          fail(`${label}: ${from}${p} erro de rede ${(e as Error).message}`)
        }
      }
    }
  }
  console.log(`remoto ${base}: ${ok} verificações ok`)
}

async function main() {
  const args = process.argv.slice(2)
  const remoteIdx = args.indexOf('--remote')
  staticCheck()
  if (remoteIdx >= 0) {
    const baseUrl = args.find((a) => /^https?:\/\//.test(a))
    if (!baseUrl) {
      console.error('uso: npm run test:redirects:remote -- <baseUrl> [--domains]')
      process.exit(2)
    }
    await remoteCheck(baseUrl, args.includes('--domains') || /www\.grupodeuseamor\.com\.br/.test(baseUrl))
  }
  if (errors.length) {
    console.error('✗ ' + errors.join('\n✗ '))
    process.exit(1)
  }
  console.log('✓ Redirects verificados.')
}

void main()
