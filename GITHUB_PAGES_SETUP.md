# 🚀 Como fazer Deploy no GitHub Pages

## Pré-requisitos
- Git instalado
- Conta GitHub

## Passo a Passo

### 1️⃣ Criar repositório no GitHub
- Acesse https://github.com/new
- Crie um repositório público com o nome: `seu-usuario.github.io`
  - Exemplo: `victortheodoro.github.io`
- Marque "Add a README file"
- Clique "Create repository"

### 2️⃣ Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/seu-usuario.github.io.git
cd seu-usuario.github.io
```

### 3️⃣ Copiar os arquivos do portfolio
Copie todos os arquivos do seu portfolio local (index.html, css/, js/, assets/) para dentro do repositório clonado.

Estrutura final deve ser:
```
seu-usuario.github.io/
├── index.html
├── css/
│   ├── style.css
│   └── improvements.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── pdfs/
├── .gitignore
└── README.md
```

### 4️⃣ Fazer commit e push
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

### 5️⃣ Ativar GitHub Pages
1. Vá para **Settings** do repositório
2. Clique em **Pages** (lado esquerdo)
3. Em "Source", selecione **Deploy from a branch**
4. Branch: **main** | Folder: **/ (root)**
5. Clique **Save**

### 6️⃣ Aguarde o deploy
- GitHub Actions vai compilar em ~1-2 minutos
- Seu site estará disponível em: `https://seu-usuario.github.io`

---

## ✅ Características do Deploy

✓ **100% Estático** - Sem build steps, sem servidor  
✓ **HTTPS Automático** - GitHub Pages fornece SSL grátis  
✓ **Domínio Customizado** (opcional)
- Compre um domínio (godaddy, namecheap, etc.)
- Em Settings > Pages > Custom domain
- Aponte o DNS para o GitHub Pages
- Exemplo: `victortheodoro.dev` em vez de `victortheodoro.github.io`

---

## 🔧 Atualizações Futuras

Sempre que atualizar seu portfolio:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages faz deploy automático em segundos!

---

## 📱 Verificar se tudo está funcionando

Após o deploy:
- [ ] Site carrega em HTTPS
- [ ] Navegação funciona (links internos)
- [ ] Imagens aparecem
- [ ] Tradução PT/EN funciona
- [ ] Formulário de contato funciona
- [ ] Responsivo em mobile

