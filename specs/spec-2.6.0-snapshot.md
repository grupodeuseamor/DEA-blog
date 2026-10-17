# CorpusCriste — Spec v2.6.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 7 de 7 da v2 · tamanho M

## Resumo

Última **feature** dos snapshots. Não muda o visual: remove o legado 1.1.0, torna a decoração obrigatória nas 15 rotas e faz o **QA total** no preview. As correções que aparecerem a partir daqui saem como `2.6.1-snapshot`, `2.6.2-snapshot`… Com tudo aprovado, a versão oficial **2.7.0** é publicada (ver `spec-2.7.0.md`).

## Entregas

### Limpeza do legado (só código, sem mudança visual)

1. Templates: remover o ramo 1.1.0 de `ContentPageTemplate`, `HeroSection`, `SectionRenderer`, `ListingPageTemplate`, `ListingCard` e `ministry-landing/*`. O `loadDecor` continua entregando a decoração, e a falta de `specs/decor/{slug}.json` passa a ser erro em `validateAllDecor()` para as 15 rotas.
2. `app/globals.css`: apagar o bloco `/* legado 1.1.0 */` (`#0f0f12`, `#d4af37`, `#8B2332`, `bg-instagram-gradient`, `shadow-card` dourado).
3. `lib/theme.ts`: remover `goldText`, `outlineGoldButtonClass`, o `heroOverlayDefault` legado e `ministryNameGlow`; renomear `OutlineGoldLink` → `OutlineLink` e atualizar os imports.
4. `specs/tests/checklist.json`: remover `legacy-visual-opt-in`; versão `2.6.0-snapshot`.
5. `CHANGELOG.md` (novo, raiz): entradas de `2.0.0-snapshot` a `2.6.0-snapshot`, com link para cada spec.

## Rotas desta versão

As mesmas 15 rotas da 1.1.0, todas no visual v2 e em folha única. Nenhuma rota, pasta ou redirect novo.

## QA total (local + preview)

- [ ] `npm ci` limpo, `npm run test:specs`, `npm run test:video`, `npm run lint`, `npm run build`, `CI=1 npm run test:e2e`
- [ ] Percurso manual: Home → Títulos → os 10 títulos (Próximo até Fátima, Anterior até Auxiliadora) → Voltar → Ministérios → DEA Ajuda → Perseverança → Voltar → Início
- [ ] Screenshots em 1440 e 390 px das 15 rotas, comparados com os conceitos aprovados; cada página com **uma só folha** de conteúdo
- [ ] Lighthouse local nas 15 rotas, mobile e desktop: Acessibilidade ≥ 95, SEO ≥ 95, Performance sem queda maior que 5 pontos frente à 1.1.0
- [ ] `rg -n "#[0-9a-fA-F]{3,8}\b" components app lib --glob '!app/globals.css'` sem resultados
- [ ] `rg -n "legado 1.1.0|goldText|ministryNameGlow" .` sem resultados
- [ ] Teclado e leitor de tela: breadcrumb anunciado, desenhos com `aria-hidden`, imagens com `alt`
- [ ] Redirects legados do `vercel.json` funcionando no preview (`/imagens`, `/dea-ajuda`, `/nossa-senhora-auxiliadora`)
- [ ] Nenhum workflow em `.github/workflows/`

## Correções (PATCH)

Cada correção publicada depois desta versão incrementa o PATCH: `2.6.1-snapshot`, `2.6.2-snapshot`… Cada uma tem commit `Versão 2.6.N-snapshot`, tag `v2.6.N-snapshot` e pre-release no GitHub, e é registrada nesta seção (sem spec novo). Em cada correção, `contentVersion` (e `package.json`/`checklist.version`) passam a `2.6.N-snapshot`; `specFile` continua `spec-2.6.0-snapshot.md`. A mesma regra vale para correções de qualquer snapshot anterior (ex.: `2.1.1-snapshot`).

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.6.0-snapshot"`, `specFile: "spec-2.6.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.6.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.6.0-snapshot"` |
| Commit | `Versão 2.6.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.6.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.6.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.6.1-snapshot`, `2.6.2-snapshot`… (mesmo spec, seção “Correções”) |

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Mudanças visuais novas (se surgir alguma, é correção `2.6.x-snapshot` aprovada pelo Michel)

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.6.0-snapshot).
