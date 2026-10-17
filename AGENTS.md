# AGENTS.md — CorpusCriste (site do Grupo Deus É Amor)

Guia curto para qualquer IA ou pessoa que for mexer neste repositório. Leia antes de editar.

- **Produção:** https://www.grupodeuseamor.com.br (Vercel, branch `main`)
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Zod, Playwright
- **Versão ativa:** `specs/version.json` → `specFile` aponta para o spec da versão
- **Regras do Cursor:** `.cursor/rules/*.mdc` (este arquivo resume; as regras detalham)

## 1. Como o projeto funciona

| O quê | Onde |
|-------|------|
| Textos e dados de cada página | `specs/content/{slug}.json` (validado por Zod em `lib/specs/types.ts`) |
| Decoração v2 de cada página | `specs/decor/{slug}.json` (validado por `lib/specs/decor.ts`) |
| Menu (opções e dropdowns) | `specs/routes.json` (`parent` = item de dropdown) |
| Release notes de cada versão | `specs/spec-{versão}.md` |
| Checklist de aceite | `specs/tests/checklist.json` |
| Testes e2e | `specs/tests/e2e/*.spec.ts` |
| Tokens de design | `app/globals.css` (`@theme inline`) — único lugar com cores |
| Páginas | `app/**/page.tsx` finos: `loadContent` + template |

Validação: `npm run test:specs` → `npm run build` → `CI=1 npm run test:e2e`.

## 2. O que muda na v2 (direção “Caderno + Novo Lote”)

A v2 (snapshots `2.0.0-snapshot` … `2.6.x-snapshot`, oficial `2.7.0`) troca **só o estilo**. Rotas, pastas, menu, seções e textos são os da 1.1.0.

- **Tokens únicos** no `@theme`: `manto` #00479F, `ceu` #84ADBD, `areia` #E7E0CA, `tinta` #000, `papel` #F6F2E7, `noite` #0B2550, `coracao` #C8372D. As cores antigas (preto `#0f0f12`, dourado `#d4af37`, vinho `#8B2332`) saem na Exec 7 (`2.6.0-snapshot`).
- **Fontes:** Fraunces (títulos), Jost (corpo), Gochi Hand (bilhetes à mão), Newsreader (citações).
- **Biblioteca de desenhos** `components/decor/`: SVG inline com traço à mão (filtro `#rough`), 28 desenhos do banco do design doc.
- **Componentes decorativos:** `Polaroid`, `WashiTape`, `Pin`, `PostIt`, `PostItDates`, `HandNote` (bilhete), `Stamp` (carimbo), `Sticker` (figurinha), `Highlight` (marca-texto/círculo), `DecorAside`, `DrawnTitle`, `PaperSheet` (folha única) e `SectionBreak` (respiro entre seções).
- **Navegação:** `Breadcrumb` (Início › Seção › Página) e `SectionFlowNav` (Anterior · Voltar · Próximo) em toda página interna.
- **Menu e rodapé** no estilo novo, com as mesmas opções.
- **Texto contínuo numa folha única:** todas as seções de conteúdo ficam numa só folha creme; ver regra 9 abaixo.
- Cada execução da v2 está documentada em `specs/spec-2.0.0-snapshot.md` … `spec-2.6.0-snapshot.md`; a publicação oficial em `spec-2.7.0.md`.

## 3. Padrões de design a seguir

1. **Cor só por token.** Use `bg-papel`, `text-manto`, `border-ceu`… Nunca `#hex`, `rgb()` ou `style={{ color }}` em componente, página ou JSON.
2. **Vermelho Coração é acento**, como a margem do caderno: a linha da citação, no máximo **1 tachinha vermelha por página** e selos especiais. Nunca em texto corrido, fundo de seção ou botão.
3. **Desenhos:** 1 a 2 detalhes por seção, sempre nas bordas, cantos ou apontando para algo. Nunca atrás ou por cima de texto. Sobre papel: Azul Manto ou Azul Céu. Sobre azul: Areia ou Azul Céu. Desenhos de fé em temas de fé (lírio em Nossa Senhora, pomba no Espírito Santo, chama em Pentecostes). Sempre `aria-hidden`.
4. **Bilhetes, post-its, carimbos, legendas e marca-texto usam só frases do conteúdo da página**, copiadas letra por letra. O `npm run test:specs` reprova frase inventada.
5. **Textura de caderno com parcimônia** (“não somos cursinho”): grão de papel no fundo; pauta só em bilhetes.
6. **Fotos:** só as que a página já usa, em polaroid com fita ou no tratamento azul de carimbo. Nada de fotos novas por seção.
7. **Movimento:** só o brilho se mexe, devagar, e para com `prefers-reduced-motion`.
8. **Mobile primeiro:** em 390 px, a lateral decorativa desce para baixo do texto; sem scroll horizontal.
9. **Texto contínuo numa folha única.** Todas as seções de conteúdo da página ficam numa única folha creme (`PaperSheet`) grande e contínua, nunca um card por seção. Os títulos azuis com sublinhado rabiscado são os divisores internos; entre seções cabe no máximo um respiro ou rabisco (`SectionBreak`), sem quebrar o fundo. A seção de destaque (Areia) entra na folha como bloco destacado interno. Decorações ficam nas margens da folha. Referência: `piloto/aparecida-v2c--*.png`.

