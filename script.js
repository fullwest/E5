/* ═══════════════════════════════════════
   PORTFOLIO BTS SIO SISR — script.js
═══════════════════════════════════════ */

/* ─── LOADER ─── */
(function () {
  const loader = document.getElementById('loader');
  const fill = document.querySelector('.loader-fill');
  const percent = document.getElementById('loaderPercent');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hide');
        document.body.style.overflow = 'auto';
        triggerHeroAnimations();
      }, 400);
    }
    fill.style.width = progress + '%';
    percent.textContent = Math.floor(progress) + '%';
  }, 80);
  document.body.style.overflow = 'hidden';
})();


/* ─── MATRIX CANVAS ─── */
(function () {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  const chars = 'ABCDEF0123456789SISR_RESEAU_SECURITE_BTS_SIO_LINUX_CISCO_';
  const cols = Math.floor(window.innerWidth / 18);
  const drops = Array.from({ length: cols }, () => Math.random() * -50);
  function draw() {
    ctx.fillStyle = 'rgba(10, 12, 16, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '13px Space Mono, monospace';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      ctx.fillStyle = Math.random() > 0.93 ? '#f79716' : '#5bc8f5';
      ctx.fillText(char, x, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    });
  }
  setInterval(draw, 50);
})();

/* ─── TYPING EFFECT ─── */
const phrases = [
  'Technicien Réseaux & Sécurité',
  'Administrateur Système Linux',
  'Passionné de Cybersécurité',
  'Stage T.I.R.S — Ville de Lille',
  'Aruba · pfSense · Kali Linux'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
function typeEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    el.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { deleting = true; setTimeout(typeEffect, 1800); return; }
    setTimeout(typeEffect, 70);
  } else {
    el.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeEffect, 400); return; }
    setTimeout(typeEffect, 35);
  }
}

/* ─── HERO REVEAL ─── */
function triggerHeroAnimations() {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1'; el.style.transform = 'translateY(0)'; el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }, i * 150);
  });
  setTimeout(typeEffect, 800);
}

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) link.classList.add('active');
  });
});

/* ─── BURGER MENU ─── */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ─── INTERSECTION OBSERVER (scroll reveal) ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
// Also trigger skill bars on their parent card
document.querySelectorAll('.skill-card').forEach(card => {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        cardObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  cardObserver.observe(card);
});

/* ─── SKILLS TABS ─── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ─── PROJECT FILTER ─── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.projet-card').forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ─── CONTACT FORM ─── */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Envoi en cours...';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> Envoyer';
    btn.disabled = false;
    success.classList.add('show');
    this.reset();
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1500);
});

/* ─── SMOOTH SCROLL (polyfill for older browsers) ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ─── GLITCH on logo hover ─── */
document.querySelector('.nav-logo').addEventListener('mouseenter', function () {
  this.style.textShadow = '2px 0 var(--yellow), -2px 0 var(--blue)';
  setTimeout(() => this.style.textShadow = 'none', 300);
});

/* ─── Particle spark on click ─── */
document.addEventListener('click', (e) => {
  const spark = document.createElement('div');
  Object.assign(spark.style, {
    position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
    width: '6px', height: '6px', background: 'var(--yellow)',
    borderRadius: '50%', pointerEvents: 'none', zIndex: '9999',
    transform: 'translate(-50%,-50%)',
    animation: 'sparkFade 0.5s ease forwards'
  });
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 500);
});
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes sparkFade {
    0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-250%) scale(0.3); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
