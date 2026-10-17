# CorpusCriste — Spec v2.7.0

releasedAt: pendente (preencher com a data da publicação)
approvedBy: Grupo Deus É Amor
status: release oficial · publicação após a Execução 7 · tamanho P

## Resumo

**Versão oficial 2.7.0** (decisão do Michel). Depois da `2.6.0-snapshot` e das correções `2.6.x-snapshot`, a MINOR é incrementada e a versão é publicada **sem o sufixo `-snapshot`**: merge na `main`, tag `v2.7.0` e GitHub Release **Latest**. Todas as 15 rotas no visual Caderno + Novo Lote, com o conteúdo em folha única, breadcrumb e navegação de fluxo. URLs, pastas, menu e conteúdo são os mesmos da 1.1.0.

Não há mudança de código nesta versão, só a publicação.

## Entregas

1. `package.json` → `2.7.0`; `specs/version.json` → `contentVersion: "2.7.0"`, `specFile: "spec-2.7.0.md"`.
2. `specs/tests/checklist.json` → versão `2.7.0` (mesmos itens da `2.6.x-snapshot`).
3. `CHANGELOG.md`: entrada **[2.7.0]** no topo, resumindo os snapshots `2.0.0-snapshot` → `2.6.x-snapshot`.
4. `README.md`: versão atual `2.7.0`; produção = v2.
5. `.cursor/rules/corpus-criste-versions.mdc`: linha 2.7.0 no histórico.
6. Merge `v2` → `main` (merge commit, sem squash, para preservar os commits `Versão X.Y.Z-snapshot`), commit `Versão 2.7.0`, tag `v2.7.0` na `main`, GitHub Release **Latest** (corpo = este spec + CHANGELOG).

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
