import { useLocale } from "next-intl";
import { toLang, type Lang } from "@/data/l10n";
import { SwFrame, SwSection, sw } from "@/components/swarm/Sw";
import SectionHead from "@/components/projects/SectionHead";

interface Copy {
  label: string;
  title: string;
  accent: string;
  lead: string;
  flowTitle: string;
  flow: { title: string; body: string }[];
  usesTitle: string;
  uses: { title: string; body: string }[];
  humanTitle: string;
  humanLead: string;
  human: string[];
  limitsTitle: string;
  limits: string[];
}

const copy: Record<Lang, Copy> = {
  pt: {
    label: "IA",
    title: "Engenharia com",
    accent: "IA",
    lead: "IA é uma ferramenta de trabalho, não um substituto de julgamento. Uso Claude Code e OpenAI Codex para desenvolver, investigar, automatizar e organizar fluxos de trabalho, com requisitos escritos, revisão técnica e testes antes de qualquer decisão.",
    flowTitle: "Fluxo de trabalho",
    flow: [
      { title: "Requisito", body: "Descrevo o problema, os critérios de aceite e as restrições antes de pedir qualquer código." },
      { title: "Plano", body: "Peço um plano, reviso as premissas e corto escopo. Plano ruim só produz código ruim mais depressa." },
      { title: "Implementação assistida", body: "Claude Code ou Codex implementam em passos pequenos e verificáveis, dentro do repositório e das convenções do projeto." },
      { title: "Revisão técnica", body: "Leio o diff como em qualquer revisão: correção, segurança, dependências novas e manutenção." },
      { title: "Testes", body: "Rodo lint, tipos e testes e confiro o resultado no navegador ou no ambiente. \"Funciona\" só vale depois de executar." },
      { title: "Decisão humana", body: "Eu aceito, ajusto ou descarto. A responsabilidade pelo que é entregue continua sendo minha." },
    ],
    usesTitle: "Onde uso",
    uses: [
      { title: "Desenvolvimento", body: "geração e refatoração de código com o contexto do repositório." },
      { title: "Investigação", body: "leitura de código desconhecido, logs e mensagens de erro para levantar hipóteses." },
      { title: "Automação", body: "scripts e tarefas repetitivas." },
      { title: "Fluxos de trabalho", body: "documentação, checklists e preparação de revisões." },
    ],
    humanTitle: "O que continua humano",
    humanLead: "Ficam sob responsabilidade de quem assina o trabalho:",
    human: ["Código", "Arquitetura", "Segurança", "Testes", "Qualidade"],
    limitsTitle: "Limites",
    limits: [
      "IA é ferramenta de trabalho. Não sou especialista em machine learning e não apresento aqui sistemas de IA em produção.",
      "Não publico números de produtividade: não há medição que os sustente.",
      "Saída de modelo não é fonte de verdade. Vale o que foi revisado e executado.",
    ],
  },
  en: {
    label: "AI",
    title: "Engineering with",
    accent: "AI",
    lead: "AI is a work tool, not a substitute for judgment. I use Claude Code and OpenAI Codex to build, investigate, automate and organize workflows, with written requirements, technical review and tests before any decision.",
    flowTitle: "Workflow",
    flow: [
      { title: "Requirement", body: "I describe the problem, the acceptance criteria and the constraints before asking for any code." },
      { title: "Plan", body: "I ask for a plan, review its assumptions and cut scope. A bad plan only produces bad code faster." },
      { title: "Assisted implementation", body: "Claude Code or Codex implement in small, verifiable steps, inside the repository and the project's conventions." },
      { title: "Technical review", body: "I read the diff as in any review: correctness, security, new dependencies and maintainability." },
      { title: "Tests", body: "I run lint, types and tests and check the result in the browser or the environment. \"It works\" only counts once it has run." },
      { title: "Human decision", body: "I accept, adjust or discard. Responsibility for what ships stays with me." },
    ],
    usesTitle: "Where I use it",
    uses: [
      { title: "Development", body: "code generation and refactoring with repository context." },
      { title: "Investigation", body: "reading unfamiliar code, logs and error messages to form hypotheses." },
      { title: "Automation", body: "scripts and repetitive tasks." },
      { title: "Workflows", body: "documentation, checklists and review preparation." },
    ],
    humanTitle: "What stays human",
    humanLead: "These remain the responsibility of whoever signs the work:",
    human: ["Code", "Architecture", "Security", "Tests", "Quality"],
    limitsTitle: "Limits",
    limits: [
      "AI is a work tool. I am not a machine learning specialist and I do not present AI systems in production here.",
      "I publish no productivity numbers: there is no measurement to support them.",
      "Model output is not a source of truth. What counts is what was reviewed and executed.",
    ],
  },
};

/** 04 / IA: IA como ferramenta, fluxo de trabalho com responsabilidade humana e limites honestos. */
export default function AiEngineering() {
  const lang = toLang(useLocale());
  const c = copy[lang];

  return (
    <SwSection name="ai" id="ai" aria-labelledby="ai-title" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead id="ai-title" index="04" label={c.label} title={c.title} accent={c.accent} lead={c.lead} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <SwFrame group="ai-flow" className="p-5 sm:p-8">
            <h3 className="label mb-2">{c.flowTitle}</h3>
            <ol>
              {c.flow.map((s, i) => (
                <li
                  key={s.title}
                  className="grid gap-x-5 gap-y-1 border-t border-border py-5 first:border-t-0 sm:grid-cols-[2.5rem_11rem_minmax(0,1fr)]"
                  {...sw("block")}
                >
                  <span aria-hidden="true" className="font-mono text-sm text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold text-foreground">{s.title}</h4>
                  <p className="text-sm leading-[1.65] text-muted sm:col-start-3">{s.body}</p>
                </li>
              ))}
            </ol>
          </SwFrame>

          <div className="grid grid-cols-1 content-start gap-10">
            <SwFrame group="ai-uses" className="p-5 sm:p-8">
              <h3 className="label mb-4">{c.usesTitle}</h3>
              <dl className="grid grid-cols-1 gap-4">
                {c.uses.map((u) => (
                  <div key={u.title} {...sw("block")}>
                    <dt className="font-semibold text-foreground">{u.title}</dt>
                    <dd className="mt-0.5 text-sm leading-[1.6] text-muted">{u.body}</dd>
                  </div>
                ))}
              </dl>
            </SwFrame>

            <SwFrame group="ai-human" className="p-5 sm:p-8">
              <h3 className="label mb-3">{c.humanTitle}</h3>
              <p className="mb-4 text-sm leading-[1.6] text-muted" {...sw("block")}>
                {c.humanLead}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {c.human.map((h) => (
                  <li
                    key={h}
                    {...sw("chip")}
                    className="rounded-[3px] border border-border-strong px-2.5 py-1.5 font-mono text-[0.75rem] leading-none text-foreground"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </SwFrame>
          </div>
        </div>

        <SwFrame group="ai-limits" className="mt-10 p-5 sm:p-8">
          <h3 className="label mb-4 flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2 rounded-full bg-warn" />
            {c.limitsTitle}
          </h3>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-8">
            {c.limits.map((l) => (
              <li key={l} className="text-sm leading-[1.65] text-muted" {...sw("block")}>
                {l}
              </li>
            ))}
          </ul>
        </SwFrame>
      </div>
    </SwSection>
  );
}
