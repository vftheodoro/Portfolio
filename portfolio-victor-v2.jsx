import { useState, useEffect, useRef } from "react";

/*
  ╔══════════════════════════════════════════════════════╗
  ║  VICTOR THEODORO — PORTFOLIO v2                      ║
  ║  Para usar no Next.js:                               ║
  ║  Coloque as imagens em /public/images/ com nomes:    ║
  ║  victor.png         ← 1772806081163__1_.png          ║
  ║  logo-vt.png        ← logo_theodoro_branca.png       ║
  ║  cnn.jpg            ← entrevista-cnn.jpg             ║
  ║  estadao.jpg        ← entrevista-estadao.jpg         ║
  ║  camera.jpg         ← entrevista-camera.jpg          ║
  ║  jornal.jpg         ← jornal-estadao.jpg             ║
  ║  deputado.png       ← deputado-telhada.png           ║
  ║  ivanor.png         ← ivanor-wacs.png                ║
  ║  mocao.png          ← mocao-prefeitura.png           ║
  ║  questao.png        ← questao-theodoro.png           ║
  ║  kit-wacs.png       ← kit_wacs.png                   ║
  ║  site-python.png    ← site-python.png                ║
  ║  app-inicial.jpeg   ← Tela_Inicial.jpeg              ║
  ║  app-login.jpeg     ← Tela_de_Login.jpeg             ║
  ║  app-conexao.png    ← Tela_de_Conexao.png            ║
  ║  app-controle.jpeg  ← Tela_de_Controle.jpeg          ║
  ║  app-seguranca.jpeg ← Tela_de_Controle_em_modo...    ║
  ║  app-locais.jpeg    ← Tela_da_Lista_de_Locais.jpeg   ║
  ║  app-perfil.jpeg    ← Tela_de_Perfil.jpeg            ║
  ╚══════════════════════════════════════════════════════╝
*/

const IMG = {
  victor:    "/images/victor.png",
  logoVT:    "/images/logo-vt.png",
  cnn:       "/images/cnn.jpg",
  estadao:   "/images/estadao.jpg",
  camera:    "/images/camera.jpg",
  jornal:    "/images/jornal.jpg",
  deputado:  "/images/deputado.png",
  ivanor:    "/images/ivanor.png",
  mocao:     "/images/mocao.png",
  questao:   "/images/questao.png",
  kitWacs:   "/images/kit-wacs.png",
  sitePy:    "/images/site-python.png",
  appInicial:   "/images/app-inicial.jpeg",
  appLogin:     "/images/app-login.jpeg",
  appConexao:   "/images/app-conexao.png",
  appControle:  "/images/app-controle.jpeg",
  appSeguranca: "/images/app-seguranca.jpeg",
  appLocais:    "/images/app-locais.jpeg",
  appPerfil:    "/images/app-perfil.jpeg",
};

/* ─── CSS ─── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  :root{
    --bg:#020209; --surface:#07071a; --surface2:#0d0d24;
    --cyan:#00e5ff; --green:#00ff88; --amber:#ffb800; --red:#ff4d6d;
    --border:rgba(0,229,255,0.08); --border-h:rgba(0,229,255,0.32);
    --text:#8fafc7; --text-dim:#324d63; --text-bright:#d8eaf8;
  }
  html{scroll-behavior:smooth;}
  body{background:var(--bg);color:var(--text);font-family:'JetBrains Mono',monospace;overflow-x:hidden;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes scan{0%{top:-2px}100%{top:100%}}
  @keyframes pulse-ring{0%{transform:scale(.9);opacity:.6}70%{transform:scale(1.08);opacity:0}100%{opacity:0}}
  @keyframes slide-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

  .nav-link{font-size:9px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;padding:6px 11px;border:1px solid transparent;color:var(--text-dim);transition:all .2s;font-family:'JetBrains Mono',monospace;background:none;}
  .nav-link:hover,.nav-link.active{color:var(--cyan);border-color:var(--border-h);background:rgba(0,229,255,.04);}

  .btn-p{background:transparent;border:1px solid var(--cyan);color:var(--cyan);padding:13px 30px;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2.5px;cursor:pointer;transition:all .3s;text-transform:uppercase;position:relative;overflow:hidden;}
  .btn-p::before{content:'';position:absolute;inset:0;background:var(--cyan);transform:translateX(-100%);transition:.3s;z-index:0;}
  .btn-p:hover::before{transform:translateX(0);}
  .btn-p:hover{color:var(--bg);box-shadow:0 0 40px rgba(0,229,255,.35);}
  .btn-p span{position:relative;z-index:1;}

  .btn-g{background:transparent;border:1px solid var(--border);color:var(--text-dim);padding:13px 30px;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2.5px;cursor:pointer;transition:all .3s;text-transform:uppercase;}
  .btn-g:hover{border-color:var(--border-h);color:var(--text-bright);}

  .btn-wa{background:transparent;border:1px solid rgba(0,255,136,.2);color:var(--green);padding:13px 30px;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2.5px;cursor:pointer;transition:all .3s;text-transform:uppercase;}
  .btn-wa:hover{background:rgba(0,255,136,.06);border-color:rgba(0,255,136,.45);box-shadow:0 0 30px rgba(0,255,136,.1);}

  .card{background:var(--surface);border:1px solid var(--border);transition:all .3s;position:relative;overflow:hidden;}
  .card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;transition:.3s;}
  .card:hover::after{opacity:1;}
  .card:hover{border-color:var(--border-h);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.5),0 0 24px rgba(0,229,255,.05);}

  .photo-thumb{width:100%;height:180px;object-fit:cover;display:block;filter:brightness(.9);transition:.3s;cursor:pointer;}
  .photo-thumb:hover{filter:brightness(1.1);}

  .pill{border:1px solid var(--border);padding:5px 13px;font-size:9px;letter-spacing:1px;color:var(--text-dim);transition:all .2s;cursor:default;display:inline-block;}
  .pill:hover{border-color:var(--border-h);color:var(--cyan);background:rgba(0,229,255,.04);}

  .timeline-item{border-left:1px solid var(--border);padding:0 0 32px 28px;position:relative;transition:.3s;}
  .timeline-item::before{content:'';position:absolute;left:-5px;top:6px;width:8px;height:8px;background:var(--surface2);border:1px solid var(--text-dim);transition:.3s;}
  .timeline-item:hover{border-left-color:var(--amber);}
  .timeline-item:hover::before{background:var(--amber);box-shadow:0 0 12px rgba(255,184,0,.5);}

  .inp{background:var(--surface2);border:1px solid var(--border);color:var(--text-bright);padding:13px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;width:100%;outline:none;transition:.2s;}
  .inp:focus{border-color:var(--border-h);}
  .inp::placeholder{color:var(--text-dim);}

  .sec-label{font-size:9px;letter-spacing:4px;color:var(--cyan);text-transform:uppercase;margin-bottom:10px;font-family:'Orbitron',monospace;display:flex;align-items:center;gap:10px;}
  .sec-label::before{content:'';display:block;width:22px;height:1px;background:var(--cyan);}
  .sec-title{font-family:'Orbitron',monospace;font-size:clamp(22px,3.5vw,40px);color:var(--text-bright);font-weight:900;line-height:1.1;}

  .status-dot{width:7px;height:7px;border-radius:50%;background:var(--green);display:inline-block;position:relative;flex-shrink:0;}
  .status-dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--green);animation:pulse-ring 2s ease-out infinite;}

  /* Phone mockup */
  .phone-frame{background:#111;border:2px solid #333;border-radius:28px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.05);}
  .phone-screen{width:100%;height:100%;object-fit:cover;object-position:top;}

  /* Lightbox */
  .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:1000;display:flex;align-items:center;justify-content:center;cursor:pointer;backdropFilter:blur(10px);}
  .lightbox img{max-width:90vw;max-height:85vh;object-fit:contain;border:1px solid var(--border);}

  ::-webkit-scrollbar{width:2px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--cyan);}
