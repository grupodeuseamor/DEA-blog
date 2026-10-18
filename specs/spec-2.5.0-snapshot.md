# CorpusCriste — Spec v2.5.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 6 de 7 da v2 · tamanho M

## Resumo

Aplica o padrão v2 na **Home**, a porta de entrada do fluxo. O hero segue a abertura “Novo Lote” do protótipo aprovado (Azul Manto, título gordo em Fraunces, bilhete à mão, carrossel de fotos do grupo com tratamento azul de carimbo), mantendo as seções atuais (“Grupo Deus É Amor” e “Venha participar”), o botão do Instagram e o link para Títulos de Nossa Senhora.

## Entregas

1. `specs/decor/home.json`. As seções “Grupo Deus É Amor” e “Venha participar” (ambas `highlight`) entram numa única `PaperSheet`; “Venha participar” vira o bloco Areia interno da folha.
2. `components/content/HeroSection.tsx` (modo não compacto) — hero Novo Lote; `HeroBackgroundCarousel` mantém o crossfade CSS e o `data-testid="hero-background-carousel"`.
3. `components/ui/InstagramCtaButton.tsx` — botão v2 em Azul Manto com ícone; `bg-instagram-gradient` deixa de ser usado no ramo v2 (classe removida na Exec 7, `2.6.0-snapshot`).
4. `components/ui/CtaButtonGroup.tsx` / `OutlineGoldLink.tsx` — variante `outline-manto` para o `secondaryCta`.
5. Bloco “Continue navegando” no fim da home (`SectionFlowNav` em modo `entry`): card para **Títulos de Nossa Senhora**, com rótulo vindo de `specs/routes.json`.
5a. **Botão preview para Ministérios** (decisão do Michel, registrada na 2.0.0-snapshot): a home ganha um botão que leva para `/ministerios`, marcado como **preview** (experimental, pode ser removido no futuro). É a **única exceção** à regra `home-grupo-vitrine` da 0.0.5 (“a home não cita ministérios”). Implementação isolada para ser fácil de remover:
   - campo **opcional** `previewCta` em `specs/content/home.json`: `{ "label": "Ministérios", "href": "/ministerios", "badge": "preview" }` (schema `homeContentSchema` ganha `previewCta: z.object({ label, href, badge: z.literal('preview') }).optional()`; `href` precisa existir em `specs/routes.json`);
   - componente próprio `components/ui/HomePreviewCta.tsx` (`data-testid="home-preview-ministerios"`, etiqueta “preview” visível, estilo `buttonOutlineManto`), renderizado na home só quando `previewCta` existe;
   - **para remover:** apagar `previewCta` do `home.json` (o botão some; nenhum outro arquivo precisa mudar). Opcionalmente apagar o componente e o campo do schema.
6. `specs/content/home.json` — remove só o campo opcional `hero.overlay` e acrescenta o campo opcional `previewCta` (5a).

7. **Decisões (Exec 6)**:
   - **D6 — autorização de fotos de menores:** nenhuma foto de pessoas em lugar novo. As 4 fotos do carrossel mostram grupos de jovens, então a polaroid prevista para `sections[0]` (`hero.backgroundImages[1]`) **não** foi usada; no lugar entra um carimbo com a frase do conteúdo “Jovens evangelizando Jovens desde 2000” (`hero.subtitle`) e coração com chama. As fotos ficam só no carrossel do hero, onde já estavam.
   - Reaproveitamento opcional de imagens: nenhum (não há imagem da página sem pessoas identificáveis).
   - `sections[0]` também é `highlight` no conteúdo; para manter só “Venha participar” como bloco Areia, o decor ganhou o campo opcional `blocks[].highlight` (`false` em `sections[0]`), sem mudar o JSON de conteúdo.
   - “Continue navegando” usa `getEntryFlow` (1º item de topo de `routes.json`) e o `SectionFlowNav` em modo `entry`; o botão preview fica ao lado do card.
   - Teste do botão preview: e2e condicional (`home-visual`) + teste unitário `specs/tests/home-preview.unit.tsx` (`npm run test:preview`) cobrindo presença com `previewCta` e ausência sem ele; `validate-specs` exige que `previewCta.href` exista em `routes.json`.

