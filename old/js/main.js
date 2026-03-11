// ==========================================
// LANGUAGE TOGGLE - SISTEMA COMPLETO V2
// ==========================================

let currentLanguage = localStorage.getItem('language') || 'pt';

// Traduções embutidas (sem dependência de fetch)
const translations = {
    pt: {
        nav: { home: "Home", about: "Sobre", skills: "Skills", certifications: "Certificações", awards: "Prêmios", recognitions: "Reconhecimentos", projects: "Projetos", media: "Mídia", contact: "Contato" },
        hero: { subtitle: "Desenvolvedor de Software", description: "Especializado em criar soluções web e mobile modernas, escaláveis e focadas em impacto real.", cta1: "Ver Projetos", cta2: "Entrar em Contato", scroll: "Scroll para explorar" },
        about: { 
            title: "Sobre Mim",
            subtitle: "Desenvolvedor apaixonado por criar soluções que transformam vidas",
            education_title: "Formação & Experiência",
            education_desc: "Atualmente cursando Técnico em Desenvolvimento de Sistemas na ETEC de Registro (2023-2025). Experiência prática em desenvolvimento fullstack com foco em soluções inovadoras.",
            project_title: "Projeto WACS",
            project_desc: "Desenvolvedor fullstack do projeto WACS - Wheelchair Automation Control System. Solução inovadora de tecnologia assistiva que combina hardware IoT, inteligência artificial e interface mobile intuitiva para melhorar a mobilidade de pessoas com deficiência.",
            stack_title: "Stack Técnico",
            stack_desc: "Especializado em desenvolvimento web moderno com HTML5, CSS3 e JavaScript. Back-end robusto com Node.js e APIs REST. Experiência em bancos de dados SQL e Firebase, com foco em segurança e escalabilidade.",
            vision_title: "Objetivos & Visão",
            vision_desc: "Apaixonado por tecnologia assistiva e inovação social. Objetivo: criar soluções que empoderem pessoas com deficiência através da tecnologia. Compromisso com código limpo, acessibilidade web e impacto social positivo."
        },
        skills: { title: "Tecnologias & Skills", frontend: "Front-end", backend: "Back-end", others: "Outros", category_label: "Tecnologias" },
        certifications: { title: "Certificações & Educação" },
        recognitions: { 
            title: "Reconhecimentos", 
            subtitle: "Prêmios, certificados e conquistas que marcaram minha trajetória profissional.",
            mocao_title: "Moção de Aplauso - Prefeitura de Registro - SP",
            mocao_desc: "Honra de receber Moção de Aplauso da Câmara Municipal de Registro pelo 7º lugar na maior feira de tecnologia da América Latina, reconhecendo liderança e inovação no Vale do Ribeira.",
            mencao_title: "Menção Especial na Câmara Municipal",
            mencao_desc: "Menção especial do vereador Marcelo Comeron ao projeto WACS na sessão ordinária da Câmara, destacando impacto social e compromisso com acessibilidade."
        },
        awards: {
            title: "Prêmios Oficiais",
            subtitle: "Conquistas registradas oficialmente em eventos acadêmicos e esportivos.",
            a1: {
                rank: "1º Lugar",
                date: "out 2025",
                title: "Votação popular de melhor projeto da 6ª FETEC",
                meta: "Concedido por Etec de Registro",
                desc: "Projeto WACS — Autonomia Inteligente para PCD’s. Reconhecimento pelo impacto social e inovação."
            },
            a2: {
                rank: "7º Lugar",
                date: "out 2025",
                title: "16ª FETEPS — Melhor Projeto",
                meta: "Concedido por Centro Paula Souza",
                desc: "Representante do WACS da Etec de Registro no maior evento acadêmico de tecnologia e inovação do Brasil."
            },
            a3: {
                rank: "1º Lugar",
                date: "out 2024",
                title: "Votação popular de melhor projeto da 5ª FETEC",
                meta: "Concedido por Etec de Registro",
                desc: "Projeto “Educação Sexual”. Reconhecimento pela relevância e impacto na comunidade."
            },
            a4: {
                rank: "1º Lugar",
                date: "set 2024",
                title: "Campeonato Brasileiro de Fisiculturismo",
                meta: "Categoria Men’s Physique Sub Junior até 18 anos",
                desc: "Campeão no 7º Campeonato Brasileiro. Local: Osasco-SP."
            },
            a5: {
                rank: "2º Lugar",
                date: "set 2023",
                title: "Torneio Estadual de RoboCode",
                meta: "Concedido por Robótica Paula Souza",
                desc: "Destaque em programação e estratégia de robôs na competição estadual."
            },
            a6: {
                rank: "1º Lugar",
                date: "ago 2023",
                title: "Campeonato de RoboCode (ETEC Registro)",
                meta: "Concedido por Etec Registro",
                desc: "Classificação para representar a instituição na fase regional."
            }
        },
        projects: { 
            title: "Projetos",
            subtitle: "Sistema revolucionário de tecnologia assistiva premiado nacionalmente",
            description: "Sistema inteligente de automação para cadeiras de rodas desenvolvido para promover independência e acessibilidade. Inclui controle por voz, navegação assistida por IA e integração completa com dispositivos IoT para pessoas com deficiência motora.",
            award: "7º LUGAR - FETEPS (2025)",
            award_desc: "A maior feira de tecnologia pública da <span class=\"award-glow\">América Latina</span>, reunindo inovações e projetos transformadores do Brasil",
            visit_website: "Site Oficial",
            instagram: "@wacs_etec"
        },
        media: { 
            title: "Mídia",
            subtitle: "Confira as entrevistas, artigos e reconhecimentos que destacam minha trajetória profissional.",
            interviews: "Entrevistas",
            press: "Na Imprensa",
            cnn_title: "Entrevista CNN Brasil",
            cnn_desc: "Entrevista sobre o projeto WACS, trajetória e impacto social em tecnologia assistiva.",
            cnn_btn: "Ver Post",
            estadao_title: "Entrevista Estadão",
            estadao_desc: "Entrevista no Estadão sobre WACS, desenvolvimento fullstack e inovação social.",
            estadao_btn: "Ver Matéria",
            jornal_title: "Edição Impressa - Jornal Estadão",
            jornal_desc: "Menção na edição impressa do Estadão destacando trajetória e trabalho em software.",
            jornal_btn: "Ver Edição",
            cps_title: "Victor Theodoro - Destaque em Inovação Tecnológica",
            cps_desc: "Destaque institucional do CPS pela trajetória e projetos em software e tecnologia assistiva.",
            cps_btn: "Acessar",
            reels_btn: "Ver Reels",
            robocode_btn: "Ver Resultado",
            feteps_btn: "Ver Projeto",
            etec16_btn: "Conhecer",
            feteps2026_btn: "Acompanhar",
            regiaohoje_btn: "Ler Matéria",
            abc_btn: "Acessar"
        },
        contact: { 
            title: "Entrar em Contato",
            subtitle: "Vamos conversar e criar algo incrível juntos",
            social_note: "Escolha sua rede social favorita para seguir a conversa",
            panel_title: "Bora conversar?",
            name: "Nome",
            email: "E-mail",
            message: "Mensagem",
            subject_label: "Assunto",
            subject_placeholder: "Proposta / Oportunidade / Projeto",
            send: "Enviar Mensagem"
        },
        footer: { 
            nav: "Navegação",
            links: "Links Úteis",
            hiring: "Está Contratando?",
            hiring_text: "Estou aberto a novas oportunidades e amaria conversar sobre projetos inovadores.",
            email: "Envie um Email",
            privacy: "Política de Privacidade",
            rights: "Todos os direitos reservados.",
            brand: "Victor Theodoro • Desenvolvedor de Software"
        },
        ui: {
            show_more: "Ver Mais",
            show_less: "Ver Menos"
        }
    },
    en: {
        nav: { home: "Home", about: "About", skills: "Skills", certifications: "Certifications", awards: "Awards", recognitions: "Recognitions", projects: "Projects", media: "Media", contact: "Contact" },
        hero: { subtitle: "Software Developer", description: "Specialized in creating modern, scalable web and mobile solutions focused on real impact.", cta1: "View Projects", cta2: "Get in Touch", scroll: "Scroll to explore" },
        about: { 
            title: "About Me",
            subtitle: "Passionate developer creating solutions that transform lives",
            education_title: "Education & Experience",
            education_desc: "Currently pursuing a Technical Degree in Systems Development at ETEC Registro (2023-2025). Hands-on experience in fullstack development focusing on innovative solutions.",
            project_title: "WACS Project",
            project_desc: "Fullstack developer of the WACS project - Wheelchair Automation Control System. An innovative assistive technology solution that combines IoT hardware, artificial intelligence, and intuitive mobile interface to improve mobility for people with disabilities.",
            stack_title: "Technical Stack",
            stack_desc: "Specialized in modern web development with HTML5, CSS3, and JavaScript. Robust back-end with Node.js and REST APIs. Experience with SQL databases and Firebase, focusing on security and scalability.",
            vision_title: "Goals & Vision",
            vision_desc: "Passionate about assistive technology and social innovation. Goal: create solutions that empower people with disabilities through technology. Commitment to clean code, web accessibility, and positive social impact."
        },
        skills: { title: "Technologies & Skills", frontend: "Front-end", backend: "Back-end", others: "Others", category_label: "Technologies" },
        certifications: { title: "Certifications & Education" },
        recognitions: { 
            title: "Recognitions", 
            subtitle: "Awards, certificates and achievements that marked my professional journey.",
            mocao_title: "Motion of Applause - Registro City Hall - SP",
            mocao_desc: "Honored to receive a Motion of Applause from the Registro City Council for 7th place in Latin America's largest technology fair, recognizing leadership and innovation in Vale do Ribeira.",
            mencao_title: "Special Mention at City Council",
            mencao_desc: "Special mention from councilman Marcelo Comeron to the WACS project at the City Council's ordinary session, highlighting social impact and commitment to accessibility."
        },
        awards: {
            title: "Official Awards",
            subtitle: "Officially recorded achievements in academic and sports events.",
            a1: {
                rank: "1st Place",
                date: "Oct 2025",
                title: "Popular vote for best project at the 6th FETEC",
                meta: "Granted by Etec de Registro",
                desc: "WACS — Intelligent Autonomy for PWDs. Recognition for social impact and innovation."
            },
            a2: {
                rank: "7th Place",
                date: "Oct 2025",
                title: "16th FETEPS — Best Project",
                meta: "Granted by Centro Paula Souza",
                desc: "Representing WACS from Etec de Registro at Brazil's largest academic tech and innovation event."
            },
            a3: {
                rank: "1st Place",
                date: "Oct 2024",
                title: "Popular vote for best project at the 5th FETEC",
                meta: "Granted by Etec de Registro",
                desc: "“Sex Education” project. Recognized for relevance and community impact."
            },
            a4: {
                rank: "1st Place",
                date: "Sep 2024",
                title: "Brazilian Bodybuilding Championship",
                meta: "Men’s Physique Sub Junior up to 18 years",
                desc: "Champion at the 7th Brazilian Championship. Location: Osasco-SP."
            },
            a5: {
                rank: "2nd Place",
                date: "Sep 2023",
                title: "State RoboCode Tournament",
                meta: "Granted by Robótica Paula Souza",
                desc: "Highlighted for programming and robot strategy in the state competition."
            },
            a6: {
                rank: "1st Place",
                date: "Aug 2023",
                title: "RoboCode Championship (ETEC Registro)",
                meta: "Granted by Etec Registro",
                desc: "Qualified to represent the institution in the regional stage."
            }
        },
        projects: { 
            title: "Projects",
            subtitle: "Revolutionary assistive technology system awarded nationally",
            description: "Intelligent automation system for wheelchairs developed to promote independence and accessibility. Includes voice control, AI-assisted navigation and complete integration with IoT devices for people with motor disabilities.",
            award: "7TH PLACE - FETEPS (2025)",
            award_desc: "Latin America's largest public technology fair across <span class=\"award-glow\">Latin America</span>, bringing together innovations and transformative projects from Brazil",
            visit_website: "Official Website",
            instagram: "@wacs_etec"
        },
        media: { 
            title: "Media",
            subtitle: "Check out the interviews, articles and recognitions that highlight my professional journey.",
            interviews: "Interviews",
            press: "In the Press",
            cnn_title: "CNN Brasil Interview",
            cnn_desc: "Interview about the WACS project, career path, and social impact in assistive tech.",
            cnn_btn: "View Post",
            estadao_title: "Estadão Interview",
            estadao_desc: "Estadão interview on WACS, fullstack development, and social innovation.",
            estadao_btn: "View Article",
            jornal_title: "Printed Edition - Estadão Newspaper",
            jornal_desc: "Mention in Estadão print edition highlighting his software trajectory and projects.",
            jornal_btn: "View Edition",
            cps_title: "Victor Theodoro - Highlight in Technological Innovation",
            cps_desc: "CPS institutional highlight for his academic journey and software/assistive-tech projects.",
            cps_btn: "Access",
            reels_btn: "Watch Reels",
            robocode_btn: "View Results",
            feteps_btn: "View Project",
            etec16_btn: "Learn More",
            feteps2026_btn: "Follow",
            regiaohoje_btn: "Read Article",
            abc_btn: "Access"
        },
        contact: { 
            title: "Get in Touch",
            subtitle: "Let's talk and create something amazing together",
            social_note: "Pick your favorite social network to continue the conversation",
            panel_title: "Let’s talk?",
            name: "Name",
            email: "Email",
            message: "Message",
            subject_label: "Subject",
            subject_placeholder: "Proposal / Opportunity / Project",
            send: "Send Message"
        },
        footer: { 
            nav: "Navigation",
            links: "Useful Links",
            hiring: "Now Hiring?",
            hiring_text: "I'm open to new opportunities and would love to discuss innovative projects.",
            email: "Send an Email",
            privacy: "Privacy Policy",
            rights: "All rights reserved.",
            brand: "Victor Theodoro • Software Developer"
        },
        ui: {
            show_more: "Show More",
            show_less: "Show Less"
        }
    }
};

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (let k of keys) {
        value = value[k];
        if (!value) return null;
    }
    return value;
}

