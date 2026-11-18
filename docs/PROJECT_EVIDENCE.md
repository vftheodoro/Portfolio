# Evidências de projetos — vftheodoro (levantamento somente leitura)

Data da inspeção: 2026-11-17. Método: clone raso (`--depth 100`) dos repositórios públicos em pasta temporária; leitura por Read/Grep; **nenhum código clonado foi executado, nenhuma dependência instalada, nenhum teste rodado**. `gh` não estava autenticado, então a lista de repositórios veio da API pública (`api.github.com/users/vftheodoro/repos`); todos os 16 listados são públicos e não-fork.

Convenções: **[CÓDIGO]** = visto em arquivo-fonte; **[DOC]** = só afirmado em README/documentos; **[NÃO VERIFICADO]** = não foi possível confirmar.

## 0. Achados transversais (leia primeiro)

1. **Último commit de todos os repos = 2026-11-17** ("docs: professionalize README and project documentation"). É um commit em lote de README; não representa atividade de desenvolvimento. Use a **data do último commit de código** (indicada em cada projeto), não a data do GitHub ("atualizado há X").
2. **Segredo exposto (sinalizar ao chefe):** `APP-WACS/android/app/src/main/AndroidManifest.xml` contém uma chave de API do Google Maps em texto claro (meta-data `com.google.android.geo.API_KEY`). Valor não reproduzido aqui. Ação sugerida (decisão do chefe): restringir a chave no Google Cloud (pacote Android + APIs) ou rotacioná-la; considerar remover do histórico. `app.config.js` lê as chaves Firebase/Maps de variáveis de ambiente (correto); a chave do manifest nativo é uma segunda cópia que escapou disso.
3. **Identificador de infraestrutura exposto (baixo risco):** `Printh3D/supabase/README.md` cita o ID do projeto Supabase remoto. Não é credencial, mas facilita enumeração; considere remover.
4. **Dados pessoais de terceiros em imagens:** `APP-WACS/Imagens/Tela de Chat.jpeg` mostra nomes/usernames/avatares de colegas e uma foto de tela. **Não publicar** essa imagem sem autorização; `TCC-WACS` tem bancos/dados de comunidade no site em `docs/` (não inspecionados a fundo).
5. **Link morto:** `TCC-WACS` tem homepage `https://www.appwacs.com.br/` — o domínio **não resolve** (DNS falha em `appwacs.com.br` e `www.`) em 2026-11-17. Não exibir esse link. `https://vftheodoro.github.io/ODS-Website-Project/` retorna **404**. Os demais links de demo retornaram 200 (ver seção 8).
6. **Autoria de commits (git shortlog):** commits aparecem sob várias identidades de Victor (`Victor Theodoro`, `VTheodoro`, `vftheodoro`) e sob contas de laboratório da escola (`3º MTEC - Desenv. de Sistemas`, `Pc-Lab`, `DSM2`) cujo autor real **não é identificável pelo git**. Não atribuir a Victor commits dessas contas coletivas sem confirmação dele.
7. **E-mails** aparecem nos metadados de commit; não reproduzidos neste documento.

---

## 1. APP-WACS — aplicativo móvel (React Native / Expo)

- URL: https://github.com/vftheodoro/APP-WACS — Licença: MIT — 1 estrela. 98 commits.
- Último commit de código: **2025-12-05** ("Update para o TCC", conta de laboratório). Primeiro commit: 2025-04-24.
- Autoria (git shortlog, identidades agrupadas por nome): Victor Theodoro 56 + VTheodoro 20 + vftheodoro 3 = **79 commits sob identidades dele**; "3º MTEC - Desenv. de Sistemas" 13 + "Pc-Lab" 5 = 18 sob contas coletivas da turma. Contribuição documentada de Victor: app inteiro desde o commit inicial (tela de login/controle/mapa/perfil em 2025-04-25; mapa com rotas em 2025-04-28; sistema de BLE simulado e cores por modo de velocidade em 2025-11-18). O README lista o app como parte do projeto WACS, sem listar autores.

### Problema e contexto
Projeto de TCC (Etec Registro, ver TCC-WACS) de cadeira de rodas automatizada. O app é o controle/interface: controle da cadeira, mapa de acessibilidade colaborativo, perfil, chat/posts regionais. O próprio README declara: "research/prototype software ... not a medically certified mobility controller".

### Tecnologias reais (package.json)
Expo 53.0.12, React Native 0.79.4, React 19.0.0, React Navigation 6 (bottom-tabs/native/stack), Firebase JS SDK ^10.7.1 (Auth, Firestore, Storage), react-native-maps 1.20.1, react-native-ble-plx ^3.5.0, socket.io-client ^4.8.1 (declarado; o código usa `WebSocket` nativo em `websocketService.js`), react-native-reanimated ~3.17.4, react-native-gesture-handler ~2.24, react-native-paper ^5.14.5, expo-location, expo-speech, expo-local-authentication. Dev: TypeScript ~5.8.3 (o código é majoritariamente JS; história inclui "Conversão de TypeScript para JavaScript").
Inconsistência: `src/store/index.js` importa `@reduxjs/toolkit`, que **não está** no package.json (store aparentemente não usado/morto). `src/config/architecture.md` descreve uma estrutura (Redux, `app/`, `maps/`) que **não corresponde** à árvore real — é documentação aspiracional.

