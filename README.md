# CorpusCriste — Grupo Deus É Amor

Site institucional do Grupo Deus É Amor, construído com **Next.js 16**, **React 19** e **Tailwind CSS 4**. O conteúdo e os testes são versionados na pasta `specs/`.

**Versão atual do conteúdo:** `2.5.0-snapshot` (pre-release, preview da branch `v2`) — ver [`specs/spec-2.5.0-snapshot.md`](specs/spec-2.5.0-snapshot.md) e o [`CHANGELOG.md`](CHANGELOG.md).
**Produção:** `1.1.0` (release `v1.1.0`, ponto de rollback) até a publicação oficial da `2.7.0`.

Guia para IAs e novos colaboradores: [`AGENTS.md`](AGENTS.md).

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home — Grupo Deus É Amor |
| `/titulos-nossa-senhora` | Títulos de Nossa Senhora — listagem de devoções |
| `/titulos-nossa-senhora/nossa-senhora-auxiliadora` | Nossa Senhora Auxiliadora |
| `/titulos-nossa-senhora/nossa-senhora-medjugorje` | Nossa Senhora em Medjugorje |
| `/titulos-nossa-senhora/nossa-senhora-aparecida` | Nossa Senhora Aparecida |
| `/titulos-nossa-senhora/nossa-senhora-la-salette` | Nossa Senhora de La Salette |
| `/titulos-nossa-senhora/nossa-senhora-lourdes` | Nossa Senhora de Lourdes |
| `/titulos-nossa-senhora/nossa-senhora-guadalupe` | Nossa Senhora de Guadalupe |
| `/titulos-nossa-senhora/nossa-senhora-das-gracas` | Nossa Senhora das Graças |
| `/titulos-nossa-senhora/nossa-senhora-da-comunicacao` | Nossa Senhora da Comunicação |
| `/titulos-nossa-senhora/nossa-senhora-das-dores` | Nossa Senhora das Dores |
| `/titulos-nossa-senhora/nossa-senhora-de-fatima` | Nossa Senhora de Fátima |
| `/ministerios` | Lista de ministérios |
| `/ministerios/dea-ajuda` | Ministério DEA Ajuda (layout ministry-landing) |
| `/ministerios/perseveranca` | Ministério Perseverança (layout ministry-landing) |

**Total:** 15 páginas de produção.

A navegação é feita pela **navbar horizontal** (mesmas opções na v2, só com estilo novo) com dropdowns em Títulos de Nossa Senhora e Ministérios (menu expansível no mobile). As rotas da navbar vêm de [`specs/routes.json`](specs/routes.json).

Na v2, toda página interna tem **breadcrumb** (Início › Seção › Página) e, no fim, **Anterior · Voltar para a listagem · Próximo**, na ordem dos cards da listagem (`.cursor/rules/corpus-criste-navigation.mdc`). A v2 não cria nem renomeia rotas.

**Redirects legados** ([`vercel.json`](vercel.json)):

| Origem | Destino |
|--------|---------|
| `/imagens`, `/imagens/*` | `/titulos-nossa-senhora` e filhos |
| `/dea-ajuda` | `/ministerios/dea-ajuda` |
| `/nossa-senhora-auxiliadora` | `/titulos-nossa-senhora/nossa-senhora-auxiliadora` |

## Nova página de conteúdo

Não há páginas-modelo públicas no site. Para agentes e desenvolvedores:

- Exemplo copiável: [`.cursor/examples/content-page/`](.cursor/examples/content-page/)
- Referência em produção: [`specs/content/nossa-senhora-de-fatima.json`](specs/content/nossa-senhora-de-fatima.json)
- Componentes: `ContentPageTemplate`, `ListingPageTemplate`, `PageShell`
- Padrões: [`specs/CORPUS-CRISTE-ENGINEERING.md`](specs/CORPUS-CRISTE-ENGINEERING.md)

**Exceções** (não usar o exemplo genérico): DEA Ajuda e Perseverança usam `components/ministry-landing/`. Carrossel no hero: `.cursor/rules/corpus-criste-carousels.mdc`.

## Versionamento

Política em [`.cursor/rules/corpus-criste-versions.mdc`](.cursor/rules/corpus-criste-versions.mdc). Releases `0.0.x` / `0.1.x` adicionaram páginas e melhorias; **1.0.0** consolida o conjunto publicado e remove modelos do site. A **v2** (novo visual) é entregue em 7 execuções; cada uma é uma feature que incrementa a MINOR: `2.0.0-snapshot` … `2.6.0-snapshot` (GitHub pre-release + preview da branch `v2`). Correções incrementam o PATCH (`2.6.1-snapshot`…). A versão oficial é a **2.7.0** (merge em `main`, tag `v2.7.0`, Release Latest).