function applyTranslations() {
    // Traduzir elementos com data-i18n (batch para melhor performance)
    const i18nElements = document.querySelectorAll('[data-i18n]');
    const i18nHtmlElements = document.querySelectorAll('[data-i18n-html]');

    i18nElements.forEach(el => {
        const text = getTranslation(el.getAttribute('data-i18n'));
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    i18nHtmlElements.forEach(el => {
        const text = getTranslation(el.getAttribute('data-i18n-html'));
        if (text) el.innerHTML = text;
    });

    // Ajustar botões "Ver Mais / Ver Menos" conforme estado
    document.querySelectorAll('.show-more-btn').forEach(btn => {
        const textEl = btn.querySelector('.btn-text');
        if (!textEl) return;
        const key = btn.classList.contains('expanded') ? 'ui.show_less' : 'ui.show_more';
        const text = getTranslation(key);
        if (text) textEl.textContent = text;
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    localStorage.setItem('language', currentLanguage);
    
    // Update button
    const langBtn = document.getElementById('languageToggle');
    if (langBtn) {
        const langText = langBtn.querySelector('.lang-text');
        if (langText) langText.textContent = currentLanguage === 'pt' ? 'PT' : 'EN';
    }
    
    // Apply all translations
    applyTranslations();
}

function initializeLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
        const langText = languageToggle.querySelector('.lang-text');
        if (langText) langText.textContent = currentLanguage === 'pt' ? 'PT' : 'EN';
    }
    
    // Apply translations on page load
    applyTranslations();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}

// ==========================================
// END LANGUAGE TOGGLE
// ==========================================

// ==========================================
// UTILITY: Throttle & Debounce
// ==========================================

function throttle(fn, delay) {
    let lastCall = 0;
    let timeoutId = null;
    return function (...args) {
        const now = Date.now();
        const remaining = delay - (now - lastCall);
        if (remaining <= 0) {
            if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
            lastCall = now;
            fn.apply(this, args);
        } else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                timeoutId = null;
                fn.apply(this, args);
            }, remaining);
        }
    };
}

