import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

/** Classes das variáveis de fonte (Geist, Geist Mono, Instrument Serif) para o `<body>`. */
export const fontVariables = `${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`;
