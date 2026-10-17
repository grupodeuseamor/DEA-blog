# CorpusCriste — Guia de engenharia (agentes)

Documento de contexto para implementações técnicas. **Não alterar o resultado visual** sem aprovação explícita. A partir da `2.0.0-snapshot` o resultado visual aprovado é o **v2 (Caderno + Novo Lote)** — ver `AGENTS.md` e `.cursor/rules/corpus-criste-design-v2.mdc`.

## Princípios

1. **Conteúdo em JSON** (`specs/content/*.json`) — textos, rotas de listagem, hero.
2. **UI em componentes** — `components/ui` (primitivos), `components/content` (templates), `components/layout`, `components/ministry-landing` (ministérios custom).
3. **`page.tsx` fino** — `loadContent` + template; sem JSX de seções.

## Hierarquia de pastas

```
components/ui/          → primitivos reutilizáveis (BackgroundImageLayer, CtaButtonGroup, …)
components/content/   → templates e renderers de specs
components/layout/    → PageShell, Navbar, Footer
components/ministry-landing/ → DEA Ajuda e Perseverança (layout 7 seções)
components/decor/     → v2: desenhos SVG à mão e componentes decorativos (Polaroid, PostIt, Stamp…)
components/navigation/ → v2: Breadcrumb e SectionFlowNav
lib/theme.ts          → classes compostas (cn) sobre os tokens do @theme
lib/specs/            → tipos, loader, nav (breadcrumb/fluxo), decor (schema + validação)
```

## Server vs Client

| Usar `'use client'` | Manter Server Component |
|---------------------|-------------------------|
| Navbar (menu mobile, pathname) | ContentPageTemplate, HeroSection |
| — | HeroBackgroundCarousel (CSS puro, sem estado) |
| — | SectionRenderer, ListingPageTemplate |

**Regra:** adicionar client apenas quando houver estado, efeitos ou hooks de navegação.

## O que NÃO fazer

- Colocar hero, cards ou CTAs inline em `app/**/page.tsx` (exceto orquestrar páginas ministry-landing).
- Hardcodar link para DEA Ajuda em componentes genéricos (`SectionRenderer`, `Footer` de conteúdo).
- Introduzir cores fora dos tokens do `@theme` em `app/globals.css` (nada de `text-[#…]`, `style={{ color }}` ou hex em JSON).
- Usar o vermelho `coracao` fora de acento (margem da citação, 1 tachinha por página, selo especial).
- Escrever texto novo em bilhetes, post-its, carimbos ou legendas: só frases do JSON de conteúdo (`lib/specs/decor.ts` valida).
- Criar rotas, pastas, rota dinâmica `[slug]` ou redirects durante a v2.
- Adicionar GitHub Actions.
- Converter DEA Ajuda ou Perseverança para `ContentPageTemplate` — usam ministry-landing.
- `style={{ backgroundImage: … }}` em páginas — usar `BackgroundImageLayer`.
- Gradiente Instagram inline — usar classe `bg-instagram-gradient` em `globals.css`.
- Adicionar componentes shadcn/ui não usados (ex.: select removido em v0.1.0).

## O que fazer

- Novos CTAs: estender schema em `lib/specs/types.ts` + `CtaButtonGroup` / `OutlineGoldLink` / `InstagramCtaButton`.
- Fundos: `BackgroundImageLayer` + `GradientOverlay` quando houver overlay JSON.
- Carrossel Home: `backgroundImages` no hero JSON; `HeroBackgroundCarousel` (CSS, sem `setInterval`).
- Imagens hero: `priority` só na primeira slide; demais lazy via Next/Image.
- Preservar `data-testid` existentes ao refatorar.
- Validar: `npm run test:specs`, `npm run build`, `CI=1 npm run test:e2e`.

## Tokens v2 (`app/globals.css` → `@theme inline`)

- Cores: `manto`, `ceu`, `areia`, `tinta`, `papel`, `noite`, `coracao` → classes `bg-*`, `text-*`, `border-*`.
- Fontes: `font-titulo` (Fraunces), `font-corpo` (Jost), `font-mao` (Gochi Hand), `font-leitura` (Newsreader).
- Overlay de hero: `--overlay-hero`. Texturas: `.textura-papel`, `.margem-caderno`, `.pautado`.
- Decoração por página: `specs/decor/{slug}.json` + `loadDecor(slug)`; desenhos via `<Drawing name="…" />`.

## Tokens legados (`lib/theme.ts`, removidos na Exec 7, `2.6.0-snapshot`)

- `goldText`, `surfaceCardDefault`, `heroOverlayDefault`, `outlineGoldButtonClass`, `navLinkClass`, etc.
- Sombras: classe `shadow-card` em `globals.css` (equivalente ao box-shadow dos cards).

## Ministry landing (DEA Ajuda, Perseverança)

- Rotas: `/ministerios/dea-ajuda`, `/ministerios/perseveranca`
- Componentes: `components/ministry-landing/MinistryLanding*.tsx`
- Schema: `ministryLandingContentSchema` em `lib/specs/types.ts`
- `page.tsx` apenas compõe seções — não duplicar markup na page.
- Hero: título com brilho dourado (`ministryNameGlow`); sem badge circular.
- Vídeo: opcional no JSON (DEA Ajuda sim; Perseverança não). Campo `video.url` (YouTube ou Google Drive); render com `RemoteVideoEmbed` em `MinistryLandingVideo`. Ver `.cursor/rules/corpus-criste-videos.mdc`.

## Novas páginas de conteúdo

Seguir `.cursor/rules/corpus-criste-pages.mdc` e `corpus-criste-versions.mdc` (releases `0.0.x`).

## Versionamento

- `0.0.x` — páginas de conteúdo
- `0.1.0+` — marcos de engenharia/refatoração (ver `spec-0.1.0.md`)
- `2.N.0-snapshot` — execuções do novo visual (feature = MINOR, pre-release; Exec 1 `2.0.0-snapshot` … Exec 7 `2.6.0-snapshot`); correções = PATCH (`2.6.1-snapshot`…); oficial `2.7.0` (merge em `main`, tag `v2.7.0`, Release Latest)

Referência ativa: `specs/version.json` → `specFile`.
