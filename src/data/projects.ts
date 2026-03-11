export interface Project {
  id: string;
  featured: boolean;
  awarded: boolean;
  image?: string;
  site?: string;
  github?: string;
  instagram?: string;
  technologies: string[];
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}

export const projects: Project[] = [
  {
    id: "wacs",
    featured: true,
    awarded: true,
    site: "https://www.appwacs.com.br",
    instagram: "https://instagram.com/wacs_etec",
    technologies: [
      "Python",
      "Arduino",
      "IoT",
      "IA",
      "React Native",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Google Maps API",
    ],
    title: {
      pt: "WACS — Wheelchair Automation Control System",
      en: "WACS — Wheelchair Automation Control System",
    },
    description: {
      pt: "Sistema inteligente de automação para cadeiras de rodas que promove independência para PCDs. Controle por voz, navegação assistida por IA, integração com dispositivos IoT e interface mobile intuitiva. Premiado na FETEPS (maior feira da América Latina) e reconhecido pela Câmara Municipal.",
      en: "Intelligent wheelchair automation system that promotes independence for people with disabilities. Voice control, AI-assisted navigation, IoT device integration, and intuitive mobile interface. Award-winning at FETEPS (largest tech fair in Latin America) and recognized by the City Council.",
    },
  },

  {
    id: "portfolio",
    featured: false,
    awarded: false,
    github: "https://github.com/vftheodoro",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    title: {
      pt: "Portfólio Pessoal",
      en: "Personal Portfolio",
    },
    description: {
      pt: "Este portfólio profissional, desenvolvido com Next.js, TypeScript e Tailwind CSS. Design dark mode moderno, bilíngue PT/EN e totalmente responsivo.",
      en: "This professional portfolio, built with Next.js, TypeScript, and Tailwind CSS. Modern dark mode design, bilingual PT/EN, and fully responsive.",
    },
  },
];
