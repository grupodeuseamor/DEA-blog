# CorpusCriste — Spec v2.4.0-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · Execução 5 de 7 da v2 · tamanho G

## Resumo

Leva a seção **Ministérios** para o padrão v2c (folha única): listagem, **DEA Ajuda** e **Perseverança** (layout ministry-landing de 7 seções), com breadcrumb e navegação de fluxo. Mantém vídeo por URL (DEA Ajuda), carrossel no hero (DEA Ajuda), cards de projetos, valores e citação, com o mesmo conteúdo e a mesma ordem.

## Entregas

1. `specs/decor/ministerios.json`, `dea-ajuda.json`, `perseveranca.json`.
2. `components/ministry-landing/MinistryLandingHero.tsx` — hero v2 no modo Novo Lote (Azul Manto, título Fraunces com `hero.highlight`, sublinhado à mão); carrossel continua em `HeroBackgroundCarousel` com tratamento azul de carimbo. Remove o brilho dourado `ministryNameGlow` só no ramo v2.
3. Folha única: as seções sobre, vídeo, projetos, inspiração, valores e citação ficam numa só `PaperSheet` (regra da Exec 1), separadas só pelos títulos com sublinhado e por um `SectionBreak`; o hero fica fora. `MinistryLandingAbout.tsx` — bloco na folha, marca-texto e lateral (`DecorAside`).
4. `MinistryLandingVideo.tsx` — `RemoteVideoEmbed` dentro de moldura com fita adesiva nos cantos (mesmo `aspect-video`, mesmo `data-testid`).
5. `MinistryLandingProjects.tsx` + `components/content/ProjectCard.tsx` — cada projeto vira um post-it com tachinha Azul Manto (só o post-it destacado no decor usa a tachinha vermelha).
6. `MinistryLandingInspiration.tsx` — imagem já usada na seção em polaroid com fita; texto ao lado.
7. `MinistryLandingValues.tsx` + `components/content/ValueCard.tsx` — ícones lucide trocados por desenhos do banco: `heart` → coração, `users` → louvor, `smile` → brilhinhos, `cross` → cruz (mapa fixo no componente; o JSON continua com os mesmos `icon`).
8. `MinistryLandingQuote.tsx` — citação Newsreader com margem vermelha de caderno + aspas desenhadas.
9. `ListingPageTemplate` (ministérios) — cards Louvor e Intercessão (sem página própria) recebem carimbo “em breve” (frase da `description`) e não entram no anterior/próximo.
10. `app/ministerios/dea-ajuda/page.tsx` e `app/ministerios/perseveranca/page.tsx` — só incluem `Breadcrumb` e `SectionFlowNav` na composição (sem JSX de seção na page).
11. `specs/content/dea-ajuda.json` — remove só o campo opcional `hero.overlay`.

## Rotas desta versão

| Rota | Template | Arquivo de decoração |
|------|----------|----------------------|
| `/ministerios` | ListingPageTemplate | `specs/decor/ministerios.json` |
| `/ministerios/dea-ajuda` | Ministry landing | `specs/decor/dea-ajuda.json` |
| `/ministerios/perseveranca` | Ministry landing | `specs/decor/perseveranca.json` |

## Decoração por página

Todas as frases abaixo existem, letra por letra, no `specs/content/{slug}.json` da própria página (validado por `validateDecor`). Todo título de seção ganha sublinhado rabiscado em Azul Céu; a coluna “Título” mostra só o desenho extra.

**`specs/decor/ministerios.json`** · rota `/ministerios`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Ministérios | — | desenhos brilhinhos, pomba; sublinhado à mão em “Ministérios”; bilhete “caminho de serviço e evangelização” |
| cards | — | — | fita adesiva em cada card; figurinhas: `dea-ajuda` → coração com chama, `perseveranca` → chama, `louvor` → louvor, `intercessao` → pomba; carimbo “em breve” nos cards sem página própria |

**`specs/decor/dea-ajuda.json`** · rota `/ministerios/dea-ajuda`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Ajuda | — | desenhos brilhinhos, coração com chama; sublinhado à mão em “Ajuda” |
| `about` | DEA Ajuda | marca-texto em “a fé não pode permanecer apenas nas palavras” | Figurinha: coração presa com fita<br>Carimbo circular Azul Manto “DEA Ajuda · Transformando Fé em Caridade” · centro: coração |
| `video` | Conheça nossa missão | — | Bilhete Gochi Hand “Assista ao vídeo” + seta |
| `projects` | Projetos Realizados | — | Post-it areia com tachinha **vermelha**: **Sopão Solidário** · “refeições para pessoas em situação de vulnerabilidade” |
| `inspiration` | Nossa Inspiração | marca-texto em “servir é uma forma de amar” | Polaroid com fita adesiva (foto já usada pela página: `inspiration.backgroundImage`), legenda à mão “Nossa Senhora Auxiliadora” |
| `values` | Nossos Valores | — | Figurinha: brilhinhos |
| `quote` | — | — | Figurinha: aspas |

