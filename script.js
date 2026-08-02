// Change this to the real n8n Production Webhook URL once the workflow is activated.
const CONTACT_FORM_ENDPOINT = 'https://n8n-racastano.onrender.com/webhook/portfolio-contact';

document.getElementById('year').textContent = new Date().getFullYear();

// ===== Dark mode toggle =====
const themeToggle = document.getElementById('theme-toggle');
function isDark() { return document.documentElement.classList.contains('dark'); }
function setTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  themeToggle.setAttribute('aria-pressed', String(dark));
}
themeToggle.addEventListener('click', () => setTheme(!isDark()));
themeToggle.setAttribute('aria-pressed', String(isDark()));

// ===== Mobile navigation =====
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
if (menuToggle && primaryNav) {
  const closeMenu = () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// ===== Profile photo (falls back to initials if no file is present) =====
const heroAvatar = document.getElementById('hero-avatar');
(function tryLoadAvatar() {
  const candidates = ['profile.webp', 'profile.jpg', 'profile.png', 'profile.jpeg', 'photo.jpg', 'photo.png'];
  let i = 0;
  function tryNext() {
    if (i >= candidates.length) return; // keep initials fallback
    const img = new Image();
    img.onload = () => { heroAvatar.innerHTML = ''; heroAvatar.appendChild(img); };
    img.onerror = () => { i += 1; tryNext(); };
    img.alt = 'Raymon Castano';
    img.src = candidates[i];
  }
  tryNext();
})();

// ===== Scroll reveal (replays both scrolling down and back up) =====
const revealEls = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== Scroll progress bar + header hide/show on direction =====
const progressBar = document.getElementById('scroll-progress');
const siteHeader = document.getElementById('site-header');
let lastScrollY = window.scrollY;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

  if (y > lastScrollY && y > 120) {
    siteHeader.classList.add('header-hidden');
  } else {
    siteHeader.classList.remove('header-hidden');
  }
  lastScrollY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Hero parallax on scroll =====
const heroGrid = document.getElementById('hero-grid');
const heroSection = document.getElementById('hero');
if (heroGrid && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const rect = heroSection.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    heroGrid.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, { passive: true });
}

// ===== Mouse-tracking cursor + hero spotlight =====
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

if (supportsFinePointer && !prefersReducedMotion) {
  document.body.classList.add('has-custom-cursor');
  let ringX = window.innerWidth / 2, ringY = window.innerHeight / 2;
  let targetX = ringX, targetY = ringY;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX; targetY = e.clientY;
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorDot.classList.add('is-active');
    cursorRing.classList.add('is-active');
  });
  document.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('is-active');
    cursorRing.classList.remove('is-active');
  });
  document.querySelectorAll('a, button, .project-card, input, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

// Cursor-following glow across the whole page (fixed layer uses viewport coords)
const pageGlow = document.getElementById('page-glow');
if (pageGlow && supportsFinePointer && !prefersReducedMotion) {
  document.addEventListener('mousemove', (e) => {
    pageGlow.style.setProperty('--gx', `${e.clientX}px`);
    pageGlow.style.setProperty('--gy', `${e.clientY}px`);
    document.body.classList.add('glow-active');
  });
  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('glow-active');
  });
}

// ===== Hero tools marquee =====
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
  const items = TOOLS_MARQUEE.map((key) => {
    const b = BRANDS[key];
    return `<span class="marquee-item">${brandImg(key, 20)}${b.name}</span>`;
  }).join('');
  // duplicated once for a seamless CSS-driven loop
  marqueeTrack.innerHTML = items + items;
}

// ===== Project grid =====
const grid = document.getElementById('project-grid');
PROJECTS.forEach((project) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'project-card';
  card.setAttribute('data-reveal', '');
  card.innerHTML = `
    <div class="card-flow">${project.logos.map((key) => brandImg(key, 30)).join('')}</div>
    <h3>${project.title}</h3>
    <p class="card-summary">${project.summary}</p>
    <p class="card-proof"><strong>Result</strong><span>${project.outcome}</span></p>
    <p class="card-stack">${project.stack}</p>
  `;
  card.addEventListener('click', () => openProjectModal(project));
  grid.appendChild(card);
});

// Re-run reveal observer for dynamically added cards
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.project-card[data-reveal]').forEach((el) => cardObserver.observe(el));
} else {
  document.querySelectorAll('.project-card[data-reveal]').forEach((el) => el.classList.add('is-visible'));
}

// ===== Modal =====
const modalOverlay = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
let lastFocusedEl = null;

function buildFlowDiagram(flow) {
  const arrow = '<svg class="flow-arrow" viewBox="0 0 28 14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M2 7h20M17 2l6 5-6 5"/></svg>';
  return flow
    .map((icon, i) => {
      const node = `
        <div class="flow-node">
          <span class="node-icon-wrap">${stepIcon(icon)}</span>
          <span class="node-label">${icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
        </div>`;
      return i < flow.length - 1 ? node + arrow : node;
    })
    .join('');
}

function openProjectModal(project) {
  lastFocusedEl = document.activeElement;
  modalBody.innerHTML = `
    <span class="modal-stack">${project.stack}</span>
    <h3 id="modal-title">${project.title}</h3>
    <div class="flow-diagram">${buildFlowDiagram(project.flow)}</div>
    <div class="case-study">
      <section>
        <h4>The problem</h4>
        <p>${project.problem}</p>
      </section>
      <section>
        <h4>What I built</h4>
        <p>${project.solution}</p>
      </section>
      <section>
        <h4>Outcome</h4>
        <p>${project.outcome}</p>
      </section>
    </div>
  `;
  modalOverlay.hidden = false;
  requestAnimationFrame(() => modalOverlay.classList.add('is-open'));
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { modalOverlay.hidden = true; }, 240);
  if (lastFocusedEl) lastFocusedEl.focus();
}

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeProjectModal();
});

// ===== Contact form =====
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('cf-status');
const submitBtn = document.getElementById('cf-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form-status';
  submitBtn.disabled = true;

  const payload = {
    name: form.name.value.trim(),
    company: form.company.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch(CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Request failed');
    statusEl.textContent = "Thanks — I'll get back to you soon.";
    statusEl.className = 'form-status ok';
    form.reset();
  } catch (err) {
    statusEl.textContent = 'Something went wrong sending that. Please email me directly instead.';
    statusEl.className = 'form-status err';
  } finally {
    submitBtn.disabled = false;
  }
});
