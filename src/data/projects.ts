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
      pt: "Projeto de tecnologia assistiva de baixo custo que integra aplicativo mobile, Arduino, Bluetooth, sensores e mapeamento de acessibilidade. O protótipo funcional foi apresentado na FETEPS e recebeu reconhecimento público em Registro.",
      en: "A low-cost assistive technology project integrating a mobile app, Arduino, Bluetooth, sensors, and accessibility mapping. The functional prototype was presented at FETEPS and received public recognition in Registro, Brazil.",
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
      pt: "Plataforma comercial e administrativa para uma operação de impressão 3D, com catálogo, gestão de produtos, indicadores, cálculo de custos e controle de acesso.",
      en: "A commercial and administrative platform for a 3D printing operation, with catalog, product management, metrics, cost calculation, and access control.",
    },
  },


];
