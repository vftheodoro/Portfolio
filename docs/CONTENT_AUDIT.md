# Auditoria de conteúdo — Portfólio Victor Theodoro

Data: 2026-11-17. Escopo: `messages/pt.json`, `messages/en.json`, `src/data/*`, metadata (`src/app/**`), `src/components/**`, `public/` e os dois CVs em PDF. Somente leitura; nenhum arquivo do site foi alterado.

## 0. Método e legenda

Classes:
- **CONFIRMADA**: há fonte verificável (código, repositório, página oficial, matéria). A fonte está citada.
- **RELATADA**: informação do Victor (conversa ou CV) sem validação externa.
- **PENDENTE**: precisa de confirmação antes de publicar.
- **DESATUALIZADA**: contradiz o posicionamento novo ou informação posterior.

Ações: **manter**, **reescrever**, **omitir**, **pedir confirmação**.

Verificações feitas hoje: `curl -sI` nos links, leitura do texto das matérias, `og:description` dos 3 posts do Instagram, API pública do GitHub e `package.json` dos repositórios, `pdftotext` nos PDFs, consulta DNS de `appwacs.com.br`, uma busca web sobre a CNN.

Limitações:
- LinkedIn e Instagram respondem 200 mesmo sem provar conteúdo.
- Todos os `pushed_at` do GitHub estão em 2026-11-18 (provável push em massa); não os usei como prova de atividade. Usei só as datas de criação.
- Não encontrei na web nenhuma matéria da CNN Brasil sobre o WACS.

---

## 1. Os 10 pontos obrigatórios

| # | Tema | Situação no site atual | Classe | Evidência | Ação |
|---|------|------------------------|--------|-----------|------|
| 1 | Título SEO "Especialista em Tecnologia" | `src/app/layout.tsx` e `src/app/[locale]/layout.tsx`: "Victor Theodoro \| Especialista em Tecnologia" (EN "Technology Specialist"). Keywords: "especialista em tecnologia", "suporte de TI", "infraestrutura de TI". Descrição: "suporte, infraestrutura, manutenção, ensino". O CV PT usa o mesmo título. | DESATUALIZADA | Contradiz o posicionamento novo (Eng. de Software Júnior, Backend e Full Stack). | **Reescrever** title, description, keywords, og, canonical, hreflang. |
| 2 | Apresentação baseada em suporte/infra | Hero, About, Experience, Services, Bythe e Footer giram em torno de suporte, infra, redes e manutenção. "Sistemas" é o último dos 4 serviços. | DESATUALIZADA | Textos em `pt.json` e `en.json`. | **Reescrever**. Suporte vira competência secundária. |
| 3 | Docência como atividade presente | `teaching.*` ("Ministro cursos…"), Hero "Professor / cursos de tecnologia", `about.bio2` ("Atualmente, concilio… docência"). CV PT: "Professor… 2026–Atual". | PENDENTE / DESATUALIZADA | O Victor informou que os períodos no LinkedIn são de 2026 e que não se deve afirmar que continua lecionando. | **Reescrever** no passado, com período. Remover "Atual" do CV. |
| 4 | Pernambucanas | `experience.corporate`: "suporte recorrente à unidade da Pernambucanas em Registro por meio de parceria de field service" (PT e EN). CV PT cita "Grupo RD e Pernambucanas" sob a BYTHE. | RELATADA / PENDENTE | Sem contrato, fonte ou autorização para citar o cliente. "Recorrente" e "field service" só aparecem no site, não no CV. | **Pedir confirmação**; sem ela, **omitir** o nome do cliente. |
| 5 | Foco em WhatsApp / venda de serviços | CTA principal do Hero, Contact, Footer e botão flutuante é o WhatsApp. Frases como "Tecnologia para vender, operar e crescer melhor". Sem CTA de GitHub ou projetos. | DESATUALIZADA | `Hero.tsx`, `Contact.tsx`, `Footer.tsx`, `FloatingWhatsApp.tsx`. | **Reescrever**. CTAs primários: GitHub, projetos, CV. WhatsApp e e-mail secundários. |
| 6 | Pouca visibilidade de projetos de engenharia | Projetos aparecem depois de Experiência, BYTHE, Ensino e Serviços. Só 2 projetos. Nenhum projeto tem `github` em `projects.ts`. | DESATUALIZADA | Repositórios existem (200): `APP-WACS`, `TCC-WACS`, `Printh3D`, `Porto-de-Registro`, `App-React-CRUD`, `Anatomech`, `PW-FATEC`. | **Reescrever**: projetos logo após o Hero, com repo, stack, papel e evidência. |
| 7 | Ausência de projetos recentes | Só WACS (2025) e Printh3D. | DESATUALIZADA | Criados em 2026 no GitHub: `Printh3D` (02), `PW-FATEC` (03), `Porto-de-Registro` (03), `Anatomech` (04), `alan-camargo` (08), `estetica-isabella-mazzonii` (08), `amanda-camargo-nails` (10). Os 3 últimos são sites de clientes, online (200). | Incluir os recentes. Sites de clientes: **pedir confirmação**. |
| 8 | Tecnologias desatualizadas ou sem evidência | Ver 3.7. AWS sem evidência; "IA" no WACS superdimensionada; faltam Supabase, PostgreSQL, React web, testes (Vitest/Playwright). | PENDENTE | `package.json` dos repos; CV EN. | **Reescrever** `skills.ts` e `projects.ts` com base em evidência. |
| 9 | CVs PDF PT/EN | Ver seção 5. | DESATUALIZADA | `pdftotext`. | **Reescrever** os dois PDFs; não linkar antes. |
| 10 | Links, imagens, datas inconsistentes | `appwacs.com.br` não resolve; fotos de imprensa trocadas; datas divergentes. Ver seções 6, 7 e 8. | DESATUALIZADA | DNS e `curl`. | Corrigir. |