`;

/* ─── GRID BG ─── */
const GridBg = () => (
  <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
    <svg width="100%" height="100%" style={{opacity:.03,position:"absolute",inset:0}}>
      <defs><pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#00e5ff" strokeWidth=".6"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
    <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"rgba(0,229,255,.1)",animation:"scan 10s linear infinite"}}/>
    <div style={{position:"absolute",top:"15%",right:"-5%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,229,255,.03) 0%,transparent 70%)"}}/>
    <div style={{position:"absolute",bottom:"5%",left:"-5%",width:"350px",height:"350px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,136,.02) 0%,transparent 70%)"}}/>
  </div>
);

/* ─── DATA ─── */
const SKILLS = {
  "Front-end":      ["HTML5","CSS3","JavaScript ES6+","TypeScript","React Native","Figma / UI-UX","Design Responsivo"],
  "Back-end":       ["Node.js","Python","APIs REST","Autenticação JWT","Firebase"],
  "Banco de Dados": ["MySQL","Firebase Realtime","SQL"],
  "Hardware & IoT": ["Arduino","IoT","Sensores","Android Studio","Impressão 3D"],
  "DevOps/Tools":   ["Git / GitHub","Linux","Postman","Expo","Google Maps API","Cisco Network Defense"],
};

const APP_SCREENS = [
  {src: IMG.appLogin,    label: "Login"},
  {src: IMG.appInicial,  label: "Tela Inicial"},
  {src: IMG.appConexao,  label: "Conectar Cadeira"},
  {src: IMG.appControle, label: "Controle"},
  {src: IMG.appSeguranca,label: "Modo Segurança"},
  {src: IMG.appLocais,   label: "Locais Acessíveis"},
  {src: IMG.appPerfil,   label: "Perfil"},
];

const AWARDS = [
  {year:"out 2025",icon:"🥇",title:"1º Lugar — FETEC 6ª Edição",org:"Centro Paula Souza",desc:"Melhor projeto por votação popular — Projeto WACS.",photo:null},
  {year:"out 2025",icon:"🏆",title:"7º Lugar — 16ª FETEPS",org:"Maior feira tech da América Latina",desc:"Representando o Vale do Ribeira com o WACS entre os melhores projetos do continente.",photo:IMG.ivanor},
  {year:"nov 2024",icon:"🏛️",title:"Moção de Aplauso — Câmara Municipal de Registro",org:"Câmara Municipal",desc:"Reconhecimento oficial por inovação e impacto social. Menção especial pelo Vereador Marcelo Comeron.",photo:IMG.mocao},
  {year:"out 2024",icon:"🥇",title:"1º Lugar — FETEC 5ª Edição",org:"Centro Paula Souza",desc:"Projeto 'Educação Sexual' eleito melhor por votação popular.",photo:null},
  {year:"set 2024",icon:"🏅",title:"1º Lugar — 7º Campeonato Brasileiro de Fisiculturismo",org:"IFBB Brasil",desc:"Categoria Men's Physique Sub Junior (até 18 anos). Título nacional.",photo:null},
  {year:"2024",icon:"📰",title:"Nome em questão de prova da Fatec",org:"Fatec Registro / CPS / Governo do Estado de SP",desc:"Questão de programação utilizou Victor Theodoro como personagem — reconhecimento da relevância do seu trabalho.",photo:IMG.questao},
  {year:"set 2023",icon:"🤖",title:"2º Lugar — Torneio Estadual de RoboCode",org:"Robótica Paula Souza",desc:"Torneio estadual de programação de robôs autônomos.",photo:null},
  {year:"ago 2023",icon:"🤖",title:"1º Lugar — RoboCode ETEC Registro",org:"ETEC de Registro",desc:"Campeonato interno de programação de robôs.",photo:null},
];

const PRESS = [
  {outlet:"CNN Brasil",type:"Entrevista",color:"#cc0000",title:"Estudantes criam projetos de inclusão e inovação — CNN Prime Time",desc:"Entrevistado ao vivo no CNN Prime Time durante a FETEPS representando o WACS.",photo:IMG.cnn,url:"https://www.instagram.com/p/DPQr2keDQy4/"},
  {outlet:"Estadão",type:"Entrevista",color:"#004a99",title:"Entrevista sobre tecnologia assistiva desenvolvida por estudante",desc:"Victor Theodoro entrevistado pelo Estadão na 16ª FETEPS sobre o projeto WACS.",photo:IMG.estadao,url:"https://www.instagram.com/p/DQj8IxEkdov/"},
  {outlet:"Estadão Impresso",type:"Matéria",color:"#004a99",title:"Kit 'motoriza' cadeira de rodas — destaque no jornal impresso",desc:"O projeto WACS estampou o Estadão impresso — reconhecimento nacional do impacto da solução.",photo:IMG.jornal,url:"https://www.instagram.com/p/DQj8IxEkdov/"},
  {outlet:"Câmara Municipal",type:"Reconhecimento",color:"#ffb800",title:"Moção de Aplauso entregue pelos Vereadores",desc:"Cerimônia oficial na Câmara Municipal de Registro com entrega de Moção de Aplauso.",photo:IMG.camera,url:"https://www.instagram.com/p/DRhNkyNiKor/"},
  {outlet:"Centro Paula Souza",type:"Destaque",color:"#00ff88",title:"Grupo da ETEC Registro cria cadeira de rodas com sistema de acessibilidade inteligente",desc:"Matéria oficial do CPS destacando o WACS como inovação em acessibilidade.",photo:null,url:"https://www.cps.sp.gov.br/grupo-da-etec-registro-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente/"},
  {outlet:"Região Hoje",type:"Notícia",color:"var(--text-dim)",title:"Grupo de ETEC cria cadeira de rodas com sistema de acessibilidade inteligente",desc:"Cobertura regional da inovação no Vale do Ribeira.",photo:null,url:"https://www.regiaohoje.com.br/noticia/38090/santa-barbara/brasil/grupo-de-etec-cria-cadeira-de-rodas-com-sistema-de-acessibilidade-inteligente.html"},
  {outlet:"ABC do ABC",type:"Notícia",color:"var(--text-dim)",title:"ETEC projeta cadeira de rodas inteligente",desc:"Portal de notícias de grande alcance cobre o projeto WACS.",photo:null,url:"https://abcdoabc.com.br/etec-projeta-cadeira-de-rodas-inteligente/"},
  {outlet:"FETEPS Oficial",type:"Destaque",color:"#00ff88",title:"WACS — Autonomia Inteligente para PCDs — Ficha oficial",desc:"Projeto com ficha oficial na maior feira de tecnologia da América Latina.",photo:null,url:"https://feteps.cps.sp.gov.br/projetos/wacs-autonomia-inteligente-para-pcds/"},
];

const SERVICES = [
  {icon:"◈",title:"Sites & Landing Pages",color:"#00e5ff",items:["Sites institucionais e portfólios","Landing pages de alta conversão","E-commerce e lojas virtuais","Blogs e sites de conteúdo","SEO técnico e performance"]},
  {icon:"⬡",title:"Sistemas & Plataformas Web",color:"#00ff88",items:["Dashboards e painéis admin","Plataformas SaaS e B2B","Sistemas de gestão (ERP/CRM)","Integrações de API e automações","Autenticação e segurança"]},
  {icon:"◉",title:"Apps Mobile & Software",color:"#ffb800",items:["Apps Android/iOS (React Native)","Sistemas com IoT e Hardware","Integração Arduino & sensores","APIs e back-ends escaláveis","Consultoria técnica"]},
];

/* ─── LIGHTBOX ─── */
function Lightbox({src, onClose}) {
  useEffect(()=>{
    const fn = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[]);
  return (
    <div className="lightbox" onClick={onClose}>
      <img src={src} alt="" onClick={e=>e.stopPropagation()}/>
    </div>
  );
}

/* ─── APP SCREENS CAROUSEL ─── */
function AppScreens() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      {/* Main display */}
      <div style={{display:"flex",gap:"32px",alignItems:"flex-start",marginBottom:"24px"}}>
        {/* Active phone */}
        <div style={{flexShrink:0}}>
          <div className="phone-frame" style={{width:"200px",height:"400px"}}>
            <img
              className="phone-screen"
              src={APP_SCREENS[active].src}
              alt={APP_SCREENS[active].label}
              style={{cursor:"zoom-in"}}
              onClick={()=>setLightbox(APP_SCREENS[active].src)}
            />
          </div>
          <div style={{textAlign:"center",marginTop:"10px",fontSize:"10px",color:"var(--cyan)",letterSpacing:"1px"}}>{APP_SCREENS[active].label}</div>
        </div>

        {/* Thumbnails grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",flex:1}}>
          {APP_SCREENS.map((s,i)=>(
            <div
              key={i}
              onClick={()=>setActive(i)}
              style={{
                border:`1px solid ${i===active?"var(--cyan)":"var(--border)"}`,
                overflow:"hidden",cursor:"pointer",transition:".2s",
                background: i===active?"rgba(0,229,255,.06)":"var(--surface2)",
              }}
            >
              <img src={s.src} alt={s.label} style={{width:"100%",height:"80px",objectFit:"cover",objectPosition:"top",display:"block",opacity:i===active?1:.6,transition:".2s"}}/>
              <div style={{padding:"4px 6px",fontSize:"8px",color:i===active?"var(--cyan)":"var(--text-dim)",letterSpacing:"1px",textAlign:"center"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && <Lightbox src={lightbox} onClose={()=>setLightbox(null)}/>}
    </div>
  );
}

/* ─── MAIN ─── */
export default function VictorPortfolio() {
  const [typed, setTyped] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedProject, setExpandedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({name:"",email:"",type:"",message:""});

  const roles = ["Full-Stack Developer","Criador do Projeto WACS","Dev de Tecnologia Assistiva","Estudante & Empreendedor"];

  useEffect(()=>{
    let ri=0,ci=0,del=false,t;
    const tick=()=>{
      const w=roles[ri];
      if(!del){setTyped(w.slice(0,ci+1));ci++;if(ci===w.length){del=true;t=setTimeout(tick,2200);return;}}
      else{setTyped(w.slice(0,ci-1));ci--;if(ci===0){del=false;ri=(ri+1)%roles.length;}}
      t=setTimeout(tick,del?45:85);
    };
    t=setTimeout(tick,600);
    return()=>clearTimeout(t);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(
      entries=>entries.forEach(e=>{if(e.isIntersecting)setActiveSection(e.target.id);}),
      {threshold:.25}
    );
    ["hero","services","about","skills","projects","awards","press","contact"].forEach(id=>{
      const el=document.getElementById(id);if(el)obs.observe(el);
    });
    return()=>obs.disconnect();
  },[]);

  const go = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const openWA = () => {
    const msg=encodeURIComponent("Olá Victor! Vi seu portfólio e gostaria de conversar sobre um projeto.");
    window.open(`https://wa.me/5513996016551?text=${msg}`,"_blank");
  };

  const navItems = [
    ["Serviços","services"],["Sobre","about"],["Skills","skills"],
    ["Projetos","projects"],["Prêmios","awards"],["Imprensa","press"],["Contato","contact"]
  ];

  return (
    <>
      <style>{CSS}</style>
      {lightbox && <Lightbox src={lightbox} onClose={()=>setLightbox(null)}/>}

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,borderBottom:"1px solid var(--border)",backdropFilter:"blur(24px)",background:"rgba(2,2,9,.9)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px",maxWidth:"1400px",margin:"0 auto",padding:"0 5%"}}>
          {/* VT Logo */}
          <button onClick={()=>go("hero")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"10px"}}>
            <img src={IMG.logoVT} alt="VT" style={{height:"32px",filter:"brightness(0) invert(1)",opacity:.9}}/>
          </button>
          <div style={{display:"flex",gap:"2px",alignItems:"center",flexWrap:"wrap"}}>
            {navItems.map(([l,id])=>(
              <button key={id} className={`nav-link${activeSection===id?" active":""}`} onClick={()=>go(id)}>{l}</button>
            ))}
            <button className="btn-p" style={{padding:"8px 18px",fontSize:"9px",marginLeft:"10px"}} onClick={openWA}>
              <span>💬 Contratar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",padding:"0 5%",paddingTop:"60px",overflow:"hidden"}}>
        <GridBg/>
        <div style={{maxWidth:"1400px",margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1.15fr .85fr",gap:"60px",alignItems:"center",position:"relative",zIndex:1}}>

          {/* LEFT */}
          <div style={{animation:"fadeUp .7s ease both"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px"}}>
              <span className="status-dot"/>
              <span style={{fontSize:"9px",letterSpacing:"3px",color:"var(--green)"}}>DISPONÍVEL PARA NOVOS PROJETOS</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"28px",height:"1px",background:"var(--cyan)"}}/>
              <span style={{fontSize:"9px",letterSpacing:"4px",color:"var(--cyan)",fontFamily:"'Orbitron',monospace"}}>FULL-STACK DEVELOPER · REGISTRO, SP</span>
            </div>
            <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(36px,5vw,68px)",fontWeight:900,lineHeight:.95,color:"var(--text-bright)",marginBottom:"12px",letterSpacing:"-1px"}}>
              VICTOR<br/><span style={{color:"var(--cyan)",textShadow:"0 0 50px rgba(0,229,255,.25)"}}>THEODORO</span>
            </h1>
            <div style={{height:"1px",width:"100%",background:"linear-gradient(90deg,var(--cyan),rgba(0,229,255,.1),transparent)",marginBottom:"20px"}}/>
            <div style={{fontSize:"clamp(12px,1.4vw,16px)",color:"var(--text-dim)",marginBottom:"8px",minHeight:"26px"}}>
              <span style={{color:"var(--green)",marginRight:"8px"}}>&gt;</span>
              <span style={{color:"var(--text)"}}>{typed}</span>
              <span style={{animation:"blink 1s step-end infinite",color:"var(--cyan)"}}>█</span>
            </div>
            <p style={{color:"var(--text-dim)",fontSize:"13px",lineHeight:1.85,maxWidth:"500px",marginBottom:"36px",marginTop:"20px"}}>
              Desenvolvedor apaixonado por criar soluções que <span style={{color:"var(--text-bright)"}}>transformam vidas</span>. Criador do <span style={{color:"var(--cyan)"}}>WACS</span> — projeto de tecnologia assistiva com cobertura na <strong style={{color:"var(--text-bright)"}}>CNN Brasil e Estadão</strong>.
            </p>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"44px"}}>
              <button className="btn-p" onClick={()=>go("contact")}><span>Solicitar Projeto</span></button>
              <button className="btn-wa" onClick={openWA}>💬 WhatsApp</button>
              <button className="btn-g" onClick={()=>go("projects")}>Ver Projetos ↓</button>
            </div>
            {/* Stats */}
            <div style={{display:"flex",gap:"0",borderTop:"1px solid var(--border)",paddingTop:"28px",flexWrap:"wrap"}}>
              {[["5+","Anos de código"],["CNN + Estadão","Cobertura nacional"],["3×","Campeão 🥇"],["WACS","Impacto real"]].map(([n,l],i,arr)=>(
                <div key={l} style={{paddingRight:"24px",marginRight:"24px",borderRight:i<arr.length-1?"1px solid var(--border)":undefined,marginBottom:"8px"}}>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:"18px",fontWeight:900,color:"var(--cyan)",lineHeight:1}}>{n}</div>
                  <div style={{fontSize:"9px",color:"var(--text-dim)",letterSpacing:"1px",marginTop:"5px"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div style={{animation:"fadeIn 1s ease .3s both",display:"flex",justifyContent:"center"}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{position:"absolute",inset:"-18px",borderRadius:"8px",border:"1px solid rgba(0,229,255,.08)",animation:"pulse-ring 3s ease-out infinite"}}/>
              <div style={{position:"absolute",inset:"-36px",borderRadius:"12px",border:"1px solid rgba(0,229,255,.04)",animation:"pulse-ring 3s ease-out .6s infinite"}}/>
              {/* Corner decorators */}
              {[[{top:0,left:0},{borderTop:"2px solid var(--cyan)",borderLeft:"2px solid var(--cyan)"}],
                [{top:0,right:0},{borderTop:"2px solid var(--cyan)",borderRight:"2px solid var(--cyan)"}],
                [{bottom:0,left:0},{borderBottom:"2px solid var(--cyan)",borderLeft:"2px solid var(--cyan)"}],
                [{bottom:0,right:0},{borderBottom:"2px solid var(--cyan)",borderRight:"2px solid var(--cyan)"}],
              ].map(([pos,border],i)=>(
                <div key={i} style={{position:"absolute",...pos,width:"18px",height:"18px",...border}}/>
              ))}
              <img
                src={IMG.victor}
                alt="Victor Theodoro"
                style={{display:"block",width:"clamp(260px,26vw,360px)",objectFit:"cover",objectPosition:"top center"}}
              />
              {/* Badge */}
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(2,2,9,.98) 60%,transparent)",padding:"28px 20px 16px",textAlign:"center"}}>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:"10px",color:"var(--cyan)",letterSpacing:"3px"}}>VICTOR THEODORO</div>
                <div style={{fontSize:"8px",color:"var(--text-dim)",letterSpacing:"2px",marginTop:"4px"}}>REGISTRO, SP · REMOTO NACIONAL</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",opacity:.3,cursor:"pointer"}} onClick={()=>go("services")}>
          <span style={{fontSize:"8px",letterSpacing:"3px",color:"var(--text-dim)"}}>SCROLL</span>
          <div style={{width:"1px",height:"32px",background:"linear-gradient(to bottom,var(--cyan),transparent)"}}/>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{padding:"110px 5%",borderTop:"1px solid var(--border)",position:"relative"}}>
        <GridBg/>
        <div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{marginBottom:"56px"}}>
            <div className="sec-label">Serviços</div>
            <h2 className="sec-title">O que eu <span style={{color:"var(--cyan)"}}>Construo</span></h2>
            <p style={{color:"var(--text-dim)",fontSize:"13px",marginTop:"14px",maxWidth:"500px",lineHeight:1.85}}>
              Sites, sistemas, apps e software com foco em resultado. Comunicação clara, prazo real, entrega que supera expectativas.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",background:"var(--border)"}}>
            {SERVICES.map(s=>(
              <div key={s.title} className="card" style={{padding:"36px 30px",background:"var(--surface)"}}>
                <div style={{fontSize:"34px",color:s.color,marginBottom:"18px",animation:"float 5s ease-in-out infinite"}}>{s.icon}</div>
                <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"13px",color:"var(--text-bright)",marginBottom:"20px",letterSpacing:".5px",lineHeight:1.3}}>{s.title}</h3>
                <ul style={{listStyle:"none",marginBottom:"28px"}}>
                  {s.items.map(i=>(
                    <li key={i} style={{fontSize:"11px",color:"var(--text-dim)",padding:"7px 0",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:"10px"}}>
                      <span style={{color:s.color,fontSize:"7px",flexShrink:0}}>▶</span>{i}
                    </li>
                  ))}
                </ul>
                <button className="btn-p" style={{width:"100%",borderColor:s.color,color:s.color}} onClick={openWA}>
                  <span>Pedir orçamento</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:"110px 5%",background:"var(--surface)",borderTop:"1px solid var(--border)"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"center"}}>
          <div>
            <div className="sec-label">Sobre mim</div>
            <h2 className="sec-title" style={{marginBottom:"24px"}}>Dev que cria código <span style={{color:"var(--cyan)"}}>e impacto real</span></h2>
            <p style={{color:"var(--text-dim)",fontSize:"13px",lineHeight:1.95,marginBottom:"16px"}}>
              Sou Victor Theodoro, desenvolvedor Full-Stack de Registro, SP. Comecei programando por curiosidade e hoje crio sistemas que chegam a noticiários nacionais — como o <span style={{color:"var(--cyan)"}}>WACS</span>, a cadeira de rodas inteligente coberta pela <span style={{color:"var(--text-bright)"}}>CNN Brasil e Estadão</span>.
            </p>
            <p style={{color:"var(--text-dim)",fontSize:"13px",lineHeight:1.95,marginBottom:"16px"}}>
              Acredito que tecnologia só faz sentido quando resolve problemas reais. Por isso, cada projeto é tratado como se fosse meu — com atenção ao detalhe, comunicação aberta e entrega que surpreende.
            </p>
            <p style={{color:"var(--text-dim)",fontSize:"13px",lineHeight:1.95,marginBottom:"32px"}}>
              Fora do código, sou atleta — <span style={{color:"var(--text-bright)"}}>Campeão Brasileiro de Fisiculturismo</span> Men's Physique Sub Junior 2024. A disciplina do esporte vai direto pro trabalho.
            </p>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <button className="btn-p" onClick={()=>go("contact")}><span>Vamos conversar</span></button>
              <a href="https://linkedin.com/in/vftheodoro" target="_blank" style={{textDecoration:"none"}}>
                <button className="btn-g">LinkedIn →</button>
              </a>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:"var(--border)"}}>
            {[
              {label:"Stack Principal",value:"React Native · Node.js · Python · Firebase",icon:"◈",c:"var(--cyan)"},
              {label:"Disponibilidade",value:"Aberto para novos projetos",icon:"●",c:"var(--green)"},
              {label:"Localização",value:"Registro, SP — Remoto Nacional",icon:"◎",c:"var(--text-dim)"},
              {label:"Formação",value:"Técnico em Dev. de Sistemas — ETEC Registro",icon:"◇",c:"var(--text-dim)"},
              {label:"Certificações",value:"Cisco Network Defense · Ethical Hacking",icon:"⬡",c:"var(--amber)"},
              {label:"Projeto Destaque",value:"WACS — CNN Brasil · Estadão · FETEPS",icon:"◉",c:"var(--cyan)"},
            ].map(item=>(
              <div key={item.label} style={{background:"var(--surface2)",padding:"20px 18px"}}>
                <div style={{fontSize:"18px",marginBottom:"10px",color:item.c}}>{item.icon}</div>
                <div style={{fontSize:"8px",letterSpacing:"2px",color:"var(--text-dim)",marginBottom:"6px",textTransform:"uppercase"}}>{item.label}</div>
                <div style={{fontSize:"11px",color:"var(--text-bright)",lineHeight:1.5}}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{padding:"100px 5%",borderTop:"1px solid var(--border)"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto"}}>
          <div className="sec-label">Tech Stack</div>
          <h2 className="sec-title" style={{marginBottom:"52px"}}>Tecnologias que <span style={{color:"var(--cyan)"}}>Domino</span></h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"36px"}}>
            {Object.entries(SKILLS).map(([cat,tags])=>(
              <div key={cat}>
                <div style={{fontSize:"9px",letterSpacing:"3px",color:"var(--text-dim)",marginBottom:"14px",textTransform:"uppercase",borderBottom:"1px solid var(--border)",paddingBottom:"10px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <span style={{color:"var(--cyan)"}}>◈</span>{cat}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"0"}}>{tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{padding:"110px 5%",background:"var(--surface)",borderTop:"1px solid var(--border)"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto"}}>
          <div className="sec-label">Projetos</div>
          <h2 className="sec-title" style={{marginBottom:"56px"}}>Cases em <span style={{color:"var(--cyan)"}}>Destaque</span></h2>

          {/* ── WACS ── */}
          <div style={{border:"1px solid var(--border)",marginBottom:"1px",background:"var(--bg)"}}>
            {/* Header */}
            <div
              style={{display:"grid",gridTemplateColumns:"4px 1fr auto",cursor:"pointer",background:expandedProject==="wacs"?"var(--surface2)":"var(--bg)",transition:".3s"}}
              onClick={()=>setExpandedProject(expandedProject==="wacs"?null:"wacs")}
            >
              <div style={{background:"linear-gradient(to bottom,var(--cyan),transparent)",minHeight:"80px"}}/>
              <div style={{padding:"28px 32px"}}>
                <div style={{display:"flex",gap:"12px",alignItems:"baseline",marginBottom:"8px",flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:"9px",color:"var(--cyan)",letterSpacing:"2px"}}>2023–2025</span>
                  <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(13px,1.5vw,18px)",color:"var(--text-bright)"}}>WACS — Wheelchair Automation Control System</h3>
                </div>
                <p style={{fontSize:"12px",color:"var(--text-dim)",marginBottom:"12px"}}>Cadeira de rodas inteligente com IA, controle por voz e app mobile · CNN Brasil · Estadão · FETEPS</p>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {["Python","Arduino","IoT","React Native","TypeScript","Node.js","Firebase","IA"].map(t=>(
                    <span key={t} style={{fontSize:"8px",padding:"3px 10px",border:"1px solid var(--border)",color:"var(--text-dim)",letterSpacing:"1px"}}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{padding:"28px 32px",display:"flex",alignItems:"center"}}>
                <span style={{fontSize:"20px",color:expandedProject==="wacs"?"var(--cyan)":"var(--text-dim)",transition:".3s",transform:expandedProject==="wacs"?"rotate(45deg)":"rotate(0)"}}>+</span>
              </div>
            </div>
            {/* Expanded */}
            {expandedProject==="wacs" && (
              <div style={{borderTop:"1px solid rgba(0,229,255,.15)",padding:"40px 40px 40px 44px",animation:"fadeUp .3s ease",background:"var(--surface2)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px",marginBottom:"40px"}}>
                  <div>
                    <p style={{fontSize:"13px",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"24px"}}>
                      Sistema inteligente de automação para cadeiras de rodas desenvolvido na ETEC de Registro. Une Python, Arduino e IA para oferecer controle por voz, navegação assistida e app mobile — promovendo independência real para PCDs.
                    </p>
                    <div style={{marginBottom:"24px"}}>
                      <div style={{fontSize:"8px",letterSpacing:"3px",color:"var(--cyan)",marginBottom:"12px",textTransform:"uppercase"}}>FUNCIONALIDADES</div>
                      {["Controle por voz com processamento de linguagem natural","Navegação assistida por IA com mapeamento de ambiente","App mobile (React Native) com integração Google Maps","Mapa de locais acessíveis colaborativo","Integração completa IoT via Arduino e sensores","Resultou em doação de cadeira motorizada para usuário real"].map(h=>(
                        <div key={h} style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"9px"}}>
                          <span style={{color:"var(--cyan)",fontSize:"7px",flexShrink:0,marginTop:"4px"}}>▶</span>
                          <span style={{fontSize:"11px",color:"var(--text-dim)",lineHeight:1.6}}>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                      <a href="https://www.appwacs.com.br" target="_blank" style={{textDecoration:"none"}}>
                        <button className="btn-p" style={{padding:"10px 20px",fontSize:"9px"}}><span>Site WACS →</span></button>
                      </a>
                      <a href="https://instagram.com/wacs_etec" target="_blank" style={{textDecoration:"none"}}>
                        <button className="btn-g" style={{padding:"10px 20px",fontSize:"9px"}}>Instagram</button>
                      </a>
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:"8px",letterSpacing:"3px",color:"var(--cyan)",marginBottom:"14px",textTransform:"uppercase"}}>RESULTADOS</div>
                    {["1º Lugar — Votação Popular FETEC 2025","7º Lugar — 16ª FETEPS (maior feira tech da América Latina)","Entrevista CNN Brasil — Prime Time","Entrevista Estadão + matéria impressa","Moção de Aplauso — Câmara Municipal de Registro","Apresentado para Deputado Estadual Capitão Telhada"].map(r=>(
                      <div key={r} style={{display:"flex",gap:"10px",alignItems:"center",padding:"9px 14px",background:"var(--surface)",border:"1px solid var(--border)",marginBottom:"7px"}}>
                        <span style={{color:"var(--cyan)"}}>★</span>
                        <span style={{fontSize:"11px",color:"var(--text-bright)"}}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App Screenshots */}
                <div style={{borderTop:"1px solid var(--border)",paddingTop:"32px",marginBottom:"32px"}}>
                  <div style={{fontSize:"8px",letterSpacing:"3px",color:"var(--cyan)",marginBottom:"20px",textTransform:"uppercase"}}>TELAS DO APP</div>
                  <AppScreens/>
                </div>

                {/* Event photos */}
                <div style={{borderTop:"1px solid var(--border)",paddingTop:"32px"}}>
                  <div style={{fontSize:"8px",letterSpacing:"3px",color:"var(--cyan)",marginBottom:"20px",textTransform:"uppercase"}}>MOMENTOS & EVENTOS</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
                    {[
                      {src:IMG.kitWacs,   label:"Kit WACS 3D"},
                      {src:IMG.ivanor,    label:"Equipe WACS"},
                      {src:IMG.mocao,     label:"Câmara Municipal"},
                      {src:IMG.cnn,       label:"CNN Brasil"},
                    ].map(p=>(
                      <div key={p.label} style={{border:"1px solid var(--border)",overflow:"hidden",cursor:"zoom-in"}} onClick={()=>setLightbox(p.src)}>
                        <img src={p.src} alt={p.label} className="photo-thumb" style={{height:"120px"}}/>
                        <div style={{padding:"6px 8px",fontSize:"8px",color:"var(--text-dim)",letterSpacing:"1px"}}>{p.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── FILMREVIEWS ── */}
          <div style={{border:"1px solid var(--border)",marginBottom:"1px",background:"var(--bg)"}}>
            <div style={{display:"grid",gridTemplateColumns:"4px 1fr auto",cursor:"pointer",background:expandedProject==="film"?"var(--surface2)":"var(--bg)",transition:".3s"}} onClick={()=>setExpandedProject(expandedProject==="film"?null:"film")}>
              <div style={{background:"linear-gradient(to bottom,var(--green),transparent)",minHeight:"80px"}}/>
              <div style={{padding:"28px 32px"}}>
                <div style={{display:"flex",gap:"12px",alignItems:"baseline",marginBottom:"8px",flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:"9px",color:"var(--green)",letterSpacing:"2px"}}>2024</span>
                  <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(13px,1.5vw,18px)",color:"var(--text-bright)"}}>FilmReviews — Plataforma de Críticas</h3>
                </div>
                <p style={{fontSize:"12px",color:"var(--text-dim)",marginBottom:"12px"}}>Melhor site da turma — Programação Web III · Python / Flask · MySQL</p>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {["Python","Flask","HTML5","CSS3","JavaScript","MySQL"].map(t=>(
                    <span key={t} style={{fontSize:"8px",padding:"3px 10px",border:"1px solid var(--border)",color:"var(--text-dim)",letterSpacing:"1px"}}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{padding:"28px 32px",display:"flex",alignItems:"center"}}>
                <span style={{fontSize:"20px",color:expandedProject==="film"?"var(--green)":"var(--text-dim)",transition:".3s",transform:expandedProject==="film"?"rotate(45deg)":"rotate(0)"}}>+</span>
              </div>
            </div>
            {expandedProject==="film" && (
              <div style={{borderTop:"1px solid rgba(0,255,136,.15)",padding:"40px 40px 40px 44px",animation:"fadeUp .3s ease",background:"var(--surface2)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px"}}>
                  <div>
                    <p style={{fontSize:"13px",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"20px"}}>
                      Plataforma web de reviews de filmes em Python com Flask, com sistema de usuários, avaliações e busca. Eleito melhor site da turma na disciplina de Programação Web III.
                    </p>
                    {["Arquitetura MVC com Flask e templates Jinja2","Sistema de autenticação e perfis de usuário","CRUD completo com MySQL","Design responsivo e interface limpa"].map(h=>(
                      <div key={h} style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"9px"}}>
                        <span style={{color:"var(--green)",fontSize:"7px",flexShrink:0,marginTop:"4px"}}>▶</span>
                        <span style={{fontSize:"11px",color:"var(--text-dim)",lineHeight:1.6}}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{border:"1px solid var(--border)",overflow:"hidden",cursor:"zoom-in"}} onClick={()=>setLightbox(IMG.sitePy)}>
                      <img src={IMG.sitePy} alt="FilmReviews" style={{width:"100%",objectFit:"cover",display:"block"}}/>
                    </div>
                    <div style={{marginTop:"14px",padding:"12px 16px",background:"var(--surface)",border:"1px solid var(--border)"}}>
                      <span style={{color:"var(--green)"}}>★</span>
                      <span style={{fontSize:"11px",color:"var(--text-bright)",marginLeft:"10px"}}>Melhor Site da Turma — Prog. Web III</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── ROBOCODE ── */}
          <div style={{border:"1px solid var(--border)",background:"var(--bg)"}}>
            <div style={{display:"grid",gridTemplateColumns:"4px 1fr auto",cursor:"pointer",background:expandedProject==="robo"?"var(--surface2)":"var(--bg)",transition:".3s"}} onClick={()=>setExpandedProject(expandedProject==="robo"?null:"robo")}>
              <div style={{background:"linear-gradient(to bottom,var(--amber),transparent)",minHeight:"80px"}}/>
              <div style={{padding:"28px 32px"}}>
                <div style={{display:"flex",gap:"12px",alignItems:"baseline",marginBottom:"8px",flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:"9px",color:"var(--amber)",letterSpacing:"2px"}}>2023</span>
                  <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(13px,1.5vw,18px)",color:"var(--text-bright)"}}>Bot RoboCode — 2º Lugar Estadual</h3>
                </div>
                <p style={{fontSize:"12px",color:"var(--text-dim)",marginBottom:"12px"}}>Bot autônomo de combate · 1º Lugar interno · 2º Lugar estadual Paula Souza</p>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {["Java","Algoritmos","Estratégia de combate","RoboCode"].map(t=>(
                    <span key={t} style={{fontSize:"8px",padding:"3px 10px",border:"1px solid var(--border)",color:"var(--text-dim)",letterSpacing:"1px"}}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{padding:"28px 32px",display:"flex",alignItems:"center"}}>
                <span style={{fontSize:"20px",color:expandedProject==="robo"?"var(--amber)":"var(--text-dim)",transition:".3s",transform:expandedProject==="robo"?"rotate(45deg)":"rotate(0)"}}>+</span>
              </div>
            </div>
            {expandedProject==="robo" && (
              <div style={{borderTop:"1px solid rgba(255,184,0,.15)",padding:"40px 40px 40px 44px",animation:"fadeUp .3s ease",background:"var(--surface2)"}}>
                <p style={{fontSize:"13px",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"20px",maxWidth:"600px"}}>
                  Bot autônomo de combate para a plataforma RoboCode implementando estratégias adaptativas de movimentação e mira — 1º lugar interno e 2º no torneio estadual da Paula Souza.
                </p>
                {[["1º Lugar","ETEC Registro — Campeonato Interno"],["2º Lugar","Torneio Estadual de RoboCode — Robótica CPS"]].map(([r,o])=>(
                  <div key={r} style={{display:"flex",gap:"10px",alignItems:"center",padding:"9px 14px",background:"var(--surface)",border:"1px solid var(--border)",marginBottom:"7px",maxWidth:"400px"}}>
                    <span style={{color:"var(--amber)"}}>★</span>
                    <span style={{fontSize:"11px",color:"var(--text-bright)"}}>{r} — {o}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section id="awards" style={{padding:"110px 5%",borderTop:"1px solid var(--border)"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 2fr",gap:"80px"}}>
          <div style={{position:"sticky",top:"80px"}}>
            <div className="sec-label">Conquistas</div>
            <h2 className="sec-title">Prêmios &<br/><span style={{color:"var(--amber)"}}>Reconhecimentos</span></h2>
            <p style={{color:"var(--text-dim)",fontSize:"12px",lineHeight:1.9,marginTop:"18px"}}>
              Resultados que vêm de projetos com impacto real — não apenas no código, mas nas pessoas.
            </p>
            {/* Featured photo */}
            <div style={{marginTop:"28px",border:"1px solid var(--border)",overflow:"hidden",cursor:"zoom-in"}} onClick={()=>setLightbox(IMG.mocao)}>
              <img src={IMG.mocao} alt="Moção de Aplauso — Câmara Municipal" style={{width:"100%",display:"block",filter:"brightness(.85)"}}/>
              <div style={{padding:"10px 12px",fontSize:"9px",color:"var(--text-dim)",letterSpacing:"1px",background:"var(--surface)"}}>
                Moção de Aplauso — Câmara Municipal de Registro
              </div>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column"}}>
            {AWARDS.map((a,i)=>(
              <div key={i} className="timeline-item">
                <div style={{display:"flex",gap:"12px",alignItems:"flex-start",marginBottom:"10px",flexWrap:"wrap"}}>
                  <span style={{fontSize:"20px",flexShrink:0}}>{a.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:"14px",alignItems:"baseline",flexWrap:"wrap",marginBottom:"4px"}}>
                      <span style={{fontFamily:"'Orbitron',monospace",fontSize:"9px",color:"var(--amber)",letterSpacing:"2px",flexShrink:0}}>{a.year}</span>
                      <h3 style={{fontSize:"13px",color:"var(--text-bright)",fontWeight:500,lineHeight:1.3}}>{a.title}</h3>
                    </div>
                    <div style={{fontSize:"9px",color:"var(--cyan)",letterSpacing:"1px",marginBottom:"6px"}}>{a.org}</div>
                    <p style={{fontSize:"11px",color:"var(--text-dim)",lineHeight:1.7,marginBottom: a.photo?"14px":"0"}}>{a.desc}</p>
                    {a.photo && (
                      <div style={{border:"1px solid var(--border)",overflow:"hidden",width:"200px",cursor:"zoom-in"}} onClick={()=>setLightbox(a.photo)}>
                        <img src={a.photo} alt={a.title} style={{width:"100%",height:"110px",objectFit:"cover",display:"block",filter:"brightness(.85)",transition:".3s"}}
                          onMouseEnter={e=>e.target.style.filter="brightness(1)"}
                          onMouseLeave={e=>e.target.style.filter="brightness(.85)"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS ── */}
      <section id="press" style={{padding:"110px 5%",background:"var(--surface)",borderTop:"1px solid var(--border)"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto"}}>
          <div className="sec-label">Imprensa</div>
          <h2 className="sec-title" style={{marginBottom:"14px"}}>Na <span style={{color:"var(--cyan)"}}>Mídia</span></h2>
          <p style={{color:"var(--text-dim)",fontSize:"13px",marginBottom:"52px",lineHeight:1.8,maxWidth:"560px"}}>
            Do regional ao nacional — o WACS e o trabalho de Victor chegaram a portais, TVs, jornais impressos e câmaras municipais.
          </p>

          {/* Featured photos row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:"var(--border)",marginBottom:"1px"}}>
            {[
              {src:IMG.cnn,    label:"CNN Brasil — Prime Time",type:"TV"},
              {src:IMG.estadao,label:"Estadão — Entrevista",type:"Jornal"},
              {src:IMG.jornal, label:"Estadão Impresso",type:"Impresso"},
              {src:IMG.camera, label:"Câmara Municipal",type:"Evento"},
            ].map((p,i)=>(
              <div key={i} style={{background:"var(--surface2)",overflow:"hidden",cursor:"zoom-in",position:"relative"}} onClick={()=>setLightbox(p.src)}>
                <img src={p.src} alt={p.label} className="photo-thumb" style={{height:"200px"}}/>
                <div style={{position:"absolute",top:"10px",right:"10px",fontSize:"8px",padding:"3px 8px",background:"rgba(0,0,0,.7)",color:"var(--cyan)",letterSpacing:"1px",border:"1px solid var(--border)"}}>{p.type}</div>
                <div style={{padding:"10px 12px",fontSize:"9px",color:"var(--text-dim)",letterSpacing:"1px"}}>{p.label}</div>
              </div>
            ))}
          </div>

          {/* Press cards list */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1px",background:"var(--border)"}}>
            {PRESS.map((p,i)=>(
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                style={{textDecoration:"none",background:"var(--bg)",padding:"24px",display:"block",transition:".3s",borderTop:i<2?"none":undefined}}
                onMouseEnter={e=>{e.currentTarget.style.background="var(--surface2)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="var(--bg)";}}
              >
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
                  <span style={{fontSize:"9px",letterSpacing:"3px",color:p.color,fontFamily:"'Orbitron',monospace"}}>{p.outlet}</span>
                  <span style={{fontSize:"8px",padding:"2px 8px",border:`1px solid ${p.color}44`,color:p.color,letterSpacing:"1px"}}>{p.type}</span>
                </div>
                <h3 style={{fontSize:"12px",color:"var(--text-bright)",lineHeight:1.55,marginBottom:"8px"}}>{p.title}</h3>
                <p style={{fontSize:"11px",color:"var(--text-dim)",lineHeight:1.6,marginBottom:"12px"}}>{p.desc}</p>
                <span style={{fontSize:"9px",color:"var(--cyan)",letterSpacing:"1px"}}>Ler matéria →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"110px 5%",borderTop:"1px solid var(--border)",position:"relative"}}>
        <GridBg/>
        <div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"start"}}>
            <div>
              <div className="sec-label">Contato</div>
              <h2 className="sec-title" style={{marginBottom:"20px"}}>Vamos construir algo <span style={{color:"var(--cyan)"}}>incrível juntos?</span></h2>
              <p style={{color:"var(--text-dim)",fontSize:"13px",lineHeight:1.9,marginBottom:"40px"}}>
                Site, sistema, app ou consultoria — me conta o que você precisa. Respondo rápido e com clareza sobre prazos e valores.
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"40px"}}>
                {[
                  {icon:"💬",label:"WhatsApp",value:"+55 13 99601-6551",action:openWA},
                  {icon:"◎",label:"Localização",value:"Registro, SP — Remoto Nacional",action:null},
                  {icon:"⬡",label:"LinkedIn",value:"linkedin.com/in/vftheodoro",action:()=>window.open("https://linkedin.com/in/vftheodoro","_blank")},
                  {icon:"◈",label:"GitHub",value:"github.com/vftheodoro",action:()=>window.open("https://github.com/vftheodoro","_blank")},
                ].map(item=>(
                  <div key={item.label} style={{display:"flex",alignItems:"center",gap:"16px",cursor:item.action?"pointer":"default",padding:"14px 16px",border:"1px solid var(--border)",transition:".2s",background:"var(--surface)"}}
                    onClick={item.action||undefined}
                    onMouseEnter={e=>{if(item.action)e.currentTarget.style.borderColor="var(--border-h)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";}}
                  >
                    <span style={{fontSize:"18px",width:"26px",textAlign:"center"}}>{item.icon}</span>
                    <div>
                      <div style={{fontSize:"8px",letterSpacing:"2px",color:"var(--text-dim)",marginBottom:"3px",textTransform:"uppercase"}}>{item.label}</div>
                      <div style={{fontSize:"12px",color:"var(--text-bright)"}}>{item.value}</div>
                    </div>
                    {item.action&&<span style={{marginLeft:"auto",color:"var(--text-dim)"}}>→</span>}
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
                {[["GitHub","https://github.com/vftheodoro"],["LinkedIn","https://linkedin.com/in/vftheodoro"],["Instagram","https://instagram.com/vftheodoro"],["WACS","https://appwacs.com.br"]].map(([l,u])=>(
                  <a key={l} href={u} target="_blank" style={{textDecoration:"none"}}>
                    <button className="btn-g" style={{width:"100%",padding:"9px 6px",fontSize:"9px"}}>{l}</button>
                  </a>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",padding:"36px"}}>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:"var(--cyan)",marginBottom:"24px",fontFamily:"'Orbitron',monospace",borderBottom:"1px solid var(--border)",paddingBottom:"14px"}}>ENVIAR MENSAGEM</div>
              {sent ? (
                <div style={{textAlign:"center",padding:"56px 0"}}>
                  <div style={{fontSize:"44px",marginBottom:"14px",color:"var(--green)"}}>✓</div>
                  <div style={{fontFamily:"'Orbitron',monospace",color:"var(--green)",fontSize:"12px",letterSpacing:"2px",marginBottom:"8px"}}>MENSAGEM ENVIADA!</div>
                  <p style={{color:"var(--text-dim)",fontSize:"12px",lineHeight:1.7}}>Retorno em até 24h.</p>
                  <button className="btn-g" style={{marginTop:"20px",fontSize:"9px"}} onClick={()=>setSent(false)}>Nova mensagem</button>
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                    <input className="inp" placeholder="Seu nome" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
                    <input className="inp" placeholder="Seu e-mail" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
                  </div>
                  <select className="inp" value={formData.type} onChange={e=>setFormData({...formData,type:e.target.value})} style={{appearance:"none"}}>
                    <option value="">Tipo de projeto</option>
                    <option>Site / Landing Page</option>
                    <option>Sistema Web / Plataforma</option>
                    <option>App Mobile</option>
                    <option>Software / Automação</option>
                    <option>Tecnologia Assistiva / IoT</option>
                    <option>Consultoria Técnica</option>
                    <option>Outro</option>
                  </select>
                  <textarea className="inp" rows={5} placeholder="Conte sobre seu projeto..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} style={{resize:"vertical"}}/>
                  <button className="btn-p" style={{width:"100%",marginTop:"4px"}} onClick={()=>setSent(true)} disabled={!formData.name||!formData.email||!formData.message}>
                    <span>Enviar Mensagem →</span>
                  </button>
                  <button className="btn-wa" style={{width:"100%"}} onClick={openWA}>💬 Prefiro falar pelo WhatsApp</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)",padding:"24px 5%",background:"var(--surface)"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <img src={IMG.logoVT} alt="VT" style={{height:"26px",filter:"brightness(0) invert(1)",opacity:.5}}/>
          <div style={{fontSize:"10px",color:"var(--text-dim)",letterSpacing:"1px"}}>© 2025 Victor Theodoro — Registro, SP</div>
          <div style={{fontSize:"10px",color:"var(--text-dim)"}}>Feito com <span style={{color:"var(--cyan)"}}>Next.js</span> + <span style={{color:"var(--green)"}}>❤</span></div>
        </div>
      </footer>
    </>
  );
}
