# CorpusCriste — Spec v2.0.1-snapshot

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: snapshot (pre-release não oficial) · correção (PATCH) da Execução 1 (`2.0.0-snapshot`) · tamanho P

## Resumo

Ajuste da Execução 1 pedido pelo Michel: a página-piloto **Nossa Senhora Aparecida** ganha uma **foto colada na borda da folha única**, reaproveitando a imagem que a página já usa (`hero.backgroundImage`), presa com fitas washi em cantos opostos, levemente inclinada e com sombra suave — como se estivesse grudada no caderno. Junto vem o **mecanismo opcional de reaproveitamento de imagens** da própria página, que as próximas execuções podem usar. Rotas, menu e textos não mudam.

## Correções / ajustes

1. **Reaproveitamento de imagens (opcional)** — `lib/specs/decor.ts`:
   - `resolveImageRef(content, ref)`: aceita só caminho no conteúdo (`hero.backgroundImage`, `hero.backgroundImages[n]`…) ou `src` literal que já aparece no JSON da página, com extensão de imagem.
   - `sheetPhotos` (novo, opcional, máx. 1): `{ image, after, side, rotate, focus, caption? }`. `after` precisa existir no conteúdo; `caption` precisa ser frase do conteúdo.
   - `blocks[].backdrop` e `hero.backdrop` (novos, opcionais): fundo esmaecido com imagem já usada pela página (`strength: suave|media`, `side`).
   - `polaroid.image` passa a usar a mesma validação.
2. `components/decor/SheetPhoto.tsx` (novo) — foto colada: moldura papel, 2 fitas (`WashiTape`) em cantos opostos, inclinação por `rotate`, sombra `--sombra-postit`, recorte por `focus`. `data-decor="foto-colada"`, `data-testid="sheet-photo"`.
3. `components/decor/ImageBackdrop.tsx` (novo) — fundo esmaecido: escala de cinza, opacidade 0.22/0.34 e **véu de papel** (`--veu-papel*`) sob o texto.
4. `components/content/SectionRendererV2.tsx` / `ContentPageTemplate.tsx` — renderizam `sheetPhotos` e `backdrop` quando existem.
5. `app/globals.css` — estilos `.foto-colada`, `.fundo-img`, tokens `--veu-papel*`. Desktop ≥ 1440 px: foto na margem da folha ao lado do bloco `after` (avança sobre a borda, para antes do texto); abaixo disso e no mobile: centralizada abaixo do texto do bloco, sem sobrepor.
6. `specs/decor/nossa-senhora-aparecida.json` — `sheetPhotos: [{ image: "hero.backgroundImage", after: "sections[2]", side: "esquerda", rotate: -5, focus: "50% 30%" }]` (ao lado de “Uma imagem que fala sem palavras”).
7. Docs: regra em `.cursor/rules/corpus-criste-design-v2.mdc`, `AGENTS.md`, nota nas specs/plans das próximas execuções, `CHANGELOG.md` (novo), `README.md`, `corpus-criste-versions.mdc`.

## Rotas desta versão

| Rota | Mudança |
|------|---------|
| `/titulos-nossa-senhora/nossa-senhora-aparecida` | foto colada na borda da folha |
| As outras 14 rotas | sem mudança |

## Testes

- `aparecida-v2-visual.spec.ts` — passa a exigir 1 `[data-testid="sheet-photo"]`; o teste de sobreposição (`[data-decor]` × `p`/`h2`) cobre a foto em 1440 e 390 px.
- `npm run test:specs` — valida `sheetPhotos` / `backdrop` (imagem precisa ser da própria página).

## Critérios de aceite

1. Foto colada visível na Aparecida, inclinada, com fitas nos cantos, sem cobrir texto em 1440 e 390 px e sem scroll horizontal.
2. Trocar `image` por uma imagem que a página não usa faz `npm run test:specs` falhar.
3. Nenhuma outra rota muda.

## QA local

- [ ] `npm run test:specs`
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `CI=1 npm run test:e2e`
- [ ] Revisão visual 1440 / 390 px da Aparecida

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.0.1-snapshot"`, `specFile: "spec-2.0.1-snapshot.md"` |
| `package.json` | `"version": "2.0.1-snapshot"` |
| `specs/tests/checklist.json` | `"version": "2.0.1-snapshot"` |
| Commit | `Versão 2.0.1-snapshot` |
| Tag | `v2.0.1-snapshot` na branch `v2` (pre-release) |

## Fora do escopo

- Imagens novas, rotas novas, mudança de textos.