---

## 2. Metadata e estrutura global

| Arquivo / chave | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| `app/layout.tsx` title | "Victor Theodoro \| Especialista em Tecnologia" | DESATUALIZADA | Item 1. | Reescrever |
| `app/layout.tsx` keywords | "especialista em tecnologia", "suporte de TI", "infraestrutura de TI", "instrutor de tecnologia" | DESATUALIZADA | Posicionamento novo. | Reescrever (engenheiro de software, backend, full stack, TypeScript, Node.js, React, BYTHE) |
| `app/layout.tsx` `<html lang="pt">` | Fixo em PT, inclusive em `/en` | PENDENTE | Código. | Usar o locale |
| `[locale]/layout.tsx` description PT/EN | "suporte, infraestrutura, manutenção, ensino e soluções tecnológicas no Vale do Ribeira" | DESATUALIZADA | Item 2. | Reescrever |
| `[locale]/layout.tsx` | Sem Open Graph, canonical, hreflang, JSON-LD Person, sitemap, robots | PENDENTE | Código. | Adicionar |
| `hero.eyebrow` | "Tecnologia • Ensino • Empreendedorismo" | DESATUALIZADA | Item 2. | Reescrever |
| `hero.name` | "Victor Theodoro" | CONFIRMADA | CV; repos. As matérias grafam "Victor Ferreira Theodoro" (CPS) e "Victor Gabriel Ferreira Theodoro" (Etec Registro). | Manter |
| `hero.role` | "Tecnologia prática para empresas, instituições e pessoas." | DESATUALIZADA | Genérico, sem engenharia. | Reescrever |
| `hero.description` | "suporte, infraestrutura, manutenção, redes, capacitação e soluções digitais… do diagnóstico à entrega" | DESATUALIZADA | Item 2. | Reescrever |
| `hero.location`, `contact.location`, `footer.location` | Vale do Ribeira; Jacupiranga | CONFIRMADA | CV ("Jacupiranga, São Paulo"); `bythe.tech` ("Fundada… em Jacupiranga"). | Manter |
| `hero.proof` | "Empresas — suporte e infraestrutura"; "Professor — cursos de tecnologia"; "Builder" | DESATUALIZADA | Itens 2 e 3. | Reescrever (ex.: Backend/Full Stack, WACS 7º lugar FETEPS, BYTHE) |
| `hero.photo_caption/subcaption` | "Tecnologia que resolve." / "Atendimento técnico, ensino e projetos reais." | DESATUALIZADA | Itens 2 e 3. | Reescrever |
| `not-found.tsx` | Só em PT | PENDENTE | Código. | Internacionalizar |
| `Header.tsx` / `ScrollToTop.tsx` | `aria-label` fixos ("Ir ao topo", "Abrir menu" em PT; "Scroll to top" em EN) | PENDENTE | Código. | Internacionalizar |
| `Footer.tsx` | Detecta locale por `window.location` (risco de hydration); `serviceLinks` repete suporte/infra | PENDENTE | Código. | Reescrever |
| `README.md` | Template do create-next-app | PENDENTE | Arquivo. | Reescrever |

---

## 3. Seções

### 3.1 Sobre (`about.*`)

| Chave | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| `lead` | "especialista em tecnologia, professor e fundador da BYTHE" | DESATUALIZADA | Itens 1 e 3. | Reescrever |
| `bio` | "atuação nasceu… computadores, redes, infraestrutura… rede de confiança com atendimentos, indicações e capacitação" | RELATADA / PENDENTE | Sem evidência externa. | Reescrever com o que o Victor confirmar |
| `bio2` | "Atualmente, concilio atendimentos de TI, docência…" | DESATUALIZADA | Item 3. | Reescrever |
| `bio2` | "graduação em Desenvolvimento de Software Multiplataforma na Fatec Registro" | RELATADA | CV ("2026–Cursando"); conclusão prevista dez/2028 (Victor). | Manter e acrescentar a previsão |
| `bio2` | "projetos que conectam software, hardware e impacto social, como o WACS" | CONFIRMADA | Matéria do CPS; página FETEPS (Arduino/HC-06, React Native); repo `TCC-WACS`. | Manter |
| `highlights.*` | "Tecnologia para empresas / Ensino e capacitação / Soluções completas" | DESATUALIZADA | Itens 2 e 3. | Reescrever |
| link do CV | `/cv/Curriculo_Theodoro.pdf`, `/cv/EN_Theodoro.pdf` | DESATUALIZADA | Seção 5. | Atualizar os PDFs |

