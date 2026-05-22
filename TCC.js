/* CURSOR */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
const glow = document.getElementById('cursorGlow');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  glow.style.left = mx + 'px'; glow.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,[role="button"]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '48px'; ring.style.height = '48px';
    ring.style.borderColor = 'rgba(128,14,19,0.6)';
    dot.style.transform = 'translate(-50%,-50%) scale(0)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '32px'; ring.style.height = '32px';
    ring.style.borderColor = 'rgba(196,154,108,0.5)';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* LOADER */
const loaderMsgs = ['INICIALIZANDO SISTEMA','CARREGANDO SHADERS','VERIFICANDO INTEGRIDADE','SISTEMA PRONTO'];
const loaderBar = document.getElementById('loaderBar');
const loaderText = document.getElementById('loaderText');
let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 12 + 3;
  if (progress >= 100) { progress = 100; clearInterval(loaderInterval); }
  loaderBar.style.width = progress + '%';
  const idx = Math.min(Math.floor(progress / 25), 3);
  loaderText.textContent = loaderMsgs[idx];
  if (progress >= 100) {
    setTimeout(() => {
      document.getElementById('loaderOverlay').classList.add('hidden');
      revealElements();
    }, 500);
  }
}, 120);

/* NAVBAR SCROLL */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* REVEAL */
function revealElements() {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('revealed'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* MODAL */
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  const pb = document.getElementById('modalProgressBar');
  document.getElementById('modalProgress').classList.remove('active');
  pb.style.width = '0%';
  document.getElementById('modalConfirmBtn').innerHTML = '<span>↓</span> Iniciar Download<span class="btn-shine"></span><span class="btn-glow"></span>';
  document.getElementById('modalConfirmBtn').disabled = false;
}
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
function startDownload() {
  const btn = document.getElementById('modalConfirmBtn');
  btn.disabled = true; btn.innerHTML = 'Baixando...<span class="btn-shine"></span><span class="btn-glow"></span>';
  document.getElementById('modalProgress').classList.add('active');
  const pb = document.getElementById('modalProgressBar');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 8 + 2;
    if (p >= 100) { p = 100; clearInterval(iv); btn.innerHTML = '✓ Concluído!<span class="btn-shine"></span><span class="btn-glow"></span>'; }
    pb.style.width = p + '%';
  }, 120);
}

/* PARTICLES */
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize(); window.addEventListener('resize', resize);
const COLORS = ['rgba(128,14,19,0.5)','rgba(127,85,57,0.4)','rgba(196,154,108,0.35)','rgba(164,74,63,0.3)'];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * 1920, y: Math.random() * 1080,
    vx: (Math.random() - 0.5) * 0.18, vy: -Math.random() * 0.25 - 0.05,
    r: Math.random() * 1.8 + 0.4,
    c: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: Math.random()
  });
}
function animParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.life += 0.003;
    if (p.y < -10 || p.life > 1) {
      p.y = H + 10; p.x = Math.random() * W; p.life = 0;
    }
    const alpha = Math.sin(p.life * Math.PI);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c.replace(/[\d.]+\)$/, (alpha * 0.6) + ')');
    ctx.fill();
  });
  requestAnimationFrame(animParticles);
}
animParticles();

/* HAMBURGER */
document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('open');
});