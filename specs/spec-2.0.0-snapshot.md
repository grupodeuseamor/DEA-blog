# CorpusCriste — Spec v2.0.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 1 de 7 da v2 · tamanho G

## Resumo

Primeira entrega da v2 (direção **Caderno + Novo Lote**, design doc v3 aprovado). Cria a **fundação visual** reutilizável (tokens no `@theme`, fontes, biblioteca de desenhos SVG à mão, componentes decorativos, breadcrumb, navegação de fluxo, menu e rodapé no estilo novo) e aplica tudo na página-piloto **Nossa Senhora Aparecida**, recriada fielmente a partir do piloto **v2c** aprovado pelo Michel (v2b + texto contínuo numa folha única). Rotas, pastas, menu e textos continuam os mesmos da 1.1.0.

Esta versão é um **snapshot**: só vai para o preview da branch `v2`. A produção continua na 1.1.0.

## Estratégia de migração por página (opt-in)

Uma página entra no visual v2 quando ganha o arquivo `specs/decor/{slug}.json`. Os templates verificam `loadDecor(slug)`:

- com decoração → layout v2 (hero v2, **folha única** de papel com todas as seções, breadcrumb, fluxo, desenhos);
- sem decoração → layout 1.1.0 inalterado (tokens legados preservados até a Exec 7, `2.6.0-snapshot`).

## Regra de layout: texto contínuo numa folha única

Feedback do engenheiro de requisitos, aprovado pelo Michel: **todas as seções de conteúdo da página ficam numa única folha creme (`PaperSheet`), grande e contínua**. Não existe mais um card por seção.

- Dentro da folha, as seções são divididas só pelos **títulos azuis (Fraunces, Azul Manto) com sublinhado rabiscado em Azul Céu**, e entre uma seção e outra cabe **no máximo um respiro ou um rabisco** (`SectionBreak`: onda curta em Azul Céu). O fundo da folha nunca é interrompido.
- A seção de destaque (`variant: "highlight"`, antes um card Areia) **entra na folha** como um **bloco destacado interno** (fundo Areia, cantos arredondados, sangrando levemente nas margens da folha). Não é um card separado.
- Os detalhes decorativos (polaroid, post-its, carimbos, figurinhas, bilhetes) ficam **nas margens da folha**: a coluna lateral direita no desktop; no mobile, abaixo do texto de cada seção, dentro da folha.
- Duas tiras de fita adesiva prendem a folha no topo. A folha não usa textura de grão (o grão fica só no fundo da página, no hero e nos post-its).
- Fluxo (anterior/voltar/próximo) e rodapé ficam **fora** da folha.

O menu (`Navbar`, `NavDropdown`) e o rodapé (`Footer`) são globais e já mudam de estilo nesta execução, com as **mesmas opções e dropdowns** de `specs/routes.json`.

## Entregas

### Fundação de design

1. `app/globals.css` — `@theme inline` com os tokens únicos da v2: `--color-manto` #00479F, `--color-ceu` #84ADBD, `--color-areia` #E7E0CA, `--color-tinta` #000, `--color-papel` #F6F2E7, `--color-noite` #0B2550, `--color-coracao` #C8372D; `--font-titulo`, `--font-corpo`, `--font-mao`, `--font-leitura`; texturas `.textura-papel` (grão leve), `.margem-caderno` (linha vermelha) e `.pautado` (só bilhetes); keyframe `brilho` dentro de `@media (prefers-reduced-motion: no-preference)`. As cores legadas (`#0f0f12`, `#d4af37`, `#8B2332`) ficam num bloco `/* legado 1.1.0 — remover na Exec 7, 2.6.0-snapshot */`, sem duplicação.
2. `app/layout.tsx` — `next/font/google`: Fraunces (títulos, eixos SOFT/opsz), Jost (corpo), Gochi Hand (bilhetes), Newsreader (citações longas), expostas como variáveis CSS; `<RoughFilters />` uma vez no `<body>`.
3. `lib/theme.ts` — classes compostas v2 (`paperCard`, `postItBase`, `handNote`, `buttonManto`, `buttonOutlineManto`, `navLinkV2`); helpers legados mantidos até a Exec 7 (`2.6.0-snapshot`).
4. `public/brand/logo-cruz-coracao.svg` — logo provisória Cruz e Coração (traço único, uma cor). Usada no menu e no rodapé via `next/image` com `alt="Grupo Deus É Amor"` (mantém os testes de rodapé).

### Biblioteca de desenhos e componentes decorativos (`components/decor/`)