// ==========================================
// DOM REFERENCES (cached once)
// ==========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');
const navbarEl = document.querySelector('.navbar');
const heroScrollEl = document.querySelector('.hero-scroll');

function setBodyLoaded() {
    document.body.classList.remove('is-loading');
}

window.addEventListener('load', setBodyLoaded);

// Fallback: ensure body becomes visible even if load event was missed
if (document.readyState === 'complete') {
    setBodyLoaded();
}

// ==========================================
// TEMA
// ==========================================
document.documentElement.setAttribute('data-theme', 'dark');

// ==========================================
// MENU MOBILE
// ==========================================

function setMobileMenuOpen(isOpen) {
    if (!navLinksEl) return;
    navLinksEl.classList.toggle('active', isOpen);
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    }
    // Prevent body scroll while menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

if (mobileMenuBtn && navLinksEl) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinksEl.classList.contains('active');
        setMobileMenuOpen(!isOpen);
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
});

// Fechar menu com tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksEl && navLinksEl.classList.contains('active')) {
        setMobileMenuOpen(false);
        if (mobileMenuBtn) mobileMenuBtn.focus();
    }
});

// ==========================================
// SCROLL HANDLING (Unified & Throttled)
// ==========================================

const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar scroll state
    if (navbarEl) {
        navbarEl.classList.toggle('navbar--scrolled', scrollTop > 10);
    }

    // Hide scroll indicator
    if (heroScrollEl) {
        heroScrollEl.classList.toggle('is-hidden', scrollTop > 50);
    }

    // Active navigation highlighting
    const scrollPosition = scrollTop + 150;
    let activeFound = false;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            navAnchorLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${sectionId}`;
                link.classList.toggle('active', isActive);
            });
            activeFound = true;
            break;
        }
    }

    if (!activeFound && scrollTop < 100) {
        navAnchorLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#home');
        });
    }
}

// Use throttled scroll handler for performance
window.addEventListener('scroll', throttle(handleScroll, 60), { passive: true });
window.addEventListener('load', handleScroll);

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
            entry.target.classList.add('is-visible');
            // Stop observing after first reveal for performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards e seções
document
    .querySelectorAll(
        '.about-paragraph, .skill-category, .certification-card, .recognition-card, .media-card-video, .media-card-press'
    )
    .forEach((element) => {
        element.classList.add('reveal-on-scroll');
        observer.observe(element);
    });

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// CONTACT LINKS
// ==========================================

document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.href.startsWith('mailto:') && !this.href.startsWith('http')) {
            e.preventDefault();
        }
    });
});

// ==========================================
// SHOW MORE (Unified)
// ==========================================

function setupShowMoreButtons() {
    function toggleShowMore(button, hiddenItems) {
        const hiddenCount = parseInt(button.getAttribute('data-hidden'), 10);
        const isExpanded = button.classList.contains('expanded');
        const btnText = button.querySelector('.btn-text');
        const btnCount = button.querySelector('.btn-count');
        const btnIcon = button.querySelector('i');

        if (isExpanded) {
            hiddenItems.forEach(item => { item.style.display = 'none'; });
            button.classList.remove('expanded');
            if (btnText) btnText.textContent = getTranslation('ui.show_more') || 'Ver Mais';
            if (btnCount) btnCount.textContent = '+' + hiddenCount;
            if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
        } else {
            hiddenItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
            button.classList.add('expanded');
            if (btnText) btnText.textContent = getTranslation('ui.show_less') || 'Ver Menos';
            if (btnCount) btnCount.textContent = '';
            if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
        }
    }

    document.querySelectorAll('.show-more-btn[data-column]').forEach(button => {
        button.addEventListener('click', function() {
            const columnElement = this.closest('.media-column');
            if (!columnElement) return;
            toggleShowMore(this, columnElement.querySelectorAll('.hidden-media'));
        });
    });

    const showMoreRecognitionsBtn = document.getElementById('showMoreRecognitions');
    if (showMoreRecognitionsBtn) {
        showMoreRecognitionsBtn.addEventListener('click', function() {
            toggleShowMore(this, document.querySelectorAll('.hidden-recognition'));
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupShowMoreButtons);
} else {
    setupShowMoreButtons();
}

// ==========================================
// PROJECT CAROUSEL (Improved)
// ==========================================

(function setupProjectCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    let slideIndex = 0;
    let autoPlayInterval = null;
    let isPaused = false;

    function showSlide(n) {
        if (n >= slides.length) n = 0;
        if (n < 0) n = slides.length - 1;
        slideIndex = n;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
            dot.setAttribute('tabindex', '-1');
        });

        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        dots[slideIndex].setAttribute('aria-selected', 'true');
        dots[slideIndex].setAttribute('tabindex', '0');
    }

    function nextSlide() { showSlide(slideIndex + 1); }
    function prevSlide() { showSlide(slideIndex - 1); }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            if (!isPaused) nextSlide();
        }, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event delegation for carousel controls
    const carouselNav = document.querySelector('.carousel-nav');
    if (carouselNav) {
        carouselNav.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (btn) {
                if (btn.dataset.action === 'next') nextSlide();
                if (btn.dataset.action === 'prev') prevSlide();
                startAutoPlay();
                return;
            }

            const dot = e.target.closest('[data-slide]');
            if (dot) {
                showSlide(parseInt(dot.dataset.slide, 10));
                startAutoPlay();
            }
        });

        // Keyboard navigation for dots
        carouselNav.addEventListener('keydown', (e) => {
            const dot = e.target.closest('.dot');
            if (!dot) return;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextSlide();
                dots[slideIndex].focus();
                startAutoPlay();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prevSlide();
                dots[slideIndex].focus();
                startAutoPlay();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(parseInt(dot.dataset.slide, 10));
                startAutoPlay();
            }
        });
    }

    // Pause on hover/focus for accessibility
    const carouselContainer = document.querySelector('.project-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => { isPaused = true; });
        carouselContainer.addEventListener('mouseleave', () => { isPaused = false; });
        carouselContainer.addEventListener('focusin', () => { isPaused = true; });
        carouselContainer.addEventListener('focusout', () => { isPaused = false; });
    }

    // Touch/swipe support
    let touchStartX = 0;
    const phoneScreen = document.querySelector('.phone-screen');
    
    if (phoneScreen) {
        phoneScreen.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        phoneScreen.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
                startAutoPlay();
            }
        }, { passive: true });
    }

    // Initialize
    showSlide(0);
    startAutoPlay();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoPlay();
        else startAutoPlay();
    });
})();

// ==========================================
// HORIZONTAL CAROUSELS
// ==========================================

function setupHorizontalCarousel(trackId, cardSelector, carouselName) {
    const track = document.getElementById(trackId);
    const arrows = document.querySelectorAll(`.carousel-arrow[data-carousel="${carouselName}"]`);
    if (!track || !arrows.length) return;

    arrows.forEach(btn => {
        btn.addEventListener('click', () => {
            const dir = Number(btn.getAttribute('data-dir')) || 1;
            const card = track.querySelector(cardSelector);
            const cardWidth = card ? card.offsetWidth : 280;
            const gap = 24;
            track.scrollBy({
                left: dir * (cardWidth + gap),
                behavior: 'smooth'
            });
        });
    });

    // Keyboard support for track
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Carrossel de ' + carouselName);
    
    track.addEventListener('keydown', (e) => {
        const card = track.querySelector(cardSelector);
        const cardWidth = card ? card.offsetWidth : 280;
        const gap = 24;
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        }
    });
}

setupHorizontalCarousel('certificationsTrack', '.certification-card', 'certifications');
setupHorizontalCarousel('awardsTrack', '.award-card', 'awards');
setupHorizontalCarousel('recognitionsTrack', '.recognition-card', 'recognitions');

// ==========================================
// BACK TO TOP
// ==========================================

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    const updateBackToTop = throttle(() => {
        const show = window.pageYOffset > 300;
        backToTopBtn.style.opacity = show ? '1' : '0';
        backToTopBtn.style.pointerEvents = show ? 'auto' : 'none';
    }, 100);

    window.addEventListener('scroll', updateBackToTop, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// INIT LOG
// ==========================================

console.log('%cPortfolio Victor Theodoro carregado com sucesso!', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