### Estrutura
`App.js` → `src/navigation` (AuthNavigator / AppNavigator) → `src/screens` (auth/, ControlScreen 1146 linhas, ConnectionScreen 833, MapScreen, social/, UserProfile/) · `src/components` (mapas/, social/, common/) · `src/contexts` (AuthContext, BluetoothContext, ChatContext, ThemeContext, SearchHistoryContext) · `src/services` (firebase/{locations,posts,user}, location/routeService, arduinoHttp, arduinoService, websocketService, serialPortsService, gamification, profilePictureService) · `src/features/location-contributions` · `src/theme` · `scripts/` (utilitários de migração/análise Firestore).
Há duplicidade `src/context` vs `src/contexts` (AuthContext duplicado) e `src/config/firebase.js` + `src/services/firebase/config.js`.

### Diagrama (nós/setas)
Nós: [Usuário] · [App WACS (Expo/RN)] · [Telas: Controle / Conexão / Mapa / Social / Perfil] · [BluetoothContext (BLE ou MOCK)] · [arduinoHttp → "servidor serial" local :3001] · [Firebase Auth/Firestore/Storage] · [Google Maps / Places / Directions] · [Placa Arduino (TCC-WACS/01 Arduino)] · [Motores/sensores].
Setas:
- Usuário → Telas → BluetoothContext (modo de velocidade, trava, emergência).
- BluetoothContext → (BLE write, UUID FFE0/FFE1, HM-10-like) → módulo Bluetooth → Arduino. **[CÓDIGO]**, mas em modo mock (Expo Go/flag `USE_BLUETOOTH_MOCK`) devolve dispositivos e bateria fictícios.
- ControlScreen → arduinoHttp `POST /send {msg:"V<0-255>"}` → servidor serial em `10.0.2.2:3001` (emulador Android) → porta serial → Arduino. **O servidor serial NÃO está em nenhum dos dois repositórios** [NÃO VERIFICADO].
- Telas Mapa/Social/Perfil → Firebase (Auth, Firestore, Storage) e Google Maps/Places.

### Decisões técnicas verificáveis
- Fallback para mock de BLE quando o módulo nativo não existe (`createMockBleManager`), permitindo desenvolver a UI sem hardware.
- Configuração por variáveis de ambiente via `app.config.js` + `expo-constants`, com checagem de variáveis faltantes no boot.
- Controle com travas de segurança de UI: bloqueio do joystick (`isLocked`), botão de emergência com confirmação, trava automática ao soltar o joystick, modos Indoor/Outdoor/Manual com limite de velocidade.
- Acessibilidade: `accessibilityLabel`/`accessibilityHint` no botão de emergência.

### Implementado x protótipo x planejado
| Item | Estado | Evidência |
|---|---|---|
| Login/registro/recuperação (Firebase Auth) | Implementado (código) | `screens/auth`, `config/firebase.js` |
| Mapa, busca de lugares, rotas, locais acessíveis, avaliações/contribuições | Implementado (código); não validado em campo | `components/mapas`, `services/location/routeService.js` |
| Social: posts, comentários, chat regional | Implementado (código) | `screens/social`, `contexts/ChatContext.js` |
| Perfil, galeria, gamificação | Implementado (código) | `UserProfile/`, `services/gamification.js` |
| Escaneamento/conexão BLE, escrita em característica | Implementado (código) mas **sem evidência de teste com hardware** neste repo; screenshot oficial mostra "Modo Simulado Ativo", bateria 0%, "none" | `BluetoothContext.js`, `Imagens/Tela de Controle.jpeg` |
| Envio de limite de velocidade (`V<n>`) ao Arduino | Implementado só no lado do app via HTTP local; **nenhum sketch Arduino do TCC-WACS trata o comando `V`** (grep) → ponta a ponta [NÃO VERIFICADO] | `ControlScreen.js` L352-357 |
| **Direção/potência do joystick** | **NÃO enviada**: comentários no código dizem "Não enviar comandos de direção ou potência por enquanto"; o joystick é visual | `ControlScreen.js` L200-215 |
| Emergência | UI trava a cadeira e **diz** iniciar contato com contato de emergência; apenas `setIsEmergency(true)` — **não foi encontrada ação real** de contato/ligação/mensagem nem envio de parada ao hardware | `ControlScreen.js` L403-415 |
| Leitura de bateria/sinal | Valores simulados no mock; leitura real não confirmada | `BluetoothContext.js` L116-147 |
| Notificações push, "IA para navegação" | Só em documentos/site do TCC; não há código no app | README `docs/` do TCC-WACS |

### Testes
**Nenhum** (sem arquivos de teste, sem script `test` no package.json). `GUIA_TESTES.md` em TCC-WACS descreve Jest de forma genérica, sem testes correspondentes.

### Limitações
Protótipo; hardware não comprovado ponta a ponta; sem testes; servidor serial ausente; duplicações; dependências "mortas" (Redux, socket.io-client); URL do servidor Arduino hardcoded (`192.168.1.100:3001`, `10.0.2.2:3001`); regras de Firebase Storage na doc permitem `read` público e escrita por qualquer autenticado em caminhos genéricos (pior que o necessário).

