// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typed.js initialization
const typed = new Typed('.typed-text', {
    strings: [
        'Desenvolvedor Fullstack',
        'Especialista em JavaScript',
        'Entusiasta de Tecnologia',
        'Solucionador de Problemas'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksA = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksA.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Projects data
const projects = [
    {
        title: 'Projeto 1',
        description: 'Descrição do projeto 1. Tecnologias utilizadas e principais características.',
        image: 'assets/images/project1.jpg',
        github: 'https://github.com/vftheodoro/projeto1',
        demo: 'https://projeto1.com'
    },
    {
        title: 'Projeto 2',
        description: 'Descrição do projeto 2. Tecnologias utilizadas e principais características.',
        image: 'assets/images/project2.jpg',
        github: 'https://github.com/vftheodoro/projeto2',
        demo: 'https://projeto2.com'
    },
    {
        title: 'Projeto 3',
        description: 'Descrição do projeto 3. Tecnologias utilizadas e principais características.',
        image: 'assets/images/project3.jpg',
        github: 'https://github.com/vftheodoro/projeto3',
        demo: 'https://projeto3.com'
    }
];

// Populate projects
const projectGrid = document.querySelector('.project-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-aos', 'fade-up');
    
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.github}" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <a href="${project.demo}" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>
            </div>
        </div>
    `;
    
    projectGrid.appendChild(projectCard);
});

// Form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    // Add your form submission logic here
    // For now, we'll just console.log the data
    console.log('Form submitted:', formProps);
    
    // Show success message
    alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
    contactForm.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});