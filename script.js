import { contactPayload, validateContact, sendContact, isLocalPreview } from './contact.js';

document.documentElement.classList.add('js');
const siteHeader = document.querySelector('.site-header');
const headerSentinel = document.querySelector('.header-sentinel');
new IntersectionObserver(([entry]) => siteHeader.classList.toggle('is-condensed', !entry.isIntersecting)).observe(headerSentinel);

const themeToggle = document.querySelector('.theme-toggle');
const themeFooter = document.querySelector('.theme-footer');
const themeColor = document.querySelector('meta[name="theme-color"]');
function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-checked', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeFooter.classList.toggle('is-dark', dark);
  themeColor.content = dark ? '#111715' : '#F7F6F2';
  dispatchEvent(new Event('themechange'));
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
  document.querySelectorAll('main>section[id]').forEach((section) => sectionObserver.observe(section));
}

const backToTop = document.querySelector('.back-to-top');
const backTopSentinel = document.querySelector('.back-top-sentinel');
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    backToTop.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(backTopSentinel);
}
backToTop.addEventListener('click', () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pageTop = document.querySelector('#top');
  backToTop.classList.add('is-traveling');
  scrollTo({top:0,behavior:reduced ? 'auto' : 'smooth'});
  if (reduced) {
    backToTop.classList.remove('is-traveling');
    pageTop.focus({preventScroll:true});
    return;
  }
  const started = performance.now();
  const finish = () => {
    if (scrollY > 2 && performance.now() - started < 1600) {
      requestAnimationFrame(finish);
      return;
    }
    backToTop.classList.remove('is-traveling');
    pageTop.focus({preventScroll:true});
  };
  requestAnimationFrame(finish);
});

