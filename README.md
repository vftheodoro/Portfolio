# Portfólio – Victor Theodoro

Site de portfólio moderno (tema escuro e cor primária azul) construído com HTML, CSS e JavaScript puro. Inclui carrossel com lightbox para apresentar o app APP‑WACS, seção de habilidades, projetos e contato.

## ✅ Recursos

- Tema escuro responsivo com tipografia Inter
- Cabeçalho fixo, navegação suave e estado ativo por seção
- Animações de entrada e painel estilo “código” no hero
- Carrossel de imagens com lightbox (abre em tela cheia e bloqueia scroll)
- Seções: Início, Sobre, Habilidades, Projetos, Contato
- Integração de redes sociais e links externos
- Pronto para deploy no GitHub Pages

## 🗂️ Estrutura

```
Portifolio/
├── index.html       # Página principal
├── styles.css       # Estilos globais (tema escuro/azul)
├── script.js        # Interações: menu mobile, animações, carrossel/lightbox
└── images/          # Logos, fotos e screenshots
    ├── logo_vt.jpg
    ├── victor_theodoro.jpeg
    ├── victor_theodoro_sem_fundo.png
    └── app_wacs/   # Imagens do APP‑WACS para o carrossel
```

## 🚀 Como rodar localmente

1. Baixe/clon e o repositório
2. Abra o arquivo `index.html` no navegador
   - Dica: use a extensão “Live Server” no VS Code para recarregar automaticamente

## 🧩 Personalização rápida

- Nome e título: `index.html` → seção `hero`
- Bio: `index.html` → seção `Sobre`
- Contato e redes: `index.html` → seção `Contato`
- Logo: substitua `images/logo_vt.jpg` por outra imagem (quadrada funciona melhor)
- Cores: ajustáveis diretamente no `styles.css` (busque por `#3b82f6`/`#2563eb`)
- Imagem de fundo do hero: troque `images/backgraund_programação.jpg`

## 🖼️ APP‑WACS – Galeria

- Coloque suas imagens em `images/app_wacs/`
- O carrossel já referencia vários arquivos (Tela Inicial, Login, Conexão, etc.)
- Clique em qualquer imagem para abrir o lightbox (tela cheia)

Repositório do projeto citado:

- APP‑WACS: `https://github.com/vftheodoro/APP-WACS`

## 🌐 Deploy no GitHub Pages

1. Crie um repositório no GitHub (ex.: `portifolio`)
2. Envie os arquivos para a branch `main`
3. Vá em Settings → Pages
4. Em “Build and deployment”, escolha:
   - Source: `Deploy from a branch`
   - Branch: `main` e `/ (root)`
5. Salve. Em alguns minutos, seu site ficará disponível em `https://seu-usuario.github.io/portifolio/`

Opcional (Actions automatizado):
- Você também pode manter em outra branch e publicar a pasta raiz usando a Action `peaceiris/actions-gh-pages`.

## 🔧 Dicas de edição

- Mantenha as imagens otimizadas (use `.jpg` ou `.webp` quando possível)
- Para novas seções, copie a estrutura de uma seção existente em `index.html`
- Quer trocar o conjunto de projetos? Edite os “cards” em `#projects`

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Sinta‑se à vontade para usar e adaptar.

---

Qualquer dúvida ou sugestão, abra uma issue no repositório ou entre em contato pelo e‑mail na seção de contato do site.
