/* ============================================================
   NEONFALL — script.js
   Handles: Loader · Cursor · Navbar · Particles · Reveal · Modal
   ============================================================ */

'use strict';

// ─── DOM REFS ────────────────────────────────────────────────────────────────
const loader          = document.getElementById('loader');
const loaderBar       = document.getElementById('loader-bar');
const loaderText      = document.getElementById('loader-text');
const cursorGlow      = document.getElementById('cursor-glow');
const navbar          = document.getElementById('navbar');
const navHamburger    = document.getElementById('nav-hamburger');
const navMobile       = document.getElementById('nav-mobile');
const btnDownload     = document.getElementById('btn-download');
const modalOverlay    = document.getElementById('modal-overlay');
const modalClose      = document.getElementById('modal-close');
const btnConfirm      = document.getElementById('btn-confirm-download');
const btnCancel       = document.getElementById('btn-cancel-download');
const progressWrap    = document.getElementById('modal-progress-wrap');
const progressBar     = document.getElementById('modal-progress-bar');
const realLink        = document.getElementById('real-download-link');
const canvas          = document.getElementById('particles-canvas');
const heroContent     = document.getElementById('hero-content');

// ─── LOADER ──────────────────────────────────────────────────────────────────
const LOAD_STEPS = [
  'INITIALIZING…',
  'LOADING ASSETS…',
  'RENDERING ENGINE…',
  'READY.',
];

(function runLoader() {
  let progress = 0;
  let stepIdx  = 0;

  const interval = setInterval(() => {
    // Random increments for realistic feel
    progress += Math.random() * 18 + 8;
    if (progress > 100) progress = 100;

    loaderBar.style.width = progress + '%';

    // Update label text at thresholds
    const step = Math.floor((progress / 100) * (LOAD_STEPS.length - 1));
    if (step !== stepIdx) {
      stepIdx = step;
      loaderText.textContent = LOAD_STEPS[Math.min(stepIdx, LOAD_STEPS.length - 1)];
    }

    if (progress >= 100) {
      clearInterval(interval);
      loaderText.textContent = LOAD_STEPS[LOAD_STEPS.length - 1];

      setTimeout(() => {
        loader.classList.add('hidden');
        initReveal();       // start scroll reveals
        animateHeroIn();    // hero entrance
      }, 500);
    }
  }, 90);
})();

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.left = mouseX + 'px';
  cursorGlow.style.top  = mouseY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── HAMBURGER MENU ──────────────────────────────────────────────────────────
navHamburger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navHamburger.classList.toggle('open', open);
  navHamburger.setAttribute('aria-expanded', open);
  navMobile.setAttribute('aria-hidden', !open);
});

// Close mobile nav on link click
navMobile.querySelectorAll('.nav-link-mobile').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navHamburger.classList.remove('open');
    navHamburger.setAttribute('aria-expanded', false);
    navMobile.setAttribute('aria-hidden', true);
  });
});

// ─── PARTICLES ───────────────────────────────────────────────────────────────
(function initParticles() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const PARTICLE_COUNT = 55;
  const particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset(true);
  }
  Particle.prototype.reset = function (initial) {
    this.x     = Math.random() * W;
    this.y     = initial ? Math.random() * H : H + 10;
    this.size  = Math.random() * 1.5 + 0.4;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.life  = 0;
    this.maxLife = Math.random() * 300 + 200;
  };
  Particle.prototype.update = function () {
    this.x   += this.speedX;
    this.y   += this.speedY;
    this.life++;
    const ratio = this.life / this.maxLife;
    this.alpha = this.opacity * Math.sin(ratio * Math.PI);

    if (this.life >= this.maxLife || this.y < -10) {
      this.reset(false);
    }
  };
  Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = `rgba(255, 136, 0, 1)`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(255, 136, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  resize();
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  let raf;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    raf = requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener('resize', resize, { passive: true });
})();

// ─── HERO ENTRANCE ───────────────────────────────────────────────────────────
function animateHeroIn() {
  const reveals = heroContent.querySelectorAll('[data-reveal]');
  reveals.forEach((el, i) => {
    const delay = parseInt(el.dataset.delay || 0, 10) + i * 40;
    setTimeout(() => el.classList.add('revealed'), delay);
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
function initReveal() {
  const allReveal = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0, 10);
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    allReveal.forEach(el => {
      // Skip hero elements — they're animated by animateHeroIn
      if (!heroContent.contains(el)) {
        observer.observe(el);
      }
    });
  } else {
    // Fallback: reveal everything immediately
    allReveal.forEach(el => el.classList.add('revealed'));
  }
}

// ─── MODAL LOGIC ─────────────────────────────────────────────────────────────
function openModal() {
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Focus trap
  setTimeout(() => btnConfirm.focus(), 300);
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Reset progress
  progressWrap.classList.remove('active');
  progressBar.style.width = '0%';
  btnConfirm.disabled = false;
  btnConfirm.innerHTML = `
    <span class="btn-glow"></span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    CONTINUAR DOWNLOAD`;
}

function triggerDownload() {
  // Show progress animation
  progressWrap.classList.add('active');
  btnConfirm.disabled = true;
  btnConfirm.innerHTML = `
    <span class="btn-glow"></span>
    PREPARANDO…`;

  let p = 0;
  const interval = setInterval(() => {
    p += Math.random() * 25 + 10;
    if (p >= 100) {
      p = 100;
      clearInterval(interval);
      progressBar.style.width = '100%';

      setTimeout(() => {
        // Trigger actual download
        realLink.click();
        closeModal();
      }, 400);
    }
    progressBar.style.width = p + '%';
  }, 100);
}

// Event listeners
btnDownload.addEventListener('click', openModal);
btnConfirm.addEventListener('click', triggerDownload);
btnCancel.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

// Click outside to close
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

// ─── SMOOTH NAV LINKS ────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
