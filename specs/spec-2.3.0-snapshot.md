# CorpusCriste — Spec v2.3.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 4 de 7 da v2 · tamanho M

## Resumo

Aplica o padrão v2c (folha única, post-its, tachinhas, rabiscos, figurinhas religiosas, fita adesiva, polaroid, carimbos e marca-texto) em Nossa Senhora da Comunicação, Nossa Senhora das Dores, Nossa Senhora de Fátima, com breadcrumb e navegação de fluxo. Mesmo conteúdo, mesmas seções e mesma ordem da 1.1.0. Não cria componentes novos: só usa a biblioteca da Exec 1.

## Entregas

1. `specs/decor/nossa-senhora-da-comunicacao.json`, `nossa-senhora-das-dores.json`, `nossa-senhora-de-fatima.json`.
2. `specs/content/nossa-senhora-da-comunicacao.json`, `specs/content/nossa-senhora-das-dores.json`, `specs/content/nossa-senhora-de-fatima.json` — remove só o campo opcional `hero.overlay`.
3. Comunicação tem `hero.quote` com quebras de linha (`\n`): o hero v2 preserva as quebras (`white-space: pre-line`).
4. Das Dores: tom mais sóbrio (sem brilhinhos no hero; estrela + gota).
5. Fecha a seção: os 10 títulos e a listagem no visual v2; o fluxo anterior/próximo percorre Auxiliadora → … → Fátima sem pular nenhum.

## Rotas desta versão

| Rota | Template | Arquivo de decoração |
|------|----------|----------------------|
| `/titulos-nossa-senhora/nossa-senhora-da-comunicacao` | ContentPageTemplate compact | `specs/decor/nossa-senhora-da-comunicacao.json` |
| `/titulos-nossa-senhora/nossa-senhora-das-dores` | ContentPageTemplate compact | `specs/decor/nossa-senhora-das-dores.json` |
| `/titulos-nossa-senhora/nossa-senhora-de-fatima` | ContentPageTemplate compact | `specs/decor/nossa-senhora-de-fatima.json` |

## Decoração por página

Todas as frases abaixo existem, letra por letra, no `specs/content/{slug}.json` da própria página (validado por `validateDecor`). Todo título de seção ganha sublinhado rabiscado em Azul Céu; a coluna “Título” mostra só o desenho extra.

**`specs/decor/nossa-senhora-da-comunicacao.json`** · rota `/titulos-nossa-senhora/nossa-senhora-da-comunicacao`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora da Comunicação | — | desenhos brilhinhos, estrela; sublinhado à mão em “Comunicação” |
| `sections[0]` | Quem é Nossa Senhora da Comunicação? | marca-texto em “escutar, acolher e transmitir a verdade com amor” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Inspiração para quem comunica a fé” |
| `sections[1]` | Origem da Devoção | marca-texto em “a imagem permaneceu de pé” | Post-it areia com tachinha Azul Manto: **Itatiaia (MG)** · “salesianos” |
| `sections[2]` | Modelo para quem comunica + estrela | marca-texto em “da palavra, da música, das imagens” | Bilhete Gochi Hand “responsabilidade, verdade e amor” + brilhinhos |
| `sections[3]` | Mensagem para Hoje | marca-texto em “instrumentos de luz, esperança e paz” | Figurinha: pomba presa com fita<br>Carimbo circular Azul Manto “Nossa Senhora da Comunicação · rogai por nós” · centro: cruz |

