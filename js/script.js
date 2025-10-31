// Util: clamp
function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

// Header elevate on scroll
(function headerElevate() {
  const header = document.querySelector('[data-elevate]');
  if (!header) return;
  let lastY = window.scrollY;
  const onScroll = () => {
    const scrolled = window.scrollY > 6;
    header.classList.toggle('scrolled', scrolled);
    const goingDown = window.scrollY > lastY;
    header.classList.toggle('compact', scrolled && goingDown);
    lastY = window.scrollY;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Menu toggle (mobile)
(function menuToggle() {
  const toggle = document.querySelector('.menu__toggle');
  const list = document.getElementById('menu-list');
  if (!toggle || !list) return;
  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  list.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    list.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

// Reveal on scroll
(function revealOnScroll() {
  const elements = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!('IntersectionObserver' in window) || elements.length === 0) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });
  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    io.observe(el);
  });
})();

// Active nav link by section/page
(function activeNav() {
  const header = document.querySelector('[data-elevate]');
  const navLinks = header ? Array.from(header.querySelectorAll('.menu__list a')) : [];
  if (navLinks.length === 0) return;
  const byHref = (href) => navLinks.find((a) => a.getAttribute('href') === href);

  // Page-based highlighting for multi-pages
  const path = location.pathname.split('/').pop() || 'index.html';
  if (path !== 'index.html') {
    const map = {
      'about.html': 'about.html',
      'experience.html': 'experience.html',
      'projects.html': 'projects.html',
      'contact.html': 'contact.html'
    };
    const target = map[path];
    if (target) {
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === target));
      return; // no section observer on inner pages
    }
  }

  // Section-based highlighting for landing (index)
  const sectionIds = ['sobre', 'experiencia', 'projetos', 'skills', 'contato'];
  const entries = sectionIds
    .map((id) => ({ id, el: document.getElementById(id), a: byHref(`#${id}`) }))
    .filter((x) => x.el && x.a);
  if (entries.length === 0) return;
  let activeId = null;
  const io = new IntersectionObserver((obs) => {
    let best = { id: activeId, ratio: 0 };
    for (const e of obs) {
      const id = e.target.id;
      const ratio = e.intersectionRatio;
      if (ratio > best.ratio) best = { id, ratio };
    }
    if (best.id && best.id !== activeId) {
      activeId = best.id;
      entries.forEach(({ id, a }) => a.classList.toggle('active', id === activeId));
    }
  }, { threshold: [0.35, 0.6, 0.9] });
  entries.forEach(({ el }) => io.observe(el));
})();

// Hero 3D tilt
(function cardTilt() {
  const card = document.querySelector('.card3d');
  if (!card) return;
  const rect = () => card.getBoundingClientRect();
  const onMove = (e) => {
    const r = rect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = clamp((e.clientX - cx) / (r.width / 2), -1, 1);
    const dy = clamp((e.clientY - cy) / (r.height / 2), -1, 1);
    const rotateX = dy * -8;
    const rotateY = dx * 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const reset = () => { card.style.transform = 'rotateX(0deg) rotateY(0deg)'; };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
})();

// Canvas animated background (subtle particles)
(function particles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];

  function resize() {
    width = canvas.clientWidth = canvas.parentElement.clientWidth;
    height = canvas.clientHeight = canvas.parentElement.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = 60;
  const SPEED = 0.2;
  function init() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.6 + 0.1
    }));
  }
  init();

  function step() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#3b82f6';
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.globalAlpha = p.a;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = '#3b82f6';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 140 * 140) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle with persistence
(function themeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const storageKey = 'theme-preference';

  function getPreferredTheme() {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    return mq.matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    if (btn) btn.setAttribute('aria-pressed', theme === 'light');
  }

  const initial = getPreferredTheme();
  applyTheme(initial);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }
})();


