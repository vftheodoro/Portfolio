import type { L } from "./l10n";

/*
 * Estudos de caso e outros projetos.
 * Fonte primária: docs/PROJECT_EVIDENCE.md (leitura dos repositórios em 2026-11-17).
 * Regras: nada além do que o código/README prova; separar IMPLEMENTADO / PROTÓTIPO /
 * PLANEJADO-NÃO VERIFICADO; nenhum dado de cliente, credencial ou marca de terceiros.
 *
 * Decisões editoriais (para o chefe):
 * - Porto de Registro: OMITIDO de propósito. O site e o repositório exibem nome, CNPJ,
 *   logos e brasões de terceiros e se apresentam como "oficiais", sem autorização
 *   documentada. Uma linha sem link não traria evidência verificável. Reincluir como
 *   "portal de consulta de horários (demonstração)" só após autorização ou após
 *   tornar o projeto explicitamente independente e sem marcas.
 * - Sites de clientes BYTHE: não exibidos (exigem autorização do cliente).
 * - App-React-CRUD aparece sem link (há credenciais em api/config.php no repositório).
 * - Não usadas: imagem do chat do WACS (dados de terceiros), appwacs.com.br (DNS morto).
 * - Capturas do admin do Printh3D: só a calculadora (sem dados). Dashboard e lista de
 *   produtos do admin NÃO são usados (valores e estoque aparentam dados reais).
 */

export type Tone = "default" | "ok" | "warn" | "planned";
export type Side = "t" | "r" | "b" | "l";

export interface DiagramNode {
  id: string;
  col: number;
  row: number;
  label: L;
  sub?: L;
  tone?: Tone;
  /** Usado só na descrição textual de nós sem conexão. */
  note?: L;
}

export interface DiagramEdge {
  from: string;
  fromSide: Side;
  fromOff?: number;
  to: string;
  toSide: Side;
  toOff?: number;
  /** Rótulo curto dentro do SVG (só aparece se couber). */
  label?: L;
  /** Frase usada na descrição textual (cai no rótulo se faltar). */
  note?: L;
  dashed?: boolean;
}

export interface Diagram {
  title: L;
  description: L;
  cols: number;
  rows: number;
  w: number;
  h: number;
  gx: number;
  gy: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  legend: { tone: Tone; dashedEdge?: boolean; label: L }[];
}

export interface CaseImage {
  src: string;
  width: number;
  height: number;
  alt: L;
  caption: L;
}

export interface CaseLink {
  kind: "github" | "demo" | "reference";
  label: L;
  href: string;
}

export interface Tech {
  name: string;
  /** "team": parte do projeto em equipe cuja autoria individual não é comprovada. */
  scope?: "own" | "team";
}

export interface StatusPanel {
  implemented: L[];
  prototype: L[];
  planned: L[];
}

export interface CaseStudy {
  id: string;
  shortName: string;
  fullName?: L;
  kind: L;
  lead: L;
  role: L;
  period: L;
  authorship: L;
  recognition?: L;
  tech: Tech[];
  links: CaseLink[];
  images: CaseImage[];
  /** razão largura/altura do palco da galeria: [mobile, desktop] */
  stageRatio: [string, string];
  problem: L;
  context: L;
  built: L[];
  diagram: Diagram;
  status: StatusPanel;
  decisions: { title: L; body: L }[];
  difficulties: L[];
  verification: L[];
  result: L;
  limits: L[];
}

export interface OtherProject {
  id: string;
  name: string;
  tag: L;
  description: L;
  tech: string[];
  links: CaseLink[];
}

/* ------------------------------------------------------------------ */
/* 1. Printh3D                                                         */
/* ------------------------------------------------------------------ */

