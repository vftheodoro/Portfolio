import type { L } from "./l10n";

/*
 * Stack por categoria. Só entram tecnologias com evidência em repositório público,
 * no currículo ou na auditoria (docs/CONTENT_AUDIT.md, docs/PROJECT_EVIDENCE.md).
 * Fora de propósito: AWS, Google Cloud, Docker, Figma, Postman, Android Studio, C# e
 * "IA/Node no WACS" (sem evidência; só voltam com confirmação e projeto que prove).
 */

/**
 * own: usado em projeto público, com autoria documentada.
 * team: presente em projeto público de equipe; autoria individual não comprovada.
 * reported: relatado (currículo ou prática de trabalho) sem projeto público que comprove.
 */
export type Evidence = "own" | "team" | "reported";

export interface StackItem {
  name: L;
  evidence: Evidence;
}

export interface StackCategory {
  id: string;
  title: L;
  items: StackItem[];
}

/** Mesmo nome nos dois idiomas. */
const same = (name: string): L => ({ pt: name, en: name });

export const evidenceLegend: Record<Evidence, L> = {
  own: { pt: "Usado em projeto público, com autoria documentada", en: "Used in a public project, with documented authorship" },
  team: { pt: "Presente em projeto público de equipe; autoria individual não comprovada", en: "Present in a public team project; individual authorship not proven" },
  reported: { pt: "Relatado, sem projeto público que comprove", en: "Reported, with no public project to prove it" },
};

export const stackCategories: StackCategory[] = [
  {
    id: "backend",
    title: { pt: "Backend", en: "Backend" },
    items: [
      { name: same("Node.js"), evidence: "own" },
      { name: same("TypeScript"), evidence: "own" },
      { name: { pt: "Next.js (rotas de API)", en: "Next.js (API routes)" }, evidence: "own" },
      { name: same("Zod"), evidence: "own" },
      { name: { pt: "JWT (jose) e bcryptjs", en: "JWT (jose) and bcryptjs" }, evidence: "own" },
      { name: same("Java"), evidence: "own" },
      { name: same("Python"), evidence: "team" },
      { name: same("PHP"), evidence: "team" },
    ],
  },
  {
    id: "frontend",
    title: { pt: "Frontend", en: "Frontend" },
    items: [
      { name: same("React"), evidence: "own" },
      { name: same("Next.js (App Router)"), evidence: "own" },
      { name: same("TypeScript"), evidence: "own" },
      { name: same("Tailwind CSS"), evidence: "own" },
      { name: { pt: "HTML, CSS e JavaScript", en: "HTML, CSS and JavaScript" }, evidence: "own" },
      { name: { pt: "React Native e Expo", en: "React Native and Expo" }, evidence: "own" },
      { name: same("TanStack Query"), evidence: "own" },
      { name: same("React Hook Form"), evidence: "own" },
      { name: same("Framer Motion"), evidence: "own" },
      { name: same("Chart.js"), evidence: "own" },
      { name: same("Bootstrap"), evidence: "own" },
    ],
  },
  {
    id: "cloud",
    title: { pt: "Cloud e dados", en: "Cloud and data" },
    items: [
      { name: same("Supabase"), evidence: "own" },
      { name: same("PostgreSQL"), evidence: "own" },
      { name: same("Firebase (Auth, Firestore, Storage)"), evidence: "own" },
      { name: same("Google Maps (react-native-maps)"), evidence: "own" },
      { name: { pt: "Vercel (deploy)", en: "Vercel (deployment)" }, evidence: "own" },
      { name: same("GitHub Pages"), evidence: "own" },
      { name: same("SQL"), evidence: "team" },
    ],
  },
  {
    id: "devops",
    title: { pt: "DevOps e qualidade", en: "DevOps and quality" },
    items: [
      { name: { pt: "Git e GitHub", en: "Git and GitHub" }, evidence: "own" },
      { name: same("Vitest"), evidence: "own" },
      { name: same("Testing Library"), evidence: "own" },
      { name: same("Playwright"), evidence: "own" },
      { name: { pt: "axe-core (acessibilidade)", en: "axe-core (accessibility)" }, evidence: "own" },
      { name: same("ESLint"), evidence: "own" },
      { name: { pt: "Migrations versionadas (Supabase)", en: "Versioned migrations (Supabase)" }, evidence: "own" },
      { name: same("Linux"), evidence: "reported" },
      { name: { pt: "Redes e segurança (cursos Cisco)", en: "Networking and security (Cisco courses)" }, evidence: "reported" },
    ],
  },
  {
    id: "ai",
    title: { pt: "Automação e desenvolvimento assistido por IA", en: "Automation and AI-assisted development" },
    items: [
      { name: same("Claude Code"), evidence: "reported" },
      { name: same("OpenAI Codex"), evidence: "reported" },
      { name: { pt: "Scripts de migração e análise de dados (Firestore)", en: "Data migration and analysis scripts (Firestore)" }, evidence: "own" },
    ],
  },
  {
    id: "iot",
    title: { pt: "IoT e embarcados", en: "IoT and embedded" },
    items: [
      { name: same("BLE (react-native-ble-plx)"), evidence: "own" },
      { name: same("Arduino (C++)"), evidence: "team" },
      { name: same("ESP32"), evidence: "team" },
      { name: same("HC-05 (Bluetooth serial)"), evidence: "team" },
      { name: { pt: "HC-SR04 (ultrassom)", en: "HC-SR04 (ultrasonic)" }, evidence: "team" },
      { name: { pt: "Ponte H (L293D)", en: "H-bridge (L293D)" }, evidence: "team" },
      { name: { pt: "Tinkercad (simulação)", en: "Tinkercad (simulation)" }, evidence: "team" },
    ],
  },
];