5. `drawings.ts` — mapa nome → paths SVG do banco do design doc (28 desenhos: brilho, brilhinhos, estrela, respingo, raios, órbita, selo estrelado, coração com chama, chama, pomba, coroa de espinhos, cruz, terço, vela, auréola, lírio, coroa, gota, nuvem, onda, coração, louvor, pregação, sublinhado, círculo, seta, asterisco, aspas).
6. `RoughFilters.tsx` — `<svg>` oculto com os filtros `#rough` (traço à mão: `feTurbulence` + `feDisplacementMap`) e `#stamp` (tinta de carimbo).
7. `Drawing.tsx` — `<Drawing name="lirio" tone="manto|ceu|areia" />`, SVG inline, `aria-hidden`, cor via `currentColor` + classe de token (nunca hex).
8. `WashiTape.tsx`, `Pin.tsx` (tachinha; `tone="coracao"` só como acento), `PostIt.tsx`, `PostItDates.tsx`, `Polaroid.tsx` (foto + fita + legenda Gochi Hand), `HandNote.tsx` (bilhete), `Stamp.tsx` (carimbo circular com texto em `textPath`), `Sticker.tsx` (figurinha), `Highlight.tsx` (marca-texto, círculo e sublinhado dentro do parágrafo, por substring exata).
9. `DecorAside.tsx` — renderiza a lateral de um bloco a partir de `specs/decor`; no mobile desce para baixo do texto (nunca por cima).
10. `DrawnTitle.tsx` — título Fraunces com sublinhado rabiscado + desenho opcional (`titleDrawing`).
10a. `PaperSheet.tsx` (folha única creme com as fitas do topo) e `SectionBreak.tsx` (respiro com rabisco entre seções); ver “Regra de layout”.

### Decoração por JSON

11. `lib/specs/decor.ts` — schema Zod (`decorSchema`), `validateDecor(slug)`, `validateAllDecor()` e `loadDecor(slug)`. Regras automáticas: toda frase de bilhete, post-it, carimbo, legenda e marca-texto precisa existir no JSON de conteúdo da página (marca-texto: dentro do próprio bloco); `target` precisa existir; polaroid só com imagem já referenciada no conteúdo; máx. 2 itens laterais e 2 marcas por bloco, 3 desenhos no hero, 1 tachinha vermelha por página.
12. `lib/specs/loader.ts` — `validateAllSpecs()` passa a chamar `validateAllDecor()` e o novo `validateVersionConsistency()`: `contentVersion` no formato `X.Y.Z` ou `X.Y.Z-snapshot` (regex `VERSION_FORMAT`, sem número depois de `-snapshot`), `specFile` existente, `checklist.version` e `package.json` iguais a `contentVersion`. Nenhum schema de conteúdo muda.
13. `specs/decor/nossa-senhora-aparecida.json` — decoração do piloto v2b/v2c (a v2c só muda o layout para folha única; a decoração é a mesma).

### Navegação

14. `lib/specs/nav.ts` — `getBreadcrumb(pathname, routes)` e `getSectionFlow(pathname, routes, listing)`: ordem de anterior/próximo = ordem dos cards em `titulos-nossa-senhora.json` / `ministerios.json` (ignora cards cujo `path` é a própria listagem, como Louvor e Intercessão).
15. `components/navigation/Breadcrumb.tsx` — `<nav aria-label="Você está aqui">` + `<ol>`, `aria-current="page"`, `data-testid="breadcrumb"`. Raiz com o rótulo “Início”.
16. `components/navigation/SectionFlowNav.tsx` — cards “← Anterior”, “Voltar para {listagem}” e “Próximo →” com fita adesiva, `data-testid="section-flow"`, `section-flow-prev|back|next`.
17. `components/layout/Navbar.tsx` e `NavDropdown.tsx` — estilo v2 (papel translúcido, pílula Azul Manto no item ativo, logo nova). Mesmas opções, mesmos `data-testid` (`nav-desktop`, `nav-link-home`, `nav-dropdown-*`, `nav-dropdown-scroll`, `nav-mobile-scroll`).
18. `components/layout/Footer.tsx` — fundo Azul Noite, cruz desenhada (substitui o ícone lucide), pilares Evangelização • Amizade • Humildade • Serviço, easter egg DEA Programadores e copyright mantidos.

### Templates (ramo v2 com opt-in)

