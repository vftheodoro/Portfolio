# Swarm Experience — documentação técnica

Implementação **original**: vários cursores virtuais "constroem" a interface enquanto a página carrega e rola. Inspiração conceitual apenas (califa/swarm-site, Swarm Rebuild); nenhum código, recurso ou animação foi copiado.

## Princípios
1. **O conteúdo real nunca é recriado.** O HTML do servidor (SEO, leitor de tela) é o mesmo com ou sem animação. O Swarm só esconde/revela visualmente cada alvo (`data-sw`) via CSS até o elemento receber `data-sw-done`.
2. **Falha segura.** `html.swarm-on` só é posta por um script inline mínimo quando o movimento é permitido; se o JS do Swarm não subir em 6 s, a classe é removida; qualquer erro no `start()` mostra tudo. Sem JS: nada escondido. Impressão: nada escondido.
3. **Sem state React por quadro.** Um único `requestAnimationFrame`, ativo só enquanto há trabalho; progresso `--b` escrito direto no elemento; cursores são nós DOM atualizados só com `transform`/`opacity` (exceção documentada: o retângulo arrastado da moldura anima `width/height` de um filho absoluto pequeno, e os fantasmas de duplicação animam `width/height` de um nó fixo isolado por `contain`).

## Arquitetura
```
src/lib/swarm/            (puro, testável com node --test)
  types.ts      tipos          math.ts        easing + shape() por tipo
  presets.ts    coreografias declarativas por cena (data-sw-section)
  planner.ts    descritores -> tarefas (determinístico; nunca sobrepõe tarefas do mesmo cursor)
  timeline.ts   SectionTimeline: relógio, máquina de estados, quadros dos cursores, fantasmas
  cursorPath.ts onde o cursor "põe a mão" em cada tipo (canto, caret, varredura...)
  motion.ts     modo (full/reduced/off), velocidade por rolagem, FrameBudget
  controller.ts SwarmMotionController (DOM): descoberta, IntersectionObserver, rAF, flush
  cursorRenderer.ts  nós dos cursores e fantasmas na camada #sw-layer
src/components/swarm/
  SwarmBootScript.tsx  script inline (liga swarm-on + failsafe)
  SwarmExperience.tsx  monta controlador + camada + botão "Pular animação"
  SwarmToggle.tsx      preferência persistente (rodapé)
  Sw.tsx               SwSection, SwFrame, SwType, sw()
  swarm.css            estados de construção por tipo + cursores
```

## Como marcar o conteúdo
```tsx
<SwSection name="projects" id="projects">         {/* data-sw-section: escolhe o preset */}
  <SwFrame group="wacs">                          {/* moldura arrastada */}
    <SwType as="h3" text="WACS" />                {/* texto digitado */}
    <div {...sw("media")}><Image .../></div>      {/* 1º filho é recortado + linha de scan */}
    <p {...sw("block")}>...</p>                   {/* revelado de cima p/ baixo */}
    <span {...sw("chip")}>TypeScript</span>       {/* etiqueta posicionada */}
    <a {...sw("link")} href="...">GitHub</a>      {/* posicionado + clique do cursor */}
    <hr {...sw("line")} />                        {/* traço (axis "y" p/ vertical) */}
  </SwFrame>
</SwSection>
```
`group` (em `data-sw-group`, herdado do ancestral) agrupa elementos de um mesmo card; a ordem no DOM define a ordem de planejamento. Várias raízes podem compartilhar a mesma cena (o `Header` usa `data-sw-section="hero"` + `data-sw-fixed`).

Presets (`presets.ts`): `intro` (hero), `columns` (about, recognition), `mirror` (projects, alterna a coreografia por projeto e duplica moldura/chips), `timeline` (experience), `grid` (stack, duplica chips), `cascade` (ai, contact).

## Comportamento
- **Abertura:** a cena `hero` ativa ~280 ms após montar: moldura (cursor 1) → navegação (2) → nome digitado (3) → foto (4) → detalhes → links; ~3 s no total.
- **Rolagem:** cada cena ativa quando entra na viewport (IO, margem inferior 8%). Uma tarefa só começa quando o alvo está visível. Velocidade do relógio = 1× parado até 4,5× rolando. Acima de 5200 px/s as cenas ativas são concluídas. Cena totalmente acima da viewport é concluída sem cursores (âncora `#projects` na URL ou clique em `a[href^="#"]` conclui tudo acima do alvo).
- **Sem reconstrução:** alvo concluído recebe `data-sw-done` e nunca volta.
- **Teclado/foco:** foco em qualquer elemento da cena conclui a cena.
- **Camada de cursores:** `#sw-layer` fixa, `aria-hidden`, `pointer-events: none`, `contain: strict`: nunca intercepta clique, foco ou seleção.
- **Modos:** `full`; `reduced` (viewport < 768, ≤ 4 núcleos/≤ 4 GB, `saveData`, ou preferência `reduced`): até 3 cursores, durações ×0,6, sem chips/linhas/fantasmas/etiqueta de dimensões; `off` (`prefers-reduced-motion`, preferência `off`, botão "Pular animação", ou `FrameBudget` > 42 ms médios por 45+ quadros → degrada full → reduced → off). Preferência: `localStorage["swarm-motion"]` = `on | reduced | off`.

## Testes
`npm test` (Node `--experimental-strip-types`, sem dependência extra): determinismo do planner, ausência de sobreposição por cursor (todas as cenas, full e lite), presets distintos, ordem da abertura, monotonicidade do progresso, espera por visibilidade, aceleração, flush, aparição/saída de cursores, posição do cursor na moldura/digitação, fantasmas, seleção de modo, velocidade de rolagem e FrameBudget. A camada DOM é verificada manualmente/por navegador (ver relatório de QA).

## Limitações conhecidas
- Em celulares/baixo desempenho a versão é reduzida (decisão deliberada, documentada acima).
- A "digitação" revela caracteres por opacidade (o texto completo já está no DOM); quebras de linha usam palavras inteiras.
- Layout shift tardio (imagens sem dimensão) pode deslocar cursores até a próxima medição (cache de geometria de 600 ms); use `fill`/`aspect-ratio` nas mídias.
- Religar a animação no rodapé vale a partir da próxima visita.
