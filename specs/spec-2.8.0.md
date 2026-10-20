# 2.8.0 — Participação e encontros

Status: implementação para revisão em pull request. Após a validação local, o solicitante autorizou commit, push da branch e abertura de PR para `main`, com Michel (`Michel1412`) como reviewer. Merge, tag e release continuam fora desta etapa. Produção permanece 2.7.0 até eventual merge e deploy pela integração da Vercel.

## Escopo aprovado na entrevista

| Card Trello | Entrega |
| --- | --- |
| [2 — Participe](https://trello.com/c/x4nbwBWE) | Link no header desktop/mobile para `/#primeira-vez` |
| [3 — Identificação](https://trello.com/c/pbroWDh3) | “Grupo de oração jovem · Maringá · desde 2000” na apresentação |
| [4 — Quero participar](https://trello.com/c/bAaAnH2l) | Botão do hero para `/#primeira-vez` |
| [5 — Conhecer o grupo](https://trello.com/c/hlLVqCxi) | Link do hero para `/#sobre-o-grupo`, conteúdo existente |
| [7 — Próximo encontro](https://trello.com/c/XKMbvEFk) | Quinta, 19h30–21h; feriados, exceções e cancelamentos |
| [9 — Mapa](https://trello.com/c/fLvs0nqr) | Google Maps do Auditório Dona Guilhermina, Av. Tiradentes, 710, Maringá, PR; alternativa externa |
| [10 — Google Agenda](https://trello.com/c/eL2hcXdI) | Evento único com a data, horário e local do próximo encontro |
| [11 — Redes sociais](https://trello.com/c/jFHABTPe) | Instagram oficial no rodapé global |

Fora do lote: Projetos (significado/destino pendente), administrador de fotos (não existe login/CMS/upload) e ícones (aguardando definição de “Primeira vez”). Permanecem no Backlog.

O solicitante autorizou a exceção pontual do menu e as adições de conteúdo necessárias, pedindo para **não alterar as regras**. AGENTS.md e `.cursor/rules/` permanecem intactos. “Primeira vez” é apenas a âncora técnica: o título visível continua **Venha participar**. Preservados textos anteriores, fotos, carrossel, folha única, decoração, 15 páginas e redirects existentes.

## Manutenção da programação

Editar `specs/meetings.json`, validar e publicar pelo fluxo habitual do repositório. Não há administração visual nesta etapa.

- `weekday`: dia da semana (`4` = quinta); `startTime` e `endTime`: horários locais no mesmo dia, formato `HH:mm`.
- `venue`: nome e endereço; `timeZone`: `America/Sao_Paulo`.
- `additionalHolidays`: datas ISO (`YYYY-MM-DD`) de feriados extraordinários a pular.
- `exceptions`: cancelamentos ou encontros especiais, com no máximo uma entrada por data. Uma exceção `scheduled` prevalece sobre feriado e sobre o dia semanal padrão, permitindo encontros em outro dia.

Exemplos ilustrativos (não cadastrados na programação real):

```json
{
  "exceptions": [
    { "date": "2026-12-24", "status": "cancelled" },
    {
      "date": "2026-12-25",
      "status": "scheduled",
      "startTime": "18:00",
      "endTime": "19:30",
      "venue": { "name": "Outro local aprovado", "address": "Endereço aprovado" }
    }
  ]
}
```

Para transferir um encontro: cancelar a data original e cadastrar `scheduled` na nova data. Para autorizar um encontro no feriado: cadastrar `scheduled` nessa data. Campos omitidos herdam o padrão. O schema rejeita datas inexistentes, horários inválidos, término anterior ao início e exceções duplicadas.

O próximo encontro é o primeiro **início ainda futuro** em até 366 dias. No instante de início ele deixa de ser o próximo. A UI recalcula a cada 30 segundos e ao retornar à aba, sem depender de novo deploy semanal ou do fuso configurado no dispositivo. Antes da hidratação aparece um estado de consulta; sem próximos encontros no horizonte, aparece uma orientação para o Instagram e não há link de Agenda. Mapas e Agenda acompanham o local/horário de uma exceção. O Google Agenda abre um evento único (sem recorrência, para não recriar datas canceladas); adicionar à agenda depende da confirmação do visitante no Google.

## Feriados e fontes

Regras verificadas em 2026-10-19. Feriados fixos nacionais: 01/01, 21/04, 01/05, 07/09, 12/10, 02/11, 15/11, 20/11 e 25/12. Em Maringá: Sexta-feira da Paixão (Páscoa − 2 dias), Corpus Christi (Páscoa + 60 dias), Nossa Senhora da Glória (15/08) e aniversário observado na segunda segunda-feira de maio, exceto 10/05 quando domingo. O calendário móvel é calculado a cada ano.

Fontes primárias:

- [Calendário federal de 2026 — Ministério da Gestão](https://www.gov.br/gestao/pt-br/assuntos/noticias/2025/dezembro/confira-o-calendario-oficial-de-feriados-nacionais-e-pontos-facultativos-em-2026).
- [Lei municipal 512/1967 — Câmara de Maringá](https://sapl.cmm.pr.gov.br/norma/2292) e [alteração 4.709/1998](https://sapl.cmm.pr.gov.br/norma/6490).
- [Lei municipal 5.719/2002 e histórico de alterações](https://sapl.cmm.pr.gov.br/ta/1991/text). A mudança de 2026 foi suspensa por liminar, conforme [TRT9](https://www.trt9.jus.br/portal/noticias.xhtml?id=9026519); as duas redações de aniversário não geram feriado em quinta-feira.
- [Estado do Paraná — referência à Lei 18.384/2014](https://www.legislacao.pr.gov.br/legislacao/listarAtosAno.do?action=exibirImpressao&codAto=379977): 19/12 é data comemorativa sujeita a ponto facultativo, não feriado estadual automático.

Pontos facultativos, emendas, 24/12 e 31/12 **não** cancelam encontros automaticamente. Para suspender o grupo nessas datas, usar `exceptions`. Novas leis e feriados extraordinários exigem revisão da programação; não há dependência de API externa de calendário.

## Verificação e auditoria

- `npm run test:specs`
- `npm run test:meetings`
- `npm run test:preview`
- `npm run test:redirects`
- `npm run build`
- `CI=1 npm run test:e2e` (inclui links de todas as páginas, navegação e os novos testes em 1440/390 px).

Após validação local, apenas os oito cards implementados seguem para **Em validação**, com evidências e instruções. Concluído e entrega final ficam com o solicitante. O mapa externo e a tela de criação do Google Agenda devem ser conferidos na auditoria, pois são serviços de terceiros.

Resultado local em 2026-10-19: specs, encontros, preview, vídeo, redirects e build aprovados; **106 testes Playwright aprovados**, sem retries na execução final. Links: 15 destinos internos e 19 referências a âncoras verificados. Inspeção visual em 1440/390 px e nenhuma exceção JavaScript na home. Nenhuma dependência nova de aplicação.

Limitação preexistente: `npm run lint` retorna `eslint: not found`; o repositório tem o script, mas não declara a dependência nem possui configuração ESLint. Para o navegador deste ambiente foram necessários Chromium e bibliotecas isoladas em `/tmp/dea-blog-playwright` (sem instalação no sistema); a execução usou `LD_LIBRARY_PATH=/tmp/dea-blog-playwright/libs/usr/lib/x86_64-linux-gnu PLAYWRIGHT_BROWSERS_PATH=/tmp/dea-blog-playwright CI=1 npm run test:e2e -- --max-failures=3`.

## Code review antes da validação

Solicitado pelo usuário antes de disponibilizar os cards. Base fixa: `c567a918edd73faeab7d22c9cd655907f865cb5e` (HEAD anterior ao lote). A revisão foi executada sobre o diff de trabalho e os arquivos novos, antes da criação dos commits. Dois revisores independentes, em paralelo:

- **Standards:** um achado P3 (novos textos do Instagram hardcoded em JSX, contrariando content-first) e uma recomendação relacionada (rodapé global descobria o link através do estilo de um CTA da home). Correção: `footerInstagram` explícito em `specs/content/home.json`, validado por Zod, com rótulo, nome acessível e URL; o rodapé não depende mais da existência/ordem/estilo do CTA.
- **Spec:** zero achados; as oito demandas e as decisões da entrevista estão atendidas.

O primeiro card, movido antes do pedido de revisão, foi devolvido ao Backlog durante a revisão. A correção foi conferida pelo revisor: **Standards sem achados remanescentes; Spec sem achados**. Depois da correção passaram novamente specs, preview, encontros, build e os **9 testes de regressão da home e dos links das 15 páginas**. O mapa foi conferido no build de produção local: o Google renderizou o pin do Auditório Dona Guilhermina em Maringá. Os oito cards foram disponibilizados em **Em validação**, com evidências e instruções de auditoria; os três adiados permanecem no Backlog. Nenhum card foi concluído ou arquivado.

## Ajustes durante a auditoria local

- Dia da semana apresentado com iniciais maiúsculas, por exemplo “Quinta-Feira, 22 de outubro de 2026”; meses continuam em minúsculas.
- Alias de importação `z` renomeado para `zod` nos cinco arquivos que usam a biblioteca, incluindo referências de tipos, sem alteração de comportamento.
- Integração de feriados com Google Agenda apenas discutida, sem implementação neste lote. O cálculo local permanece.

Antes do push do PR, specs, encontros, preview, vídeo, redirects e build passaram novamente. A suíte completa de 106 testes Playwright também passou novamente, sem retries, incluindo os ajustes finais de nomenclatura e capitalização; foi reutilizado o servidor local já ativo para a auditoria do solicitante.
