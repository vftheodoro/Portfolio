# Portfólio Professional - Victor Theodoro

Um portfólio web moderno e responsivo para um desenvolvedor fullstack junior, construído com HTML, CSS e JavaScript puro.

## 🎨 Características

✅ **Design Moderno** - Interface clean e profissional
✅ **Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
✅ **Dark/Light Mode** - Tema escuro e claro com persistência
✅ **Animações Suaves** - Transições e efeitos visuais elegantes
✅ **Performance** - Sem dependências, totalmente vanilla JS
✅ **SEO Ready** - HTML semântico e bem estruturado
✅ **Fácil de Personalizar** - Código limpo e bem comentado

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html          # Arquivo principal HTML
├── css/
│   └── style.css       # Estilos completos (com dark/light theme)
├── js/
│   └── main.js         # Interatividade e lógica
├── assets/             # Pasta para imagens (criar se necessário)
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Abra `index.html` diretamente no navegador
2. Ou use um servidor local (recomendado):
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Python 2
   python -m SimpleHTTPServer 8000
   
   # Com Node.js (http-server)
   npx http-server
   ```
3. Acesse `http://localhost:8000`

### Opção 2: Deploy Online
- **GitHub Pages**: Faça push para um repositório GitHub
- **Netlify**: Conecte o repositório ou faça upload dos arquivos
- **Vercel**: Importe o repositório
- **Railway**: Deploy simples com git

## 🎯 Personalização

### 1. Mudar Informações Básicas
Edite `index.html`:
- Seu nome e título
- Descrição na seção Hero
- Seu email e redes sociais

### 2. Adicionar/Editar Projetos
```javascript
// No arquivo js/main.js, use a função:
addProject(
    'Meu Projeto',
    'Descrição do projeto',
    ['Tech1', 'Tech2', 'Tech3'],
    'https://seu-projeto.com',
    'https://github.com/usuario/projeto'
);
```

### 3. Adicionar/Editar Mídia
```javascript
// No arquivo js/main.js, use a função:
addMediaItem(
    'Nome do Veículo',
    'Jan 2024',
    'Título do artigo',
    'Descrição breve',
    'Ler artigo',
    'https://link-do-artigo.com'
);
```

### 4. Customizar Cores
Edite as variáveis CSS em `css/style.css`:
```css
:root {
    --primary-color: #0f172a;
    --secondary-color: #1e293b;
    --accent-color: #3b82f6;      /* Cor principal */
    --accent-hover: #2563eb;
    /* ... */
}
```

### 5. Adicionar Imagens
1. Crie uma pasta `assets/images`
2. Coloque suas imagens lá
3. Referencie nos projetos: `<img src="assets/images/seu-projeto.jpg" alt="Descrição">`

## 🔧 Funcionalidades JavaScript

- **Dark/Light Mode**: Toggle automático com localStorage
- **Menu Mobile**: Menu responsivo para dispositivos pequenos
- **Scroll Suave**: Navegação entre seções com smooth scroll
- **Animações ao Scroll**: Cards animam quando entram no viewport
- **Contadores Animados**: Números na seção "Sobre" animam
- **Funções Dinâmicas**: `addProject()` e `addMediaItem()` para adicionar conteúdo

## 📱 Breakpoints Responsivos

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: até 767px

## 🎯 SEO

- Título e meta description personalizáveis
- HTML semântico (header, nav, section, article, footer)
- Imagens com alt text
- Heading hierarchy correto (h1, h2, h3)

## 📊 Performance

- Sem dependências externas (100% vanilla)
- CSS otimizado sem frameworks desnecessários
- JavaScript minimalista e eficiente
- Tempo de carregamento ultra-rápido

## 💡 Dicas para Melhorias Futuras

1. **Backend**: Adicione um formulário de contato funcional
2. **CMS**: Conecte um banco de dados para gerenciar projetos
3. **Blog**: Transforme a seção de mídia em um blog real
4. **Analytics**: Adicione Google Analytics ou Plausible
5. **Certificados**: Crie uma seção para certificações
6. **Testimonios**: Depoimentos de clientes/colegas
7. **Newsletter**: Formulário de inscrição

## 🐛 Troubleshooting

**Menu mobile não funciona**: Verifique se o JavaScript está carregando
**Cores não aparecem**: Limpe o cache (Ctrl+Shift+Del ou Cmd+Shift+Del)
**Responsivo quebrado**: Verifique a meta viewport no HTML

## 📄 Licença

Livre para usar e modificar conforme necessário.

## 👨‍💻 Autor

Victor Theodoro - Desenvolvedor FullStack Junior

---

**Desenvolvido com ❤️ em HTML, CSS e JavaScript Puro**
