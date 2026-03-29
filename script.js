// ─── THEME TOGGLE ─────────────────────────────────────────────────
const html = document.documentElement;
const toggleIcon = document.getElementById('toggleIcon');

// Persist preference
const saved = localStorage.getItem('theme');
if (saved) {
  html.setAttribute('data-theme', saved);
  updateIcon(saved);
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
}

function updateIcon(theme) {
  if (!toggleIcon) return;
  toggleIcon.textContent = theme === 'dark' ? '☀' : '☾';
}

// ─── COPY EMAIL ────────────────────────────────────────────────────
function copyEmail() {
  const email = 'hello@montgomeryjordan.dev';
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.querySelector('.btn-ghost');
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    btn.style.color = 'var(--badge-text)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.color = '';
    }, 2000);
  });
}

// ─── CONTACT FORM ──────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('form-success');

  // Disable submit while "sending"
  const submit = form.querySelector('[type="submit"]');
  const original = submit.textContent;
  submit.textContent = 'Sending…';
  submit.disabled = true;

  // Simulate async send (swap for a real endpoint / EmailJS / Formspree)
  setTimeout(() => {
    form.reset();
    submit.textContent = original;
    submit.disabled = false;
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 4000);
  }, 1200);
}

// ─── SMOOTH ACTIVE NAV ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
