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
            cnn_desc: "Victor Theodoro foi entrevistado pela CNN Brasil, onde apresentou suas habilidades em desenvolvimento fullstack e sua experiência em projetos de tecnologia assistiva. A entrevista destacou sua trajetória como jovem desenvolvedor e sua contribuição para a inovação tecnológica no Brasil.",
            cnn_btn: "Ver Post",
            estadao_title: "Entrevista Estadão",
            estadao_desc: "Victor Theodoro foi destaque em entrevista exclusiva no jornal Estadão, onde compartilhou sua experiência como desenvolvedor fullstack junior e sua participação em projetos inovadores de tecnologia assistiva. A matéria destacou sua trajetória acadêmica e profissional, enfatizando seu compromisso com a inovação social através da tecnologia.",
            estadao_btn: "Ver Matéria",
            jornal_title: "Edição Impressa - Jornal Estadão",
            jornal_desc: "Victor Theodoro foi mencionado na edição impressa do Estadão, o maior jornal do Brasil, destacando sua trajetória como jovem talento em desenvolvimento de software. Esta cobertura impressa alcança milhões de leitores e reforça sua posição como profissional promissor na área de tecnologia.",
            jornal_btn: "Ver Edição",
            cps_title: "Victor Theodoro - Destaque em Inovação Tecnológica",
            cps_desc: "Victor Theodoro foi destacado pelo Centro Paula Souza como um dos jovens talentos em desenvolvimento de software. A matéria apresenta sua trajetória acadêmica na Etec de Registro, destacando suas habilidades em desenvolvimento fullstack e sua participação em projetos inovadores. Esta cobertura institucional reconhece sua dedicação aos estudos e seu potencial como profissional da tecnologia.",
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
            cnn_desc: "Victor Theodoro was interviewed by CNN Brasil, where he presented his fullstack development skills and his experience in assistive technology projects. The interview highlighted his trajectory as a young developer and his contribution to technological innovation in Brazil.",
            cnn_btn: "View Post",
            estadao_title: "Estadão Interview",
            estadao_desc: "Victor Theodoro was featured in an exclusive interview with the Estadão newspaper, where he shared his experience as a junior fullstack developer and his participation in innovative assistive technology projects. The article highlighted his academic and professional trajectory, emphasizing his commitment to social innovation through technology.",
            estadao_btn: "View Article",
            jornal_title: "Printed Edition - Estadão Newspaper",
            jornal_desc: "Victor Theodoro was mentioned in the printed edition of Estadão, Brazil's largest newspaper, highlighting his trajectory as a young talent in software development. This printed coverage reaches millions of readers and reinforces his position as a promising professional in the technology field.",
            jornal_btn: "View Edition",
            cps_title: "Victor Theodoro - Highlight in Technological Innovation",
            cps_desc: "Victor Theodoro was highlighted by Centro Paula Souza as one of the young talents in software development. The article presents his academic trajectory at Etec Registro, highlighting his fullstack development skills and his participation in innovative projects. This institutional coverage recognizes his dedication to studies and his potential as a technology professional.",
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
    // Traduzir todos elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = getTranslation(key);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Traduzir todos elementos com data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const text = getTranslation(key);
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



const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');
const navbarEl = document.querySelector('.navbar');
const heroScrollEl = document.querySelector('.hero-scroll');

function setBodyLoaded() {
    document.body.classList.remove('is-loading');
}

window.addEventListener('load', setBodyLoaded);

// ==========================================
// TEMA
// ==========================================
// Tema fixo em dark (sem alternância).
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

// ==========================================
// SCROLL SUAVE E NAVBAR DINÂMICA
// ==========================================

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navbarEl) {
        navbarEl.classList.toggle('navbar--scrolled', scrollTop > 10);
    }

    // Ocultar scroll para explorar quando usuário começa a rolar
    if (heroScrollEl) {
        heroScrollEl.classList.toggle('is-hidden', scrollTop > 50);
    }
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
            entry.target.classList.add('is-visible');
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

if (document.querySelector('.projects-grid') && document.querySelectorAll('.filter-btn').length) {
    setupProjectFilters();
}

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