### Riscos de divulgação
- **Chave Google Maps no AndroidManifest** (ver 0.2).
- `android/app/debug.keystore` versionado (keystore de debug padrão do Android/Expo; baixo risco, mas desnecessário).
- Screenshot do chat com terceiros (ver 0.4). Outras 13 imagens em `Imagens/` (login, mapa, perfil, posts, menu de chats, detalhes de local) **não foram todas revisadas** — conferir se há dados pessoais antes de usar.

### Screenshots públicos disponíveis
`Imagens/` (14 JPEG/PNG: Tela Inicial, Lista de Locais, Chat, Conexão, Controle em modo de Segurança, Controle, Detalhes do Ponto Acessível, Detalhes da Rota, Detalhes do Local, Login, Navegação, Perfil, Posts, Menu de Chats) e `assets/logos_wacs/`. Seguras em princípio: Controle, Controle em modo de Segurança, Conexão, Detalhes da Rota/Navegação (conferir). Evitar: Chat, Posts, Perfil, Menu de Chats até revisão.

### Frases seguras para publicar
- PT: "Aplicativo móvel em React Native/Expo, desenvolvido como parte do TCC WACS: interface de controle de cadeira de rodas (com modo simulado de Bluetooth), mapa colaborativo de acessibilidade, perfis e chat regional, com Firebase. Protótipo acadêmico, não validado como dispositivo médico."
- EN: "React Native/Expo mobile app built for the WACS capstone: a wheelchair-control interface (with a simulated Bluetooth mode), a collaborative accessibility map, profiles and regional chat, backed by Firebase. Academic prototype, not validated as a medical device."
- Evitar: "controla a cadeira de rodas", "contato de emergência automático", "navegação por IA", "comunicação Bluetooth validada".

---

## 2. TCC-WACS — hardware, firmware, IA e site (Etec Registro)

- URL: https://github.com/vftheodoro/TCC-WACS — Licença: MIT — 2 estrelas. 103 commits.
- Primeiro commit (no clone raso): 2025-05-15. Último commit de código: **2025-09-29**.
- Autoria: mario-tdias 40 · Victor Theodoro 33 + VTheodoro 7 = **40 sob identidades dele** · conta de laboratório 14 · DaviKirk 3 · (Luiz Iha apareceu em commit de upload). **Victor NÃO é autor majoritário do repositório**; o site `docs/` (comunidade, chat, rotas) tem commits predominantes de `mario-tdias`. Equipe listada no README: Pedro Henrique Dias Santos, Luiz Alberto Iha Lima, Victor Gabriel Ferreira Theodoro, Mario Armando Takahashi Martins Dias; orientador: Ramon Trigo.
- Reconhecimento: README afirma "projetos em destaque (sete) na FETEPS 2025" — **[DOC]**, sem evidência no repo além do texto.

### Problema e contexto
Cadeira de rodas automatizada de baixo custo (estrutura em PVC, segundo a doc do site) com app, eletrônica e IA, como TCC interdisciplinar. Repositório é um "monorepo de artefatos": documentos, sketches, experimentos Python, site de demonstração.

### O que o repositório mostra
- `00 Documentos/`: documentos Word/PDF (base, objetivos, doc. do app, IA, doc. técnica Arduino), guias de configuração/desenvolvimento/testes, `storage.rules`, prints do "APP Beta".
- `01 Arduino/`: 12 sketches `.ino` (~2.200 linhas), evolução: Tinkercad (motores, botões, conexão com app via **HC-05 + SoftwareSerial 9600**, verificação de conexão, sensor de movimento/LED/L293D, % de bateria, ajuste com app) → `Testes/teste_1..4` → ESP32 `ComandoDeVozFinal-ESP.ino` (BluetoothSerial, nome "ESP32_VOZ", aciona relés).
- `teste_4_funcionalidades_extras.ino` (469 linhas, mais completo) [CÓDIGO]: ponte H (ENA/ENB PWM + IN1..IN4), **sensor ultrassônico HC-SR04** (trig 8/echo 9), buzzer, farol (LED), sensor magnético (A0), leitura de bateria (A1), autotestes na inicialização (motores, ultrassom, bateria, buzzer/farol), **parada de emergência automática**: ré com distância <30 cm ou bateria muito baixa; protocolo serial de 1 caractere: `F B E D S L Z X R ?` (frente, ré, esquerda, direita, parar, farol, buzina, emergência, reset, status); envio de telemetria a cada 500 ms; bip proporcional à distância na ré. Observação: inclui `SoftwareSerial.h` mas o trecho de entrada lido usa `Serial` — **o canal Bluetooth específico neste sketch não foi confirmado**; o canal HC-05 está explícito no sketch `03 Conexão com o APP.ino` (Tinkercad).
- `03 Inteligencia Artificial/` (261 linhas Python): `voice_assistant.py` (SpeechRecognition + Google STT + pyttsx3), `mapping.py` (MobileNetV2 pré-treinado do Keras para "mapeamento de acessibilidade"), SQLAlchemy `models.py`, `main.py` (loop do assistente). **`mapping.py` é stub**: `_detect_ramps` e `_detect_handrails` retornam `True` fixo e o "score" é a média das features — **não é um modelo treinado/validado**. Existe `data/wacs.db` versionado (0 byte no listing de tamanho; conteúdo não inspecionado).
- `docs/`: site estático (HTML/CSS/JS, Firebase via `window.ENV` gerado por `generate-env.js`) com comunidade, mapa acessível, login/cadastro/termos, usuários; versão anterior em `docs/wacs_antigo/`. Inclui páginas de teste soltas (`test-*.html`).

