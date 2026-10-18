# CorpusCriste — Spec v2.7.0

releasedAt: 2026-10-17
approvedBy: Grupo Deus É Amor
status: release oficial · preparada na branch local `feat/v2-snapshot` (commit `Versão 2.7.0`) · merge na `main`, tag e Release pendentes · tamanho P

## Resumo

**Versão oficial 2.7.0** (decisão do Michel). Depois da `2.6.0-snapshot` e das correções `2.6.x-snapshot`, a MINOR é incrementada e a versão é publicada **sem o sufixo `-snapshot`**: merge na `main`, tag `v2.7.0` e GitHub Release **Latest**. Todas as 15 rotas no visual Caderno + Novo Lote, com o conteúdo em folha única, breadcrumb e navegação de fluxo. URLs, pastas, menu e conteúdo são os mesmos da 1.1.0.

Não há mudança visual nesta versão. Além da publicação, entram só os testes de links e redirects pedidos pelo Michel (item 7).

## Entregas

1. `package.json` → `2.7.0`; `specs/version.json` → `contentVersion: "2.7.0"`, `specFile: "spec-2.7.0.md"`.
2. `specs/tests/checklist.json` → versão `2.7.0` (mesmos itens da `2.6.x-snapshot`).
3. `CHANGELOG.md`: entrada **[2.7.0]** no topo, resumindo os snapshots `2.0.0-snapshot` → `2.6.x-snapshot`.
4. `README.md`: versão atual `2.7.0`; produção = v2.
5. `.cursor/rules/corpus-criste-versions.mdc`: linha 2.7.0 no histórico.
6. Merge `v2` → `main` (merge commit, sem squash, para preservar os commits `Versão X.Y.Z-snapshot`), commit `Versão 2.7.0`, tag `v2.7.0` na `main`, GitHub Release **Latest** (corpo = este spec + CHANGELOG).

7. **Testes de links e redirects** (pedido do Michel; locais, sem Actions):
   - `npm run test:links` (`specs/tests/e2e/links.spec.ts`): percorre as 15 rotas de `specs/routes.json`, coleta todos os `<a href>` (menu, rodapé, breadcrumb, fluxo, cards, CTAs, botão preview); cada destino interno precisa existir em `routes.json` e responder 200; âncoras `#id` precisam existir; links externos só `https` (listados; checagem de rede opcional com `LINKS_CHECK_EXTERNAL=1`, falha de rede não quebra). Um segundo teste confere que `iframe`/`img` externos usam `https` (Drive, Vercel Blob).
   - `npm run test:redirects` (`scripts/check-redirects.ts`): o `next start` não aplica o `vercel.json` e o `next.config.mjs` não tem `redirects()`, então localmente a validação é **estática**: origem não é rota real, sem origem duplicada, destino (inclusive cada caminho concreto de `/imagens/:path*`) existe em `routes.json`, sem loop nem cadeia, status 308 (`permanent: true`).
   - `npm run test:redirects:remote -- <baseUrl> [--domains]`: confere status e `Location` contra preview/produção, as 15 rotas em 200 e, para o domínio oficial (ou `--domains`), `grupodeuseamor.com.br` → www e `dea-blog.vercel.app` → www em 308 preservando o caminho. Se o `baseUrl` é um alias (apex ou `dea-blog.vercel.app`), confere que todas as rotas e origens vão em 308 para o www com o mesmo caminho. Os redirects de domínio **não estão no repo**: são configuração da Vercel.

## Status (2026-10-17)

- Commit `Versão 2.7.0` na branch local `feat/v2-snapshot`; `main` (`1060448`, 1.1.0) faz fast-forward para ele (simulado numa cópia, sem conflito). Pelo item 6 o merge deve ser feito com merge commit (sem squash); como `main` é ancestral, não há conflito.
- **Não feito (aguardando):** push, merge na `main`, tag `v2.7.0`, GitHub Release Latest e conferência da produção.
- Resultado remoto em 2026-10-17 (produção atual 1.1.0): `https://www.grupodeuseamor.com.br` — 13 caminhos de redirect do `vercel.json` em 308 com `Location` correto, 15 rotas em 200, apex e `dea-blog.vercel.app` em 308 para o www preservando o caminho; `https://dea-blog.vercel.app` — 28/28 caminhos em 308 para o www.

## Pendências pós-release

- Lighthouse nas 15 rotas no preview/produção (local: Acessibilidade e SEO 100; Performance mobile 85–86; Boas práticas 74–75 na DEA Ajuda pelo iframe do Google Drive).
- Rodar `npm run test:redirects:remote -- <url do preview v2>` antes do merge e `-- https://www.grupodeuseamor.com.br` depois do deploy.
- `npm run lint`: eslint não está instalado no ambiente usado; rodar numa máquina com `npm ci`.
- Percurso de teclado e leitor de tela nas 15 rotas.
- **D3** — logo Cruz e Coração: SVG provisório; trocar quando houver o redesenho do grupo.
- **D6** — autorização de imagem de menores: a v2 não colocou fotos de pessoas em lugares novos; confirmar com o grupo que as fotos já usadas (carrosséis da home e DEA Ajuda, Perseverança) estão autorizadas.
- **D8** — imagem externa (Vercel Blob) na inspiração da DEA Ajuda: mantida como está (`images.unoptimized`); decidir se baixa para `public/` numa 2.7.x.
- **D10** — breadcrumb usa “Início” e o menu “Home” (mantido); revisar se o Michel quiser unificar.
- **D11** — `deploy-de-pagina.zip` e `landing-page-dea-ajuda.zip` na raiz do repo: remover numa `2.7.1`.

## Rotas desta versão

As mesmas 15 rotas da 1.1.0 (ver `README.md`). Nenhuma rota, pasta ou redirect novo.

## Lançamento e rollback

1. Michel aprova o último preview da branch `v2` (`2.6.x-snapshot`).
2. Rodar o QA local de novo sobre o commit de merge: `npm run test:specs`, `npm run build`, `CI=1 npm run test:e2e`.
3. Merge em `main`. A Vercel faz o deploy de produção pela integração Git, sem Actions.
4. Conferir as 15 rotas em https://www.grupodeuseamor.com.br, no desktop e no celular.
5. **Rollback:** *Instant Rollback* na Vercel para o último deploy 1.1.0 e/ou `git revert -m 1 <merge>` na `main`. O código da 1.1.0 está preservado na release `v1.1.0`.

## Versão

| Onde | Valor |
|------|-------|
| `specs/version.json` | `contentVersion: "2.7.0"`, `specFile: "spec-2.7.0.md"` |
| `package.json` | `"version": "2.7.0"` |
| `specs/tests/checklist.json` | `"version": "2.7.0"` |
| Commit | `Versão 2.7.0` |
| Tag | `v2.7.0` na `main` |
| GitHub | Release **Latest** `v2.7.0` |
| Vercel | produção a partir de `main` |
| Correções futuras | `2.7.1`, `2.7.2`… (oficiais, sem `-snapshot`) |

## Fora do escopo

- Novas rotas, pastas, páginas (Quem somos, Galeria, Participe, Loja) ou rota dinâmica `[slug]`
- Redirects novos em `vercel.json`
- Reescrita de textos ou mudança de estrutura dos JSON de `specs/content/`
- GitHub Actions / CI remoto
- Páginas futuras (Quem somos, Galeria, Participe, Loja), que ficam para 2.8.0+

## Checklist de aceite

Referência: `specs/tests/checklist.json` (versão 2.7.0).
