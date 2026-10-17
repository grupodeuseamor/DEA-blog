# CorpusCriste — Spec v2.2.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 3 de 7 da v2 · tamanho M

## Resumo

Aplica o padrão v2c (folha única, post-its, tachinhas, rabiscos, figurinhas religiosas, fita adesiva, polaroid, carimbos e marca-texto) em Nossa Senhora de Lourdes, Nossa Senhora de Guadalupe, Nossa Senhora das Graças, com breadcrumb e navegação de fluxo. Mesmo conteúdo, mesmas seções e mesma ordem da 1.1.0. Não cria componentes novos: só usa a biblioteca da Exec 1.

## Entregas

1. `specs/decor/nossa-senhora-lourdes.json`, `nossa-senhora-guadalupe.json`, `nossa-senhora-das-gracas.json`.
2. `specs/content/nossa-senhora-lourdes.json`, `specs/content/nossa-senhora-guadalupe.json`, `specs/content/nossa-senhora-das-gracas.json` — remove só o campo opcional `hero.overlay`.
3. Graças tem 6 seções curtas: as laterais alternam polaroid / post-it / carimbo para não repetir o mesmo detalhe em sequência.

## Rotas desta versão

| Rota | Template | Arquivo de decoração |
|------|----------|----------------------|
| `/titulos-nossa-senhora/nossa-senhora-lourdes` | ContentPageTemplate compact | `specs/decor/nossa-senhora-lourdes.json` |
| `/titulos-nossa-senhora/nossa-senhora-guadalupe` | ContentPageTemplate compact | `specs/decor/nossa-senhora-guadalupe.json` |
| `/titulos-nossa-senhora/nossa-senhora-das-gracas` | ContentPageTemplate compact | `specs/decor/nossa-senhora-das-gracas.json` |

## Decoração por página

Todas as frases abaixo existem, letra por letra, no `specs/content/{slug}.json` da própria página (validado por `validateDecor`). Todo título de seção ganha sublinhado rabiscado em Azul Céu; a coluna “Título” mostra só o desenho extra.

**`specs/decor/nossa-senhora-lourdes.json`** · rota `/titulos-nossa-senhora/nossa-senhora-lourdes`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora de Lourdes | — | desenhos brilhinhos, estrela; sublinhado à mão em “Lourdes” |
| `sections[0]` | Bernadette e a gruta | marca-texto em “Sou a Imaculada Conceição” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “gruta de Massabielle”<br>Post-it areia com tachinha Azul Manto: **1858** · “Santa Bernadette Soubirous” |
| `sections[1]` | Dezoito aparições e a fonte milagrosa + gota | círculo à mão em “18 vezes” | Bilhete Gochi Hand “uma fonte brotou da terra” + onda |
| `sections[2]` | Mensagem de Lourdes | marca-texto em “Deus escolhe os pequenos” | Figurinha: lírio (Maria) presa com fita<br>Carimbo circular Azul Manto “Imaculada Conceição · Lourdes” · centro “1858” |

**`specs/decor/nossa-senhora-guadalupe.json`** · rota `/titulos-nossa-senhora/nossa-senhora-guadalupe`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora de Guadalupe | — | desenhos brilhinhos, estrela; sublinhado à mão em “Guadalupe” |
| `sections[0]` | A Mãe que veio ao encontro dos povos da América | marca-texto em “colina de Tepeyac” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Padroeira da América Latina”<br>Post-it areia com tachinha Azul Manto: **1531** · “Juan Diego” |
| `sections[1]` | O sinal das rosas + brilhinhos | marca-texto em “belas rosas castelhanas” | Bilhete Gochi Hand “flores no alto do monte” + seta |
| `sections[2]` | A imagem milagrosa | círculo à mão em “fibras de cacto” | Figurinha: estrela presa com fita<br>Bilhete Gochi Hand “quase cinco séculos” |
| `sections[3]` | Padroeira da América Latina | marca-texto em “Padroeira de toda a América” | Post-it areia com tachinha **vermelha**: **1945** · “Papa Pio XII” |
| `sections[4]` | Uma mensagem que permanece atual + coração com chama | marca-texto em “ninguém está sozinho” | Carimbo circular Azul Manto “Padroeira da América Latina · 12 de dezembro” · centro “1531” |