### Tecnologias reais
Arduino C++ (Uno + HC-05; ESP32 BluetoothSerial), Python (`requirements.txt`: speech_recognition 3.10.0, pyttsx3 2.90, PyAudio 0.2.13, opencv-python 4.8.0, tensorflow 2.13.0, SQLAlchemy 2.0.20, fastapi 0.103.0, uvicorn 0.23.2, numpy 1.24.3), HTML/CSS/JS + Firebase no site.

### Diagrama (nós/setas)
Nós: [Usuário] · [APP-WACS] · [HC-05 / módulo BT] · [Arduino Uno] · [Ponte H L293D → motores esq/dir] · [HC-SR04] · [Divisor de tensão da bateria (A1)] · [Buzzer + farol] · [ESP32 (voz) → relés] · [Site docs/ + Firebase] · [Python IA (voz/mapeamento, experimental)].
Setas: Usuário → APP-WACS → (Bluetooth serial, chars F/B/E/D/S/L/Z/X/R/?) → Arduino → Ponte H → Motores · HC-SR04 → Arduino (parada de emergência na ré <30 cm) · Bateria(A1) → Arduino → telemetria serial → (app) · Usuário (voz) → ESP32 → relés · Site ↔ Firebase.

### Implementado x protótipo x planejado
| Item | Estado |
|---|---|
| Acionamento de motores por ponte H e botões | Código de teste (Tinkercad e `Testes/`); **não há evidência de teste físico além do próprio código** |
| Comando por Bluetooth (HC-05) | Código de teste em sketch Tinkercad; app WACS envia só limite de velocidade via HTTP (ver seção 1) |
| Sensor ultrassônico + parada de emergência na ré | Código (teste_4) |
| Monitor de bateria, buzzer, farol, autoteste | Código (teste_4) |
| Comando de voz (ESP32 → relés) | Protótipo curto (54 linhas) |
| IA de mapeamento por imagem | **Stub/esboço**; não validado |
| Assistente de voz Python | Esboço funcional em PC; sem integração comprovada com a cadeira |
| Site de comunidade | Implementado (HTML/JS + Firebase); autoria principal de outro integrante |
| Integração ponta a ponta app→cadeira real | **[NÃO VERIFICADO]** (sem vídeos/fotos da cadeira no repo; imagens são prints do app, esquemas Tinkercad e logos) |

### Testes
Nenhum teste automatizado. Há `GUIA_TESTES.md` genérico e sketches de bancada. Falta evidência (fotos/vídeos/medições) da cadeira física.

### Limitações
Protótipo educacional; sketches duplicados por iteração (sem versão final única); stubs de IA; sem firmware único documentado; credenciais do site via `window.ENV`/Firebase (config pública, mas regras de segurança do Firestore precisam ser revisadas fora do repo); homepage declarada inativa.

### Riscos de divulgação
- Nenhum segredo óbvio encontrado em `.ino`/`.py` (grep de ssid/password/chaves sem ocorrências relevantes; Firebase vem de `window.ENV`).
- `docs/` do site tem lista de usuários/comunidade: verificar se o site público expõe dados pessoais antes de linkar.
- `00 Documentos/~$ WACS I.A.docx` é arquivo temporário do Word versionado (lixo; sem risco).
- Nomes de colegas no README (já públicos); não incluir menores ou terceiros em material do portfólio sem consentimento.

### Screenshots/imagens públicas
`00 Documentos/Prints/APP Beta/{Controle,Login,Mapa}.png`, prints Tinkercad (`01 Arduino/Planejamento (Tinkercad)/Prints/`), logos WACS, `docs/public/images/`.

### Frases seguras
- PT: "TCC interdisciplinar (Etec Registro) de uma cadeira de rodas automatizada: firmware Arduino com acionamento por ponte H, sensor ultrassônico, monitor de bateria e protocolo serial de comandos, além de aplicativo móvel e site de comunidade. Contribuí no desenvolvimento do aplicativo e em partes do site/documentação; o trabalho foi em equipe."
- EN: "Interdisciplinary capstone (Etec Registro) for an automated wheelchair: Arduino firmware with H-bridge motor drive, ultrasonic sensing, battery monitoring and a serial command protocol, plus a mobile app and a community website. I worked on the mobile app and parts of the website/documentation as part of a team."
- Evitar: "cadeira funcional/validada", "IA de acessibilidade treinada", "premiado na FETEPS" sem link/comprovante.

---

## 3. Printh3D — site público + painel administrativo (Next.js + Supabase)

- URL: https://github.com/vftheodoro/Printh3D — sem arquivo de licença. Demo: https://printh3d.vercel.app/ (HTTP 200). 27 commits.
- Primeiro commit: 2026-02-27. Último commit de código: **2026-06-18**.
- Autoria: vftheodoro 17 + Victor Theodoro 10 = **27/27 sob identidades dele** (único autor).

