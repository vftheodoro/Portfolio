# Victor Theodoro — Portfólio de Engenharia de Software

Portfólio bilíngue (PT/EN) de Victor Theodoro, Engenheiro de Software Júnior (Backend & Full Stack): projetos com estudos de caso, experiência, uso responsável de IA, stack e contato. Next.js 16 (App Router), React 19, TypeScript, Tailwind 4 e next-intl.

**Portfólio:** https://vftheodoro.vercel.app/pt · **English:** https://vftheodoro.vercel.app/en · **LinkedIn:** https://www.linkedin.com/in/vftheodoro/

## Executar localmente

```bash
git clone https://github.com/vftheodoro/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Abra http://localhost:3000. As rotas são localizadas em `/pt` e `/en`.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento local |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Verificação de tipos |
| `npm test` | Testes do motor Swarm (`node --test`) |
| `npm run build` | Build de produção |
| `npm start` | Serve o build |

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

## Manutenção e conteúdo

Edite projetos em `src/data` e textos em `messages`, revisando PT e EN juntos. Afirmações sem comprovação estão marcadas em `docs/CONTENT_AUDIT.md`; não adicionar métricas, clientes ou resultados não verificados, e descrever com clareza o que é implementado, protótipo e planejado. Nenhuma credencial deve ser commitada. O rodapé mantém a assinatura BYTHE (`BytheFooterCredit`); não remover.
