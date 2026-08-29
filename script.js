// Production n8n webhook for portfolio contact submissions.
const CONTACT_FORM_ENDPOINT = 'https://n8n-fbbj.srv1906418.hstgr.cloud/webhook/portfolio-contact';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Dark mode toggle =====
const themeToggle = document.getElementById('theme-toggle');
function isDark() { return document.documentElement.classList.contains('dark'); }
function setTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  if (themeToggle) themeToggle.setAttribute('aria-pressed', String(dark));
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => setTheme(!isDark()));
  themeToggle.setAttribute('aria-pressed', String(isDark()));
}

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
if (heroAvatar) (function tryLoadAvatar() {
  const candidates = ['/profile.webp', '/profile.jpg', '/profile.png', '/profile.jpeg', '/photo.jpg', '/photo.png'];
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
  if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

  if (siteHeader && y > lastScrollY && y > 120) {
    siteHeader.classList.add('header-hidden');
  } else if (siteHeader) {
    siteHeader.classList.remove('header-hidden');
  }
  lastScrollY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Hero parallax on scroll =====
const heroGrid = document.getElementById('hero-grid');
const heroSection = document.getElementById('hero');
if (heroGrid && heroSection && !prefersReducedMotion) {
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
if (grid && typeof PROJECTS !== 'undefined') {
const projectLimit = Number(grid.dataset.limit || PROJECTS.length);
PROJECTS.slice(0, projectLimit).forEach((project) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'project-card magnify-panel';
  card.setAttribute('data-reveal', '');
  card.setAttribute('data-magnify', '');
  card.innerHTML = `
    <div class="project-preview">
      <img src="${project.image}" alt="${project.title} workflow" loading="lazy" decoding="async">
    </div>
    <div class="card-flow">${project.logos.map((key) => brandImg(key, 30)).join('')}</div>
    <h3>${project.title}</h3>
    <p class="card-summary">${project.summary}</p>
    <p class="card-proof"><strong>Result</strong><span>${project.outcome}</span></p>
    <p class="card-stack">${project.stack}</p>
  `;
  card.addEventListener('click', () => openProjectModal(project));
  grid.appendChild(card);
});
}

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

// ===== Cursor-position magnification for content surfaces =====
if (supportsFinePointer && !prefersReducedMotion) {
  document.querySelectorAll('[data-magnify]').forEach((surface) => {
    const setLensPosition = (event) => {
      const rect = surface.getBoundingClientRect();
      const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
      surface.style.setProperty('--lens-x', `${x}px`);
      surface.style.setProperty('--lens-y', `${y}px`);
      surface.classList.add('is-magnifying');
      if (cursorRing) cursorRing.classList.add('is-hovering');
    };

    surface.addEventListener('pointerenter', (event) => {
      setLensPosition(event);
    });
    surface.addEventListener('pointermove', setLensPosition);
    surface.addEventListener('pointerleave', () => {
      surface.classList.remove('is-magnifying');
      if (cursorRing) cursorRing.classList.remove('is-hovering');
    });
    surface.addEventListener('focusin', () => {
      surface.style.setProperty('--lens-x', '50%');
      surface.style.setProperty('--lens-y', '50%');
    });
  });
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
  if (!modalOverlay || !modalBody || !modalClose) return;
  lastFocusedEl = document.activeElement;
  const gallery = project.gallery || [{
    src: project.image,
    alt: `${project.title} workflow diagram`,
    caption: '',
  }];
  const galleryMarkup = gallery.map((item) => `
    <figure class="modal-preview">
      <img src="${item.src}" alt="${item.alt}" loading="eager" decoding="async">
      ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ''}
    </figure>
  `).join('');
  const impactMarkup = project.impact ? `
    <section class="case-impact">
      <h4>Business impact</h4>
      <ul>${project.impact.map((item) => `<li>${item}</li>`).join('')}</ul>
    </section>
  ` : '';
  const rationaleMarkup = project.rationale ? `
    <section class="case-rationale">
      <h4>Why rule-based scoring instead of AI scoring?</h4>
      <p>${project.rationale}</p>
    </section>
  ` : '';
  modalBody.innerHTML = `
    <span class="modal-stack">${project.stack}</span>
    <h3 id="modal-title">${project.title}</h3>
    <div class="modal-gallery">${galleryMarkup}</div>
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
      ${impactMarkup}
      ${rationaleMarkup}
    </div>
  `;
  modalOverlay.hidden = false;
  requestAnimationFrame(() => modalOverlay.classList.add('is-open'));
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { modalOverlay.hidden = true; }, 240);
  if (lastFocusedEl) lastFocusedEl.focus();
}

if (modalClose && modalOverlay) {
  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.hidden) closeProjectModal();
  });
}

// ===== Contact form =====
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('cf-status');
const submitBtn = document.getElementById('cf-submit');

if (form && statusEl && submitBtn) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  if (!form.checkValidity()) {
    form.reportValidity();
    statusEl.textContent = 'Please complete the required fields.';
    statusEl.className = 'form-status err';
    return;
  }

  submitBtn.disabled = true;

  const payload = {
    name: form.name.value.trim(),
    company: form.company.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim(),
    website: form.website.value.trim(),
  };

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(result.message || 'Request failed');
    statusEl.textContent = "Thanks. I'll get back to you soon.";
    statusEl.className = 'form-status ok';
    form.reset();
  } catch (err) {
    statusEl.textContent = err.name === 'AbortError'
      ? 'Sending took too long. Please try again.'
      : err.message || 'Something went wrong sending that. Please email me directly instead.';
    statusEl.className = 'form-status err';
  } finally {
    window.clearTimeout(timeoutId);
    submitBtn.disabled = false;
  }
});