### Problema e contexto
Negócio de impressão 3D: site público (catálogo, orçamento) + sistema administrativo para operar o negócio, migrado de uma SPA estática/IndexedDB ("Printh3D Pro") para Next.js + Supabase [DOC: `DOCUMENTACAO_COMPLETA.md`]. Não ficou claro no repo se é negócio próprio ou de cliente [NÃO VERIFICADO] — confirmar com o chefe.

### Tecnologias reais (package.json)
Next 16.2.9 (App Router), React 19.2.3, TypeScript ^5, Tailwind CSS ^4, @supabase/supabase-js ^2.99.1, jose ^6.2.1 (JWT), bcryptjs ^3.0.3, zod ^4.4.3, react-hook-form ^7.79, @tanstack/react-query ^5.101, framer-motion ^12.36, chart.js ^4.5.1; testes: vitest ^4.1.8, @testing-library, @playwright/test ^1.60, @axe-core/playwright ^4.11.3.

### Estrutura
`src/app` (público: home, produtos, produtos/[id], orçamento, materiais, contato, privacidade, termos, sitemap/robots/manifest; `admin/*` 14 páginas: dashboard, produtos, categorias, vendas, clientes, gastos, promoções, calculadora, lixeira, manutenção, usuários, configurações, login; `api/admin/*` ~20 rotas) · `src/modules/{auth,products,sales}` (domínio, schemas zod, serviço, rate-limit de login) · `src/lib` (budget, product-payload, supabase, audit-log, whatsapp, logger) · `src/proxy.ts` (guard de rotas) · `supabase/migrations` (5 migrations, 2026-06-18) · `tests/e2e`.

### Diagrama (nós/setas)
Nós: [Visitante] · [Site público (Server Components)] · [Calculadora de orçamento] · [WhatsApp] · [Admin (login)] · [proxy.ts (JWT + papéis)] · [API routes admin] · [módulos auth/sales/products (zod)] · [Supabase Postgres + Storage público/privado] · [audit_logs / admin_login_attempts].
Setas: Visitante → Site público → Supabase (leitura de catálogo; fallback estático documentado) · Visitante → Orçamento → WhatsApp · Admin → /admin/login → JWT em cookie httpOnly (jose) → proxy.ts → API admin → serviços → Supabase (service role, apenas servidor) · API admin → audit_logs · Arquivos privados → URLs assinadas curtas.

### Decisões técnicas verificáveis [CÓDIGO]
- Autenticação própria (JWT em cookie httpOnly com `jose`, hash `bcryptjs`), **proxy com rotas só-admin** por prefixo e papéis (`isAdminRole`), verificação em métodos mutantes.
- **Rate limit de login** (5 tentativas / 15 min, identificador com hash + segredo) com fallback em memória.
- Migrations "endurecendo" o banco: schema `private`, identity columns, remoção de policies públicas legadas, normalização de descontos, índices em FKs (2026-06-18). `supabase/README.md` exige backup + restauração em projeto de validação antes de migrar e `supabase db lint`.
- Soft-delete (lixeira), backup JSON, audit log, buckets públicos/privados, validação zod, sanitização de payload de produto.
- Documentação própria admite desvio: a doc usa o termo "middleware"; o código usa `proxy.ts` (convenção do Next 16).

### Implementado x protótipo x planejado
Implementado (código): catálogo, página de produto com variações, orçamento, admin CRUD completo, calculadora de custos, lixeira, backup, auditoria, login com limite. Protótipo/ressalva: doc diz "13 KPIs e 4 gráficos" e "12 tabelas" (afirmação de doc, não conferida contra o banco real); "Replica exata do sistema original" é afirmação de doc. Não verificado: funcionamento em produção, RLS efetivamente aplicado no projeto remoto (as migrations existem; o estado remoto não foi consultado).

### Testes (existência; **não executados**)
Vitest: `budget.test.ts`, `client-api.test.ts`, `format.test.ts`, `product-payload.test.ts`, `modules/auth/domain.test.ts`, `modules/sales/schemas.test.ts` (6 arquivos). Playwright e2e: `tests/e2e/public.spec.ts` com axe-core (acessibilidade, overflow mobile, filtros do catálogo na URL). Scripts `lint`, `typecheck`, `test`, `test:e2e` no package.json. Sem CI no repo. Cobertura/resultados: [NÃO VERIFICADO].

### Limitações
Sem licença; sem CI; sem testes de API admin nem de RLS visíveis; `name` do pacote é "tmp-app"; autenticação própria em vez de Supabase Auth (decisão declarada, mas aumenta superfície de risco); e-commerce sem pagamento online (vendas manuais/WhatsApp).

### Riscos de divulgação
- Nenhuma credencial encontrada (README/doc mostram só placeholders). ID do projeto Supabase citado em `supabase/README.md` (ver 0.3).
- **Painel admin conteria dados reais de clientes/vendas/gastos** em produção; o repo não inclui dados (sem .env, sem dumps) — bom. **Não** divulgar prints do `/admin` com dados reais; usar dados fictícios.
- Logomarca "Printh" no repo: confirmar quem é o titular da marca.

### Screenshots públicos
Apenas 13 arquivos em `public/` (logos e `public/assets/imagens/materials_hero.png`, usada no README). Para o estudo de caso, gerar capturas do site público (printh3d.vercel.app) e do admin com dados fictícios.

