import type { L } from "./l10n";

/*
 * Reconhecimentos verificáveis. Só entra o que tem fonte pública e foi lido na
 * auditoria (docs/CONTENT_AUDIT.md, seções 3.8 e 3.9).
 *
 * Omitidos de propósito (para o chefe decidir com fonte):
 * - 1º lugar nas FETEC 2024 e 2025 (votação popular) e RoboCode interno de 2023:
 *   só constam do currículo, sem fonte pública.
 * - Moção de Aplauso: o post é de um vereador e a moção é à Etec de Registro, não cita
 *   o WACS nem Victor; falta documento oficial.
 * - Cartões de CNN Brasil e Estadão: apontavam para posts do Instagram e usavam
 *   imagens trocadas; não são republicados.
 * - Fisiculturismo e demais conquistas pessoais não técnicas.
 */

export interface SourceLink {
  label: L;
  href: string;
  /** Observação curta e honesta sobre o que a fonte confirma. */
  note?: L;
}

export interface Recognition {
  id: string;
  year: string;
  title: L;
  subject: L;
  statement: L;
  sources: SourceLink[];
}

export const recognitions: Recognition[] = [
  {
    id: "feteps-2025",
    year: "2025",
    title: { pt: "7º lugar na 16ª FETEPS", en: "7th place at the 16th FETEPS" },
    subject: { pt: "Projeto WACS · Etec Registro · Centro Paula Souza", en: "WACS project · Etec Registro · Centro Paula Souza" },
    statement: {
      pt: "Resultado publicado pela Etec Registro em matéria que cita Victor entre os estudantes da equipe. Reconhecimento da equipe do projeto, não individual.",
      en: "Result published by Etec Registro in an article that names Victor among the team's students. Recognition of the project team, not individual.",
    },
    sources: [
      {
        label: { pt: "Etec Registro: alunos são destaques na 16ª FETEPS", en: "Etec Registro: students stand out at the 16th FETEPS" },
        href: "https://etecregistro.cps.sp.gov.br/alunos-da-etec-de-registro-sao-destaques-na-16a-feira-de-tecnologia-do-centro-paula-souza/",
        note: { pt: "confirma o 7º lugar e cita Victor", en: "confirms 7th place and names Victor" },
      },
      {
        label: { pt: "FETEPS: página do projeto WACS", en: "FETEPS: WACS project page" },
        href: "https://feteps.cps.sp.gov.br/projetos/wacs-autonomia-inteligente-para-pcds/",
        note: { pt: "página oficial do projeto na feira", en: "official project page at the fair" },
      },
    ],
  },
  {
    id: "robocode-2023",
    year: "2023",
    title: { pt: "2º lugar no 11º Torneio de RoboCode", en: "2nd place at the 11th RoboCode Tournament" },
    subject: { pt: "Robô BarbieScript · Etec Registro · Centro Paula Souza", en: "BarbieScript robot · Etec Registro · Centro Paula Souza" },
    statement: {
      pt: "Resultado de 29/09/2023 publicado pelo Centro Paula Souza, com a equipe da Etec Registro, da qual Victor fez parte.",
      en: "Result from 2023-09-29 published by Centro Paula Souza, listing the Etec Registro team that Victor was part of.",
    },
    sources: [
      {
        label: { pt: "Robótica CPS: 11º Torneio de RoboCode", en: "CPS Robotics: 11th RoboCode Tournament" },
        href: "https://robotica.cps.sp.gov.br/robocode-2023/",
        note: { pt: "resultado e equipe", en: "result and team" },
      },
    ],
  },
];

export interface PressRef {
  id: string;
  outlet: string;
  title: L;
  href: string;
  note?: L;
}

/** Matérias e páginas oficiais sobre o WACS (todas com resposta HTTP 200 e texto lido na auditoria). */
export const pressRefs: PressRef[] = [
  {
    id: "cps",
    outlet: "Centro Paula Souza",
    title: {
      pt: "Grupo da Etec Registro cria cadeira de rodas com sistema de acessibilidade inteligente",
      en: "Etec Registro group creates a wheelchair with an intelligent accessibility system",
    },
    href: "https://www.cps.sp.gov.br/grupo-da-etec-registro-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente/",
    note: { pt: "cita Victor", en: "names Victor" },
  },
  {
    id: "etec",
    outlet: "Etec Registro",
    title: {
      pt: "Alunos da Etec de Registro são destaques na 16ª Feira de Tecnologia do Centro Paula Souza",
      en: "Etec Registro students stand out at Centro Paula Souza's 16th technology fair",
    },
    href: "https://etecregistro.cps.sp.gov.br/alunos-da-etec-de-registro-sao-destaques-na-16a-feira-de-tecnologia-do-centro-paula-souza/",
    note: { pt: "cita Victor", en: "names Victor" },
  },
  {
    id: "abc",
    outlet: "ABC do ABC",
    title: { pt: "Etec projeta cadeira de rodas inteligente", en: "Etec designs an intelligent wheelchair" },
    href: "https://abcdoabc.com.br/etec-projeta-cadeira-de-rodas-inteligente/",
    note: { pt: "cita Victor", en: "names Victor" },
  },
  {
    id: "regiao-hoje",
    outlet: "Região Hoje",
    title: {
      pt: "Grupo de Etec cria cadeira de rodas com sistema de acessibilidade inteligente",
      en: "Etec group creates a wheelchair with an intelligent accessibility system",
    },
    href: "https://www.regiaohoje.com.br/noticia/38090/santa-barbara/brasil/grupo-de-etec-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente.html",
    note: { pt: "texto equivalente ao da matéria do CPS", en: "text equivalent to the CPS article" },
  },
];
