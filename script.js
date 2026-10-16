import { contactPayload, validateContact, sendContact, isLocalPreview } from './contact.js';

document.documentElement.classList.add('js');
const siteHeader = document.querySelector('.site-header');
const headerSentinel = document.querySelector('.header-sentinel');
new IntersectionObserver(([entry]) => siteHeader.classList.toggle('is-condensed', !entry.isIntersecting)).observe(headerSentinel);

const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeColor.content = dark ? '#111715' : '#F7F6F2';
}
syncThemeButton();
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('portfolio-theme', nextTheme);
  syncThemeButton();
});

const toolStrip = document.querySelector('.tool-strip');
const toolsPause = document.querySelector('.tools-pause');
toolsPause.hidden = false;
toolsPause.addEventListener('click', () => {
  const paused = toolStrip.classList.toggle('is-paused');
  toolsPause.setAttribute('aria-pressed', String(paused));
  toolsPause.textContent = paused ? 'Resume tools' : 'Pause tools';
});
const pointerMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
document.querySelectorAll('.hero-portrait, .project-image').forEach((surface) => {
  let frame;
  const reset = () => {
    cancelAnimationFrame(frame);
    surface.style.removeProperty('--pointer-x');
    surface.style.removeProperty('--pointer-y');
  };
  surface.addEventListener('pointermove', (event) => {
    if (!pointerMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 6}px`);
      surface.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 6}px`);
    });
  });
  surface.addEventListener('pointerleave', reset);
  pointerMotion.addEventListener('change', reset);
});
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const navLinks = document.querySelector('.nav-links');
const navIndicator = document.querySelector('.nav-indicator');
const indicatorBaseWidth = 48;
const curtainFooter = document.querySelector('.curtain-footer');
const contactCurtainIsFixed = () => getComputedStyle(curtainFooter).position === 'fixed';
function currentNavLink() {
  return navLinks.querySelector('a[aria-current="location"]');
}
function moveNavIndicator(link, visible = true) {
  if (!link || matchMedia('(max-width: 700px)').matches) {
    navIndicator.classList.remove('is-visible');
    return;
  }
  navIndicator.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth / indicatorBaseWidth})`;
  navIndicator.classList.toggle('is-visible', visible);
}
navLinks.addEventListener('pointerenter', (event) => {
  const link = event.target.closest('a');
  if (link) moveNavIndicator(link);
}, true);
navLinks.addEventListener('focusin', (event) => {
  const link = event.target.closest('a');
  if (link) moveNavIndicator(link);
});
navLinks.addEventListener('pointerleave', () => moveNavIndicator(currentNavLink(), Boolean(currentNavLink())));
navLinks.addEventListener('focusout', (event) => {
  if (!navLinks.contains(event.relatedTarget)) moveNavIndicator(currentNavLink(), Boolean(currentNavLink()));
});
window.addEventListener('resize', () => moveNavIndicator(currentNavLink(), Boolean(currentNavLink())));
function closeMenu(restoreFocus = false) {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Open menu');
  if (restoreFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open ? 'Close menu' : 'Open menu');
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link) {
    if (link.hash && link.origin === location.origin) {
      if (link.hash === '#contact' && contactCurtainIsFixed()) {
        event.preventDefault();
        if (location.hash !== '#contact') history.pushState(null,'','#contact');
        scrollTo({top:document.documentElement.scrollHeight,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
      }
      navLinks.querySelectorAll('a').forEach((item) => {
        if (item === link) item.setAttribute('aria-current','location');
        else item.removeAttribute('aria-current');
      });
      if (link.closest('.nav-links')) moveNavIndicator(link);
    }
    closeMenu();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
});
window.matchMedia('(min-width: 701px)').addEventListener('change', () => closeMenu());
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
        const sectionId = entry.target.dataset.section || entry.target.id;
        if (link.hash === `#${sectionId}`) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
      moveNavIndicator(currentNavLink(), Boolean(currentNavLink()));
    }
  }, {rootMargin:'-10% 0px -55% 0px'});
  document.querySelectorAll('main>section[id], .contact-marker').forEach((section) => sectionObserver.observe(section));
}
let contactScrollFrame;
window.addEventListener('scroll', () => {
  cancelAnimationFrame(contactScrollFrame);
  contactScrollFrame = requestAnimationFrame(() => {
    if (scrollY < document.documentElement.scrollHeight - innerHeight - 4) return;
    const contactLink = navLinks.querySelector('a[href="#contact"]');
    navLinks.querySelectorAll('a').forEach((link) => {
      if (link === contactLink) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    moveNavIndicator(contactLink);
  });
},{passive:true});
if (location.hash === '#contact' && contactCurtainIsFixed()) {
  const finishContactReveal = () => requestAnimationFrame(() => scrollTo(0,document.documentElement.scrollHeight));
  if (document.readyState === 'complete') finishContactReveal();
  else addEventListener('load',finishContactReveal,{once:true});
}

const dialogs = new Map([...document.querySelectorAll('dialog[data-case]')].map((dialog) => [dialog.dataset.case,dialog]));
let currentDialog = null;
let returnFocus = null;
let returnHash = '#work';
function closeVisibleDialog() {
  if (!currentDialog) return;
  currentDialog.close();
  currentDialog = null;
  document.body.classList.remove('dialog-open');
  if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
}
function syncProjectHash() {
  const projectId = location.hash.startsWith('#case-') ? location.hash.slice(6) : null;
  const dialog = dialogs.get(projectId);
  if (!dialog) {
    closeVisibleDialog();
    return;
  }
  if (currentDialog === dialog) return;
  closeVisibleDialog();
  const opener = document.querySelector(`[data-project="${projectId}"]`);
  const projectList = opener?.closest('details');
  if (projectList) projectList.open = true;
  if (!returnFocus || !returnFocus.matches(`[data-project="${projectId}"]`)) returnFocus = opener;
  currentDialog = dialog;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
}
function dismissProject() {
  if (history.state?.project) {
    history.back();
  } else {
    history.replaceState(null,'',`${location.pathname}${location.search}${returnHash}`);
    closeVisibleDialog();
  }
}
document.querySelectorAll('[data-project]').forEach((link) => {
  link.addEventListener('click',(event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    returnFocus = link;
    returnHash = location.hash.startsWith('#case-') ? '#work' : location.hash || '#work';
    history.pushState({project:true},'',link.getAttribute('href'));
    syncProjectHash();
  });
});
for (const dialog of dialogs.values()) {
  dialog.querySelector('.dialog-close').addEventListener('click',dismissProject);
  dialog.addEventListener('cancel',(event) => {event.preventDefault();dismissProject();});
  dialog.addEventListener('click',(event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dismissProject();
  });
  dialog.querySelector('[data-dialog-contact]').addEventListener('click',(event) => {
    event.preventDefault();
    closeVisibleDialog();
    history.replaceState(null,'',`${location.pathname}${location.search}#contact`);
    document.querySelector('#contact').scrollIntoView();
    document.querySelector('#cf-name').focus({preventScroll:true});
  });
}
window.addEventListener('popstate',syncProjectHash);
window.addEventListener('hashchange',syncProjectHash);
syncProjectHash();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#cf-status');
const submitButton = document.querySelector('#cf-submit');
submitButton.disabled = false;
const errorSummary = document.querySelector('#error-summary');
const local = isLocalPreview(location.hostname);
document.querySelector('#local-preview-note').hidden = !local;
let submitting = false;
function showErrors(errors) {
  for (const field of ['name','email']) {
    const input = form.elements.namedItem(field);
    document.querySelector(`#error-${field}`).textContent = errors[field] || '';
    if (errors[field]) input.setAttribute('aria-invalid','true');
    else input.removeAttribute('aria-invalid');
  }
  errorSummary.replaceChildren();
  errorSummary.hidden = !Object.keys(errors).length;
  if (errorSummary.hidden) return;
  const heading = document.createElement('strong');
  heading.textContent = 'Please check these details:';
  const list = document.createElement('ul');
  for (const [field,message] of Object.entries(errors)) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#cf-${field}`;
    link.textContent = message;
    link.addEventListener('click',(event) => {event.preventDefault();form.elements.namedItem(field).focus();});
    item.append(link);
    list.append(item);
  }
  errorSummary.append(heading,list);
}
form.addEventListener('input',() => {
  if (!errorSummary.hidden) showErrors(validateContact(contactPayload(Object.fromEntries(new FormData(form)))));
});
form.addEventListener('submit',async (event) => {
  event.preventDefault();
  if (submitting) return;
  status.textContent = '';
  status.removeAttribute('data-state');
  const payload = contactPayload(Object.fromEntries(new FormData(form)));
  const errors = validateContact(payload);
  showErrors(errors);
  if (Object.keys(errors).length) {errorSummary.focus();return;}
  submitting = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  form.setAttribute('aria-busy','true');
  status.textContent = local ? 'Simulating your message…' : 'Sending your message…';
  try {
    const result = await sendContact(payload,{hostname:location.hostname,scenario:new URLSearchParams(location.search).get('form-test') || 'success'});
    status.textContent = result.simulated ? 'Preview complete. Your message was not sent.' : 'Thanks for reaching out. I’ll reply personally by email.';
    status.dataset.state = 'success';
    form.reset();
  } catch (error) {
    status.textContent = error.name === 'AbortError' ? 'Sending took too long. Your details are still here—please try again, or email me directly.' : 'Your message could not be sent. Your details are still here—please try again, or email me directly.';
    status.dataset.state = 'error';
  } finally {
    submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = status.dataset.state === 'error' ? 'Try again ↗' : 'Send message ↗';
    form.removeAttribute('aria-busy');
  }
});