19. `components/layout/PageShell.tsx` — prop `variant="v2"` (fundo papel + textura).
19a. `components/content/ContentPageTemplate.tsx` envolve **todas** as seções num único `PaperSheet`, intercaladas por `SectionBreak`; nenhuma seção abre card próprio.
20. `components/content/ContentPageTemplate.tsx` — `const decor = loadDecor(content.slug)`; com decor: `Breadcrumb` + hero v2 + seções v2 + `SectionFlowNav`.
21. `components/content/HeroSection.tsx` — hero v2: foto do JSON com tratamento “azul de carimbo” (overlay do token `--overlay-hero`, não o `hero.overlay` legado), título Fraunces com sublinhado na palavra `hero.underline`, brilhinhos animados (só eles se mexem).
22. `components/content/SectionRenderer.tsx`, `ContentCard.tsx`, `components/ui/ParagraphList.tsx`, `SectionTitle.tsx`, `QuoteDisplay.tsx` — bloco de seção **dentro da folha única** (sem card próprio; o highlight vira bloco Areia interno) com coluna lateral (`DecorAside`), marcas no texto (`Highlight`), citação com margem vermelha de caderno + aspas desenhadas.
23. `specs/content/nossa-senhora-aparecida.json` — remove só o campo opcional de estilo `hero.overlay` (o hero v2 usa o token). Textos e estrutura intactos.

### Documentação e regras

24. `AGENTS.md` (novo, raiz) — guia para qualquer IA: padrões v2, o que mudou e o que não fazer.
25. `.cursor/rules/corpus-criste-design-v2.mdc` (novo, always apply) e `.cursor/rules/corpus-criste-navigation.mdc` (novo).
26. Atualizados: `corpus-criste-base.mdc` (identidade visual v2), `corpus-criste-versions.mdc` (política de snapshots MINOR/PATCH e oficial 2.7.0), `corpus-criste-deploy.mdc` (preview da branch, sem Actions), `corpus-criste-pages.mdc` (coluna de decoração), `corpus-criste-carousels.mdc` (overlay por token), `specs/CORPUS-CRISTE-ENGINEERING.md`, `README.md`.
27. `.cursor/plans/v2.0.0-snapshot_fundação_e_aparecida_*.plan.md`.

## Rotas desta versão

| Rota | Visual |
|------|--------|
| `/titulos-nossa-senhora/nossa-senhora-aparecida` | **v2** (piloto, decoração completa) |
| As outras 14 rotas | 1.1.0 no conteúdo; menu e rodapé já no estilo v2 |

## Decoração por página

Todas as frases abaixo existem, letra por letra, no `specs/content/{slug}.json` da própria página (validado por `validateDecor`). Todo título de seção ganha sublinhado rabiscado em Azul Céu; a coluna “Título” mostra só o desenho extra.

**`specs/decor/nossa-senhora-aparecida.json`** · rota `/titulos-nossa-senhora/nossa-senhora-aparecida`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora Aparecida | — | desenhos brilhinhos, estrela, pomba; sublinhado à mão em “Aparecida” |
| `sections[0]` | Padroeira do Brasil | marca-texto em “Nossa Senhora da Conceição Aparecida” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Nossa Senhora Aparecida”<br>Carimbo circular Azul Manto “Padroeira do Brasil · 12 de outubro” · centro “1717” |
| `sections[1]` | O achado no rio Paraíba do Sul + onda | marca-texto em “Porto do Itaguaçu” | Post-it areia com tachinha Azul Manto: **1717** · “Porto do Itaguaçu”<br>Bilhete Gochi Hand “as redes quase se romperam” + gota |
| `sections[2]` | Uma imagem que fala sem palavras | círculo à mão em “cerca de 36 centímetros”; marca-texto em “mãos unidas em oração” | Figurinha: lírio (Maria) presa com fita<br>Bilhete Gochi Hand “barro cozido · estilo barroco” + seta |
| `sections[3]` | Da devoção popular à Basílica | marca-texto em “o milagre das velas” | Post-it papel com tachinha Azul Manto: **1745** · “mandou erguer uma capela”<br>Figurinha: vela, bilhete “o milagre das velas” |
| `sections[4]` | Rainha do coração brasileiro + coroa (Rainha) | marca-texto em “Rainha” | Post-it de datas com tachinha **vermelha**: **1888** “coroa e manto”; **1904** “coroar a imagem”; **1911** “padroeira oficial”; **1931** “Cuidai do Brasil.”<br>Figurinha: estrela + coração com chama |

## Navegação de fluxo

Breadcrumb no topo (abaixo do menu) e bloco `SectionFlowNav` no fim da página, na ordem dos cards da listagem. Sem volta circular: o primeiro título não tem “Anterior” e o último não tem “Próximo”.