const printh3d: CaseStudy = {
  id: "printh3d",
  shortName: "Printh3D",
  kind: {
    pt: "Plataforma web · catálogo público e painel administrativo",
    en: "Web platform · public catalog and admin panel",
  },
  lead: {
    pt: "Site público com catálogo e calculadora de orçamento, mais um painel administrativo para operar o negócio (produtos, vendas, clientes e gastos), em Next.js e Supabase.",
    en: "A public site with a catalog and quote calculator, plus an admin panel to run the business (products, sales, clients and expenses), built with Next.js and Supabase.",
  },
  role: {
    pt: "Desenvolvimento full stack, do modelo de dados ao painel.",
    en: "Full stack development, from the data model to the admin panel.",
  },
  period: { pt: "Fev a jun/2026", en: "Feb to Jun 2026" },
  authorship: {
    pt: "Autoria individual: 27 de 27 commits do repositório.",
    en: "Sole author: 27 of 27 commits in the repository.",
  },
  tech: [
    { name: "Next.js 16 (App Router)" },
    { name: "React 19" },
    { name: "TypeScript" },
    { name: "Tailwind CSS 4" },
    { name: "Supabase" },
    { name: "PostgreSQL" },
    { name: "jose (JWT)" },
    { name: "bcryptjs" },
    { name: "Zod" },
    { name: "React Hook Form" },
    { name: "TanStack Query" },
    { name: "Chart.js" },
    { name: "Framer Motion" },
    { name: "Vitest" },
    { name: "Testing Library" },
    { name: "Playwright" },
    { name: "axe-core" },
  ],
  links: [
    { kind: "github", label: { pt: "Repositório no GitHub", en: "GitHub repository" }, href: "https://github.com/vftheodoro/Printh3D" },
    { kind: "demo", label: { pt: "Site no ar", en: "Live site" }, href: "https://printh3d.vercel.app/" },
  ],
  images: [
    {
      src: "/images/printh/inicio.png",
      width: 1919,
      height: 945,
      alt: { pt: "Página inicial do site público do Printh3D, com chamada para o catálogo.", en: "Home page of the public Printh3D site, with a call to the catalog." },
      caption: { pt: "Início do site público", en: "Public site home" },
    },
    {
      src: "/images/printh/catalago.png",
      width: 1919,
      height: 949,
      alt: { pt: "Catálogo do Printh3D com cartões de produto, categoria e preço base.", en: "Printh3D catalog with product cards, category and base price." },
      caption: { pt: "Catálogo: produtos, categoria e preço base", en: "Catalog: products, category and base price" },
    },
    {
      src: "/images/printh/informacoes.png",
      width: 1920,
      height: 948,
      alt: { pt: "Guia de materiais do Printh3D comparando PLA e ABS.", en: "Printh3D materials guide comparing PLA and ABS." },
      caption: { pt: "Guia de materiais (PLA e ABS)", en: "Materials guide (PLA and ABS)" },
    },
    {
      src: "/images/printh/calculadora_admin.png",
      width: 1919,
      height: 955,
      alt: { pt: "Calculadora de custos do painel administrativo, com campos de peça, custos extras, resumo e preço sugerido, sem dados preenchidos.", en: "Admin cost calculator with part data, extra costs, summary and suggested price, with no data filled in." },
      caption: { pt: "Calculadora de custos do painel (sem dados reais)", en: "Admin cost calculator (no real data)" },
    },
  ],
  stageRatio: ["16 / 9", "2 / 1"],
  problem: {
    pt: "Uma operação de impressão 3D precisava de uma vitrine pública com orçamento e de um sistema interno para operar (produtos, vendas, clientes, gastos). A documentação do repositório descreve a migração de uma SPA estática com IndexedDB para uma aplicação com banco de dados e autenticação reais.",
    en: "A 3D printing operation needed a public storefront with quoting and an internal system to run it (products, sales, clients, expenses). The repository documentation describes the move from a static SPA backed by IndexedDB to an application with a real database and authentication.",
  },
  context: {
    pt: "Projeto individual, com site público em Server Components e painel em rotas protegidas. Dados e credenciais ficam fora do repositório; as capturas deste portfólio usam apenas telas públicas e uma tela do admin sem dados.",
    en: "Solo project, with a public site built on Server Components and an admin panel behind protected routes. Data and credentials stay out of the repository; the screenshots here use only public pages and one admin page with no data.",
  },
  built: [
    {
      pt: "Site público: catálogo, página de produto com variações e calculadora de orçamento que encaminha o pedido ao WhatsApp.",
      en: "Public site: catalog, product page with variations, and a quote calculator that hands the request over to WhatsApp.",
    },
    {
      pt: "Painel administrativo com 14 páginas e cerca de 20 rotas de API: produtos, categorias, vendas, clientes, gastos, promoções, calculadora de custos, lixeira, backup em JSON e usuários.",
      en: "Admin panel with 14 pages and about 20 API routes: products, categories, sales, clients, expenses, promotions, cost calculator, trash, JSON backup and users.",
    },
    {
      pt: "Autenticação própria: JWT em cookie httpOnly (jose), senhas com bcryptjs e um proxy.ts que protege rotas administrativas por prefixo e por papel, inclusive em métodos mutantes.",
      en: "Custom authentication: JWT in an httpOnly cookie (jose), bcryptjs password hashing, and a proxy.ts that protects admin routes by prefix and role, including on mutating methods.",
    },
    {
      pt: "Limite de tentativas de login (5 em 15 minutos), trilha de auditoria e validação de entrada com Zod, organizadas em módulos de domínio (auth, products, sales).",
      en: "Login rate limiting (5 attempts in 15 minutes), an audit trail and Zod input validation, organized into domain modules (auth, products, sales).",
    },
    {
      pt: "Cinco migrations versionadas, incluindo endurecimento do banco: schema private, remoção de policies públicas legadas e índices em chaves estrangeiras.",
      en: "Five versioned migrations, including database hardening: a private schema, removal of legacy public policies, and indexes on foreign keys.",
    },
  ],
  diagram: {
    title: { pt: "Arquitetura do Printh3D", en: "Printh3D architecture" },
    description: {
      pt: "Dois fluxos: o visitante lê o catálogo no site público, que consulta o Supabase, e pede orçamento pelo WhatsApp; o administrador entra pelo login, o proxy valida o JWT e os papéis, a API chama módulos com Zod, que acessam o Supabase só no servidor, e a API registra auditoria.",
      en: "Two flows: the visitor reads the catalog on the public site, which queries Supabase, and requests a quote through WhatsApp; the admin signs in, the proxy validates the JWT and roles, the API calls Zod-validated modules that reach Supabase from the server only, and the API writes an audit trail.",
    },
    cols: 4,
    rows: 4,
    w: 200,
    h: 64,
    gx: 40,
    gy: 38,
    nodes: [
      { id: "visitor", col: 0, row: 0, label: { pt: "Visitante", en: "Visitor" } },
      { id: "public", col: 1, row: 0, label: { pt: "Site público", en: "Public site" }, sub: { pt: "Server Components", en: "Server Components" }, tone: "ok" },
      { id: "quote", col: 1, row: 1, label: { pt: "Orçamento", en: "Quote" }, sub: { pt: "calculadora", en: "calculator" }, tone: "ok" },
      { id: "wa", col: 2, row: 1, label: { pt: "WhatsApp", en: "WhatsApp" } },
      { id: "db", col: 3, row: 1, label: { pt: "Supabase", en: "Supabase" }, sub: { pt: "Postgres + Storage", en: "Postgres + Storage" }, tone: "ok" },
      { id: "admin", col: 0, row: 2, label: { pt: "Administrador", en: "Admin user" }, sub: { pt: "login", en: "login" } },
      { id: "proxy", col: 1, row: 2, label: { pt: "proxy.ts", en: "proxy.ts" }, sub: { pt: "JWT + papéis", en: "JWT + roles" }, tone: "ok" },
      { id: "api", col: 2, row: 2, label: { pt: "API admin", en: "Admin API" }, sub: { pt: "/api/admin/*", en: "/api/admin/*" }, tone: "ok" },
      { id: "mods", col: 3, row: 2, label: { pt: "Módulos (Zod)", en: "Modules (Zod)" }, sub: { pt: "auth · products · sales", en: "auth · products · sales" }, tone: "ok" },
      { id: "audit", col: 2, row: 3, label: { pt: "audit_logs", en: "audit_logs" }, sub: { pt: "e tentativas de login", en: "and login attempts" }, tone: "ok" },
    ],
    edges: [
      { from: "visitor", fromSide: "r", to: "public", toSide: "l", note: { pt: "acessa o catálogo", en: "browses the catalog" } },
      { from: "public", fromSide: "r", to: "db", toSide: "t", label: { pt: "lê o catálogo", en: "reads catalog" }, note: { pt: "lê o catálogo (há fallback estático documentado)", en: "reads the catalog (a static fallback is documented)" } },
      { from: "visitor", fromSide: "b", to: "quote", toSide: "l", note: { pt: "monta um orçamento", en: "builds a quote" } },
      { from: "quote", fromSide: "r", to: "wa", toSide: "l", note: { pt: "envia o pedido", en: "sends the request" } },
      { from: "admin", fromSide: "r", to: "proxy", toSide: "l", note: { pt: "cookie JWT httpOnly", en: "httpOnly JWT cookie" } },
      { from: "proxy", fromSide: "r", to: "api", toSide: "l", note: { pt: "rotas só para administradores, por papel", en: "admin-only routes, by role" } },
      { from: "api", fromSide: "r", to: "mods", toSide: "l", note: { pt: "serviços validados com Zod", en: "services validated with Zod" } },
      { from: "mods", fromSide: "t", to: "db", toSide: "b", label: { pt: "service role, só no servidor", en: "service role, server only" }, note: { pt: "acesso com service role, apenas no servidor", en: "service-role access, server side only" } },
      { from: "api", fromSide: "b", to: "audit", toSide: "t", label: { pt: "registra", en: "writes" }, note: { pt: "registra auditoria e tentativas de login", en: "writes the audit trail and login attempts" } },
    ],
    legend: [
      { tone: "ok", label: { pt: "Implementado (código no repositório)", en: "Implemented (code in the repository)" } },
      { tone: "default", label: { pt: "Ator ou serviço externo", en: "Actor or external service" } },
    ],
  },
  status: {
    implemented: [
      { pt: "Catálogo, página de produto com variações e orçamento por WhatsApp", en: "Catalog, product page with variations and WhatsApp quote" },
      { pt: "Painel com CRUD de produtos, vendas, clientes e gastos, calculadora de custos, lixeira e backup JSON", en: "Admin CRUD for products, sales, clients and expenses, cost calculator, trash and JSON backup" },
      { pt: "Login por JWT com limite de tentativas e trilha de auditoria", en: "JWT login with rate limiting and an audit trail" },
      { pt: "Migrations versionadas e testes automatizados (existência no repositório)", en: "Versioned migrations and automated tests (they exist in the repository)" },
    ],
    prototype: [
      { pt: "Indicadores e gráficos do painel: a documentação cita 13 indicadores e 4 gráficos, não conferidos contra o banco real", en: "Dashboard metrics and charts: the docs mention 13 indicators and 4 charts, not checked against the real database" },
    ],
    planned: [
      { pt: "Estado real das regras de segurança (RLS) no projeto remoto: não consultado", en: "Actual state of row-level security in the remote project: not queried" },
      { pt: "Funcionamento em produção e resultado de execução dos testes: sem evidência publicada", en: "Production behavior and test run results: no published evidence" },
    ],
  },
  decisions: [
    {
      title: { pt: "Autenticação própria em vez de Supabase Auth", en: "Custom authentication instead of Supabase Auth" },
      body: {
        pt: "Decisão declarada no projeto: dá controle do fluxo e dos papéis, mas amplia a superfície de risco que precisa ser testada. Por isso há limite de tentativas, cookie httpOnly e verificação em métodos mutantes.",
        en: "A decision stated in the project: it gives control over the flow and roles, but widens the risk surface that must be tested. Hence the rate limit, httpOnly cookie and checks on mutating methods.",
      },
    },
    {
      title: { pt: "Service role apenas no servidor", en: "Service role on the server only" },
      body: {
        pt: "O acesso privilegiado ao banco fica nas rotas de API; o navegador não recebe essa credencial. Arquivos privados são entregues por URLs assinadas de curta duração.",
        en: "Privileged database access lives in the API routes; the browser never receives that credential. Private files are served through short-lived signed URLs.",
      },
    },
    {
      title: { pt: "Migrations com procedimento de validação", en: "Migrations with a validation procedure" },
      body: {
        pt: "O README de banco exige backup e restauração em um projeto de validação, mais supabase db lint, antes de migrar. As migrations de endurecimento removem policies públicas legadas e normalizam descontos.",
        en: "The database README requires a backup and a restore into a validation project, plus supabase db lint, before migrating. The hardening migrations remove legacy public policies and normalize discounts.",
      },
    },
    {
      title: { pt: "Reversibilidade e rastreio", en: "Reversibility and traceability" },
      body: {
        pt: "Soft delete (lixeira), backup em JSON e audit log tornam operações sobre dados do negócio reversíveis e rastreáveis.",
        en: "Soft delete (trash), JSON backup and an audit log make operations on business data reversible and traceable.",
      },
    },
  ],
  difficulties: [
    {
      pt: "Migrar de um modelo local (IndexedDB) para um banco relacional e depois endurecê-lo sem quebrar o catálogo público exige ordem e verificação: daí o procedimento de backup e validação antes de cada migration.",
      en: "Moving from a local model (IndexedDB) to a relational database and then hardening it without breaking the public catalog requires order and verification, hence the backup and validation procedure before each migration.",
    },
    {
      pt: "A documentação ficou parcialmente defasada em relação ao código (por exemplo, o termo middleware, enquanto o código usa proxy.ts, convenção do Next 16). Mantê-la alinhada é uma tarefa em aberto.",
      en: "The documentation lags the code in places (for example, it says middleware while the code uses proxy.ts, the Next 16 convention). Keeping it aligned is still open work.",
    },
  ],
  verification: [
    {
      pt: "Testes unitários com Vitest em 6 arquivos: orçamento, formatação, payload de produto, domínio de autenticação, schemas de vendas e cliente de API.",
      en: "Vitest unit tests in 6 files: quote calculation, formatting, product payload, auth domain, sales schemas and API client.",
    },
    {
      pt: "Teste end-to-end com Playwright e axe-core: acessibilidade, overflow no mobile e filtros do catálogo na URL.",
      en: "End-to-end test with Playwright and axe-core: accessibility, mobile overflow and catalog filters in the URL.",
    },
    {
      pt: "Os testes existem no repositório; não há CI nem resultados de execução publicados, então não afirmo aqui que passam.",
      en: "The tests exist in the repository; there is no CI and no published run results, so this page does not claim they pass.",
    },
  ],
  result: {
    pt: "Site no ar (resposta HTTP 200 na verificação de 17/11/2026) e repositório público com histórico completo.",
    en: "Live site (HTTP 200 when checked on 2026-11-17) and a public repository with full history.",
  },
  limits: [
    { pt: "Sem pagamento online: vendas manuais ou por WhatsApp.", en: "No online payment: sales are manual or via WhatsApp." },
    { pt: "Sem CI, sem licença e sem testes de API administrativa nem de RLS visíveis.", en: "No CI, no license, and no visible admin API or RLS tests." },
    { pt: "Autenticação própria aumenta a superfície de risco em relação ao serviço gerenciado.", en: "Custom authentication widens the risk surface compared with a managed service." },
    { pt: "Operação comercial, titularidade da marca e dados de produção não são tratados nem verificados nesta página.", en: "Commercial operation, brand ownership and production data are neither covered nor verified on this page." },
  ],
};

