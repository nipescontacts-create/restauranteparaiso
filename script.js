/* === SPLASH 3s === */
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 800);
    }
  }, 3000);
});

/* === Year === */
document.getElementById('year').textContent = new Date().getFullYear();

/* === Nav toggle (mobile) === */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* === Reveal on scroll === */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* === Parallax slide-up: cards rise smoothly while scrolling === */
const cards = document.querySelectorAll('.bgblue');
let ticking = false;
function parallax() {
  const vh = window.innerHeight;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.bottom < -50 || rect.top > vh + 50) return;
    // Position from center of viewport
    const center = rect.top + rect.height / 2;
    const offset = (center - vh / 2) / vh; // -0.5 .. 0.5 approx
    const translate = offset * -18; // px
    card.style.setProperty('transform', `translateY(${translate}px)`);
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(parallax);
    ticking = true;
  }
}, { passive: true });

/* Reset transform when card becomes "in" so reveal animation can run, then resume parallax */
const resetIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transform = '';
    }
  });
}, { threshold: 0.05 });
cards.forEach(c => resetIo.observe(c));

/* === Cookie === */
const cookie = document.getElementById('cookie');
if (localStorage.getItem('cookie-choice')) {
  cookie.style.display = 'none';
}
cookie.querySelectorAll('[data-cookie]').forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('cookie-choice', btn.dataset.cookie);
    cookie.classList.add('hide');
    setTimeout(() => cookie.remove(), 500);
  });
});

/* === Nav active link highlight === */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const navIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--neon)' : '';
        a.style.textShadow = a.getAttribute('href') === `#${id}` ? 'var(--neon-glow-soft)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navIo.observe(s));
