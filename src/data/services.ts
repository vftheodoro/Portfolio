export interface ServiceFeature {
  pt: string;
  en: string;
}

export interface Service {
  id: "support" | "infrastructure" | "training" | "solutions";
  icon: "support" | "network" | "training" | "solutions";
  features: ServiceFeature[];
}

export const services: Service[] = [
  {
    id: "support",
    icon: "support",
    features: [
      { pt: "Computadores e periféricos", en: "Computers and peripherals" },
      { pt: "Suporte remoto e presencial", en: "Remote and on-site support" },
      { pt: "Manutenção preventiva", en: "Preventive maintenance" },
      { pt: "Orientação aos usuários", en: "User guidance" }
    ]
  },
  {
    id: "infrastructure",
    icon: "network",
    features: [
      { pt: "Redes e Wi-Fi", en: "Networks and Wi-Fi" },
      { pt: "Roteadores e equipamentos", en: "Routers and equipment" },
      { pt: "Organização de infraestrutura", en: "Infrastructure organization" },
      { pt: "Backups e segurança básica", en: "Backups and baseline security" }
    ]
  },
  {
    id: "training",
    icon: "training",
    features: [
      { pt: "Informática e produtividade", en: "Computing and productivity" },
      { pt: "Windows, internet e Excel", en: "Windows, internet, and Excel" },
      { pt: "Empregabilidade digital", en: "Digital employability" },
      { pt: "Conteúdo sob medida", en: "Tailored content" }
    ]
  },
  {
    id: "solutions",
    icon: "solutions",
    features: [
      { pt: "Sites e sistemas", en: "Websites and systems" },
      { pt: "Automação de processos", en: "Process automation" },
      { pt: "Implantação de ferramentas", en: "Tool implementation" },
      { pt: "Integrações e projetos especiais", en: "Integrations and special projects" }
    ]
  }
];
