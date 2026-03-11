export interface PressItem {
  id: string;
  source: string;
  type: "article" | "interview" | "social";
  url: string;
  image?: string;
  logo?: string;
  title: {
    pt: string;
    en: string;
  };
}

export const pressItems: PressItem[] = [
  {
    id: "cnn",
    source: "CNN Brasil",
    type: "interview",
    url: "https://www.instagram.com/p/DPQr2keDQy4/",
    image: "/Portfolio/images/press/cnn.jpg",
    logo: "/Portfolio/images/press/cnn-logo.png",
    title: {
      pt: "Entrevista sobre o projeto WACS",
      en: "Interview about the WACS project",
    },
  },
  {
    id: "estadao",
    source: "Estadão",
    type: "interview",
    url: "https://www.instagram.com/p/DQj8IxEkdov/",
    image: "/Portfolio/images/press/estadao.jpg",
    logo: "/Portfolio/images/press/estadao-logo.png",
    title: {
      pt: "Entrevista sobre tecnologia assistiva",
      en: "Interview about assistive technology",
    },
  },
  {
    id: "cps",
    source: "Centro Paula Souza",
    type: "article",
    url: "https://www.cps.sp.gov.br/grupo-da-etec-registro-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente/",
    image: "/Portfolio/images/press/equipe-vereador.png",
    title: {
      pt: "Grupo da Etec Registro cria cadeira de rodas com sistema de acessibilidade inteligente",
      en: "ETEC Registro group creates wheelchair with intelligent accessibility system",
    },
  },
  {
    id: "feteps",
    source: "FETEPS Oficial",
    type: "article",
    url: "https://feteps.cps.sp.gov.br/projetos/wacs-autonomia-inteligente-para-pcds/",
    image: "/Portfolio/images/press/prototipo.jpg",
    title: {
      pt: "WACS — Autonomia inteligente para PCDs",
      en: "WACS — Intelligent autonomy for people with disabilities",
    },
  },
  {
    id: "etec_feteps",
    source: "Etec Registro",
    type: "article",
    url: "https://etecregistro.cps.sp.gov.br/alunos-da-etec-de-registro-sao-destaques-na-16a-feira-de-tecnologia-do-centro-paula-souza/",
    image: "/Portfolio/images/press/camara-vereador.png",
    title: {
      pt: "Alunos da Etec de Registro são destaques na 16ª FETEPS",
      en: "ETEC Registro students stand out at the 16th FETEPS",
    },
  },
  {
    id: "regiao_hoje",
    source: "Região Hoje",
    type: "article",
    url: "https://www.regiaohoje.com.br/noticia/38090/santa-barbara/brasil/grupo-de-etec-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente.html",
    image: "/Portfolio/images/press/estadao-jornal.jpg",
    title: {
      pt: "Grupo de Etec cria cadeira de rodas com sistema de acessibilidade inteligente",
      en: "ETEC group creates wheelchair with intelligent accessibility system",
    },
  },
  {
    id: "abc",
    source: "ABC do ABC",
    type: "article",
    url: "https://abcdoabc.com.br/etec-projeta-cadeira-de-rodas-inteligente/",
    title: {
      pt: "Etec projeta cadeira de rodas inteligente",
      en: "ETEC designs intelligent wheelchair",
    },
  },
  {
    id: "robotica",
    source: "Robótica CPS",
    type: "article",
    url: "https://robotica.cps.sp.gov.br/11o-torneio-de-robocode/",
    title: {
      pt: "11º Torneio de Robocode",
      en: "11th RoboCode Tournament",
    },
  },
  {
    id: "camara",
    source: "Câmara Municipal de Registro",
    type: "social",
    url: "https://www.instagram.com/p/DRhNkyNiKor/",
    image: "/Portfolio/images/press/camara-mocao.png",
    title: {
      pt: "Moção de Aplauso pelo projeto WACS",
      en: "Motion of Applause for the WACS project",
    },
  },
];
