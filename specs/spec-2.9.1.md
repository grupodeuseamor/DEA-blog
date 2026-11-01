# 2.9.1 — Correção: listagem de Santos e ícones

Status: implementação local para revisão, pedida por Michel como correção após a 2.9.0. Sem push, PR, merge, tag ou deploy nesta etapa.

## Escopo

| Entrega | Onde |
| --- | --- |
| Duas imagens enviadas por Michel em polaroids na listagem | `/santos` (`photos`/`photoCaptions` em `specs/content/santos.json`) |
| Ícone redondo de cada santo no card, no lugar do emoji | `icon` em `galleries` → `public/images/icons/<slug>.webp` |

## Imagens

- `public/images/santos.png`: ilustração de vários santos com auréolas e São Francisco ao centro. Legenda: “Santos reunidos ao redor de São Francisco”.
- `public/images/santos-2.png`: pintura clássica com santos ao redor de Cristo crucificado e de Nossa Senhora. Legenda: “Os santos aos pés de Cristo crucificado e de Nossa Senhora”.
- As imagens são pequenas (218×234), por isso ficam em polaroids, e não no fundo do hero.
- Ícones de 160×160 recortados do retrato principal de cada santo: São João Paulo II sorrindo, Frassati com a cruz e o santinho do Joselito.

O campo `icon` é opcional no schema de galerias; sem ele o card mostra o emoji, então Títulos de Nossa Senhora fica inalterado. As legendas seguem a exceção da 2.9.0 (texto apenas descritivo).