**`specs/decor/nossa-senhora-das-dores.json`** · rota `/titulos-nossa-senhora/nossa-senhora-das-dores`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora das Dores | — | desenhos estrela, gota; sublinhado à mão em “Dores” |
| `sections[0]` | Os sofrimentos de Maria | círculo à mão em “sete adagas” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Mater Dolorosa”<br>Figurinha: coração com chama |
| `sections[1]` | Origem da devoção | círculo à mão em “15 de setembro” | Post-it areia com tachinha Azul Manto: **século XIII** · “Ordem dos Servos de Maria” |
| `sections[2]` | Promessas | marca-texto em “promessas de Maria” | Figurinha: lírio (Maria) presa com fita |
| `sections[3]` | O terço de Nossa Senhora das Dores + terço | marca-texto em “rosário das sete dores” | Carimbo circular Azul Manto “Mater Dolorosa · sete dores” · centro: cruz<br>Bilhete Gochi Hand “um Pai-Nosso e sete Ave-Marias” |

**`specs/decor/nossa-senhora-de-fatima.json`** · rota `/titulos-nossa-senhora/nossa-senhora-de-fatima`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora de Fátima | — | desenhos brilhinhos, estrela; sublinhado à mão em “Fátima” |
| `sections[0]` | O Milagre do Sol (13 de outubro de 1917) + raios | marca-texto em “ver o Sol girar” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Milagre do Sol”<br>Post-it areia com tachinha Azul Manto: **1917** · “após uma forte chuva” |
| `sections[1]` | Os três pastorinhos | marca-texto em “Lúcia dos Santos, Francisco Marto e Jacinta Marto” | Figurinha: estrela presa com fita |
| `sections[2]` | Os ensinamentos de Fátima + terço | marca-texto em “a oração do rosário” | Bilhete Gochi Hand “amor, paz e esperança” + coração com chama |
| `sections[3]` | Contexto histórico (1917) | marca-texto em “uma mensagem de esperança” | Carimbo circular Azul Manto “Fátima · 13 de outubro” · centro “1917” |

## Navegação de fluxo

Breadcrumb no topo (abaixo do menu) e bloco `SectionFlowNav` no fim da página, na ordem dos cards da listagem. Sem volta circular: o primeiro título não tem “Anterior” e o último não tem “Próximo”.

| Página | Breadcrumb | ← Anterior | Voltar | Próximo → |
|---|---|---|---|---|
| Nossa Senhora da Comunicação | Início › Títulos de Nossa Senhora › Nossa Senhora da Comunicação | Nossa Senhora das Graças | Títulos de Nossa Senhora | Nossa Senhora das Dores |
| Nossa Senhora das Dores | Início › Títulos de Nossa Senhora › Nossa Senhora das Dores | Nossa Senhora da Comunicação | Títulos de Nossa Senhora | Nossa Senhora de Fátima |
| Nossa Senhora de Fátima | Início › Títulos de Nossa Senhora › Nossa Senhora de Fátima | Nossa Senhora das Dores | Títulos de Nossa Senhora | — |

## Testes

- `titulos-v2-visual.spec.ts` e `navigation-flow.spec.ts` cobrem as 3 rotas novas.
- Teste de percurso: começa em Auxiliadora e clica “Próximo” 9 vezes até Fátima; depois volta com “Anterior” até Auxiliadora.
- `npm run test:specs` com os novos `specs/decor/*.json`.

## Critérios de aceite

1. Cada página tem 1 a 2 detalhes por seção, nas bordas, sem cobrir texto em 1440 e 390 px.
2. Todas as frases dos bilhetes, post-its, carimbos e legendas estão no JSON da página (`test:specs` verde).
3. No máximo 1 tachinha vermelha por página; nenhum outro uso de vermelho além da margem da citação.
4. Breadcrumb e fluxo anterior/voltar/próximo corretos (tabela acima).
5. Nenhuma página da seção Títulos ainda no visual 1.1.0.

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
| `specs/version.json` | `contentVersion: "2.3.0-snapshot"`, `specFile: "spec-2.3.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.3.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.3.0-snapshot"` |
| Commit | `Versão 2.3.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.3.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.3.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.3.1-snapshot`, `2.3.2-snapshot`… (mesmo spec, seção “Correções”) |

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Componentes decorativos novos (se faltar algum, abrir pedido para a fundação, não criar variação local)

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.3.0-snapshot).