### Frases seguras
- PT: "Site público com catálogo e calculadora de orçamento e painel administrativo (produtos, vendas, clientes, gastos) em Next.js e Supabase, com login por JWT, limite de tentativas, trilha de auditoria, migrations versionadas e testes automatizados (Vitest/Playwright)."
- EN: "Public catalog and quote calculator plus an admin panel (products, sales, clients, expenses) built with Next.js and Supabase, featuring JWT login, login rate limiting, audit logging, versioned migrations and automated tests (Vitest/Playwright)."
- Evitar números (KPIs, vendas, usuários) e "plataforma em produção usada por X clientes".

---

## 4. Porto-de-Registro — horários de ônibus regional (Next.js, dados em JSON)

- URL: https://github.com/vftheodoro/Porto-de-Registro — sem licença. Demo: https://vftheodoro.github.io/Porto-de-Registro/ (HTTP 200, export estático via GitHub Pages). 11 commits.
- Primeiro commit: 2026-03-09. Último commit de código: **2026-03-10**. Autoria: Victor Theodoro 7 + vftheodoro 3 + 1 = 11/11 dele.

### Problema e contexto
Consulta de horários, linhas, tarifas e avisos de transporte regional (Vale do Ribeira): busca por origem/destino/tipo de dia, conexões, PDF imprimível, painel admin para editar `data.json`. Dados: 12 paradas, 9 linhas, 250 horários, 30 tarifas (README; `data.json` confere em estrutura), tabela "vigente a partir de 02/02/2026".

### Tecnologias reais
Next 16.1.6, React 19.2.3, TypeScript ^5, jsPDF ^4.2.0 + jspdf-autotable ^5.0.7, date-fns ^4.1.0, xlsx ^0.18.5, lucide-react ^0.577, Vitest ^3.2.4, ESLint 9. Deploy: GitHub Actions → GitHub Pages (`build:pages`, `prepare:static`).

### Estrutura
`data.json` (paradas, linhas, avisos) → `src/lib` (db, validate-db, public-search, route-planner, avisos-publicos, municipios, rodoviarias-data, security, auth-admin) → `src/app/api/public/{busca,destinos,linhas,paradas,avisos,pdf}` e `src/app/api/admin/{login,logout,data}` → páginas públicas (`/`, `/horarios`, `/linhas`, `/tarifas`, `/atendimento`, `/rodoviarias`, `/sobre`) e admin (`avisos`, `paradas`, `linhas`) · `src/proxy.ts` protege `/admin` · `scripts/` (build-pages, prepare-static, validate).

### Diagrama (nós/setas)
Nós: [Passageiro] · [UI pública/ScheduleSearch] · [route-planner + public-search] · [data.json] · [API pública / export estático] · [PDF (jsPDF)] · [Admin] · [proxy.ts + cookie HMAC] · [Download do JSON → commit manual] · [GitHub Actions → GitHub Pages].
Setas: Passageiro → UI → route-planner (direto; conexões só se não houver direto) → data.json · UI → PDF · Admin → login (senha de ambiente, cookie HttpOnly assinado) → edita JSON → (dev: grava em disco; produção: baixa JSON e commita) → Actions → Pages.

### Decisões técnicas verificáveis [CÓDIGO]
Regra "se há rota direta, suprime conexões"; filtro de destinos alcançáveis por origem e tipo de dia; detecção de tipo de dia no cliente com feriados fixos/móveis; cookie de sessão HMAC com comparação em tempo constante; build duplo (servidor Next vs. export estático) com `withBasePath`.
**Inconsistências entre doc e código:** o README ainda lista como "pontos de atenção" login sem rate-limit e "comparação direta de senha", mas o código tem `timingSafeEqualString` e sessão HMAC; sem rate limit de login visível. Há `DEV_FALLBACK_PASSWORD='admin'` e segredo de dev hardcoded em `auth-admin.ts`, ativos só fora de `NODE_ENV=production` (aceitável em dev, mas documentar).

### Testes (existência; não executados)
Vitest: `test/busca.test.ts`, `destinos.test.ts`, `db.test.ts`, `validate.test.ts` (rotas de busca/destinos e integridade de dados) + `scripts/validate.js`. Sem e2e, sem CI de teste (o workflow só faz deploy).

### Limitações
Banco = arquivo JSON (sem banco real); edição em produção exige commit manual; sem rate limit de login; GitHub Pages não executa as APIs (versão estática precisa de `prepare-static`); sem licença.

### Riscos de divulgação — **ALTO**
O site **se apresenta como o site da empresa** "Porto de Registro Transportes Ltda", com CNPJ, telefones, WhatsApp, Instagram "oficial", logos da empresa e do "Grupo Rápido Perus", brasões de 10 prefeituras, imagens do cartão de passageiro e do frota; PDF diz "Documento oficial de consulta de horarios" / "Quadro Oficial de Horários". Há créditos "desenvolvido por Victor Theodoro", mas **nenhum aviso de que não é oficial** nem prova de contratação/autorização no repo [NÃO VERIFICADO]. Riscos: uso de marca e brasões de terceiros, informação de horários/tarifas que o público pode tomar como oficial (e que pode estar desatualizada), repositório público com o conteúdo completo e demo no ar.