### 3.2 Atuação (`experience.*`)

| Chave | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| `corporate` | Pernambucanas, "recorrente", "field service" | RELATADA / PENDENTE | Item 4. | Pedir confirmação ou omitir |
| `education` | "programas do Governo do Estado de São Paulo… Centro Paula Souza, Fundação FAT, prefeituras…" | PENDENTE | CV só cita "Centro Paula Souza, Prefeitura de Registro, 2026–Atual". "Fundação FAT" e "Governo do Estado" não estão no CV; Victor fala em "Fundo Social". | Pedir confirmação; reescrever no passado |
| `bythe` | "Marca de soluções tecnológicas… suporte, infraestrutura, modernização e projetos digitais" | PENDENTE | `bythe.tech` (200) se descreve como "Empresa de sites e sistemas… sob medida". | Alinhar ao site oficial |
| `projects` | "WACS e Printh3D" | CONFIRMADA | Repos e sites. | Manter e expandir |

### 3.3 BYTHE (`bythe.*`)

| Chave | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| `eyebrow` | "Empresa fundada por Victor Theodoro" | CONFIRMADA | `bythe.tech`: "Fundada por Victor Theodoro em Jacupiranga". | Manter |
| `headline` | "Tecnologia para vender, operar e crescer melhor." | DESATUALIZADA | Item 5. | Reescrever |
| `description`, `services.*` | suporte, infraestrutura, modernização, sites e sistemas | PENDENTE | Suporte e infra não aparecem na descrição do `bythe.tech`. | Alinhar |
| Link `https://bythe.tech` | | CONFIRMADA | HTTP 200. | Manter |

### 3.4 Ensino e credenciais (`teaching.*`)

| Chave | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| Seção inteira (presente: "Ministro cursos…", "Assumo o planejamento…") | | DESATUALIZADA / PENDENTE | Item 3. | Reescrever no passado ou reduzir a um item de experiência |
| `subjects.*` | Informática básica, Windows, Excel, Internet, Produtividade, Empregabilidade | RELATADA | CV PT: "Informática, Office, tecnologias digitais e fundamentos de computação". | Pedir confirmação |
| `responsibilities.*` | planejamento, materiais, provas, presença, avaliação | RELATADA | CV PT cita "atividades práticas, avaliações e suporte aos estudantes". Presença e orientação individual não constam. | Pedir confirmação |
| `institutions` | "participação em cerimônias de conclusão" | PENDENTE | Sem evidência. | Omitir salvo confirmação |
| `credentials.fatec` | "Em andamento — Fatec Registro" | RELATADA | CV; Victor. | Manter, com "conclusão prevista dez/2028" |
| `credentials.etec` | "Concluído — Técnico em Desenvolvimento de Sistemas — ETIM, Etec Registro" | RELATADA | CV: 2023–2025. A matéria da Etec Registro (20/10/2025) cita alunos de Desenvolvimento de Sistemas. | Manter; confirmar o ano de conclusão |
| `credentials.cisco` | "Redes, defesa de redes e segurança — Cisco Networking Academy" | RELATADA | CV: "Defesa de Redes — Cisco — 2025" e "Hacking Ético — Cisco — 2025". Sem link de credencial. | Reescrever com os 2 cursos exatos e pedir link |

### 3.5 Serviços (`services.*`, `services.ts`)

| Chave | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| Seção "Como posso ajudar" | 4 serviços, processo em 4 passos, CTA "Precisa resolver ou organizar a tecnologia da sua empresa?" | DESATUALIZADA | Itens 2 e 5. | Substituir ou mover para a BYTHE |
| `support`, `infrastructure` | computadores, redes, Wi-Fi, roteadores, backups | RELATADA | CV cita infra, hardware e redes. | Manter só como competência secundária |
| `training` | Excel, Windows, empregabilidade digital | RELATADA | Ver 3.4. | Omitir ou mover para histórico |
| `solutions` | sites e sistemas, automação, integrações | CONFIRMADA | Repos de sites (clientes, Printh3D) e `bythe.tech`. | Manter e destacar |
| Processo (Diagnóstico a Acompanhamento) | "Implemento, testo e documento…"; "Defino escopo, prazo e investimento" | RELATADA | Sem prova externa. | Pedir confirmação ou omitir |

### 3.6 Projetos (`projects.ts`, `projects.*`)

