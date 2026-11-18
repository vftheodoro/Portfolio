const BASE = "https://vftheodoro.vercel.app";

/** Dados estruturados (schema.org Person + WebSite) apenas com fatos confirmados. */
export default function JsonLd({ locale }: { locale: "pt" | "en" }) {
  const en = locale === "en";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        name: "Victor Theodoro",
        url: `${BASE}/${locale}`,
        jobTitle: en ? "Junior Software Engineer" : "Engenheiro de Software Júnior",
        description: en
          ? "Junior Software Engineer focused on backend and full stack: TypeScript, Node.js, React, cloud and automation."
          : "Engenheiro de Software Júnior com foco em backend e full stack: TypeScript, Node.js, React, nuvem e automação.",
        sameAs: ["https://github.com/vftheodoro", "https://www.linkedin.com/in/vftheodoro/", "https://bythe.tech"],
        image: `${BASE}/og-image.jpg`,
        worksFor: { "@type": "Organization", name: "BYTHE", url: "https://bythe.tech" },
        knowsAbout: ["TypeScript", "Node.js", "React", "Next.js", "PostgreSQL", "Supabase"],
        alumniOf: [
          { "@type": "EducationalOrganization", name: "Etec Registro" },
          { "@type": "EducationalOrganization", name: "Fatec Registro" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: `${BASE}/pt`,
        name: "Victor Theodoro",
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": `${BASE}/#person` },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