## Rotas desta versão

| Rota | Template | Arquivo de decoração |
|------|----------|----------------------|
| `/` | ContentPageTemplate (hero com carrossel) | `specs/decor/home.json` |

## Decoração por página

Todas as frases abaixo existem, letra por letra, no `specs/content/{slug}.json` da própria página (validado por `validateDecor`). Todo título de seção ganha sublinhado rabiscado em Azul Céu; a coluna “Título” mostra só o desenho extra.

**`specs/decor/home.json`** · rota `/`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Grupo Deus É Amor | — | desenhos brilhinhos, estrela, pomba; sublinhado à mão em “Amor”; bilhete “desde 2000” |
| `sections[0]` | Grupo Deus É Amor + coração com chama | marca-texto em “da oração, da fraternidade, da adoração” | Polaroid com fita adesiva (foto já usada pela página: `hero.backgroundImages[1]`), legenda à mão “Jovens evangelizando Jovens” |
| `sections[1]` | Venha participar | marca-texto em “Há sempre lugar para mais um jovem” | Post-it areia com tachinha **vermelha**: **quintas-feiras** · “19h30 · Auditório Dona Guilhermina”<br>Bilhete Gochi Hand “Será um prazer acolher você” + seta |

## Navegação de fluxo

Breadcrumb no topo (abaixo do menu) e bloco `SectionFlowNav` no fim da página, na ordem dos cards da listagem. Sem volta circular: o primeiro título não tem “Anterior” e o último não tem “Próximo”.

| Página | Breadcrumb | ← Anterior | Voltar | Próximo → |
|---|---|---|---|---|
| Home | — (raiz, sem breadcrumb) | — | — | CTA: Títulos de Nossa Senhora · botão **preview** Ministérios (`previewCta`) |

## Testes

- `specs/tests/e2e/home-visual.spec.ts` — mantém carrossel, convite das quintas 19h30, botão Instagram e link Títulos; adiciona o bloco “Continue navegando” e o botão preview (`home-preview-ministerios` leva a `/ministerios`; o teste é condicional: só verifica se `previewCta` existir no `home.json`).
- `navigation-flow.spec.ts` — da home até uma página de título e até um ministério só com cliques (home → listagem → card → página).

## Critérios de aceite

1. Primeira dobra da home igual à primeira metade do protótipo aprovado (`screens/artifact/10-11.png`), com o conteúdo atual.
2. Quinta-feira 19h30 e Auditório Dona Guilhermina em destaque (post-it com a única tachinha vermelha da página).
3. Fluxo completo: da home se chega a qualquer uma das 12 páginas internas em até 2 cliques sem usar o menu.
4. Checklist `home-grupo-vitrine` diz: a home não cita ministérios, **exceto** o botão preview `previewCta` (único, removível).
5. Botão preview visível com a etiqueta “preview”; removendo `previewCta` do `home.json`, o botão some e `npm run test:specs`, `build` e e2e continuam verdes.

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
- [ ] Carrossel: 4 fotos, crossfade, primeira com `priority`; com reduced motion só a primeira

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.5.0-snapshot"`, `specFile: "spec-2.5.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.5.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.5.0-snapshot"` |
| Commit | `Versão 2.5.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.5.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.5.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.5.1-snapshot`, `2.5.2-snapshot`… (mesmo spec, seção “Correções”) |

## Reaproveitamento de imagens (opcional, desde 2.0.1-snapshot)

Cada página desta execução **pode** reaproveitar imagens que já usa (hero, carrossel, fotos do conteúdo) como foto colada (`sheetPhotos`), fundo esmaecido (`blocks[].backdrop` / `hero.backdrop`) ou polaroid, com moderação (máx. 1 foto colada e 1 fundo por página) e legibilidade garantida pelo véu de papel. Não é obrigatório. Regra: `.cursor/rules/corpus-criste-design-v2.mdc`.

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Seções novas do protótipo (loja, galeria, próximo encontro com data)

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.5.0-snapshot).