| Item | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| WACS `title` | "WACS — Wheelchair Automation Control System" | CONFIRMADA | Repo `TCC-WACS`; página FETEPS; matéria CPS. | Manter |
| WACS `description` | "tecnologia assistiva de baixo custo… app mobile, Arduino, Bluetooth, sensores e mapeamento de acessibilidade… protótipo funcional apresentado na FETEPS… reconhecimento público em Registro" | CONFIRMADA (parcial) | Página FETEPS: Arduino + HC-06, React Native, Google Maps, "estágio funcional de protótipo, validado em ambiente real". Sensores ultrassônicos/infravermelhos são recurso em integração, não entregue. | Manter; não afirmar sensores como entregues |
| WACS `site` `https://www.appwacs.com.br` | | DESATUALIZADA | **NXDOMAIN** (curl 000). O repo e o CPS apontam para o mesmo domínio. | Remover ou trocar por repo/demo; perguntar ao Victor |
| WACS `github` | Campo ausente | DESATUALIZADA | `APP-WACS` e `TCC-WACS` (200). | Adicionar |
| WACS `instagram` `@wacs_etec` | | CONFIRMADA | 200; é o autor dos posts. | Manter |
| WACS `technologies` | "Python, Arduino, IoT, IA, React Native, TypeScript, Node.js, Firebase, Google Maps API" | PENDENTE | Confirmados: Arduino, React Native/Expo, Firebase, Google Maps (`react-native-maps`), BLE (`react-native-ble-plx`), TypeScript (devDependency). Python só em experimentos de IA no repo. "IA" está "em implementação" (CPS) e o README do repo avisa que recursos têm níveis de conclusão diferentes. Node.js só inferido (`socket.io-client`). | Retirar "IA" como entrega e "Node.js" até confirmar backend; listar Expo, React Native, Firebase, BLE, Arduino/C++ |
| WACS papel do Victor | Não declarado | RELATADA | Victor: cofundador e líder técnico. CV EN: "Tech Lead and Co-founder". Matérias o citam entre 3 (CPS) ou 4 (Etec Registro) estudantes. | Declarar o papel e citar a equipe |
| WACS `awarded` | "Reconhecido" | CONFIRMADA | 7º lugar FETEPS (Etec Registro, 20/10/2025). | Manter |
| Screenshots WACS | 7 imagens | PENDENTE | `alt` só em inglês; `g4rft6wqrkua1.jpg` sem uso. | Revisar alt |
| Printh3D `description` | "Plataforma comercial e administrativa… catálogo, gestão de produtos, indicadores, cálculo de custos e controle de acesso" | CONFIRMADA | Repo ("Site de vendas para produtos de Impressão 3D"); site 200; `jose`, `bcryptjs`, `chart.js`, Supabase no `package.json`. | Manter; confirmar operação comercial ativa |
| Printh3D `technologies` | "Next.js 16, TypeScript, Supabase, PostgreSQL, Tailwind, Framer Motion, Chart.js" | CONFIRMADA | `package.json`: `next ^16.2.9`, `@supabase/supabase-js`, `tailwindcss ^4`, `framer-motion`, `chart.js`. PostgreSQL implícito do Supabase. | Manter; acrescentar Zod, React Query, Vitest, Playwright |
| Printh3D `github` | Ausente | DESATUALIZADA | `Printh3D` (200). | Adicionar |
| Printh3D datas | CV PT 2023–2025; CV EN 2023–Present; repo criado em 2026-02-27 | PENDENTE | Conflito. | Definir cronologia |
| Ausentes | Porto-de-Registro, App-React-CRUD, Anatomech, PW-FATEC, sites de clientes, BarbieScript-RoboCode, ODS-Website-Project | DESATUALIZADA | Todos no GitHub; páginas Pages e sites no ar. | Incluir; Anatomech é de equipe, confirmar papel |

### 3.7 Tecnologias (`skills.ts`)

| Tecnologia | Classe | Evidência | Ação |
|---|---|---|---|
| HTML5, CSS3, JavaScript, TypeScript, Next.js, React Native/Expo, Node.js, Git/GitHub | CONFIRMADA | Repos `Printh3D`, `APP-WACS`, `Portfolio`. | Manter |
| React (web) — ausente | CONFIRMADA | Printh3D e este portfólio usam React 19. | Adicionar |
| Python, Firebase, Arduino/IoT, MySQL, EJS, REST APIs | RELATADA | CV EN; repo `atv01_node_site` (EJS). Python só em experimentos. | Manter como RELATADA |
| **AWS** | PENDENTE | Nenhuma evidência: CV EN lista Google Cloud, não AWS; nenhum repo usa AWS. | Omitir ou pedir confirmação |
| Google Cloud | RELATADA | CV EN. Sem repo que prove. | Pedir confirmação |
| Figma, Postman, Android Studio, Linux | RELATADA | CV EN cita Linux; os demais não constam. | Pedir confirmação |
| "Testes" (genérico) | CONFIRMADA (parcial) | Printh3D: Vitest, Testing Library, Playwright, axe. | Trocar por ferramentas concretas |
| "Segurança", "Redes" (genéricos) | RELATADA | Cisco 2025 (Defesa de Redes, Hacking Ético). | Trocar por itens específicos |
| Supabase, PostgreSQL, Zod, React Query, Docker, SQL — ausentes | CONFIRMADA / RELATADA | Supabase, Zod, React Query no Printh3D. Docker e SQL no CV EN. | Adicionar |
| Java, C#, PHP, C++ (CV EN) | RELATADA | C++ no `TCC-WACS`; Java no `BarbieScript-RoboCode`. C# e PHP sem evidência. | Listar só os com repo |
| IA aplicada / ML | PENDENTE | Victor usa Claude Code e Codex como ferramentas (responsabilidade humana) e não é especialista em ML. | Descrever como uso de ferramenta, sem prometer ML |

