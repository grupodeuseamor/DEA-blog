# Changelog

Todas as versões do CorpusCriste (site do Grupo Deus É Amor). O detalhe de cada versão está em `specs/spec-{versão}.md`.
Formato: [SemVer](https://semver.org/lang/pt-BR/). Na v2, cada execução é uma feature (MINOR) publicada como pre-release `X.Y.0-snapshot`; correções incrementam o PATCH (`X.Y.Z-snapshot`); a oficial é a 2.7.0 (versão atual).

## [2.8.0] — não publicado (aguardando validação)

- Header com Participe; apresentação com identificação literal, Quero participar e Conhecer o grupo.
- Próximo encontro calculado em America/Sao_Paulo; feriados nacionais e municipais, cancelamentos e exceções em arquivo versionado.
- Mapa do Auditório Dona Guilhermina (Av. Tiradentes, 710), link externo e Google Agenda preenchido com o próximo encontro, 19h30–21h.
- Instagram oficial no rodapé de todas as páginas.
- Testes de programação, feriados, âncoras, Google Agenda e apresentação desktop/mobile. Especificação: [`specs/spec-2.8.0.md`](specs/spec-2.8.0.md).
- Projetos, administração da foto e ícones adiados por decisão do solicitante. Regras gerais preservadas.

## [2.7.0] — 2026-10-17 (oficial, Latest)

Novo visual **Caderno + Novo Lote** em todas as 15 rotas, com o conteúdo em folha única, breadcrumb e navegação de fluxo. Mesmas URLs, pastas, menu e conteúdo da 1.1.0. Consolida os snapshots `2.0.0-snapshot` → `2.6.0-snapshot`. Spec: [`specs/spec-2.7.0.md`](specs/spec-2.7.0.md).

### Adicionado
- Tokens únicos no `@theme` (manto, ceu, areia, tinta, papel, noite, coracao, folha, polaroid) e fontes Fraunces, Jost, Gochi Hand e Newsreader.
- Biblioteca de desenhos SVG à mão e componentes decorativos (`components/decor/`): `PaperSheet` (folha única), `SectionBreak`, post-its, tachinhas, fita, polaroid, carimbo, marca-texto, foto colada e fundo esmaecido.
- Decoração por página em `specs/decor/{slug}.json` (obrigatória nas 15 rotas), validada para usar só frases do conteúdo e no máximo 1 tachinha vermelha.
- Breadcrumb e navegação Anterior · Voltar · Próximo (`components/navigation/`); “Continue navegando” na home e nas listagens.
- Reaproveitamento opcional de imagens que a página já usa (2.0.1-snapshot), com D6 (sem fotos de pessoas em lugares novos).
- Botão **preview** opcional para `/ministerios` na home (`previewCta`, removível).
- Testes: e2e v2 por página, percursos de fluxo, `test:preview`, **`test:links`** (links internos 200 + em `routes.json`, âncoras, externos https) e **`test:redirects`** / **`test:redirects:remote -- <baseUrl>`** (vercel.json estático; 308 + Location; apex e `dea-blog.vercel.app` → www preservando caminho).
- `AGENTS.md` e regras `corpus-criste-design-v2.mdc` / `corpus-criste-navigation.mdc`.

### Alterado
- Menu e rodapé no estilo novo (mesmas opções); menu fixo no topo.
- Templates de conteúdo, listagem e ministry-landing no visual v2: todas as seções numa folha única contínua; tema geral no papel.
- Campo opcional `hero.overlay` removido dos JSON (o tratamento vem do token).
- Acessibilidade: foco visível, `prefers-reduced-motion`, desenhos com `aria-hidden`.

### Removido
- Visual e código 1.1.0 (preto `#0f0f12`, dourado `#d4af37`, vinho `#8B2332`, `goldText`, `ministryNameGlow`, templates e componentes legados, Cormorant/Montserrat).

## [2.6.0-snapshot] — pendente (pre-release)
Exec 7 — fechamento: limpeza do legado 1.1.0 e QA total. Sem mudança visual nas páginas. Spec: [`specs/spec-2.6.0-snapshot.md`](specs/spec-2.6.0-snapshot.md). Correções seguintes: `2.6.1-snapshot`, `2.6.2-snapshot`… (listar aqui).

### Removido
- Ramo 1.1.0 de `ContentPageTemplate`, `ListingPageTemplate`, `ListingCard`, `PageShell` e das pages de ministério; componentes legados `HeroSection`, `SectionRenderer`, `ContentCard`, `ProjectCard`, `ValueCard`, `MinistryLanding{Hero,About,Video,Projects,Inspiration,Values,Quote}`, `HeroLogo`, `ParagraphList`, `QuoteDisplay`, `SectionTitle`, `BackgroundImageLayer`, `GradientOverlay`.
- Bloco `/* legado 1.1.0 */` do `app/globals.css` (`#0f0f12`, `#d4af37`, `#8B2332`, `bg-instagram-gradient`, `shadow-card`), helpers dourados de `lib/theme.ts` (`goldText`, `outlineGoldButtonClass`, `heroOverlayDefault`, `ministryNameGlow`…) e as fontes Cormorant Garamond / Montserrat.
- Item `legacy-visual-opt-in` do checklist.

### Alterado
- `OutlineGoldLink` → `OutlineLink`; `CtaButtonGroup` e `InstagramCtaButton` só no estilo v2.
- Decoração obrigatória: `loadDecor` lança erro sem `specs/decor/{slug}.json`; `validateAllDecor()` exige decoração para as 15 rotas.
- Tema geral no papel: `body` em `papel`/`tinta`, fonte base Jost; variáveis shadcn apontam para os tokens v2.
- Acessibilidade: foco visível claro sobre fundos azuis (hero e rodapé), foco em botões, transições desligadas com `prefers-reduced-motion: reduce`, aviso “(abre em nova aba)” no botão do Instagram.

## [2.5.0-snapshot] — pendente (pre-release)
Exec 6 — Home no visual v2c. Spec: `specs/spec-2.5.0-snapshot.md`.

### Adicionado
- `specs/decor/home.json`: hero Novo Lote (carrossel em azul de carimbo, sublinhado em “Amor”, bilhete “desde 2000”), folha única com “Venha participar” como bloco Areia e post-it das quintas com a única tachinha vermelha.
- Botão preview para `/ministerios` (item 5a): campo opcional `previewCta` no `home.json` + `components/ui/HomePreviewCta.tsx` com etiqueta “preview”; apagar o campo remove o botão.
- Bloco “Continue navegando” (modo entrada) com card para Títulos de Nossa Senhora.
- Botões v2: Instagram em Azul Manto com ícone e secundário `outline-manto`.
- Testes: `home-visual` em v2, `home-preview.unit.tsx` (`npm run test:preview`: presença com o campo e ausência sem ele) e percursos home → título / home → ministério em `navigation-flow`.

### Alterado
- `hero.overlay` removido do `home.json`.
- D6: a polaroid prevista (foto do carrossel, com pessoas) virou carimbo com frase do conteúdo.

## [2.4.0-snapshot] — pendente (pre-release)
Exec 5 — listagem Ministérios, DEA Ajuda e Perseverança no visual v2c. Spec: `specs/spec-2.4.0-snapshot.md`.

### Adicionado
- Decoração de Ministérios, DEA Ajuda e Perseverança; composição `MinistryLandingV2` (hero com carrossel em azul de carimbo, folha única com as 6 seções, vídeo em moldura com fita, projetos em post-its, valores com desenhos, citação com margem de caderno).
- Breadcrumb e anterior/voltar/próximo nas landing pages; carimbo “em breve” em Louvor e Intercessão.
- Testes `ministerios-listing-v2.spec.ts` e asserts v2 em `dea-ajuda-visual` e `perseveranca-visual`.

### Alterado
- `hero.overlay` removido de `dea-ajuda.json`.
- D6: nenhuma foto de pessoas em lugar novo; D8: imagem externa (Vercel Blob) da DEA Ajuda mantida como está.

## [2.3.0-snapshot] — pendente (pre-release)
Exec 4 — Comunicação, Dores e Fátima no visual v2c; fecha os Títulos de Nossa Senhora. Spec: `specs/spec-2.3.0-snapshot.md`.

### Adicionado
- Decoração de Comunicação, Dores e Fátima.
- Foto colada reaproveitando a imagem do hero em Fátima; fundo esmaecido suave em Das Dores.

### Alterado
- Hero v2 preserva quebras de linha da citação; post-it com rótulo longo em fonte menor.
- `hero.overlay` removido dos 3 JSON de conteúdo.

## [2.2.0-snapshot] — pendente (pre-release)
Exec 3 — Lourdes, Guadalupe e Graças no visual v2c. Spec: `specs/spec-2.2.0-snapshot.md`.

### Adicionado
- Decoração de Lourdes, Guadalupe e Graças (folha única, detalhes nas margens).
- Foto colada reaproveitando a imagem do hero em Lourdes; fundo esmaecido em Guadalupe.
- Teste `decor-pages-v2.spec.ts` para todas as rotas com decoração.

### Alterado
- `hero.overlay` removido dos 3 JSON de conteúdo.

## [2.1.0-snapshot] — pendente (pre-release)
Exec 2 — listagem Títulos de Nossa Senhora + Auxiliadora, Medjugorje e La Salette no visual v2c. Spec: `specs/spec-2.1.0-snapshot.md`.

### Adicionado
- Listagem em folha única com fichas presas por fita, etiqueta de ano da própria descrição e figurinhas; fluxo Voltar Início / Próximo Ministérios.
- Decoração de Auxiliadora, Medjugorje e La Salette; fundo esmaecido reaproveitando a foto do hero em Medjugorje e La Salette.

### Alterado
- Carimbo com desenho no centro e anel ajustado ao perímetro; post-it de datas empilha rótulos longos.
- `hero.overlay` removido dos 3 JSON de conteúdo.

## [2.0.1-snapshot] — pendente (pre-release)
Ajuste da Exec 1. Spec: `specs/spec-2.0.1-snapshot.md`.

### Adicionado
- Reaproveitamento opcional de imagens que a página já usa: `sheetPhotos` (foto colada na borda da folha), `blocks[].backdrop` / `hero.backdrop` (fundo esmaecido com véu de papel), validados por `resolveImageRef`.
- Aparecida: foto colada com fitas washi ao lado de “Uma imagem que fala sem palavras”.

## [2.0.0-snapshot] — pendente (pre-release)
Exec 1 — fundação v2 (tokens, fontes, desenhos, decoração por JSON, folha única, breadcrumb, fluxo, menu e rodapé) + piloto Aparecida. Spec: `specs/spec-2.0.0-snapshot.md`.

## [1.1.0] e anteriores
Ver `specs/spec-1.1.0.md` … `specs/spec-0.0.0.md`.