| Página | Breadcrumb | ← Anterior | Voltar | Próximo → |
|---|---|---|---|---|
| Nossa Senhora Aparecida | Início › Títulos de Nossa Senhora › Nossa Senhora Aparecida | Nossa Senhora em Medjugorje | Títulos de Nossa Senhora | Nossa Senhora de La Salette |

## Testes

- `specs/tests/e2e/navigation-flow.spec.ts` (novo) — para cada rota com `specs/decor/{slug}.json`: breadcrumb com os rótulos de `routes.json`; links anterior/voltar/próximo levam às URLs certas; primeiro e último título sem link circular.
- `specs/tests/e2e/aparecida-v2-visual.spec.ts` (novo) — hero v2, exatamente 1 `[data-testid="paper-sheet"]` contendo as 5 seções na ordem do JSON, polaroid, carimbo, post-its, bilhetes; em 390 px `document.scrollingElement.scrollWidth <= 390`; nenhum `[data-decor]` intersecta (bounding box) um `p` ou `h2`.
- `specs/tests/e2e/navigation.spec.ts`, `home-visual.spec.ts`, `dea-ajuda-visual.spec.ts`, `perseveranca-visual.spec.ts` — sem mudança e precisam continuar verdes.
- `npm run test:specs` — passa a validar `specs/decor/`.

## Critérios de aceite

1. A Aparecida no preview bate com `piloto/aparecida-v2c--desktop.png` e `--mobile.png` (mesmas seções, ordem, textos e detalhes; todas as seções numa folha única, highlight como bloco Areia interno).
2. Menu com as mesmas opções e dropdowns da 1.1.0; rodapé com os mesmos elementos.
3. Nenhuma cor hex fora de `app/globals.css`; vermelho só na margem da citação, na tachinha de datas e em selos especiais.
4. As outras 14 páginas renderizam como na 1.1.0 (comparar screenshots com `screens/atual/`).
5. `validate-specs` rejeita um bilhete com frase inventada (teste manual: editar o JSON e rodar `npm run test:specs`).

## QA local

- [ ] `npm run test:specs` (inclui `specs/decor/*.json`: frases só do conteúdo, máx. 1 tachinha vermelha)
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `CI=1 npm run test:e2e` (todos os specs de `specs/tests/e2e/`, não só os novos)
- [ ] `rg -n "#[0-9a-fA-F]{3,8}\b|rgba?\(" components/decor components/navigation specs/decor` sem resultados, e nenhuma cor literal nas linhas adicionadas desta execução (`git diff main -- components app lib ':!app/globals.css' | rg "^\+.*#[0-9a-fA-F]{6}"`); cor só nos tokens de `app/globals.css`
- [ ] Revisão visual em 1440 px e 390 px de cada rota da execução: nenhum desenho cobre texto, sem scroll horizontal
- [ ] `prefers-reduced-motion: reduce` no DevTools: só o brilho animava e agora fica parado
- [ ] Lighthouse local (`npx lighthouse <url> --preset=desktop` e mobile) em cada rota da execução: Acessibilidade ≥ 95, Performance sem queda maior que 5 pontos frente à 1.1.0
- [ ] `git diff --stat main -- app/ specs/routes.json vercel.json` sem pastas/rotas novas e sem redirects novos
- [ ] Preview da branch `v2` na Vercel aberto no celular e aprovado pelo Michel
- [ ] Nenhum workflow em `.github/workflows/` (sem GitHub Actions)
- [ ] Teclado: Tab percorre menu → breadcrumb → conteúdo → fluxo, com foco visível em Azul Manto

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.0.0-snapshot"`, `specFile: "spec-2.0.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.0.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.0.0-snapshot"` |
| Commit | `Versão 2.0.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.0.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.0.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.0.1-snapshot`, `2.0.2-snapshot`… (mesmo spec, seção “Correções”) |

## Decisões registradas nesta versão

- **Botão preview para Ministérios na Home** (Michel): a Home terá um botão que leva para `/ministerios`, marcado como **preview** (experimental, pode ser removido no futuro). Substitui a regra da 0.0.5 “a home não cita ministérios”, que passa a valer com essa **única exceção**. Fica isolado num campo opcional `previewCta` do `specs/content/home.json` (apagar o campo remove o botão). **Não é implementado aqui**: entra na Exec 6 (`spec-2.5.0-snapshot.md`, item 5a). Encerra a pendência D1.

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Outras páginas no visual v2 (Execs 2–6)
- Redesenho definitivo da logo (fica a provisória)

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.0.0-snapshot).