### 3.8 Conquistas (`achievements.ts`)

| ID | Texto | Classe | Evidência | Ação |
|---|---|---|---|---|
| `feteps` | "7º Lugar — 16ª FETEPS", Outubro 2025 | CONFIRMADA | Etec Registro (20/10/2025): "7º colocado na FETEPS — WACS", lista Victor Gabriel Ferreira Theodoro. Post do WACS de 01/10/2025 cita a feira. | Manter; conferir o mês |
| `fetec_2025` | "1º Lugar — 6ª FETEC (Votação Popular)", Outubro 2025 | RELATADA | A 6ª FETEC ocorreu em 16–17/10/2025 (etecregistro). O resultado e a modalidade só aparecem no CV. | Pedir fonte |
| `fetec_2024` | "1º Lugar — 5ª FETEC (Votação Popular)" com "Educação Sexual", Outubro 2024 | RELATADA | A 5ª FETEC existe (23–24/10). O projeto e o resultado não têm fonte externa. | Pedir confirmação |
| `mocao` | "Moção de Aplauso — Câmara Municipal… pelo 7º lugar na FETEPS e inovação", Novembro 2025 | PENDENTE | O post de 26/11/2025 é do vereador Marcelo Comeron: moção "à ETEC de Registro", pelo desempenho na 16ª FETEPS. **Não cita WACS nem o Victor.** Fonte é perfil pessoal, não a Câmara. | **Reescrever**: "Moção de Aplauso à Etec de Registro (vereador Marcelo Comeron)"; buscar documento oficial |
| `fisiculturismo` | "1º Lugar — Campeonato Brasileiro de Fisiculturismo… Sub Junior", Setembro 2024 | PENDENTE | Sem fonte externa; fora do escopo de engenharia; não consta nos CVs. | **Omitir** salvo decisão do Victor |
| `robocode_estadual` | "2º Lugar — Torneio Estadual de RoboCode", Setembro 2023 | CONFIRMADA | `robotica.cps.sp.gov.br/robocode-2023/`: 2º lugar, Etec de Registro, equipe com Victor Gabriel Ferreira Theodoro, resultado em 29/09/2023. Repo `BarbieScript-RoboCode`: "2º lugar… 2023". | Manter; nomear "11º Torneio de RoboCode (CPS)" |
| `robocode_local` | "1º Lugar — Campeonato de RoboCode ETEC", Agosto 2023 | RELATADA | Sem fonte. | Pedir confirmação |
| OBI, OBMEP (não estão no site) | CV PT: OBI 2025, OBMEP 2019–2023; CV EN: OBI 2023, OBMEP 2025 | PENDENTE | Anos conflitam. | Confirmar antes de publicar |

### 3.9 Imprensa (`press.ts`)

