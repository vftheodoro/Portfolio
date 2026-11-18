/**
 * Script inline mínimo, executado antes da hidratação: liga o estado "pendente"
 * (`html.swarm-on`) só se o movimento é permitido, e instala o failsafe — se o
 * JS do Swarm não subir em 6 s, a classe é removida e a página fica completa.
 * Chave de preferência: localStorage["swarm-motion"] = "on" | "reduced" | "off".
 */
const BOOT = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var p=null;try{p=localStorage.getItem("swarm-motion")}catch(e){}if(p==="off")return;d.classList.add("swarm-on");setTimeout(function(){if(!window.__swarmBoot)d.classList.remove("swarm-on")},6000)}catch(e){}})();`;

export default function SwarmBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