/* ------------------------------------------------------------------ */
/* 2. WACS                                                             */
/* ------------------------------------------------------------------ */

const wacs: CaseStudy = {
  id: "wacs",
  shortName: "WACS",
  fullName: { pt: "Wheelchair Automation Control System", en: "Wheelchair Automation Control System" },
  kind: {
    pt: "Projeto multidisciplinar · tecnologia assistiva (TCC, Etec Registro)",
    en: "Multidisciplinary project · assistive technology (capstone, Etec Registro)",
  },
  lead: {
    pt: "Cadeira de rodas automatizada de baixo custo, em equipe: aplicativo de controle e mapa colaborativo de acessibilidade, firmware de bancada com sensor e protocolo serial, e experimentos de voz e visão. Protótipo acadêmico.",
    en: "A low-cost automated wheelchair, built as a team: a control app and collaborative accessibility map, bench firmware with a sensor and serial protocol, and voice and vision experiments. Academic prototype.",
  },
  role: {
    pt: "Cofundador e líder técnico, conforme informado. Contribuição documentada nos repositórios: o aplicativo móvel e partes do site e da documentação.",
    en: "Co-founder and technical lead, as reported. Contribution documented in the repositories: the mobile app and parts of the website and documentation.",
  },
  period: { pt: "2025 (app: abr a dez; TCC: mai a set)", en: "2025 (app: Apr to Dec; capstone: May to Sep)" },
  authorship: {
    pt: "APP-WACS: 79 de 98 commits sob identidades dele. TCC-WACS: 40 de 103 commits, em equipe de quatro estudantes. O repositório não permite atribuir a ele o firmware nem a IA.",
    en: "APP-WACS: 79 of 98 commits under his identities. TCC-WACS: 40 of 103 commits, in a team of four students. The repository does not let us attribute the firmware or the AI to him.",
  },
  recognition: {
    pt: "7º lugar na 16ª FETEPS (2025), conforme matéria da Etec Registro.",
    en: "7th place at the 16th FETEPS (2025), per an Etec Registro article.",
  },
  tech: [
    { name: "Expo 53" },
    { name: "React Native" },
    { name: "React 19" },
    { name: "React Navigation" },
    { name: "Firebase (Auth, Firestore, Storage)" },
    { name: "Google Maps (react-native-maps)" },
    { name: "BLE (react-native-ble-plx)" },
    { name: "Arduino C++", scope: "team" },
    { name: "HC-05 (serial 9600)", scope: "team" },
    { name: "HC-SR04", scope: "team" },
    { name: "ESP32", scope: "team" },
    { name: "Python", scope: "team" },
    { name: "HTML/CSS/JavaScript (site)", scope: "team" },
  ],
  links: [
    { kind: "github", label: { pt: "APP-WACS (aplicativo)", en: "APP-WACS (app)" }, href: "https://github.com/vftheodoro/APP-WACS" },
    { kind: "github", label: { pt: "TCC-WACS (hardware, firmware, site)", en: "TCC-WACS (hardware, firmware, site)" }, href: "https://github.com/vftheodoro/TCC-WACS" },
    {
      kind: "reference",
      label: { pt: "Matéria do Centro Paula Souza", en: "Centro Paula Souza article" },
      href: "https://www.cps.sp.gov.br/grupo-da-etec-registro-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente/",
    },
  ],
  images: [
    {
      src: "/images/wacs/control.jpeg",
      width: 720,
      height: 1600,
      alt: { pt: "Tela de controle do aplicativo WACS com aviso Modo Simulado Ativo, joystick travado, bateria 0% e Bluetooth none.", en: "WACS app control screen with a Simulated Mode Active banner, locked joystick, 0% battery and Bluetooth none." },
      caption: { pt: "Controle da cadeira em Modo Simulado: joystick travado, bateria 0%", en: "Wheelchair control in Simulated Mode: joystick locked, 0% battery" },
    },
    {
      src: "/images/wacs/security.jpeg",
      width: 720,
      height: 1600,
      alt: { pt: "Tela de controle do WACS com cabeçalho em tom de alerta, joystick vermelho e texto Mantenha pressionado para destravar.", en: "WACS control screen with an alert-toned header, a red joystick and the text Hold to unlock." },
      caption: { pt: "Controle em modo de segurança: trava de interface", en: "Control in safety mode: interface lock" },
    },
    {
      src: "/images/wacs/bluetooth.png",
      width: 371,
      height: 724,
      alt: { pt: "Tela Conectar Cadeira listando dispositivos de exemplo Wheelchair-001, 002 e 003 com intensidade de sinal.", en: "Connect Wheelchair screen listing sample devices Wheelchair-001, 002 and 003 with signal strength." },
      caption: { pt: "Conexão Bluetooth com dispositivos de exemplo (modo simulado)", en: "Bluetooth connection with sample devices (simulated mode)" },
    },
    {
      src: "/images/wacs/locations.jpeg",
      width: 720,
      height: 1600,
      alt: { pt: "Tela Locais Acessíveis com lista de lugares, nota, distância e ícones de acessibilidade.", en: "Accessible Places screen listing venues with rating, distance and accessibility icons." },
      caption: { pt: "Mapa colaborativo: locais acessíveis, notas e filtros", en: "Collaborative map: accessible places, ratings and filters" },
    },
  ],
  stageRatio: ["4 / 5", "16 / 10"],
  problem: {
    pt: "Mobilidade assistida de baixo custo: uma cadeira de rodas automatizada acompanhada de um aplicativo de controle e de um mapa colaborativo de lugares acessíveis, combinando software, eletrônica embarcada e uma necessidade real.",
    en: "Low-cost assisted mobility: an automated wheelchair accompanied by a control app and a collaborative map of accessible places, combining software, embedded electronics and a real need.",
  },
  context: {
    pt: "TCC interdisciplinar da Etec Registro, desenvolvido por uma equipe de quatro estudantes com orientador. O README do aplicativo declara que é software de pesquisa e protótipo, não um controlador de mobilidade com certificação médica.",
    en: "Interdisciplinary capstone at Etec Registro, built by a team of four students with an advisor. The app's README states that it is research and prototype software, not a medically certified mobility controller.",
  },
  built: [
    {
      pt: "Aplicativo em React Native/Expo: login, registro e recuperação de conta (Firebase Auth); perfil e gamificação; posts, comentários e chat regional.",
      en: "React Native/Expo app: sign-in, sign-up and account recovery (Firebase Auth); profile and gamification; posts, comments and regional chat.",
    },
    {
      pt: "Mapa colaborativo de acessibilidade com busca de lugares, rotas, locais acessíveis, avaliações e contribuições (Google Maps, Firestore).",
      en: "Collaborative accessibility map with place search, routes, accessible places, ratings and contributions (Google Maps, Firestore).",
    },
    {
      pt: "Telas de controle e de conexão Bluetooth com travas de segurança na interface: bloqueio do joystick, confirmação no botão de emergência, trava ao soltar e modos Indoor, Outdoor e Manual com limite de velocidade.",
      en: "Control and Bluetooth connection screens with interface safety locks: joystick lock, confirmation on the emergency button, lock on release, and Indoor, Outdoor and Manual modes with a speed limit.",
    },
    {
      pt: "Modo Bluetooth simulado, que permite desenvolver a interface sem o hardware.",
      en: "A simulated Bluetooth mode that lets the interface be developed without the hardware.",
    },
    {
      pt: "Partes do site de comunidade e da documentação do TCC. O site tem autoria predominante de outro integrante.",
      en: "Parts of the capstone's community website and documentation. The site's authorship is predominantly another team member's.",
    },
  ],
  diagram: {
    title: { pt: "Componentes do WACS", en: "WACS components" },
    description: {
      pt: "O usuário opera o aplicativo, que usa Firebase e Google Maps. Para a cadeira, o aplicativo fala com um contexto Bluetooth (BLE ou simulado), que chega a um módulo Bluetooth e ao Arduino, com sensor ultrassônico e ponte H dos motores. Um segundo caminho, por um servidor serial local, não está nos repositórios. Voz com ESP32 e IA em Python são experimentos isolados.",
      en: "The user operates the app, which uses Firebase and Google Maps. For the wheelchair, the app talks to a Bluetooth context (BLE or simulated), which reaches a Bluetooth module and the Arduino, with an ultrasonic sensor and the motor H-bridge. A second path, through a local serial server, is not in the repositories. ESP32 voice and Python AI are isolated experiments.",
    },
    cols: 5,
    rows: 4,
    w: 190,
    h: 64,
    gx: 28,
    gy: 38,
    nodes: [
      { id: "user", col: 0, row: 1, label: { pt: "Usuário", en: "User" } },
      { id: "app", col: 1, row: 1, label: { pt: "App WACS", en: "WACS app" }, sub: { pt: "Expo / React Native", en: "Expo / React Native" }, tone: "ok" },
      { id: "cloud", col: 1, row: 0, label: { pt: "Firebase · Google Maps", en: "Firebase · Google Maps" }, sub: { pt: "Auth, Firestore, Storage", en: "Auth, Firestore, Storage" }, tone: "ok" },
      { id: "bt", col: 2, row: 1, label: { pt: "BluetoothContext", en: "BluetoothContext" }, sub: { pt: "BLE ou modo simulado", en: "BLE or simulated mode" }, tone: "warn" },
      { id: "hc", col: 3, row: 1, label: { pt: "Módulo Bluetooth", en: "Bluetooth module" }, sub: { pt: "tipo não confirmado", en: "type not confirmed" }, tone: "warn" },
      { id: "ard", col: 4, row: 1, label: { pt: "Arduino Uno", en: "Arduino Uno" }, sub: { pt: "firmware de bancada", en: "bench firmware" }, tone: "warn" },
      { id: "sens", col: 4, row: 0, label: { pt: "Sensores", en: "Sensors" }, sub: { pt: "HC-SR04 e bateria (A1)", en: "HC-SR04 and battery (A1)" }, tone: "warn" },
      { id: "bridge", col: 4, row: 2, label: { pt: "Ponte H · motores", en: "H-bridge · motors" }, sub: { pt: "L293D (código de teste)", en: "L293D (test code)" }, tone: "warn" },
      { id: "srv", col: 3, row: 2, label: { pt: "Servidor serial local", en: "Local serial server" }, sub: { pt: "fora dos repositórios", en: "not in the repositories" }, tone: "planned" },
      { id: "esp", col: 0, row: 2, label: { pt: "ESP32", en: "ESP32" }, sub: { pt: "voz → relés (protótipo)", en: "voice → relays (prototype)" }, tone: "warn" },
      {
        id: "ia",
        col: 0,
        row: 3,
        label: { pt: "IA em Python", en: "Python AI" },
        sub: { pt: "esboço, sem integração", en: "sketch, not integrated" },
        tone: "planned",
        note: { pt: "mapeamento por imagem e assistente de voz, sem integração comprovada com a cadeira", en: "image-based mapping and a voice assistant, with no proven integration with the wheelchair" },
      },
    ],
    edges: [
      { from: "user", fromSide: "r", to: "app", toSide: "l", note: { pt: "opera o aplicativo", en: "operates the app" } },
      { from: "app", fromSide: "t", to: "cloud", toSide: "b", note: { pt: "autenticação, dados do mapa e mídia", en: "authentication, map data and media" } },
      { from: "app", fromSide: "r", to: "bt", toSide: "l", note: { pt: "modo de velocidade, trava e emergência (estado de tela)", en: "speed mode, lock and emergency (screen state only)" } },
      { from: "bt", fromSide: "r", to: "hc", toSide: "l", note: { pt: "escrita BLE (o app) ou dispositivos fictícios no modo simulado", en: "BLE write (the app) or fictional devices in simulated mode" } },
      { from: "hc", fromSide: "r", fromOff: 0.3, to: "ard", toSide: "l", toOff: 0.3, note: { pt: "serial; o sketch de bancada usa HC-05 e a compatibilidade com o app não foi verificada", en: "serial; the bench sketch uses an HC-05 and compatibility with the app was not verified" } },
      { from: "sens", fromSide: "b", to: "ard", toSide: "t", label: { pt: "parada na ré < 30 cm", en: "stop in reverse < 30 cm" }, note: { pt: "parada de emergência na ré a menos de 30 cm ou com bateria muito baixa", en: "emergency stop in reverse under 30 cm or with a very low battery" } },
      { from: "ard", fromSide: "b", to: "bridge", toSide: "t", note: { pt: "aciona os motores esquerdo e direito", en: "drives the left and right motors" } },
      { from: "app", fromSide: "b", to: "srv", toSide: "l", label: { pt: "HTTP: limite de velocidade", en: "HTTP: speed limit" }, note: { pt: "limite de velocidade por HTTP local", en: "speed limit over local HTTP" }, dashed: true },
      { from: "srv", fromSide: "r", to: "ard", toSide: "l", toOff: 0.8, note: { pt: "porta serial; nenhum sketch do TCC trata o comando de velocidade", en: "serial port; no capstone sketch handles the speed command" }, dashed: true },
      { from: "user", fromSide: "b", to: "esp", toSide: "t", label: { pt: "voz", en: "voice" }, note: { pt: "comando de voz que aciona relés", en: "voice command that triggers relays" }, dashed: true },
    ],
    legend: [
      { tone: "ok", label: { pt: "Implementado (código no repositório)", en: "Implemented (code in the repository)" } },
      { tone: "warn", label: { pt: "Protótipo ou bancada, sem teste ponta a ponta", en: "Prototype or bench, no end-to-end test" } },
      { tone: "planned", dashedEdge: true, label: { pt: "Não verificado, esboço ou fora dos repositórios (seta tracejada)", en: "Not verified, sketch or outside the repositories (dashed arrow)" } },
    ],
  },
  status: {
    implemented: [
      { pt: "Login e recuperação de conta, mapa com rotas e avaliações, posts e chat regional, perfil (código do app, não validado em campo)", en: "Sign-in and account recovery, map with routes and ratings, posts and regional chat, profile (app code, not validated in the field)" },
      { pt: "Telas de controle e de conexão Bluetooth, com travas de interface", en: "Control and Bluetooth connection screens with interface locks" },
      { pt: "Envio de limite de velocidade (comando V) pelo lado do aplicativo, via HTTP local", en: "Speed-limit command (V) sent from the app side over local HTTP" },
      { pt: "Firmware de bancada: ponte H, ultrassom, parada na ré, monitor de bateria, buzzer, farol e protocolo serial de um caractere", en: "Bench firmware: H-bridge, ultrasound, reverse stop, battery monitor, buzzer, headlight and one-character serial protocol" },
    ],
    prototype: [
      { pt: "Modo Bluetooth simulado: dispositivos e bateria fictícios; a captura oficial mostra Modo Simulado Ativo", en: "Simulated Bluetooth mode: fictional devices and battery; the official screenshot shows Simulated Mode Active" },
      { pt: "Acionamento de motores e comando Bluetooth em sketches de Tinkercad e de bancada, sem teste físico documentado", en: "Motor drive and Bluetooth commands in Tinkercad and bench sketches, with no documented physical test" },
      { pt: "Comando de voz com ESP32 e relés (54 linhas) e assistente de voz em Python, sem integração comprovada", en: "ESP32 voice command driving relays (54 lines) and a Python voice assistant, with no proven integration" },
    ],
    planned: [
      { pt: "Direção e potência do joystick: não são enviadas (o joystick só limita a velocidade)", en: "Joystick direction and power: not sent (the joystick only limits speed)" },
      { pt: "Botão de emergência: apenas estado de tela; sem contato real nem parada enviada ao hardware", en: "Emergency button: screen state only; no real contact and no stop sent to the hardware" },
      { pt: "IA de mapeamento de acessibilidade: esboço sem modelo treinado; notificações push e navegação por IA só existem em documentos", en: "Accessibility-mapping AI: a sketch with no trained model; push notifications and AI navigation exist only in documents" },
      { pt: "Integração ponta a ponta entre app e cadeira física e leitura real de bateria: não verificadas", en: "End-to-end integration between the app and the physical wheelchair, and real battery readings: not verified" },
    ],
  },
  decisions: [
    {
      title: { pt: "Modo simulado de Bluetooth", en: "Simulated Bluetooth mode" },
      body: {
        pt: "Quando o módulo nativo não existe (por exemplo, no Expo Go), o app usa um gerenciador BLE simulado. Isso permitiu avançar na interface sem a cadeira, ao custo de a tela precisar deixar claro que o modo é simulado.",
        en: "When the native module is absent (for example in Expo Go), the app uses a simulated BLE manager. That allowed the interface to move forward without the wheelchair, at the cost of the screen having to make clear the mode is simulated.",
      },
    },
    {
      title: { pt: "Configuração por variáveis de ambiente", en: "Environment-based configuration" },
      body: {
        pt: "As chaves de Firebase e Maps são lidas por app.config.js e expo-constants, com checagem de variáveis ausentes na inicialização, em vez de ficarem no código.",
        en: "Firebase and Maps keys are read through app.config.js and expo-constants, with a check for missing variables at startup, instead of living in the code.",
      },
    },
    {
      title: { pt: "Travas de segurança na interface", en: "Safety locks in the interface" },
      body: {
        pt: "Bloqueio do joystick, confirmação no botão de emergência, trava automática ao soltar e rótulos de acessibilidade no botão de emergência.",
        en: "Joystick lock, confirmation on the emergency button, automatic lock on release, and accessibility labels on the emergency button.",
      },
    },
    {
      title: { pt: "Parada de emergência no firmware (trabalho da equipe)", en: "Emergency stop in the firmware (team work)" },
      body: {
        pt: "O sketch mais completo para o Arduino faz autoteste na inicialização e para o movimento em ré com obstáculo a menos de 30 cm ou bateria muito baixa. A autoria individual desse código não é atribuída aqui.",
        en: "The most complete Arduino sketch runs a startup self-test and stops reverse motion with an obstacle under 30 cm or a very low battery. Individual authorship of this code is not claimed here.",
      },
    },
  ],
  difficulties: [
    {
      pt: "Desenvolver o aplicativo sem a cadeira à mão: daí o modo simulado, que também impede afirmar que a conexão com hardware foi validada.",
      en: "Building the app without the wheelchair at hand: hence the simulated mode, which also prevents claiming that the hardware connection was validated.",
    },
    {
      pt: "Dívida técnica do aplicativo: estruturas duplicadas (context e contexts, duas configurações do Firebase), dependências sem uso (Redux, socket.io-client) e um documento de arquitetura que descreve mais do que existe.",
      en: "App technical debt: duplicated structures (context and contexts, two Firebase configs), unused dependencies (Redux, socket.io-client) and an architecture document that describes more than exists.",
    },
    {
      pt: "Integrar componentes feitos por pessoas e em fases diferentes: o app envia o limite de velocidade por HTTP local e o sketch usa serial de um caractere, e esses caminhos não se encontram nos repositórios.",
      en: "Integrating components built by different people at different stages: the app sends the speed limit over local HTTP while the sketch uses one-character serial, and those paths do not meet in the repositories.",
    },
  ],
  verification: [
    {
      pt: "Nenhum teste automatizado nos dois repositórios (há apenas um guia de testes genérico).",
      en: "No automated tests in either repository (only a generic testing guide).",
    },
    {
      pt: "Verificação do aplicativo pela interface no modo simulado e por inspeção do código.",
      en: "The app was checked through the interface in simulated mode and by code inspection.",
    },
    {
      pt: "A página do projeto na FETEPS descreve um protótipo funcional validado em ambiente real; os repositórios não trazem fotos, vídeos nem medições da cadeira física que comprovem isso.",
      en: "The project page at FETEPS describes a working prototype validated in a real environment; the repositories contain no photos, videos or measurements of the physical wheelchair to support that.",
    },
  ],
  result: {
    pt: "Aplicativo e material do TCC publicados em repositórios abertos; projeto apresentado na 16ª FETEPS (7º lugar, conforme a Etec Registro) e noticiado pelo Centro Paula Souza.",
    en: "App and capstone material published in open repositories; project presented at the 16th FETEPS (7th place, per Etec Registro) and covered by Centro Paula Souza.",
  },
  limits: [
    { pt: "Protótipo acadêmico, sem validação como dispositivo médico.", en: "Academic prototype, not validated as a medical device." },
    { pt: "Integração ponta a ponta entre app e cadeira não verificada; servidor serial local fora dos repositórios; compatibilidade entre BLE do app e HC-05 do sketch não confirmada.", en: "End-to-end integration between the app and the wheelchair is not verified; the local serial server is outside the repositories; compatibility between the app's BLE and the sketch's HC-05 is not confirmed." },
    { pt: "Sem testes automatizados; sketches duplicados por iteração, sem firmware único.", en: "No automated tests; sketches duplicated per iteration, with no single firmware." },
    { pt: "Trabalho em equipe: não há como atribuir a Victor, pelo repositório, o hardware, o firmware nem a IA.", en: "Team work: the repository cannot attribute the hardware, firmware or AI to Victor." },
  ],
};