| ID | Texto no site | Classe | Evidência | Ação |
|---|---|---|---|---|
| `cnn` | Fonte "CNN Brasil", tipo "interview", "Entrevista sobre o projeto WACS"; link `instagram.com/p/DPQr2keDQy4/` | PENDENTE | O link é post do **@wacs_etec** (01/10/2025): "Tivemos a honra de sermos entrevistados pela CNN Brasil durante a Feteps". É autorrelato. Não há link da CNN e a busca web não achou matéria. | **Reescrever** como "Registro do WACS no Instagram: entrevista à CNN Brasil" ou obter o link da CNN |
| `estadao` | Fonte "Estadão", "Entrevista sobre tecnologia assistiva"; link `instagram.com/p/DQj8IxEkdov/` | PENDENTE | Post do @wacs_etec (02/11/2025): "participar da reportagem do @estadao que destacou projetos inovadores apresentados na FETEPS". O recorte `estadao.jpg` mostra matéria impressa "Kit 'motoriza' cadeira de rodas" citando "Victor Theodoro" com uma fala. É reportagem sobre vários projetos, não "entrevista sobre tecnologia assistiva". | **Reescrever**: "Reportagem do Estadão sobre projetos da FETEPS (edição impressa)"; buscar link e data |
| `cps` | "Grupo da Etec Registro cria cadeira de rodas…" | CONFIRMADA | URL 200; cita Victor Ferreira Theodoro. A imagem `equipe-vereador.png` mostra 3 pessoas com uma estrutura de tubos, não o WACS. | Manter a matéria; trocar a imagem |
| `feteps` | "WACS — Autonomia inteligente para PCDs" | CONFIRMADA | URL 200, página oficial do projeto. Não nomeia o Victor. | Manter |
| `etec_feteps` | "Alunos da Etec de Registro são destaques na 16ª FETEPS" | CONFIRMADA | URL 200; confirma o 7º lugar e cita Victor. A imagem `camara-vereador.png` mostra a equipe com cadeira e telão "WACS". | Manter; renomear arquivo e corrigir alt |
| `regiao_hoje` | "Grupo de Etec cria cadeira de rodas…" | CONFIRMADA | URL 200; texto igual ao do CPS. A imagem `estadao-jornal.jpg` é o recorte do **Estadão**, com marca d'água. | Manter a matéria; **trocar a imagem** (atribuição errada e direitos) |
| `abc` | "Etec projeta cadeira de rodas inteligente" | CONFIRMADA | URL 200; cita Victor. | Manter |
| `robotica` | "11º Torneio de Robocode" | CONFIRMADA | A URL redireciona para `/robocode-2023/`; confirma o 2º lugar da Etec de Registro. | Manter; atualizar URL |
| `camara` | Fonte "Câmara Municipal de Registro", "Moção de Aplauso pelo projeto WACS" | PENDENTE | Ver `mocao`: post do vereador; moção à Etec. | **Reescrever** fonte e título |
| Logos `cnn-logo.png`, `estadao-logo.png` | | PENDENTE | Logo de terceiros sem link do veículo. | Remover ou usar só com link original |
| Seção "Na mídia" | 9 itens | PENDENTE | Só 6 são matérias de terceiros. CNN, Estadão e Câmara dependem de posts. | Separar "Imprensa" e "Registros" |

### 3.10 Contato

| Item | Classe | Evidência | Ação |
|---|---|---|---|
| WhatsApp +55 13 99601-6551 (Hero, Contact, Footer, flutuante) | CONFIRMADA | Igual ao CV; `wa.me` 200. | Manter como secundário |
| E-mail `victorgft@outlook.com` | CONFIRMADA | Igual ao CV. | Manter; avaliar e-mail `@bythe.tech` |
| LinkedIn `vftheodoro` | CONFIRMADA | 200 e CV. | Manter |
| GitHub `vftheodoro` | CONFIRMADA | 200. | Manter e promover |
| Instagram `vftheodoro` | CONFIRMADA | 200. | Manter |
| `@emailjs/browser` em `package.json` | PENDENTE | Sem uso em `src/`. | Remover se não usar |

---

## 4. Números e tempo

O site atual **não afirma** anos de experiência, número de clientes nem métricas. Só há datas e números nas conquistas. Não inventar.

| Afirmação | Onde | Classe | Ação |
|---|---|---|---|
| "3000+ projetos" / "maior feira de tecnologia da América Latina" | CV EN. O post do WACS diz "maior evento de tecnologia pública da América Latina". | PENDENTE | Pedir fonte; atribuir |
| "Etec Registro, 3ª Melhor Escola do Estado" | CV PT/EN | PENDENTE | Pedir fonte ou omitir |
| "Reconhecimento do Governador do Estado…" | CV PT | PENDENTE | Pedir documento ou omitir |
| "Reconhecimento Nacional" (WACS) | CV PT | DESATUALIZADA | O comprovado é o 7º lugar na FETEPS e a moção municipal. Reescrever. |

---

## 5. CVs em PDF (texto extraído com `pdftotext`)

Arquivos: `public/cv/Curriculo_Theodoro.pdf` (81 KB) e `public/cv/EN_Theodoro.pdf` (442 KB). Extração concluída nos dois.

### 5.1 CV PT

| Trecho | Classe | Ação |
|---|---|---|
| Título "ESPECIALISTA EM TECNOLOGIA" | DESATUALIZADA | Trocar pelo título novo |
| "Professor de Tecnologia e Informática — Centro Paula Souza, Prefeitura de Registro — 2026–Atual" | DESATUALIZADA / PENDENTE | Não afirmar presente; fechar o período; confirmar |
| "Técnico Especialista em Tecnologia — BYTHE — 2026–Atual" | PENDENTE | Reescrever como "Fundador, BYTHE"; confirmar início |
| "Prestação de serviços para empresas como Grupo RD e Pernambucanas" | RELATADA / PENDENTE | Item 4; pedir autorização |
| "Administração de redes, bancos de dados e serviços em nuvem" | PENDENTE | Sem evidência de nuvem |
| "WACS… 2025 — Desenvolvedor e Líder Técnico… Reconhecimento Nacional" | RELATADA | EN diz "2025–Present" e "Co-founder". Alinhar; rever "Nacional". |
| "Printh 3D (Autônomo) 2023–2025" | PENDENTE | Conflito com o EN e com o repo |
| "Fatec Registro 2026–Cursando"; "Etec Registro, 3º Melhor Escola do Estado 2023–2025"; "Danki Code 2020–2022" | RELATADA | EN diz Danki Code 2020–2023; alinhar |
| Cisco Defesa de Redes 2025, Hacking Ético 2025; Sebrae "Partiu Mercado" 2023 | RELATADA | Pedir links de credencial |
| Reconhecimentos: CNN, Estadão, Moção, Governador, "7º lugar na maior feira…" | PENDENTE | Ver 3.9 e seção 4 |
| Premiações: OBI 2025; FETEC 5ª e 6ª; 7º FETEPS; 2º Robótica 2023; 5x OBMEP 2019–2023 | Mista | FETEPS e RoboCode CONFIRMADAS; FETEC, OBI e OBMEP RELATADAS |
| "Inglês Intermediário" | RELATADA | Sem certificado |

