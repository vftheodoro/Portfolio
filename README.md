# Portfólio — Victor Theodoro

Portfólio bilíngue (PT/EN) de Engenheiro de Software Júnior. Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, next-intl.

## Comandos

```bash
npm ci            # instala dependências
npm run dev       # desenvolvimento
npm run lint      # ESLint
npx tsc --noEmit  # tipos
npm test          # testes do motor Swarm (node --test)
npm run build     # build de produção
npm start         # serve o build
```

## Estrutura

- `src/app/[locale]` — layout, páginas, metadados, sitemap e robots.
- `src/components` — seções (`sections/`), projetos/estudos de caso (`projects/`), SEO (`seo/`), layout e Swarm (`swarm/`).
- `src/data` — projetos, skills e reconhecimentos tipados e localizados.
- `messages/{pt,en}.json` — textos.
- `src/lib/swarm` — motor da Swarm Build Experience (planner, timeline, controlador, renderer) com testes.
- `docs/` — `CONTENT_AUDIT.md`, `PROJECT_EVIDENCE.md`, `SWARM.md`, `DESIGN_SYSTEM.md`, capturas.
- `scripts/cv` — fontes HTML dos currículos (PDF gerado com Chrome headless para `public/cv`).

## Swarm Build Experience

Cursores distintos constroem as seções ao carregar e rolar. O conteúdo real está sempre no HTML; a camada é decorativa (`aria-hidden`, sem pointer events). Termina ao rolar rápido, navegar por âncora ou foco; respeita `prefers-reduced-motion`; tem botão "Pular animação" e controle no rodapé; versão reduzida em celular/baixa potência. Detalhes em `docs/SWARM.md`.

## Publicação

Nada é publicado automaticamente. O deploy (ex.: Vercel) deve ser feito só com autorização do responsável. O rodapé mantém a assinatura BYTHE (`BytheFooterCredit`); não remover.

## Conteúdo

Afirmações sem comprovação estão marcadas em `docs/CONTENT_AUDIT.md`. Não adicionar métricas, clientes ou resultados não verificados.
