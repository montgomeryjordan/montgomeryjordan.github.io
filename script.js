/* ═══════════════════════════════════════════════════════════════════
   Montgomery Jordan — Personal Site JS
   ═══════════════════════════════════════════════════════════════════ */

// ─── THEME ────────────────────────────────────────────────────────
const html       = document.documentElement;
const toggleIcon = document.getElementById('toggleIcon');

const saved = localStorage.getItem('theme');
if (saved) { html.setAttribute('data-theme', saved); updateIcon(saved); }

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
}
function updateIcon(theme) {
  if (toggleIcon) toggleIcon.textContent = theme === 'dark' ? '☀' : '☾';
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (progressBar) progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// ─── CURSOR GLOW ──────────────────────────────────────────────────
const glow = document.getElementById('cursorGlow');
let glowVisible = false;
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    if (!glowVisible) { glow.style.opacity = '1'; glowVisible = true; }
  }, { passive: true });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; glowVisible = false; });
}

// ─── TYPED TEXT ───────────────────────────────────────────────────
const roles  = ['Full-Stack Developer', 'UI/UX Designer', 'Product Builder', 'Open Source Contributor'];
const target = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function tick() {
  if (!target) return;
  const word = roles[roleIdx];
  if (!deleting) {
    target.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    setTimeout(tick, 68);
  } else {
    target.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(tick, 300); return; }
    setTimeout(tick, 36);
  }
}
setTimeout(tick, 900);

// ─── HERO REVEAL (handled by CSS animation) ───────────────────────
// .hero-reveal elements use CSS animation-delay via --d custom prop.

// ─── SCROLL REVEAL ────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // stagger siblings
    const siblings = entry.target.parentElement.querySelectorAll('.reveal-child');
    siblings.forEach((el, idx) => {
      if (el === entry.target) {
        setTimeout(() => el.classList.add('revealed'), idx * 80);
      }
    });
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-child').forEach(el => revealObserver.observe(el));

// ─── PROJECT SKELETON → GRID ───────────────────────────────────────
const skeleton    = document.getElementById('projectsSkeleton');
const projectsGrid = document.getElementById('projectsGrid');
setTimeout(() => {
  if (skeleton)     skeleton.style.display     = 'none';
  if (projectsGrid) projectsGrid.style.display = 'grid';
}, 700);

// ─── 3D CARD TILT ─────────────────────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 5}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── ACTIVE NAV + TOOLBAR BOUNCE ──────────────────────────────────
const sections     = document.querySelectorAll('section[id]');
const toolbarItems = document.querySelectorAll('.toolbar-item[href^="#"]');
let lastActive     = null;

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = '#' + entry.target.id;
    toolbarItems.forEach(item => {
      const isActive = item.getAttribute('href') === id;
      item.classList.toggle('active', isActive);
      if (isActive && item !== lastActive) {
        item.classList.remove('bounce');
        void item.offsetWidth; // reflow to restart animation
        item.classList.add('bounce');
        lastActive = item;
      }
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ─── TOAST ────────────────────────────────────────────────────────
function showToast(msg = 'Done!') {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── COPY EMAIL ───────────────────────────────────────────────────
function copyEmail() {
  const email = 'hello@montgomeryjordan.dev';
  navigator.clipboard.writeText(email).then(() => {
    showToast('Email copied to clipboard!');
    const btn = document.querySelector('.btn-ghost');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    btn.style.color = 'var(--badge-text)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const submit = form.querySelector('[type="submit"]');
  const orig   = submit.textContent;
  submit.textContent = 'Sending…';
  submit.disabled    = true;

  // Swap for real endpoint / EmailJS / Formspree
  setTimeout(() => {
    form.reset();
    submit.textContent = orig;
    submit.disabled    = false;
    showToast('Message sent! I\'ll be in touch soon.');
  }, 1200);
}

// ─── BACK TO TOP ──────────────────────────────────────────────────
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backBtn) backBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