### 5.2 CV EN

| Trecho | Classe | Ação |
|---|---|---|
| "Full Stack Developer"; objetivo "Full Stack Developer (Intern or Junior)" | DESATUALIZADA | Reescrever para "Software Engineer (Junior) — Backend & Full Stack" |
| "Video Editor and Illustrator, Freelancer, 2019–2022" | RELATADA | Não está no CV PT nem no site; confirmar |
| "Printh 3D (Freelancer) 2023–Present" | PENDENTE | Conflito com o PT |
| "WACS 2025–Present"; "Tech Lead and Co-founder" | RELATADA | Ajustar "Present" ao estado real |
| Link `https://vftheodoro.github.io/Portfolio/` | DESATUALIZADA | **404**. O portfólio vivo é `vftheodoro.vercel.app/pt` (200). |
| "JavaScript, TypeScript, Python, Java, C#, SQL, PHP, C++" | RELATADA | C# e PHP sem repo |
| "Docker, ESP32, Bootstrap, MySQL, Firestore" | RELATADA | Sem repo que prove Docker, ESP32 ou Bootstrap |
| "Assistant in Systems Development — Etec 2024" | PENDENTE | Sem fonte; não está no PT |
| "OBI 2023"; "5x Math Olympiad 2025" | PENDENTE | Anos conflitam com o PT |
| "Recognition and Media 2019 a 2023" | PENDENTE | Período errado: as matérias são de 2025 |
| "7th Place among 3000+ projects" | PENDENTE | Ver seção 4 |
| Danki Code "2020–2023" | PENDENTE | Conflito com o PT |
| "FATEC de Registro — Night Classes" | RELATADA | Manter; acrescentar previsão de conclusão |

Os PDFs são anteriores ao posicionamento novo e estão linkados com `download` em `About.tsx`.

---

## 6. Imagens (`public/`)

| Arquivo | Uso | Problema | Ação |
|---|---|---|---|
| `images/victor/portrait-2026.png` (1,7 MB) | Hero | Pesado; `next.config.ts` tem `images.unoptimized: true` | Otimizar |
| `images/victor/profile.png` | Sem uso | Órfão | Remover ou usar |
| `images/wacs/g4rft6wqrkua1.jpg` | Sem uso | Órfão, nome aleatório | Remover |
| `images/press/estadao-jornal.jpg` | Usada em `regiao_hoje` | Recorte do Estadão com marca d'água, atribuído a outro veículo | Substituir; verificar direitos |
| `images/press/camara-vereador.png` | Usada em `etec_feteps` | Nome não bate com o conteúdo (equipe, cadeira, telão WACS) | Renomear; corrigir alt |
| `images/press/equipe-vereador.png` | Usada em `cps` | Mostra três pessoas com estrutura de tubos, não o WACS | Substituir |
| `images/press/camara-mocao.png` (2,1 MB) | `camara` | Pesada | Otimizar |
| `images/press/cnn-logo.png`, `estadao-logo.png` | Cards | Logo sem link do veículo | Remover ou ligar à fonte |
| `images/flags/br.png`, `us.png` (~480 KB cada) | Seletor de idioma | Pesadas para ícones | Trocar por SVG |
| Screenshots WACS e Printh3D | Projetos | `alt` sem padrão por idioma | Internacionalizar |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | Template | Sem uso | Remover |
| `bythe-logo.svg`, `vt-logo.png` | Marca | OK | Manter |

---

## 7. Links externos (2026-11-17)

