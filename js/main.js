// ==========================================
// INICIALIZAÇÃO DO TEMA
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// ==========================================
// GERENCIAMENTO DE TEMA (DARK/LIGHT)
// ==========================================

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// ==========================================
// MENU MOBILE
// ==========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// ==========================================
// SCROLL SUAVE E NAVBAR DINÂMICA
// ==========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adicionar shadow ao scroll
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// ANIMAÇÃO DE ELEMENTOS AO SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards e seções
document.querySelectorAll('.project-card, .media-card, .skill-category, .stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ==========================================
// CONTADOR ANIMADO
// ==========================================

function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        if (isNaN(target)) return;
        
        const increment = target / 50;
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.innerText = stat.innerText; // Manter o texto original (15+, 2+, etc)
                clearInterval(counter);
            } else {
                stat.innerText = Math.ceil(current) + '+';
            }
        }, 30);
    });
}

// Animar contadores quando chegarem à seção
const aboutSection = document.querySelector('.about');
let countersAnimated = false;

const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// ==========================================
// FILTRO DE PROJETOS INTERATIVO
// ==========================================

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Adicionar atributos de filtro aos projetos
    projectCards.forEach(card => {
        const techStack = card.querySelector('.project-tech').textContent.toLowerCase();
        const title = card.querySelector('h3').textContent.toLowerCase();

        // Categorizar projetos baseado no conteúdo
        if (techStack.includes('react') || techStack.includes('vue') || techStack.includes('javascript')) {
            card.dataset.category = 'frontend';
        } else if (techStack.includes('node') || techStack.includes('express') || techStack.includes('python') || techStack.includes('api')) {
            card.dataset.category = 'backend';
        } else if (techStack.includes('react') && techStack.includes('node')) {
            card.dataset.category = 'fullstack';
        } else if (techStack.includes('pwa') || techStack.includes('mobile')) {
            card.dataset.category = 'mobile';
        } else {
            card.dataset.category = 'frontend'; // default
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;

                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Mostrar card com animação
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Esconder card
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

setupProjectFilters();

// ==========================================
// LINKS DE CONTATO INTERATIVOS
// ==========================================

document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Se não for mailto ou um link externo, prevenir navegação padrão
        if (!this.href.startsWith('mailto:') && !this.href.startsWith('http')) {
            e.preventDefault();
        }
    });
});

// ==========================================
// SMOOTH SCROLL PARA MOBILE
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Subtrair altura da navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// EFEITO DE PARALLAX SUAVE (HERO)
// ==========================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition < hero.offsetHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', function() {
    // Animação de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// COPIAR EMAIL PARA CLIPBOARD
// ==========================================

function setupEmailCopy() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            // Deixar o navegador abrir o cliente de email, mas podemos adicionar feedback visual
            console.log('Email: ' + email);
        });
    }
}

setupEmailCopy();

// ==========================================
// VALIDAÇÃO BÁSICA DE FORMULÁRIO (SE EXISTIR)
// ==========================================

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar lógica de validação
            console.log('Formulário submetido');
            
            // Feedback visual
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = '';
            btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            btn.style.background = '#22c55e';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                form.reset();
            }, 2000);
        });
    });
}

setupFormValidation();

// ==========================================
// FUNÇÃO PARA ADICIONAR PROJETOS DINAMICAMENTE
// ==========================================

function addProject(title, description, technologies, projectUrl, githubUrl) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="project-image"></div>
        <div class="project-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="project-tech">
                ${technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${projectUrl}" class="link-btn" target="_blank">Ver Projeto</a>
                <a href="${githubUrl}" class="link-btn github" target="_blank">GitHub</a>
            </div>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
    
    // Animar o novo card
    projectCard.style.opacity = '0';
    projectCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        projectCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        projectCard.style.opacity = '1';
        projectCard.style.transform = 'translateY(0)';
    }, 100);
}

// ==========================================
// FUNÇÃO PARA ADICIONAR MÍDIA DINAMICAMENTE
// ==========================================

function addMediaItem(source, date, title, description, linkText, linkUrl) {
    const mediaGrid = document.querySelector('.media-grid');
    
    const mediaCard = document.createElement('article');
    mediaCard.className = 'media-card';
    mediaCard.innerHTML = `
        <div class="media-header">
            <span class="media-source">${source}</span>
            <span class="media-date">${date}</span>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${linkUrl}" class="read-more" target="_blank">${linkText} →</a>
    `;
    
    mediaGrid.appendChild(mediaCard);
    
    // Animar o novo card
    mediaCard.style.opacity = '0';
    mediaCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        mediaCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        mediaCard.style.opacity = '1';
        mediaCard.style.transform = 'translateY(0)';
    }, 100);
}

// ==========================================
// EXEMPLO DE USO (DESCOMENTE PARA TESTAR)
// ==========================================

// addProject(
//     'Novo Projeto',
//     'Descrição do projeto',
//     ['Tech1', 'Tech2', 'Tech3'],
//     'https://seu-projeto.com',
//     'https://github.com/seu-usuario/seu-projeto'
// );

// ==========================================
// EFEITO DE DIGITAÇÃO NO HERO
// ==========================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Adiciona cursor piscando após completar
            element.innerHTML += '<span class="cursor">|</span>';
            setInterval(() => {
                const cursor = element.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }
            }, 500);
        }
    }

    type();
}

// ==========================================
// INICIALIZAR EFEITO DE DIGITAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Iniciar efeito de digitação após um pequeno delay
    setTimeout(() => {
        const subtitleElement = document.querySelector('.hero-subtitle');
        if (subtitleElement) {
            typeWriter(subtitleElement, 'Desenvolvedor FullStack Junior', 150);
        }
    }, 1000);
});

// ==========================================
// LOG DE INICIALIZAÇÃO
// ==========================================

console.log('%cPortfólio Victor Theodoro carregado com sucesso! 🚀', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
console.log('%cProto: Use as funções addProject() e addMediaItem() para adicionar conteúdo dinamicamente', 'color: #8b5cf6; font-size: 12px;');
