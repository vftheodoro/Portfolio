// Navegação mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active', isActive);
    navToggle.setAttribute('aria-expanded', String(isActive));
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Header: aplicar classe quando houver scroll (sem mudar para tema claro)
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    if (window.pageYOffset > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Animação de elementos ao entrar na viewport
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    '.skill-category, .project-card, .stat, .about-content, .contact-content'
  )
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const value = parseInt(target.textContent);
      animateCounter(target, value);
      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat h3').forEach(counter => {
  counterObserver.observe(counter);
});

// Validação e envio do formulário
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const formInputs = contactForm.querySelectorAll('input, textarea');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let isValid = true;
    formInputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = '#2b3445';
      }
    });

    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.background = '#10b981';
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 2000);
      }, 1500);
    }
  });
}

// Efeito de digitação: evitar quebrar HTML do título
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-text h1');
  if (!heroTitle) return;

  // Se o título contiver elementos (ex.: span.highlight), não aplicar o efeito para não exibir tags
  const hasChildElements = heroTitle.children && heroTitle.children.length > 0;
  if (hasChildElements) return;

  const plain = heroTitle.textContent.trim();
  if (plain) typeWriter(heroTitle, plain, 80);
});

// Parallax suave para o hero (desativado para evitar faixa cinza entre seções)
(() => {
  const hero = document.querySelector('.hero');
  if (hero) hero.style.transform = '';
})();

// Filtro de projetos (futuro)
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(project => {
    if (category === 'all' || project.dataset.category === category) {
      project.style.display = 'block';
      project.style.animation = 'fadeInUp 0.6s ease';
    } else {
      project.style.display = 'none';
    }
  });
}

document.querySelectorAll('.project-card').forEach((project, index) => {
  const categories = ['frontend', 'fullstack', 'backend'];
  project.dataset.category = categories[index % categories.length];
});

// Tooltip para habilidades
document.querySelectorAll('.skill-item').forEach(skill => {
  skill.addEventListener('mouseenter', () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = skill.querySelector('span').textContent;
    tooltip.style.cssText = `
      position: absolute; background: #0b1220; color: white; padding: 8px 12px;
      border-radius: 6px; font-size: 0.9rem; z-index: 1000; pointer-events: none;
      opacity: 0; transform: translateY(10px); transition: all 0.3s ease; border:1px solid rgba(59,130,246,.25);
    `;
    skill.style.position = 'relative';
    skill.appendChild(tooltip);
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });
  });
  skill.addEventListener('mouseleave', () => {
    const tooltip = skill.querySelector('.skill-tooltip');
    if (tooltip) tooltip.remove();
  });
});

// Ativo na navegação
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  let current = '';
  sections.forEach(section => {
    if (window.pageYOffset >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNavLink);

// Estilos dinâmicos complementares
const style = document.createElement('style');
style.textContent = `
  .nav-menu a.active { color: #3b82f6 !important; }
  .nav-menu a.active::after { width: 100% !important; }
  .skill-tooltip::before { content: ''; position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
    border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 5px solid #0b1220; }
`;
document.head.appendChild(style);

// Preloader simples
window.addEventListener('load', () => {
  const preloader = document.createElement('div');
  preloader.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    display: flex; align-items: center; justify-content: center; z-index: 9999; transition: opacity 0.4s ease;`;
  preloader.innerHTML = `<div style="color:#cbd5e1; font-size: 1.25rem; font-weight:600;">Carregando...</div>`;
  document.body.appendChild(preloader);
  setTimeout(() => { preloader.style.opacity = '0'; setTimeout(() => preloader.remove(), 400); }, 700);
});

// Hover em cards de projeto
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-12px) scale(1.02)'; });
  card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) scale(1)'; });
});

// ===== Carousel simples (troca de imagens) =====
document.querySelectorAll('.carousel').forEach(carousel => {
  const items = Array.from(carousel.querySelectorAll('.carousel-item'));
  let index = 0;
  const prev = carousel.querySelector('.carousel-nav.prev');
  const next = carousel.querySelector('.carousel-nav.next');

  const setActive = i => {
    items.forEach((el, idx) => el.classList.toggle('active', idx === i));
  };

  prev?.addEventListener('click', e => {
    e.stopPropagation();
    index = (index - 1 + items.length) % items.length;
    setActive(index);
  });
  next?.addEventListener('click', e => {
    e.stopPropagation();
    index = (index + 1) % items.length;
    setActive(index);
  });

  // Clique na imagem abre em lightbox
  items.forEach(item => {
    const img = item.querySelector('img');
    img?.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
});

// ===== Lightbox (tela cheia) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Imagem ampliada';
  lightbox.classList.add('open');
  // bloquear rolagem do body enquanto o modal está aberto
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

console.log('%c🚀 Portfólio carregado', 'color:#3b82f6; font-weight:bold;');