### Recomendação específica
Não promover como projeto principal **sem confirmação de que é trabalho para a empresa e autorização por escrito para exibir** (ou, alternativamente, adicionar aviso claro "projeto independente/demonstração, não oficial", remover "oficial" do PDF e trocar logos/brasões por placeholders). Se autorizado, é um bom estudo de caso (dados reais, regras de negócio, testes, PDF, deploy estático).

### Frases seguras (somente se houver autorização)
- PT: "Portal de consulta de horários e tarifas de transporte regional em Next.js e TypeScript: busca por origem e destino com conexões, geração de PDF, painel de manutenção dos dados e testes das regras de busca."
- EN: "Regional bus schedule and fare portal in Next.js and TypeScript: origin/destination search with connections, PDF generation, a data-maintenance admin panel, and tests for the search rules."
- Sem autorização: descrever como "projeto de portal de horários (demonstração)" sem citar empresa, CNPJ, logos nem prints.

---

## 5. Projetos secundários

### App-React-CRUD — "Car App" (acadêmico)
- 4 commits; primeiro 2025-06-05, último de código 2025-06-06. Autoria: Victor Theodoro 2 + Pc-Lab 2. MIT.
- Expo ~53.0.10, React Native 0.79.3, React 19.0.0, React Navigation 7. Backend PHP (`api/cars.php`, `config.php`) + `Banco de Dados/cars.sql`. `src/config.js` aponta para IP de rede local (10.68.36.138). `config.php` contém host/usuário/senha de banco (**não reproduzidos**; provavelmente locais/da escola, mas **segredo no repositório** — sinalizar). Tem `DESIGN_SYSTEM.md` e `DESIGN_ACCESSIBILITY.md`. Sem testes. Screenshots em `Imagens/` (6). Estado: funcional só com PHP/SQL local; não há demo.
- Frase segura PT: "Aplicativo acadêmico de catálogo de carros (CRUD) em React Native/Expo com API PHP e banco SQL." EN: "Academic car-catalog CRUD app in React Native/Expo with a PHP API and SQL database."

### Anatomech (DeepBody) — site de equipe (Fatec DSM)
- 18 commits, último de código 2026-05-21; Victor ~13 de 18 (+ identidades 3+2). HTML/CSS/Bootstrap 5. Demo: https://vftheodoro.github.io/Anatomech/ (200). Sem licença (README pede contato antes de reutilizar). README esclarece: ARCore/anatomia 3D são **conceito**, não implementados. Contém nomes completos de colegas (já públicos no site).
- Frase PT: "Site de apresentação da equipe e do conceito DeepBody (visualização educacional de anatomia), em HTML/CSS/Bootstrap; recursos de AR descritos como proposta." EN: "Team and concept site for DeepBody (an educational anatomy visualization idea), built with HTML/CSS/Bootstrap; AR features are presented as a proposal."

### PW-FATEC — exercícios de Programação Web
- 9 commits; MIT; HTML/CSS/JS; 10 aulas + linha do tempo pessoal. Demo 200. Só registro de aprendizado; útil apenas como evidência de formação.

### BarbieScript-RoboCode — robô Java (RoboCode 2023)
- 32 commits (31 sob Victor), último de código 2024-02-22; MIT; Java; `.jar` e fonte. Equipe: Victor, Mario Armando Takahashi Martins Dias, Julia Alabi. Resultado: README diz 1º lugar interno Etec Registro e 2º em finais regionais; **[DOC]**, com links (YouTube / site do evento) no README — não verifiquei os links. 2 estrelas. Bom como evidência de competição em equipe, não de engenharia profissional.

### ODS-Website-Project
- 7 commits, último de código 2025-02-11; MIT; HTML/CSS; projeto escolar de 1º ano. **Demo no GitHub Pages dá 404.** Não exibir link de demo.

### Sites de clientes (Next.js) — **exibir só com autorização do cliente**
- `alan-camargo` (psicoterapia/nutrição): Next 16.3.1, React 19.2.8, Tailwind ^4.3.3, Vitest; 13 commits (Victor 10 + DSM2 3), último de código 2026-08-21; demo https://alan-camargo.vercel.app (200). README declara cuidado regulatório (não usa "psicólogo/CRP"). Tem rodapé "Bythe".
- `amanda-camargo-nails`: Next 16.4.3, React 19.3.1, TS estrito, testes em `src/tests` e `scripts/verify-site.mjs`; 9 commits (100% Victor), último de código 2026-10-24; https://amandacamargonails.com.br (200). Fotos baixadas do Instagram profissional da cliente (README).
- `estetica-isabella-mazzonii` (biomedicina estética): Next 16.3.1, Vitest; 10 commits (DSM2 7 + Victor 3), último de código 2026-08-20; https://estetica-isabella-mazzonii.vercel.app (200).
- Riscos: fotos/depoimentos/dados de contato de terceiros reais, saúde (publicidade regulada). Se forem mostrados, usar só a URL ao vivo e capturas aprovadas pelo cliente; repositório GitHub público sem licença e com imagens de terceiros ("sem autorização de reuso").