// (Parallax removido: era custo extra e não agregava visualmente)

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

// (Typewriter removido: visualmente menos “corporate” e gerava pisca)

// ==========================================
// SHOW MORE FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize show more buttons
    const showMoreButtons = document.querySelectorAll('.show-more-btn[data-column]');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const hiddenCount = parseInt(this.getAttribute('data-hidden'));

            // Find the column container
            const columnElement = this.closest('.media-column');
            if (!columnElement) return;
            const hiddenItems = columnElement.querySelectorAll('.hidden-media');

            // Toggle visibility
            if (this.classList.contains('expanded')) {
                // Hide items
                hiddenItems.forEach(item => {
                    item.style.display = 'none';
                });
                this.classList.remove('expanded');
                const showMoreText = getTranslation('ui.show_more') || 'Ver Mais';
                this.querySelector('.btn-text').textContent = showMoreText;
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
                const showLessText = getTranslation('ui.show_less') || 'Ver Menos';
                this.querySelector('.btn-text').textContent = showLessText;
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

if (showMoreRecognitionsBtn) {
    showMoreRecognitionsBtn.addEventListener('click', function() {
        const hiddenCount = parseInt(this.getAttribute('data-hidden'), 10);
        const hiddenRecognitions = document.querySelectorAll('.hidden-recognition');

        if (this.classList.contains('expanded')) {
            // Hide items
            hiddenRecognitions.forEach(item => {
                item.style.display = 'none';
            });
        this.classList.remove('expanded');
        const showMoreText = getTranslation('ui.show_more') || 'Ver Mais';
        this.querySelector('.btn-text').textContent = showMoreText;
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
        const showLessText = getTranslation('ui.show_less') || 'Ver Menos';
        this.querySelector('.btn-text').textContent = showLessText;
        this.querySelector('.btn-count').textContent = '';
        this.querySelector('i').style.transform = 'rotate(180deg)';
    }
});
}

// ==========================================
// SCROLL-BASED ACTIVE NAVIGATION
// ==========================================

function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchorLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navAnchorLinks.forEach(link => link.classList.remove('active'));

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
    navAnchorLinks.forEach(link => {
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

// Expor no window para funcionar com onclick do HTML
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlide;

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

// ==========================================
// FORMULÁRIO DE CONTATO (mailto)
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const formMessage = document.getElementById('formMessage');

        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const subject = document.getElementById('subject')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';

        if (!name || !email || !subject || !message) {
            if (formMessage) {
                formMessage.className = 'form-message error is-visible';
                formMessage.textContent = 'Por favor, preencha todos os campos.';
            }
            return;
        }

        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.textContent = 'Abrindo email...';

        const to = 'victorgft@outlook.com';
        const mailSubject = `[Portfólio] ${subject}`;
        const mailBody =
            `Nome: ${name}\n` +
            `Email: ${email}\n\n` +
            `${message}\n\n` +
            `Enviado via portfólio.`;

        const mailto = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        if (formMessage) {
            formMessage.className = 'form-message success is-visible';
            formMessage.textContent = 'Abrindo seu aplicativo de email...';
        }

        // Disparar o cliente de email do usuário
        window.location.href = mailto;

        setTimeout(() => {
            if (submitBtn) submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Enviar Mensagem';
        }, 1200);
    });
}

// ==========================================
// SCROLL SPY - Highlight current section
// ==========================================

function updateActiveNavLink() {
    const sections = [
        { id: 'home', name: 'home' },
        { id: 'sobre', name: 'sobre' },
        { id: 'skills', name: 'skills' },
        { id: 'certificacoes', name: 'certificacoes' },
        { id: 'premios-oficiais', name: 'premios-oficiais' },
        { id: 'reconhecimentos', name: 'reconhecimentos' },
        { id: 'projetos', name: 'projetos' },
        { id: 'midia', name: 'midia' },
        { id: 'contato', name: 'contato' }
    ];

    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (!element) return;

        const { offsetTop, offsetHeight } = element;
        const isInView = scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;

        const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (navLink) {
            navLink.classList.toggle('active', isInView);
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

