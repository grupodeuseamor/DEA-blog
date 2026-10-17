# CorpusCriste — Spec v2.1.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 2 de 7 da v2 · tamanho M

## Resumo

Aplica o padrão v2c (folha única, post-its, tachinhas, rabiscos, figurinhas religiosas, fita adesiva, polaroid, carimbos e marca-texto) em Nossa Senhora Auxiliadora, Nossa Senhora em Medjugorje, Nossa Senhora de La Salette e na listagem Títulos de Nossa Senhora, com breadcrumb e navegação de fluxo. Mesmo conteúdo, mesmas seções e mesma ordem da 1.1.0. Não cria componentes novos: só usa a biblioteca da Exec 1.

## Entregas

1. `specs/decor/titulos-nossa-senhora.json`, `nossa-senhora-auxiliadora.json`, `nossa-senhora-medjugorje.json`, `nossa-senhora-la-salette.json`.
2. `components/content/ListingPageTemplate.tsx` e `components/ui/ListingCard.tsx` — ramo v2 com opt-in por `loadDecor`: hero da listagem com bilhete, os 10 cards sobre **uma folha única** (`PaperSheet`, mesma regra das páginas de conteúdo), cada card como ficha presa com fita adesiva e leve rotação alternada, etiqueta de ano extraída da `description` do próprio card (regex de 4 dígitos), figurinha nos cards indicados, link do card inteiro para a página (fluxo listagem → página). Ordem dos cards = ordem do JSON (é também a ordem do anterior/próximo).
3. `specs/content/nossa-senhora-auxiliadora.json`, `specs/content/nossa-senhora-medjugorje.json`, `specs/content/nossa-senhora-la-salette.json` — remove só o campo opcional `hero.overlay`.
4. Medjugorje tem 7 seções: conferir que a lateral não alonga o card (no desktop a coluna lateral é `align-self:start`).

## Rotas desta versão

| Rota | Template | Arquivo de decoração |
|------|----------|----------------------|
| `/titulos-nossa-senhora` | ListingPageTemplate | `specs/decor/titulos-nossa-senhora.json` |
| `/titulos-nossa-senhora/nossa-senhora-auxiliadora` | ContentPageTemplate compact | `specs/decor/nossa-senhora-auxiliadora.json` |
| `/titulos-nossa-senhora/nossa-senhora-medjugorje` | ContentPageTemplate compact | `specs/decor/nossa-senhora-medjugorje.json` |
| `/titulos-nossa-senhora/nossa-senhora-la-salette` | ContentPageTemplate compact | `specs/decor/nossa-senhora-la-salette.json` |

## Decoração por página

Todas as frases abaixo existem, letra por letra, no `specs/content/{slug}.json` da própria página (validado por `validateDecor`). Todo título de seção ganha sublinhado rabiscado em Azul Céu; a coluna “Título” mostra só o desenho extra.

**`specs/decor/titulos-nossa-senhora.json`** · rota `/titulos-nossa-senhora`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Títulos de Nossa Senhora | — | desenhos brilhinhos, lírio (Maria); sublinhado à mão em “Senhora”; bilhete “Explore as devoções marianas” |
| cards | — | — | fita adesiva em cada card; etiqueta de ano tirada da própria `description` (ex.: 1717, 1846, 1981); figurinhas: `nossa-senhora-aparecida` → coroa (Rainha), `nossa-senhora-das-dores` → coração com chama, `nossa-senhora-de-fatima` → raios |

**`specs/decor/nossa-senhora-auxiliadora.json`** · rota `/titulos-nossa-senhora/nossa-senhora-auxiliadora`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora Auxiliadora | — | desenhos brilhinhos, estrela; sublinhado à mão em “Auxiliadora” |
| `sections[0]` | Quem é Nossa Senhora Auxiliadora? | marca-texto em “aquela que socorre, protege e acompanha os cristãos” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Auxiliadora dos Cristãos” |
| `sections[1]` | Origem da Devoção | marca-texto em “São João Bosco” | Post-it areia com tachinha Azul Manto: **1868** · “Basílica de Maria Auxiliadora em Turim”<br>Figurinha: coroa (Rainha) presa com fita, bilhete “Família Salesiana” |
| `sections[2]` | Uma Presença de Esperança + coração com chama | marca-texto em “entrega total à vontade de Deus” | Carimbo circular Azul Manto “Auxiliadora dos Cristãos · rogai por nós” · centro: cruz<br>Bilhete Gochi Hand “milhares de testemunhos” + brilhinhos |

