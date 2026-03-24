/* ══════════════════════════════════════════
   PORTFOLIO ENZO BAUDRENGHIEN — script.js
══════════════════════════════════════════ */

/* ── BOOT SEQUENCE ── */
(function () {
  const boot = document.getElementById('boot');
  const bootLines = document.getElementById('bootLines');
  const bootBar = document.getElementById('bootBar');
  const bootStatus = document.getElementById('bootStatus');

  const lines = [
    { text: 'Loading kernel modules', delay: 0 },
    { text: 'Initializing network stack [Aruba AOS-CX]', delay: 180 },
    { text: 'Mounting /sys/portfolio/enzo', delay: 380 },
    { text: 'Starting sshd ... OK', delay: 560 },
    { text: 'Loading skills database', delay: 720 },
    { text: 'Connecting to DNSI Ville de Lille', delay: 900 },
    { text: 'Authentication successful', delay: 1050 },
    { text: 'Portfolio ready', delay: 1200 },
  ];

  let progress = 0;
  const statuses = ['LOADING ASSETS...', 'MOUNTING FILESYSTEM...', 'STARTING SERVICES...', 'ALMOST READY...', 'WELCOME'];

  lines.forEach((line, i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'bl' + (i < lines.length - 1 ? ' ok' : '');
      el.textContent = '$ ' + line.text;
      bootLines.appendChild(el);
    }, line.delay);
  });

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bootStatus.textContent = 'WELCOME';
      setTimeout(() => {
        boot.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
          boot.style.display = 'none';
          startHero();
        }, 800);
      }, 400);
    }
    bootBar.style.width = Math.min(progress, 100) + '%';
    const idx = Math.floor((progress / 100) * (statuses.length - 1));
    bootStatus.textContent = statuses[Math.min(idx, statuses.length - 1)];
  }, 120);

  document.body.style.overflow = 'hidden';
})();

/* ── HERO TERMINAL ANIMATION ── */
function startHero() {
  const cmd = document.getElementById('htCmd');
  const output = document.getElementById('htOutput');
  if (!cmd || !output) return;

  const command = 'whoami --verbose';
  const outputLines = [
    ['user', 'Enzo Baudrenghien'],
    ['role', 'Technicien Réseaux & Sécurité'],
    ['school', 'Lycée Saint-Rémi — BTS SIO SISR'],
    ['stage', 'T.I.R.S — DNSI Ville de Lille'],
    ['stack', 'Aruba · pfSense · Kali · Linux'],
  ];

  let ci = 0;
  function typeCmd() {
    if (ci < command.length) {
      cmd.textContent = command.substring(0, ci + 1);
      ci++;
      setTimeout(typeCmd, 60);
    } else {
      setTimeout(showOutput, 300);
    }
  }

  let li = 0;
  function showOutput() {
    if (li < outputLines.length) {
      const line = document.createElement('div');
      const [key, val] = outputLines[li];
      line.innerHTML = `<span class="hl">${key}:</span>    <span>${val}</span>`;
      output.appendChild(line);
      li++;
      setTimeout(showOutput, 160);
    }
  }

  setTimeout(typeCmd, 400);

  // Reveal hero elements
  document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 120);
  });
}

/* ── NAVBAR ── */
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.s === current);
  });
});

// Burger
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ── INTERSECTION OBSERVER ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      // Animate skill bars
      entry.target.querySelectorAll('.sk-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('.skill-block').forEach(block => {
  const blockObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        blockObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  blockObs.observe(block);
});

/* ── SKILLS TABS ── */
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('t-' + btn.dataset.t).classList.add('active');
    // Re-trigger fade-ups inside newly visible panel
    document.querySelectorAll('#t-' + btn.dataset.t + ' .fade-up').forEach(el => {
      el.classList.add('in');
      el.querySelectorAll('.sk-fill').forEach(bar => { bar.style.width = bar.dataset.w + '%'; });
    });
  });
});

/* ── PROJECT FILTER ── */
document.querySelectorAll('.filt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.proj-card').forEach(card => {
      const show = f === 'all' || card.dataset.c === f;
      card.classList.toggle('hidden', !show);
      if (show) card.style.animation = 'fadeUp 0.4s ease both';
    });
  });
});

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const success = document.getElementById('cfSuccess');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Envoi...';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa fa-paper-plane"></i> Envoyer';
      btn.disabled = false;
      success.classList.add('show');
      this.reset();
      setTimeout(() => success.classList.remove('show'), 4000);
    }, 1500);
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── CLICK SPARK ── */
document.addEventListener('click', e => {
  const s = document.createElement('div');
  Object.assign(s.style, {
    position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
    width: '5px', height: '5px',
    background: '#a8e063', borderRadius: '50%',
    pointerEvents: 'none', zIndex: '9999',
    transform: 'translate(-50%,-50%)',
    animation: 'sparkFade 0.5s ease forwards'
  });
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 500);
});

/* ── KEYFRAMES ── */
const ks = document.createElement('style');
ks.textContent = `
  @keyframes sparkFade {
    0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
    100% { opacity:0; transform:translate(-50%,-260%) scale(0.2); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;
document.head.appendChild(ks);
