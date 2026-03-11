export interface Achievement {
  id: string;
  icon: "trophy" | "medal" | "star" | "award";
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  date: {
    pt: string;
    en: string;
  };
}

export const achievements: Achievement[] = [
  {
    id: "feteps",
    icon: "trophy",
    title: {
      pt: "7º Lugar — 16ª FETEPS",
      en: "7th Place — 16th FETEPS",
    },
    description: {
      pt: "Maior feira de tecnologia do Centro Paula Souza e da América Latina. Representante do projeto WACS.",
      en: "Largest technology fair of Centro Paula Souza and Latin America. Representative of the WACS project.",
    },
    date: {
      pt: "Outubro 2025",
      en: "October 2025",
    },
  },
  {
    id: "fetec_2025",
    icon: "trophy",
    title: {
      pt: "1º Lugar — 6ª FETEC (Votação Popular)",
      en: "1st Place — 6th FETEC (Popular Vote)",
    },
    description: {
      pt: "Melhor projeto por votação popular com o WACS na FETEC da ETEC de Registro.",
      en: "Best project by popular vote with WACS at FETEC, ETEC de Registro.",
    },
    date: {
      pt: "Outubro 2025",
      en: "October 2025",
    },
  },
  {
    id: "mocao",
    icon: "award",
    title: {
      pt: "Moção de Aplauso — Câmara Municipal",
      en: "Motion of Applause — City Council",
    },
    description: {
      pt: "Reconhecimento da Câmara Municipal de Registro pelo 7º lugar na FETEPS e inovação no Vale do Ribeira.",
      en: "Recognition from the Registro City Council for the 7th place at FETEPS and innovation in Vale do Ribeira.",
    },
    date: {
      pt: "Novembro 2024",
      en: "November 2024",
    },
  },
  {
    id: "fetec_2024",
    icon: "trophy",
    title: {
      pt: "1º Lugar — 5ª FETEC (Votação Popular)",
      en: "1st Place — 5th FETEC (Popular Vote)",
    },
    description: {
      pt: "Melhor projeto por votação popular com o projeto 'Educação Sexual'.",
      en: "Best project by popular vote with the 'Sexual Education' project.",
    },
    date: {
      pt: "Outubro 2024",
      en: "October 2024",
    },
  },
  {
    id: "fisiculturismo",
    icon: "medal",
    title: {
      pt: "1º Lugar — Campeonato Brasileiro de Fisiculturismo",
      en: "1st Place — Brazilian Bodybuilding Championship",
    },
    description: {
      pt: "Campeão na categoria Men's Physique Sub Junior (até 18 anos) no 7º Campeonato Brasileiro.",
      en: "Champion in Men's Physique Sub Junior (under 18) at the 7th Brazilian Championship.",
    },
    date: {
      pt: "Setembro 2024",
      en: "September 2024",
    },
  },
  {
    id: "robocode_estadual",
    icon: "medal",
    title: {
      pt: "2º Lugar — Torneio Estadual de RoboCode",
      en: "2nd Place — State RoboCode Tournament",
    },
    description: {
      pt: "Vice-campeão no Torneio Estadual de Robótica do Centro Paula Souza.",
      en: "Runner-up at the Centro Paula Souza State Robotics Tournament.",
    },
    date: {
      pt: "Setembro 2023",
      en: "September 2023",
    },
  },
  {
    id: "robocode_local",
    icon: "star",
    title: {
      pt: "1º Lugar — Campeonato de RoboCode ETEC",
      en: "1st Place — ETEC RoboCode Championship",
    },
    description: {
      pt: "Campeão do campeonato interno de RoboCode da ETEC de Registro.",
      en: "Champion of the ETEC de Registro internal RoboCode championship.",
    },
    date: {
      pt: "Agosto 2023",
      en: "August 2023",
    },
  },
];
