# Guia de Personalização - Portfólio Victor Theodoro

Este arquivo contém instruções passo a passo para personalizar seu portfólio.

## 1️⃣ INFORMAÇÕES BÁSICAS

### Seu Nome e Título
Abra `index.html` e localize a seção HERO (linha ~45):

```html
<h1 class="hero-title">Victor Theodoro</h1>
<p class="hero-subtitle">Desenvolvedor FullStack Junior</p>
<p class="hero-description">Criando soluções web modernas, escaláveis e centradas no usuário</p>
```

**Mude para:**
```html
<h1 class="hero-title">SEU NOME</h1>
<p class="hero-subtitle">SEU TÍTULO</p>
<p class="hero-description">SUA DESCRIÇÃO</p>
```

### Email e Contatos
Procure a seção CONTACT (linha ~300):
```html
<a href="mailto:victor@example.com" class="contact-btn">
```

Mude `victor@example.com` para seu email real.

Para LinkedIn, GitHub, Twitter:
```html
<a href="https://github.com/SEU_USERNAME" class="contact-btn" target="_blank">
<a href="https://linkedin.com/in/SEU_PERFIL" class="contact-btn" target="_blank">
<a href="https://twitter.com/SEU_USERNAME" class="contact-btn" target="_blank">
```

---

## 2️⃣ SEÇÃO SOBRE

Localize a seção ABOUT (linha ~80):

```html
<p>
    Sou um desenvolvedor FullStack Junior apaixonado por tecnologia...
</p>
```

Edite os parágrafos com sua história real.

### Editar Estatísticas
```html
<div class="stat">
    <h3>15+</h3>
    <p>Projetos Completados</p>
</div>
```

Mude os números e textos para seus dados reais.

---

## 3️⃣ SKILLS

Localize a seção SKILLS (linha ~110):

### Adicionar/Remover Tecnologias

```html
<span class="skill-tag">HTML5</span>
<span class="skill-tag">CSS3</span>
<span class="skill-tag">JavaScript</span>
```

Adicione ou remova conforme sua expertise.

**Exemplo - Adicionar Python:**
```html
<span class="skill-tag">Python</span>
```

---

## 4️⃣ PROJETOS

### Editar Projetos Existentes

Cada projeto é um card. Localize (linha ~150):

```html
<div class="project-card">
    <div class="project-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
    <div class="project-content">
        <h3>E-Commerce Platform</h3>
        <p>Plataforma de e-commerce completa...</p>
        <div class="project-tech">
            <span>React</span>
            <span>Node.js</span>
        </div>
        <div class="project-links">
            <a href="#" class="link-btn" target="_blank">Ver Projeto</a>
            <a href="#" class="link-btn github" target="_blank">GitHub</a>
        </div>
    </div>
</div>
```

**Mude:**
- `E-Commerce Platform` → Seu projeto
- A descrição → Descrição real
- Os `<span>` das tecnologias
- Os links `href="#"` para URLs reais

### Adicionar Novo Projeto (via JavaScript)

Abra `js/main.js` e vá até a seção "EXEMPLO DE USO" (final do arquivo):

```javascript
addProject(
    'Meu Novo Projeto',
    'Descrição completa do projeto',
    ['React', 'Node.js', 'MongoDB'],
    'https://meu-projeto.com',
    'https://github.com/meuuser/meu-projeto'
);
```

**Dica:** Coloque isso no final do `main.js`, dentro de `DOMContentLoaded` para carregar automaticamente.

### Mudar Cores dos Cards

```html
style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
```

Use cores hexadecimais. Exemplos:
- `#3b82f6` (azul)
- `#ec4899` (rosa)
- `#10b981` (verde)
- `#f59e0b` (laranja)

---

## 5️⃣ MÍDIA & RECONHECIMENTOS

Localize a seção MEDIA (linha ~250):

### Editar Artigos/Publicações

```html
<article class="media-card">
    <div class="media-header">
        <span class="media-source">Tech Blog Brasil</span>
        <span class="media-date">Jan 2024</span>
    </div>
    <h3>"Como estruturar um projeto React profissional"</h3>
    <p>Victor Theodoro compartilha...</p>
    <a href="#" class="read-more">Ler artigo →</a>
</article>
```

Mude:
- `Tech Blog Brasil` → Nome da publicação
- `Jan 2024` → Data
- Título do artigo
- Descrição
- `href="#"` → Link real

### Adicionar via JavaScript

```javascript
addMediaItem(
    'Meu Blog',
    'Fev 2024',
    'Meu Primeiro Artigo',
    'Conteúdo do meu artigo',
    'Ler artigo',
    'https://meu-blog.com/artigo'
);
```

---

## 6️⃣ CORES & TEMA

### Mudar Cor Principal

Edite `css/style.css`, linha ~13:

```css
--accent-color: #3b82f6;     /* Azul padrão */
--accent-hover: #2563eb;      /* Azul hover */
```

**Combinações populares:**
- Azul: `#3b82f6`
- Verde: `#10b981`
- Roxo: `#8b5cf6`
- Rosa: `#ec4899`
- Orange: `#f59e0b`

### Dark/Light Mode Customizado

Procure por `[data-theme="light"]` em `style.css` para editar cores do tema claro.

---

## 7️⃣ ADICIONAR IMAGENS

### 1. Criar pasta
Crie `assets/images` no mesmo nível de `index.html`

### 2. Adicionar imagem ao projeto
```html
<div class="project-image">
    <img src="assets/images/meu-projeto.jpg" alt="Descrição do projeto">
</div>
```

### 3. Substituir gradientes
Remova `style="background: linear-gradient(...)"`

---

## 8️⃣ SEO & META TAGS

Edite `index.html`, cabeça do documento:

```html
<meta name="description" content="Seu novo texto descritivo">
<title>Seu Nome - Seu Título</title>
```

Estes aparecem nos resultados do Google.

---

## 9️⃣ DEPLOY (Publicar Online)

### GitHub Pages (Grátis)
1. Crie repositório `seu-usuario.github.io`
2. Faça push dos arquivos
3. Acesse `https://seu-usuario.github.io`

### Netlify (Grátis)
1. Vá a netlify.com
2. "New site from Git" ou drag & drop dos arquivos
3. Seu site estará online em minutos

### Vercel (Grátis)
1. Vá a vercel.com
2. Importe seu repositório GitHub
3. Deploy automático a cada push

---

## 🔟 FUNÇÕES ÚTEIS NO JavaScript

### Adicionar Projeto Dinamicamente
```javascript
addProject('Título', 'Descrição', ['Tech1', 'Tech2'], 'url', 'github-url');
```

### Adicionar Mídia Dinamicamente
```javascript
addMediaItem('Fonte', 'Data', 'Título', 'Descrição', 'Link Text', 'url');
```

---

## ✅ CHECKLIST FINAL

- [ ] Nome e título atualizados
- [ ] Sobre mim descrito
- [ ] Skills corretos
- [ ] Projetos reais adicionados
- [ ] Reconhecimentos/mídia adicionados
- [ ] Email e redes sociais configurados
- [ ] Cores customizadas (opcional)
- [ ] Imagens adicionadas (opcional)
- [ ] Testado em mobile
- [ ] Deploy realizado

---

## 🆘 AJUDA

Se tiver problemas:
1. Verifique a sintaxe HTML (tags fechadas)
2. Limpe o cache do navegador (Ctrl+Shift+Del)
3. Abra DevTools (F12) para ver erros
4. Verifique se arquivos estão nos caminhos corretos

---

**Divirta-se personalizando seu portfólio! 🎨**
