import type { MetadataRoute } from "next";

const BASE = "https://vftheodoro.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["pt", "en"].map((locale) => ({
    url: `${BASE}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: { "pt-BR": `${BASE}/pt`, en: `${BASE}/en`, "x-default": `${BASE}/pt` },
    },
  }));
}