const canvas = document.querySelector('.constellation-canvas');
const context = canvas.getContext('2d');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let constellationNodes = [];
let constellationFrame;
let previousFrame = performance.now();
let pointerNode = null;
let canvasWidth = 0;
let canvasHeight = 0;
let constellationColor = [15,118,110];
function accentRgb() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const hex = value.replace('#','');
  const normalized = hex.length === 3 ? [...hex].map((character) => character + character).join('') : hex;
  return [0,2,4].map((offset) => Number.parseInt(normalized.slice(offset,offset + 2),16));
}
function seedConstellation() {
  const smallScreen = canvasWidth < 700;
  const count = Math.min(smallScreen ? 36 : 58, Math.max(35,Math.round(canvasWidth * canvasHeight / 25000)));
  constellationNodes = Array.from({length:count}, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    return {x:Math.random() * canvasWidth,y:Math.random() * canvasHeight,vx:Math.cos(angle) * speed,vy:Math.sin(angle) * speed};
  });
}
function sizeConstellation() {
  const ratio = Math.min(devicePixelRatio || 1,2);
  canvasWidth = canvas.clientWidth;
  canvasHeight = canvas.clientHeight;
  canvas.width = Math.round(canvasWidth * ratio);
  canvas.height = Math.round(canvasHeight * ratio);
  context.setTransform(ratio,0,0,ratio,0,0);
  seedConstellation();
  drawConstellation(0);
}
function drawConstellation(delta) {
  context.clearRect(0,0,canvasWidth,canvasHeight);
  const [red,green,blue] = constellationColor;
  const reach = Math.min(canvasWidth,canvasHeight) * .3;
  for (const node of constellationNodes) {
    node.x += node.vx * delta;
    node.y += node.vy * delta;
    if (node.x <= 0 || node.x >= canvasWidth) {
      node.vx *= -1;
      node.x = Math.max(0,Math.min(canvasWidth,node.x));
    }
    if (node.y <= 0 || node.y >= canvasHeight) {
      node.vy *= -1;
      node.y = Math.max(0,Math.min(canvasHeight,node.y));
    }
  }
  const allNodes = pointerNode ? [...constellationNodes,pointerNode] : constellationNodes;
  for (let first = 0; first < allNodes.length; first += 1) {
    for (let second = first + 1; second < allNodes.length; second += 1) {
      const horizontal = allNodes[first].x - allNodes[second].x;
      const vertical = allNodes[first].y - allNodes[second].y;
      const distance = Math.hypot(horizontal,vertical);
      if (distance >= reach) continue;
      const strength = (1 - distance / reach) * .4;
      context.strokeStyle = `rgba(${red},${green},${blue},${strength})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(allNodes[first].x,allNodes[first].y);
      context.lineTo(allNodes[second].x,allNodes[second].y);
      context.stroke();
    }
  }
  context.fillStyle = `rgba(${red},${green},${blue},.72)`;
  for (const node of constellationNodes) {
    context.beginPath();
    context.arc(node.x,node.y,2,0,Math.PI * 2);
    context.fill();
  }
}
function animateConstellation(now) {
  const delta = Math.min((now - previousFrame) / 1000,.04);
  previousFrame = now;
  drawConstellation(delta);
  constellationFrame = requestAnimationFrame(animateConstellation);
}
function syncConstellationMotion() {
  cancelAnimationFrame(constellationFrame);
  previousFrame = performance.now();
  if (reducedMotion.matches) drawConstellation(0);
  else constellationFrame = requestAnimationFrame(animateConstellation);
}
addEventListener('resize',sizeConstellation,{passive:true});
addEventListener('pointermove',(event) => {pointerNode = {x:event.clientX,y:event.clientY,vx:0,vy:0};},{passive:true});
document.documentElement.addEventListener('pointerleave',() => {pointerNode = null;});
addEventListener('themechange',() => {
  constellationColor = accentRgb();
  drawConstellation(0);
});
reducedMotion.addEventListener('change',syncConstellationMotion);
constellationColor = accentRgb();
sizeConstellation();
syncConstellationMotion();

const zoomSection = document.querySelector('.project-zoom');
if (window.gsap && window.ScrollTrigger && zoomSection) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  let zoomMediaQuery;
  const zoomContext = window.gsap.context(() => {
    const media = zoomSection.querySelector('.zoom-media');
    const overlayTitle = zoomSection.querySelector('.zoom-overlay-title');
    zoomMediaQuery = window.gsap.matchMedia();
    zoomMediaQuery.add('(prefers-reduced-motion: no-preference)',() => {
      window.gsap.timeline({
        defaults:{ease:'power2.inOut'},
        scrollTrigger:{trigger:zoomSection,start:'top top',end:() => `+=${innerHeight * 1.5}`,pin:true,scrub:.5,invalidateOnRefresh:true},
      })
        .to(media,{scale:.6,borderRadius:44,duration:1},0)
        .to(overlayTitle,{autoAlpha:0,y:-24,duration:.4},0);
    });
    zoomMediaQuery.add('(prefers-reduced-motion: reduce)',() => {
      window.gsap.set(media,{scale:.6,borderRadius:44});
      window.gsap.set(overlayTitle,{autoAlpha:0,y:-24});
    });
  },zoomSection);
  addEventListener('pagehide',() => {
    zoomMediaQuery?.revert();
    zoomContext.revert();
  },{once:true});
}

const projectCursor = document.querySelector('.project-cursor');
const cursorEnabled = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
if (projectCursor && cursorEnabled.matches) {
  document.body.classList.add('cursor-enhanced');
  const cursorZones = document.querySelectorAll('.project-zoom,.featured-projects,.project-list');
  const cursorCards = document.querySelectorAll('[data-cursor="view"],.featured-projects .project,.project-list-item');
  cursorZones.forEach((zone) => {
    zone.addEventListener('pointerenter',() => projectCursor.classList.add('is-active'));
    zone.addEventListener('pointermove',(event) => {
      projectCursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    });
    zone.addEventListener('pointerleave',() => {
      projectCursor.classList.remove('is-active','is-view');
    });
  });
  cursorCards.forEach((card) => {
    card.addEventListener('pointerenter',() => projectCursor.classList.add('is-view'));
    card.addEventListener('pointerleave',() => projectCursor.classList.remove('is-view'));
  });
}

const footerBrands = document.querySelectorAll('.footer-theme-layer .site-footer .brand');
const footerBrandMotion = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
if (footerBrands.length && footerBrandMotion.matches) {
  let footerBrandFrame;
  addEventListener('pointermove',(event) => {
    cancelAnimationFrame(footerBrandFrame);
    footerBrandFrame = requestAnimationFrame(() => {
      footerBrands.forEach((brand) => {
        const bounds = brand.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2),event.clientY - (bounds.top + bounds.height / 2));
        const proximity = Math.max(0,1 - distance / 180);
        brand.style.setProperty('--footer-brand-scale',String(1 + proximity * .18));
      });
    });
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',() => {
    footerBrands.forEach((brand) => brand.style.removeProperty('--footer-brand-scale'));
  });
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