| URL | Status | Observação |
|---|---|---|
| bythe.tech | 200 | Título: "Empresa de sites e sistemas no Vale do Ribeira" |
| **www.appwacs.com.br** | **000 (NXDOMAIN)** | **Quebrado** (usado em `projects.ts`) |
| printh3d.vercel.app | 200 | OK |
| vftheodoro.vercel.app/pt | 200 | Portfólio atual |
| **vftheodoro.github.io/Portfolio/** | **404** | **Quebrado** (CV EN) |
| instagram.com/wacs_etec, /vftheodoro; linkedin.com/in/vftheodoro | 200 | Login wall; não prova conteúdo |
| github.com/vftheodoro e repos APP-WACS, TCC-WACS, Printh3D, Porto-de-Registro, App-React-CRUD, AnatoMech, PW-FATEC | 200 | OK |
| Matérias CPS, FETEPS, Etec Registro, Região Hoje, ABC do ABC | 200 | Conteúdo lido e confirmado |
| robotica.cps.sp.gov.br/11o-torneio-de-robocode/ | 200 após redirect | Vai para `/robocode-2023/` |
| Posts Instagram DPQr2keDQy4, DQj8IxEkdov, DRhNkyNiKor | 200 | Posts do @wacs_etec (CNN, Estadão) e do vereador (moção) |
| wa.me/5513996016551 | 200 | OK |
| Sites de clientes (amandacamargonails.com.br, estetica-isabella-mazzonii.vercel.app, alan-camargo.vercel.app); GitHub Pages (Porto-de-Registro, Anatomech, PW-FATEC) | 200 | No ar |

Nome do repo: o GitHub lista `Anatomech`; padronizar a grafia.

---

## 8. Datas inconsistentes

| Item | Fonte A | Fonte B | Situação |
|---|---|---|---|
| Printh 3D | CV PT 2023–2025 | CV EN 2023–Present; repo criado em 2026-02 | Conflito |
| Danki Code | CV PT 2020–2022 | CV EN 2020–2023 | Conflito |
| OBI | CV PT 2025 | CV EN 2023 | Conflito |
| OBMEP | CV PT 2019–2023 | CV EN 2025 | Conflito |
| WACS | CV PT 2025 | CV EN 2025–Present | Conflito |
| Docência | CV PT 2026–Atual | LinkedIn 2026; Victor pede para não afirmar presente | Reescrever |
| "Recognition and Media 2019 a 2023" (EN) | Matérias de 2025 | | Erro |
| FETEPS | Site: Outubro 2025 | Post do WACS em 01/10/2025; matéria da Etec em 20/10/2025 | Conferir o mês |
| Moção | Site: Novembro 2025 | Post do vereador em 26/11/2025 | Consistente |

---

## 9. Pendências que dependem do Victor

1. **Docência**: período exato e instituições (Centro Paula Souza, Fundo Social, Prefeitura de Registro); confirmar encerramento e autorizar redação no passado. "Fundação FAT", "Governo do Estado" e "cerimônias de conclusão" são reais?
2. **Pernambucanas e Grupo RD**: existe vínculo, em qual período, é "recorrente", via qual parceiro de field service, e pode citar os nomes?
3. **BYTHE**: data de fundação, serviços reais, papel no CV ("Fundador") e alinhamento com o `bythe.tech`.
4. **WACS**: papel exato; quem fez backend, app, hardware e IA; o que de IA está entregue; existe backend Node.js; destino do domínio `appwacs.com.br` ou outro demo; autorização para nomear os coautores.
5. **CNN Brasil e Estadão**: link da matéria ou vídeo da CNN; link e data da edição impressa do Estadão; autorização para usar o recorte (hoje com marca d'água).
6. **Moção de Aplauso**: documento oficial; confirmar que foi à Etec de Registro e se cita o WACS ou os alunos.
7. **FETEC 5ª e 6ª**: fonte dos resultados "1º lugar por votação popular" e do projeto de 2024. Fonte do RoboCode ETEC (1º lugar interno, ago/2023).
8. **Fisiculturismo**: manter ou omitir (recomendado omitir).
9. **OBI e OBMEP**: anos corretos.
10. **Cronologia do Printh3D**: início, fim, operação comercial ativa; as datas do CV (2023–2025) são do negócio de impressão e o repo de 2026 é a plataforma web?
11. **Sites de clientes** (Amanda Camargo Nails, Isabella Mazzoni, Alan Camargo): autorização para exibir como cases, papel e escopo.
12. **Tecnologias**: confirmar AWS, Google Cloud, Docker, Figma, Postman, Android Studio, C#, PHP, ESP32; indicar um projeto de cada ou omitir.
13. **Credenciais**: links da Cisco (Defesa de Redes, Hacking Ético) e do Sebrae; ano de conclusão da Etec; fonte de "3ª melhor escola do estado"; documento do "Reconhecimento do Governador"; nível de inglês.
14. **Nome**: usar "Victor Theodoro" e decidir se o nome completo aparece em algum lugar.
15. **Editor de vídeo e ilustrador (2019–2022)** do CV EN: manter ou omitir.
16. **Uso de IA**: aprovar o texto sobre Claude Code e OpenAI Codex como ferramentas (responsabilidade humana) e a frase de que não é especialista em ML.
17. **Contato**: manter e-mail pessoal e WhatsApp no topo ou como contato secundário; criar e-mail `@bythe.tech`?
18. **Imagens**: autorização e crédito para fotos de imprensa (Estadão, CNN, vereador, equipe) e para o `portrait-2026`.