export const caseStudies: CaseStudy[] = [printh3d, wacs];

/* ------------------------------------------------------------------ */
/* Outros projetos (secundários, acadêmicos ou de equipe)              */
/* ------------------------------------------------------------------ */

export const otherProjects: OtherProject[] = [
  {
    id: "anatomech",
    name: "Anatomech",
    tag: { pt: "Acadêmico · Equipe · Fatec", en: "Academic · Team · Fatec" },
    description: {
      pt: "Site de apresentação da equipe e do conceito DeepBody, uma ideia de visualização educacional de anatomia. Os recursos de realidade aumentada são uma proposta, não foram implementados.",
      en: "Team and concept site for DeepBody, an idea for educational anatomy visualization. The augmented-reality features are a proposal and were not implemented.",
    },
    tech: ["HTML", "CSS", "Bootstrap 5"],
    links: [
      { kind: "github", label: { pt: "GitHub", en: "GitHub" }, href: "https://github.com/vftheodoro/Anatomech" },
      { kind: "demo", label: { pt: "Site", en: "Site" }, href: "https://vftheodoro.github.io/Anatomech/" },
    ],
  },
  {
    id: "barbiescript",
    name: "BarbieScript-RoboCode",
    tag: { pt: "Competição · Equipe · Etec", en: "Competition · Team · Etec" },
    description: {
      pt: "Robô em Java para o RoboCode, feito em equipe. O Centro Paula Souza publicou o 2º lugar da Etec Registro no 11º Torneio de RoboCode (2023).",
      en: "A Java robot for RoboCode, built as a team. Centro Paula Souza published Etec Registro's 2nd place at the 11th RoboCode Tournament (2023).",
    },
    tech: ["Java", "RoboCode"],
    links: [
      { kind: "github", label: { pt: "GitHub", en: "GitHub" }, href: "https://github.com/vftheodoro/BarbieScript-RoboCode" },
      { kind: "reference", label: { pt: "Resultado (CPS)", en: "Result (CPS)" }, href: "https://robotica.cps.sp.gov.br/robocode-2023/" },
    ],
  },
  {
    id: "app-react-crud",
    name: "App-React-CRUD",
    tag: { pt: "Acadêmico · Etec", en: "Academic · Etec" },
    description: {
      pt: "Aplicativo acadêmico de catálogo de carros (CRUD) em React Native com API PHP e banco SQL. Funciona apenas com PHP e SQL locais; sem demonstração pública.",
      en: "Academic car-catalog CRUD app in React Native with a PHP API and SQL database. It works only with local PHP and SQL; there is no public demo.",
    },
    tech: ["Expo", "React Native", "PHP", "SQL"],
    links: [],
  },
  {
    id: "pw-fatec",
    name: "PW-FATEC",
    tag: { pt: "Formação · Fatec", en: "Coursework · Fatec" },
    description: {
      pt: "Exercícios de Programação Web (10 aulas de HTML, CSS e JavaScript). Listado apenas como registro de formação, não como projeto de engenharia.",
      en: "Web Programming exercises (10 lessons of HTML, CSS and JavaScript). Listed only as a learning record, not as an engineering project.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ kind: "github", label: { pt: "GitHub", en: "GitHub" }, href: "https://github.com/vftheodoro/PW-FATEC" }],
  },
];
