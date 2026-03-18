export interface Project {
  id: string;
  featured: boolean;
  awarded: boolean;
  image?: string;
  icon?: string;
  site?: string;
  github?: string;
  instagram?: string;
  technologies: string[];
  screenshots?: { src: string; alt: string }[];
  gallery?: { src: string; alt: string }[];
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
    icon: "/images/wacs/logo.png",
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
    screenshots: [
      { src: "/images/wacs/login.jpeg", alt: "WACS Login" },
      { src: "/images/wacs/home.jpeg", alt: "WACS Home" },
      { src: "/images/wacs/control.jpeg", alt: "WACS Control" },
      { src: "/images/wacs/bluetooth.png", alt: "WACS Bluetooth" },
      { src: "/images/wacs/locations.jpeg", alt: "WACS Locations" },
      { src: "/images/wacs/profile.jpeg", alt: "WACS Profile" },
      { src: "/images/wacs/security.jpeg", alt: "WACS Security" },
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
    id: "printh3d",
    featured: true,
    awarded: false,
    site: "https://printh3d.vercel.app/",
    icon: "/images/printh/logo_printh.png",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "Chart.js",
    ],
    screenshots: [
      { src: "/images/printh/inicio.png", alt: "Página Inicial" },
      { src: "/images/printh/catalago.png", alt: "Catálogo de Produtos" },
      { src: "/images/printh/informacoes.png", alt: "Informações Técnicas" },
      { src: "/images/printh/contato.png", alt: "Página de Contato" },
      { src: "/images/printh/graficos_admin.png", alt: "Dashboard Administrativo" },
      { src: "/images/printh/produtos_admin.png", alt: "Gerenciamento de Produtos" },
      { src: "/images/printh/calculadora_admin.png", alt: "Calculadora de Custos" },
    ],
    title: {
      pt: "Printh3D — Manufatura, Vendas e Gestão",
      en: "Printh3D — Manufacturing, Sales and Management",
    },
    description: {
      pt: "Ecossistema Full-Stack completo para manufatura aditiva, integrando um catálogo dinâmico de vendas a um painel administrativo robusto. Inclui gestão de KPIs, calculadora inteligente de custos industriais, controle de estoque e segurança avançada com JWT.",
      en: "Full-Stack ecosystem for additive manufacturing, combining a dynamic sales catalog with a robust administrative dashboard. Features KPI management, intelligent industrial cost calculator, inventory control, and advanced security with JWT.",
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
