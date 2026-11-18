/** Texto bilíngue guardado junto dos dados (as seções escolhem com useLocale()). */
export interface L {
  pt: string;
  en: string;
}

export type Lang = "pt" | "en";

export const toLang = (locale: string): Lang => (locale === "en" ? "en" : "pt");

export const pick = (value: L, lang: Lang): string => value[lang];

export const pickAll = (values: L[], lang: Lang): string[] => values.map((v) => v[lang]);