**`specs/decor/nossa-senhora-medjugorje.json`** · rota `/titulos-nossa-senhora/nossa-senhora-medjugorje`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Aparições de Nossa Senhora em Medjugorje | — | desenhos brilhinhos, estrela; sublinhado à mão em “Medjugorje” |
| `sections[0]` | Medjugorje: de aldeia simples a lugar de graça | círculo à mão em “24 de junho de 1981” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Bósnia e Herzegovina”<br>Post-it areia com tachinha Azul Manto: **1981** · “Podbrdo, no sopé da colina Crnica” |
| `sections[1]` | Os primeiros videntes | marca-texto em “Aniversário das Aparições” | Post-it de datas com tachinha Azul Manto: **24 de junho** “Ivanka vê Nossa Senhora”; **25 de junho** “Marija Pavlović e Jakov Čolo”; **26 de junho** “seu chamado à paz” |
| `sections[2]` | A mensagem da paz + pomba | marca-texto em “Paz, paz, paz – e somente paz!” | Bilhete Gochi Hand “os jovens não mentem” + aspas |
| `sections[3]` | Perseguições e fidelidade | marca-texto em “continuaram professando sua fé” | Figurinha: vela presa com fita |
| `sections[4]` | Um centro de oração mundial | marca-texto em “PAZ, FÉ, CONVERSÃO, ORAÇÃO E JEJUM” | Carimbo circular Azul Manto “São Tiago · centro de oração” · centro: cruz |
| `sections[5]` | Testemunhas da paróquia | marca-texto em “Eu escolhi esta paróquia de modo especial” | Post-it papel com tachinha Azul Manto: **1982** · “locuções interiores” |
| `sections[6]` | A Igreja e o legado + estrela | marca-texto em “fé, amor, paz, jejum e conversão” | Post-it de datas com tachinha **vermelha**: **2015** “Papa Francisco”; **2019** “permitiu peregrinações para Medjugorje”<br>Figurinha: coração com chama |

**`specs/decor/nossa-senhora-la-salette.json`** · rota `/titulos-nossa-senhora/nossa-senhora-la-salette`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Nossa Senhora de La Salette | — | desenhos brilhinhos, estrela; sublinhado à mão em “Salette” |
| `sections[0]` | A aparição em La Salette | círculo à mão em “globo de luz” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImage`), legenda à mão “Alpes franceses”<br>Post-it areia com tachinha Azul Manto: **1846** · “Maximino e Melanie” |
| `sections[1]` | A mensagem da Mãe que chora + gota | marca-texto em “um chamado permanente à conversão” | Bilhete Gochi Hand “Há tanto tempo que sofro por vós” + aspas |
| `sections[2]` | Uma mãe que chora por seus filhos | marca-texto em “lamenta, intercede e convida ao retorno” | Figurinha: coração com chama presa com fita<br>Carimbo circular Azul Manto “Vinde, meus filhos, não temais” · centro “1846” |

## Navegação de fluxo

Breadcrumb no topo (abaixo do menu) e bloco `SectionFlowNav` no fim da página, na ordem dos cards da listagem. Sem volta circular: o primeiro título não tem “Anterior” e o último não tem “Próximo”.

| Página | Breadcrumb | ← Anterior | Voltar | Próximo → |
|---|---|---|---|---|
| Títulos de Nossa Senhora | Início › Títulos de Nossa Senhora | — | Início | Ministérios (próxima seção) |
| Nossa Senhora Auxiliadora | Início › Títulos de Nossa Senhora › Nossa Senhora Auxiliadora | — | Títulos de Nossa Senhora | Nossa Senhora em Medjugorje |
| Nossa Senhora em Medjugorje | Início › Títulos de Nossa Senhora › Nossa Senhora em Medjugorje | Nossa Senhora Auxiliadora | Títulos de Nossa Senhora | Nossa Senhora Aparecida |
| Nossa Senhora de La Salette | Início › Títulos de Nossa Senhora › Nossa Senhora de La Salette | Nossa Senhora Aparecida | Títulos de Nossa Senhora | Nossa Senhora de Lourdes |

## Testes

- `specs/tests/e2e/titulos-listing-v2.spec.ts` (novo) — 10 cards na ordem do JSON, cada um leva à rota certa, etiqueta de ano só nos cards cuja description tem ano.
- `navigation-flow.spec.ts` passa a cobrir as 4 rotas novas automaticamente (lê `specs/decor/`).
- `npm run test:specs` com os novos `specs/decor/*.json`.

## Critérios de aceite

1. Cada página tem 1 a 2 detalhes por seção, nas bordas, sem cobrir texto em 1440 e 390 px.
2. Todas as frases dos bilhetes, post-its, carimbos e legendas estão no JSON da página (`test:specs` verde).
3. No máximo 1 tachinha vermelha por página; nenhum outro uso de vermelho além da margem da citação.
4. Breadcrumb e fluxo anterior/voltar/próximo corretos (tabela acima).
5. Listagem com 10 cards, sem fotos novas (a listagem continua sem imagens, como na 1.1.0).

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
| `specs/version.json` | `contentVersion: "2.1.0-snapshot"`, `specFile: "spec-2.1.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.1.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.1.0-snapshot"` |
| Commit | `Versão 2.1.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.1.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.1.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.1.1-snapshot`, `2.1.2-snapshot`… (mesmo spec, seção “Correções”) |

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Componentes decorativos novos (se faltar algum, abrir pedido para a fundação, não criar variação local)

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.1.0-snapshot).
