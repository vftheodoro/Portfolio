import Image from "next/image";

/**
 * Assinatura obrigatória dos sites BYTHE ("DESENVOLVIDO POR + logo"). Não remover,
 * ocultar nem substituir sem autorização de Victor. Referência, medidas e regras:
 * Bythe Technology/.claude/especialistas/assinatura/ASSINATURA-BYTHE.md
 * (pílula 48 px, fundo #113e5a, borda #36718b, texto #dbe3ed; logo oficial em
 * /brand/bythe-logo.svg, sem alterações). O texto fica em PT nos dois idiomas
 * por ser parte da marca; `lang` informa isso aos leitores de tela.
 */
const HREF =
  "https://bythe.tech/?utm_source=vftheodoro.vercel.app&utm_medium=credito-rodape&utm_campaign=assinatura";

export default function BytheFooterCredit() {
  return (
    <div className="flex justify-center px-4 py-6">
      <a
        href={HREF}
        target="_blank"
        rel="noopener nofollow"
        lang="pt-BR"
        aria-label="Desenvolvido por BYTHE — visitar bythe.tech (abre em nova aba)"
        className="inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-[#36718b] bg-[#113e5a] px-[19px] py-[9px] text-xs font-bold uppercase leading-none text-[#dbe3ed] transition-[border-color,transform] hover:-translate-y-px hover:border-[#5fa6c6] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#7cc4ff] motion-reduce:transition-none motion-reduce:hover:transform-none"
      >
        <span>Desenvolvido por</span>
        <Image src="/brand/bythe-logo.svg" alt="" width={34} height={27} className="block h-auto w-[34px] flex-none" />
      </a>
    </div>
  );
}