| Versão | Entrega |
|--------|---------|
| 0.0.0 | Templates públicos, navbar horizontal |
| 0.0.1 | Nossa Senhora em Medjugorje |
| 0.0.2 | Nossa Senhora Aparecida |
| 0.0.3 | Perseverança, La Salette, Lourdes |
| 0.0.4 | Nossa Senhora de Guadalupe |
| 0.0.5 | Home (vitrine) + rodapé |
| 0.1.0 | Revisão técnica (componentes, tokens, docs) |
| 0.1.1 | Perseverança em ministry-landing |
| 0.1.2 | Rodapé (Humildade) + Nossa Senhora das Graças |
| 0.1.3 | Nossa Senhora da Comunicação |
| 0.1.4 | Nossa Senhora das Dores |
| 0.1.5 | Carrossel no hero do DEA Ajuda |
| 0.1.6 | Nossa Senhora de Fátima |
| **1.0.0** | **Versão completa** — 15 rotas; modelos só em `.cursor/examples/` |
| 1.0.1 | Scroll invisível no menu quando a lista não cabe na tela |
| 1.1.0 | Vídeo por URL (YouTube / Google Drive) na seção DEA Ajuda — **ponto de rollback** |
| 2.0.0-snapshot | *pre-release* — Exec 1: fundação v2 (Caderno + Novo Lote, folha única) + piloto Aparecida |
| 2.0.1-snapshot | *pre-release* — ajuste da Exec 1: reaproveitamento opcional de imagens + foto colada na Aparecida |
| 2.1.0-snapshot | *pre-release* — Exec 2: listagem Títulos + Auxiliadora, Medjugorje, La Salette |
| 2.2.0-snapshot | *pre-release* — Exec 3: Lourdes, Guadalupe, Graças |
| 2.3.0-snapshot | *pre-release* — Exec 4: Comunicação, Dores, Fátima (fecha Títulos) |
| 2.4.0-snapshot | *pre-release* — Exec 5: Ministérios (listagem), DEA Ajuda, Perseverança |
| 2.5.0-snapshot | *pre-release* — Exec 6: Home (+ botão preview Ministérios) |

## Estrutura de specs

```
specs/
├── version.json          # versão semver do conteúdo + specFile
├── spec-2.0.0-snapshot.md    # release notes da versão atual (pre-release)
├── spec-1.1.0.md
├── spec-1.0.1.md
├── spec-1.0.0.md
├── spec-0.1.6.md …       # histórico de releases
├── spec-0.0.0.md         # baseline
├── CORPUS-CRISTE-ENGINEERING.md
├── routes.json           # rotas da navbar (parent = dropdown)
├── content/              # textos e dados das páginas
├── decor/                # v2: decoração por página (só frases do conteúdo)
└── tests/
    ├── checklist.json
    └── e2e/              # Playwright
```

## Regras Cursor

Agentes devem seguir [`.cursor/rules/`](.cursor/rules/):

- `corpus-criste-base.mdc` — padrões gerais (always apply)
- `corpus-criste-design-v2.mdc` — tokens, fontes, desenhos e decoração v2 (always apply)
- `corpus-criste-navigation.mdc` — breadcrumb e navegação de fluxo
- `corpus-criste-pages.mdc` — criação de páginas
- `corpus-criste-carousels.mdc` — carrossel no hero (CSS)
- `corpus-criste-videos.mdc` — vídeo por URL (YouTube / Google Drive)
- `corpus-criste-deploy.mdc` — rotas e deploy Vercel
- `corpus-criste-versions.mdc` — política de versionamento

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run test:specs` | Valida JSONs em `specs/` com Zod (inclui `specs/decor/`) |
| `npm run test:video` | Testes do parser de URLs de vídeo |
| `npm run test:e2e` | Testes end-to-end (Playwright) |

## Deploy na Vercel

1. Faça push deste repositório para o GitHub.
2. Em [vercel.com](https://vercel.com), importe o repositório.
3. Framework Preset: **Next.js** (detecção automática).
4. Build Command: `npm run build`
5. Output Directory: `.next` (padrão)
6. Clique em **Deploy**.

O arquivo [`vercel.json`](vercel.json) inclui redirects de URLs legadas.

**Sem GitHub Actions** (a conta está no limite gratuito): testes e build rodam localmente antes do push; a Vercel faz o deploy pela integração Git. A branch `v2` gera *Preview Deployments* automáticos para revisar os snapshots; `main` é produção.

## Identidade visual (v2 — Caderno + Novo Lote)

| Token | Cor | Uso |
|-------|-----|-----|
| `manto` | #00479F | cor principal |
| `ceu` | #84ADBD | desenhos e sublinhados |
| `areia` | #E7E0CA | post-its, texto sobre azul |
| `tinta` | #000 | texto |
| `papel` | #F6F2E7 | fundo |
| `noite` | #0B2550 | rodapé, overlay do hero |
| `coracao` | #C8372D | só acentos (margem da citação, 1 tachinha por página) |

- Tipografia: Fraunces (títulos), Jost (corpo), Gochi Hand (bilhetes), Newsreader (citações)
- Desenhos à mão em SVG (`components/decor/`), polaroid com fita, post-its, carimbos, marca-texto
- Cores só pelos tokens de `app/globals.css`; nunca em classes ou `style`
- Páginas ainda não migradas mantêm o visual 1.1.0 (fundo `#0f0f12`, dourado `#d4af37`) até a 2.0.0

## Licença

© 2026 Grupo Deus É Amor. Todos os direitos reservados.