**`specs/decor/perseveranca.json`** · rota `/ministerios/perseveranca`

| Bloco | Título | Marca-texto / círculo | Detalhes na lateral (máx. 2) |
|---|---|---|---|
| hero | Perseverança | — | desenhos brilhinhos, chama; sublinhado à mão em “Perseverança” |
| `about` | Ministério Perseverança | marca-texto em “formar servos gentis e generosos do amor de Deus” | Figurinha: chama presa com fita<br>Carimbo circular Azul Manto “Ministério Perseverança · perseverar” · centro: cruz |
| `projects` | Caminhos de formação | — | Post-it areia com tachinha **vermelha**: **Formação e oração** · “descubra seus dons” |
| `inspiration` | Nosso grupo de servos | marca-texto em “servir a Deus é caminhar junto” | Polaroid com fita adesiva (foto já usada pela página: `inspiration.backgroundImage`), legenda à mão “comunidade, alegria e compromisso” |
| `values` | Nossos Valores | — | Figurinha: brilhinhos |
| `quote` | — | — | Figurinha: aspas |

## Navegação de fluxo

Breadcrumb no topo (abaixo do menu) e bloco `SectionFlowNav` no fim da página, na ordem dos cards da listagem. Sem volta circular: o primeiro título não tem “Anterior” e o último não tem “Próximo”.

| Página | Breadcrumb | ← Anterior | Voltar | Próximo → |
|---|---|---|---|---|
| Ministérios | Início › Ministérios | Títulos de Nossa Senhora (seção anterior) | Início | — |
| DEA Ajuda | Início › Ministérios › DEA Ajuda | — | Ministérios | Perseverança |
| Perseverança | Início › Ministérios › Perseverança | DEA Ajuda | Ministérios | — |

## Testes

- `specs/tests/e2e/dea-ajuda-visual.spec.ts` e `perseveranca-visual.spec.ts` — atualizar asserts de cor/estilo para v2, mantendo os de estrutura (7 seções, carrossel, iframe de vídeo, sem vídeo na Perseverança).
- `npm run test:video` — o parser não muda e precisa continuar verde.
- `navigation-flow.spec.ts` cobre as 3 rotas.

## Critérios de aceite

1. Ordem das seções igual à 1.1.0 (hero, sobre, vídeo, projetos, inspiração, valores, citação; Perseverança sem vídeo).
2. Vídeo do DEA Ajuda toca a partir de `video.url`; carrossel respeita `prefers-reduced-motion`.
3. Louvor e Intercessão continuam apontando para `/ministerios` (sem página nova).
4. Frases dos detalhes só do conteúdo; 1 tachinha vermelha por página no máximo.

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
- [ ] `npm run test:video`
- [ ] Imagem externa da inspiração (Vercel Blob) carrega no preview; se o domínio não estiver em `next.config.mjs`, manter `<img>` como na 1.1.0

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.4.0-snapshot"`, `specFile: "spec-2.4.0-snapshot.md"`, `releasedAt` = data da publicação |
| `package.json` | `"version": "2.4.0-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.4.0-snapshot"` |
| Commit | `Versão 2.4.0-snapshot` (padrão do histórico: `Versão 0.1.6`, `Versão 1.1.0`) |
| Tag | `v2.4.0-snapshot` na branch `v2` |
| GitHub | Release marcada como **pre-release** `v2.4.0-snapshot` (corpo = este spec). Não é “Latest”. |
| Vercel | preview automático da branch `v2` (produção continua em `main` = 1.1.0) |
| Correções | cada correção publicada sobre esta versão incrementa o PATCH: `2.4.1-snapshot`, `2.4.2-snapshot`… (mesmo spec, seção “Correções”) |

## Reaproveitamento de imagens (opcional, desde 2.0.1-snapshot)

Cada página desta execução **pode** reaproveitar imagens que já usa (hero, carrossel, fotos do conteúdo) como foto colada (`sheetPhotos`), fundo esmaecido (`blocks[].backdrop` / `hero.backdrop`) ou polaroid, com moderação (máx. 1 foto colada e 1 fundo por página) e legibilidade garantida pelo véu de papel. Não é obrigatório. Regra: `.cursor/rules/corpus-criste-design-v2.mdc`.

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Páginas próprias para Louvor e Intercessão
- Troca de vídeo, fotos ou projetos

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.4.0-snapshot).
