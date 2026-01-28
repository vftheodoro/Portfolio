

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
// SHOW MORE FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize show more buttons
    const showMoreButtons = document.querySelectorAll('.show-more-btn');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const hiddenCount = parseInt(this.getAttribute('data-hidden'));

            // Find the column container
            const columnElement = this.closest('.media-column');
            const hiddenItems = columnElement.querySelectorAll('.hidden-media');

            // Toggle visibility
            if (this.classList.contains('expanded')) {
                // Hide items
                hiddenItems.forEach(item => {
                    item.style.display = 'none';
                });
                this.classList.remove('expanded');
                this.querySelector('.btn-text').textContent = 'Ver Mais';
                this.querySelector('.btn-count').textContent = `(+${hiddenCount})`;
                this.querySelector('i').style.transform = 'rotate(0deg)';
            } else {
                // Show items with animation
                hiddenItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
                this.classList.add('expanded');
                this.querySelector('.btn-text').textContent = 'Ver Menos';
                this.querySelector('.btn-count').textContent = '';
                this.querySelector('i').style.transform = 'rotate(180deg)';
            }
        });
    });
});

// ==========================================
// VER MAIS RECONHECIMENTOS
// ==========================================

const showMoreRecognitionsBtn = document.getElementById('showMoreRecognitions');

showMoreRecognitionsBtn.addEventListener('click', function() {
    const hiddenCount = parseInt(this.getAttribute('data-hidden'));
    const hiddenRecognitions = document.querySelectorAll('.hidden-recognition');

    if (this.classList.contains('expanded')) {
        // Hide items
        hiddenRecognitions.forEach(item => {
            item.style.display = 'none';
        });
        this.classList.remove('expanded');
        this.querySelector('.btn-text').textContent = 'Ver Mais';
        this.querySelector('.btn-count').textContent = `(+${hiddenCount})`;
        this.querySelector('i').style.transform = 'rotate(0deg)';
    } else {
        // Show items with animation
        hiddenRecognitions.forEach((item, index) => {
            setTimeout(() => {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
        this.classList.add('expanded');
        this.querySelector('.btn-text').textContent = 'Ver Menos';
        this.querySelector('.btn-count').textContent = '';
        this.querySelector('i').style.transform = 'rotate(180deg)';
    }
});

// ==========================================
// SCROLL-BASED ACTIVE NAVIGATION
// ==========================================

function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Update on page load
    updateActiveLink();

    // Update on click for smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow smooth scroll to complete
            setTimeout(updateActiveLink, 100);
        });
    });
}

setupActiveNavigation();

// ==========================================
// PROJECT CAROUSEL FUNCTIONALITY
// ==========================================

let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

// Initialize carousel
if (slides.length > 0) {
    showSlides(slideIndex);

    // Auto-play carousel
    setInterval(() => {
        nextSlide();
    }, 4000); // Change slide every 4 seconds
}

// ==========================================
// LOG DE INICIALIZAÇÃO
// ==========================================

console.log('%cPortfólio Victor Theodoro carregado com sucesso! 🚀', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
console.log('%cProto: Use as funções addProject() e addMediaItem() para adicionar conteúdo dinamicamente', 'color: #8b5cf6; font-size: 12px;');
