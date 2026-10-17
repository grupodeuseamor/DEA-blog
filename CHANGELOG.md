# Changelog

Todas as versões do CorpusCriste (site do Grupo Deus É Amor). O detalhe de cada versão está em `specs/spec-{versão}.md`.
Formato: [SemVer](https://semver.org/lang/pt-BR/). Na v2, cada execução é uma feature (MINOR) publicada como pre-release `X.Y.0-snapshot`; correções incrementam o PATCH (`X.Y.Z-snapshot`); a oficial é a 2.7.0.

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
