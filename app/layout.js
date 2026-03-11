import "./globals.css";

export const metadata = {
  title: "Victor Theodoro | Portfólio v2",
  description: "Desenvolvedor FullStack Junior especializado em React, Node.js e tecnologia assistiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
