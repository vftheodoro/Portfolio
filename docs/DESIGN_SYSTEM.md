# Design system — Portfólio Victor Theodoro

Direção: **ferramenta de engenharia com acabamento editorial.** Interfaces de IDE/Figma, grade rígida, linhas de 1 px, rótulos mono, um único acento (azul BYTHE `#36BCF7`). Sem gradientes de enfeite, sem glassmorphism, sem brilhos.

## Tokens (`src/app/globals.css`)
| Token | Valor | Uso |
|---|---|---|
| `background` | `#07090d` | fundo da página |
| `surface` / `surface-light` | `#0c1118` / `#121a26` | cards, painéis |
| `border` / `border-strong` | `#1c2a3a` / `#2b4058` | linhas, molduras |
| `foreground` / `muted` / `faint` | `#e8eef5` / `#8a9bb0` / `#5d6f84` | texto (muted ≥ 4.5:1 sobre background; `faint` só para rótulos decorativos grandes) |
| `primary` | `#36bcf7` | acento, foco, links; texto sobre ele: `primary-ink` |
| `ok` / `warn` | `#34d399` / `#fbbf24` | estados (ex.: "implementado" / "protótipo") |

Tipografia (`next/font`): **Geist** (texto e títulos), **Geist Mono** (rótulos, dados, código), **Instrument Serif** itálica *apenas* para uma palavra de destaque por título (`.serif-accent`). Escala: título de seção `clamp(2rem, 4vw, 3.25rem)`, leading 1.05, tracking −0.02em; corpo 1rem/1.65; rótulos `.label`.

Espaçamento: múltiplos de 4; seções com `py-24 md:py-32`; contêiner `.wrap` (1200 px, gutter fluido). Raio 3–6 px (ferramenta, não "app bubbly").

Composição editorial: seções numeradas (`01 / SOBRE`) com régua; cards **não** idênticos — projeto principal em moldura grande com metadados em coluna lateral; listas densas em tabela/linha; etiquetas técnicas em mono com borda de 1 px.

## Componentes de movimento (Swarm)
Veja `docs/SWARM.md`. Marque o que deve ser "construído" com `SwFrame`, `SwType` e `sw("block" | "media" | "chip" | "link" | "line")`; o design final nunca depende da animação.

## Acessibilidade
Foco visível (`:focus-visible`, 2 px `primary`), contraste AA, alvos ≥ 40 px no mobile, hierarquia `h1 → h2 → h3` sem pular, `prefers-reduced-motion` respeitado (animação desligada, conteúdo completo).