**`specs/decor/nossa-senhora-das-gracas.json`** · rota `/titulos-nossa-senhora/nossa-senhora-das-gracas`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora das Graças | — | desenhos brilhinhos, estrela; sublinhado à mão em “Graças” |
| `sections[0]` | A devoção e as três aparições | círculo à mão em “três aparições” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Filhas da Caridade” |
| `sections[1]` | Primeira aparição | — | Post-it areia com tachinha Azul Manto: **1830** · “18 para 19 de julho” |
| `sections[2]` | Segunda aparição + brilhinhos | marca-texto em “Medalha Milagrosa” | Bilhete Gochi Hand “raios brilhantes de luz” + seta |
| `sections[3]` | A Medalha Milagrosa | marca-texto em “cunhada, em Paris” | Carimbo circular Azul Manto “Medalha Milagrosa · Paris” · centro “1830” |
| `sections[4]` | Terceira aparição | marca-texto em “distribuída a todos” | Figurinha: vela presa com fita |
| `sections[5]` | Dogma e festa | marca-texto em “dogma da Imaculada Conceição” | Post-it de datas com tachinha **vermelha**: **1854** “Papa Pio IX”; **27 de novembro** “festa em homenagem a Nossa Senhora das Graças” |

## Navegação de fluxo

Breadcrumb no topo (abaixo do menu) e bloco `SectionFlowNav` no fim da página, na ordem dos cards da listagem. Sem volta circular: o primeiro título não tem “Anterior” e o último não tem “Próximo”.

| Página | Breadcrumb | ← Anterior | Voltar | Próximo → |
|---|---|---|---|---|
| Nossa Senhora de Lourdes | Início › Títulos de Nossa Senhora › Nossa Senhora de Lourdes | Nossa Senhora de La Salette | Títulos de Nossa Senhora | Nossa Senhora de Guadalupe |
| Nossa Senhora de Guadalupe | Início › Títulos de Nossa Senhora › Nossa Senhora de Guadalupe | Nossa Senhora de Lourdes | Títulos de Nossa Senhora | Nossa Senhora das Graças |
| Nossa Senhora das Graças | Início › Títulos de Nossa Senhora › Nossa Senhora das Graças | Nossa Senhora de Guadalupe | Títulos de Nossa Senhora | Nossa Senhora da Comunicação |

## Testes

- `navigation-flow.spec.ts` cobre as 3 rotas novas automaticamente.
- `specs/tests/e2e/titulos-v2-visual.spec.ts` (novo, parametrizado por `specs/decor/nossa-senhora-*.json`) — seções na ordem do JSON, sem scroll horizontal em 390 px, `[data-decor]` sem interseção com `p`/`h2`.
- `npm run test:specs` com os novos `specs/decor/*.json`.

## Critérios de aceite

1. Cada página tem 1 a 2 detalhes por seção, nas bordas, sem cobrir texto em 1440 e 390 px.
2. Todas as frases dos bilhetes, post-its, carimbos e legendas estão no JSON da página (`test:specs` verde).
3. No máximo 1 tachinha vermelha por página; nenhum outro uso de vermelho além da margem da citação.
4. Breadcrumb e fluxo anterior/voltar/próximo corretos (tabela acima).

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

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.2.0-snapshot"`, `specFile: "spec-2.2.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.2.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.2.0-snapshot"` |
| Commit | `Versão 2.2.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.2.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.2.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.2.1-snapshot`, `2.2.2-snapshot`… (mesmo spec, seção “Correções”) |

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Componentes decorativos novos (se faltar algum, abrir pedido para a fundação, não criar variação local)

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.2.0-snapshot).