### Reaproveitamento de imagens (desde 2.0.1-snapshot, opcional)

- Imagens que a página **já usa** (hero, carrossel, fotos do JSON) podem virar **foto colada** na borda da folha (`sheetPhotos`), **fundo esmaecido** de um bloco (`blocks[].backdrop`) ou do hero (`hero.backdrop`), além da polaroid. Nunca imagem nova; o validador (`resolveImageRef`) reprova.
- Legibilidade primeiro: escala de cinza + opacidade baixa + véu de papel por token (`--veu-papel*`). Moderação: máx. 1 foto colada e 1 fundo de imagem por página. Detalhes em `.cursor/rules/corpus-criste-design-v2.mdc`.

## 4. Regras de navegação e fluxo

- Home → listagens (CTAs) → cards → página → Anterior / Voltar / Próximo.
- Breadcrumb e fluxo são **derivados** de `specs/routes.json` e da ordem dos cards em `titulos-nossa-senhora.json` / `ministerios.json`. Não escreva links de fluxo à mão.
- Sem volta circular: o primeiro item não tem “Anterior”, o último não tem “Próximo”.
- Cards sem página própria (Louvor, Intercessão) ficam fora do anterior/próximo.
- **Home e ministérios:** a home não cita ministérios (regra `home-grupo-vitrine` da 0.0.5), com **uma única exceção**: o botão **preview** para `/ministerios` (decisão do Michel). Ele é experimental e pode ser removido: vem do campo opcional `previewCta` em `specs/content/home.json` e do componente isolado `components/ui/HomePreviewCta.tsx`. Para remover, apague `previewCta` do JSON. Implementação só na Exec 6 (`2.5.0-snapshot`).

## 5. O que NÃO fazer

- **Não mudar rotas, pastas ou subpastas** de `app/`, nem criar rota dinâmica `[slug]`, nem páginas novas, nem redirects novos.
- **Não mudar o menu**: as opções vêm de `specs/routes.json` e continuam as mesmas.
- **Não usar GitHub Actions** (a conta está no limite gratuito). Nada em `.github/workflows/`. Testes e build rodam localmente; o deploy é pela integração Git da Vercel.
- **Não escrever cores direto nas classes** (`text-[#00479F]`, `bg-[#C8372D]`) nem em `style`.
- **Não usar vermelho fora de acento.**
- **Não inventar frases** em bilhetes, post-its, carimbos ou legendas.
- Não reescrever textos nem mudar a estrutura dos JSON de conteúdo.
- Não abrir um card/fundo próprio por seção nem interromper a folha única.
- Não duplicar JSX de hero/cards em `page.tsx`; não converter DEA Ajuda/Perseverança para `ContentPageTemplate`.
- Não remover `data-testid` existentes.
- Não fazer push, tag ou release sem pedido explícito do Michel.

## 6. Versionamento

- Cada execução da v2 é uma **feature** e incrementa a **MINOR**: Exec 1 `2.0.0-snapshot`, Exec 2 `2.1.0-snapshot`, Exec 3 `2.2.0-snapshot`, Exec 4 `2.3.0-snapshot`, Exec 5 `2.4.0-snapshot`, Exec 6 `2.5.0-snapshot`, Exec 7 `2.6.0-snapshot`. Sufixo `-snapshot` sem número depois. Pre-release no GitHub, preview da branch `v2` na Vercel.
- Cada **correção** incrementa o **PATCH**: `2.6.1-snapshot`, `2.6.2-snapshot`…
- **Oficial: `2.7.0`** (decisão do Michel). Depois da `2.6.x-snapshot` e das correções, merge `v2` → `main`, tag `v2.7.0`, GitHub Release **Latest**. Rollback: release `v1.1.0`.
- Cada versão: `specs/spec-{v}.md`, `specs/version.json`, `package.json`, `specs/tests/checklist.json`, README e `.cursor/rules/corpus-criste-versions.mdc`. Commit `Versão {v}`.
