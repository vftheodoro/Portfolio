export interface ServiceFeature {
  pt: string;
  en: string;
}

export interface Service {
  id: string;
  icon: string;
  features: ServiceFeature[];
}

export const services: Service[] = [
  {
    id: "websites",
    icon: "globe",
    features: [
      { pt: "Design responsivo", en: "Responsive design" },
      { pt: "Otimizado para SEO", en: "SEO optimized" },
      { pt: "Alta performance", en: "High performance" },
      { pt: "Painel administrativo", en: "Admin panel" },
    ],
  },
  {
    id: "mobile",
    icon: "smartphone",
    features: [
      { pt: "iOS e Android", en: "iOS and Android" },
      { pt: "React Native", en: "React Native" },
      { pt: "Interface intuitiva", en: "Intuitive UI" },
      { pt: "Integração com APIs", en: "API integration" },
    ],
  },
  {
    id: "systems",
    icon: "server",
    features: [
      { pt: "Fullstack sob medida", en: "Custom fullstack" },
      { pt: "Banco de dados", en: "Database design" },
      { pt: "Autenticação segura", en: "Secure authentication" },
      { pt: "Dashboard analítico", en: "Analytics dashboard" },
    ],
  },
  {
    id: "iot",
    icon: "cpu",
    features: [
      { pt: "Arduino & sensores", en: "Arduino & sensors" },
      { pt: "Integração IoT", en: "IoT integration" },
      { pt: "Monitoramento remoto", en: "Remote monitoring" },
      { pt: "Automação inteligente", en: "Smart automation" },
    ],
  },
];