### Portfolio (repo do próprio portfólio)
- 44 commits (Victor 28 + vftheodoro 12 + 3 + 1 = todos dele). Next 16.1.6, React 19.2.3, next-intl ^4.8.3, framer-motion ^12.35.2; bilíngue /pt e /en; demo https://vftheodoro.vercel.app/pt (200). Observação: `build.log` está versionado (lixo; checar se vaza caminhos locais) e o contato usa EmailJS no frontend (chaves públicas por natureza; garantir que `service/template` não sejam sensíveis). Sem testes visíveis. Não é "projeto principal".

### Outros
`atv01_node_site`, `dw2_atv02_crud_nodejs`: atividades de aula (não inspecionados a fundo); `vftheodoro` (README de perfil). Não usar.

---

## 6. Recomendação: projetos principais e secundários

**Principais (ordem sugerida):**
1. **Printh3D** — único projeto com autoria 100% dele, engenharia verificável (auth, rate limit, migrations, auditoria, testes unit + e2e/a11y), demo no ar, último código em 2026-06. Melhor evidência de full-stack. Condição: confirmar titularidade/uso da marca e usar dados fictícios em imagens do admin.
2. **WACS (APP-WACS + TCC-WACS como um único estudo de caso)** — o de maior impacto narrativo (tecnologia assistiva, hardware+software, trabalho em equipe), mas o texto precisa refletir o que o código realmente tem: app com modo simulado, firmware de bancada com sensor/parada de emergência, IA em esboço, sem teste ponta a ponta comprovado. Mostrar como "protótipo acadêmico em equipe" e declarar o papel de Victor (app, parte do site/docs).
3. **Sites de cliente BYTHE (Next.js)** — só se o cliente autorizar; escolher **um** (sugestão: `amanda-camargo-nails` por ter testes, 100% autoria dele e site sem coleta de dados; ou `alan-camargo` pelo cuidado regulatório documentado). Dá evidência de entrega real, SEO e deploy. Sem autorização, mover para "secundário" sem prints.
4. **Porto de Registro** — **não recomendado como principal agora**: bom tecnicamente (regras de busca, PDF, testes), mas risco alto de marca/informação "oficial" sem prova de autorização. Passa a principal (posição 3 ou 4) somente com autorização escrita da empresa ou após torná-lo explicitamente demonstração/independente e sem marcas de terceiros.

**Secundários:** Anatomech (equipe/conceito), App-React-CRUD (CRUD acadêmico), BarbieScript-RoboCode (competição, equipe), PW-FATEC e ODS (formação), Portfolio (meta). Omitir `atv01_node_site`, `dw2_atv02_crud_nodejs`.

## 7. Links GitHub/demo: o que é seguro exibir

Seguros agora (repo público, sem segredo encontrado, demo 200):
- https://github.com/vftheodoro/Printh3D e https://printh3d.vercel.app/ (após decidir sobre marca)
- https://github.com/vftheodoro/Anatomech e https://vftheodoro.github.io/Anatomech/
- https://github.com/vftheodoro/PW-FATEC e https://vftheodoro.github.io/PW-FATEC/
- https://github.com/vftheodoro/BarbieScript-RoboCode
- https://vftheodoro.vercel.app/pt (o próprio portfólio)

Exibir **somente após resolver pendência:**
- https://github.com/vftheodoro/APP-WACS — **após rotacionar/restringir a chave do Google Maps** (e, de preferência, limpá-la do histórico) e retirar/esconder a imagem do chat.
- https://github.com/vftheodoro/TCC-WACS — OK como repositório (sem segredos óbvios), mas **não** usar o link `appwacs.com.br` (não resolve).
- https://github.com/vftheodoro/App-React-CRUD — após remover/rotacionar credenciais de `api/config.php` (histórico incluso) ou confirmar que são valores locais descartáveis.
- https://github.com/vftheodoro/Porto-de-Registro e a demo do Pages — após autorização da empresa / aviso de não oficial.
- Sites de clientes (alan-camargo, amanda-camargo-nails, estetica-isabella-mazzonii): somente as URLs ao vivo e com autorização do cliente; evitar linkar os repositórios (imagens de terceiros sem licença).

Não exibir: `https://www.appwacs.com.br/` (DNS não resolve), `https://vftheodoro.github.io/ODS-Website-Project/` (404), `Imagens/Tela de Chat.jpeg` do APP-WACS.

## 8. Verificações de links (2026-11-17, HTTP via curl, sem executar código)
200: printh3d.vercel.app; Porto-de-Registro (Pages); vftheodoro.vercel.app/pt; Anatomech (Pages); PW-FATEC (Pages); alan-camargo.vercel.app; amandacamargonails.com.br; estetica-isabella-mazzonii.vercel.app; github.com/vftheodoro/APP-WACS. 404: ODS Pages. DNS falha: appwacs.com.br.

## 9. Pendências para o chefe
1. Rotacionar/restringir chave do Google Maps (APP-WACS) e avaliar credenciais em `App-React-CRUD/api/config.php`.
2. Autorização/relação com a Porto de Registro Transportes e com os clientes dos sites.
3. Confirmar titularidade da marca Printh3D.
4. Provas do WACS físico (fotos/vídeo de bancada, medições) e do prêmio FETEPS 2025 e do 2º lugar no RoboCode (links).
5. Informar quais commits de `3º MTEC`/`Pc-Lab`/`DSM2` são dele.
6. Executar (por ele ou em ambiente isolado) lint/test/build para trocar "testes existem" por "testes passam" — não foi feito aqui.
