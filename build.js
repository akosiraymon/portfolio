import { readFileSync, mkdirSync, cpSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { PROJECTS } from './data.js';

const root = dirname(fileURLToPath(import.meta.url));
const output = join(root, 'dist');
const manifest = JSON.parse(readFileSync(join(root, 'assets/image-manifest.json'), 'utf8'));
const featuredIds = ['ai-lead-qualification-crm', 'ai-lead-reactivation-appointments', 'voice-receptionist'];
const presentations = {
  'ai-lead-qualification-crm': {
    title: 'From new enquiry to sales-ready lead.', category: 'Lead qualification & CRM',
    summary: 'Manual lead reviews slow down the first response. I built a workflow that qualifies enquiries, enriches HubSpot, and alerts sales in Slack.',
    outcome: 'Capture, qualification, CRM updates, and follow-up in one connected workflow.',
  },
  'ai-lead-reactivation-appointments': {
    title: 'Give old leads a next step.', category: 'Lead reactivation & scheduling',
    summary: 'Forgotten leads and back-and-forth scheduling create more admin. I connected email replies to booking, rescheduling, and cancellation.',
    outcome: 'The full appointment journey, kept in sync across email, lead records, and Google Calendar.',
  },
  'voice-receptionist': {
    title: 'A first response. Even when you’re busy.', category: 'Voice AI & appointment booking',
    summary: 'Unanswered calls can mean missed bookings. I built a voice receptionist backend that checks availability and manages appointments.',
    outcome: 'Callers can book, reschedule, or cancel without waiting for a person to pick up.',
  },
};
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const arrow = '<span aria-hidden="true">↗</span>';
function imageMarkup(source, alt, sizes = '(max-width: 700px) 90vw, 560px') {
  const asset = manifest[source];
  if (!asset) throw new Error(`Missing optimized asset: ${source}`);
  return `<img src="${asset.preview}" srcset="${asset.thumbnail} ${asset.thumbnailWidth}w, ${asset.preview} ${asset.width}w" sizes="${sizes}" alt="${escapeHtml(alt)}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async">`;
}
function projectCard(project, index) {
  const presentation = presentations[project.id];
  const target = `#case-${project.id}`;
  return `<article class="project"><a class="project-image" href="${target}" data-project="${project.id}" aria-label="View case study: ${escapeHtml(project.title)}">${imageMarkup(project.image, `${project.title} workflow`)}<span class="image-arrow" aria-hidden="true">↗</span></a><div class="project-content"><p class="project-meta"><span>${presentation.category}</span><span>0${index + 1}</span></p><h3><a href="${target}" data-project="${project.id}">${presentation.title}</a></h3><p class="project-summary">${presentation.summary}</p><p class="project-result"><strong>The result</strong>${presentation.outcome}</p><p class="project-stack">${escapeHtml(project.stack)}</p><a class="text-link" href="${target}" data-project="${project.id}">View case study ${arrow}<span class="sr-only">: ${escapeHtml(project.title)}</span></a></div></article>`;
}
function caseSections(project) {
  return `<div class="case-sections"><section><h3>The problem</h3><p>${escapeHtml(project.problem)}</p></section><section><h3>What I built</h3><p>${escapeHtml(project.solution)}</p></section><section><h3>Outcome</h3><p>${escapeHtml(project.outcome)}</p></section>${project.rationale ? `<section><h3>Why rule-based qualification?</h3><p>${escapeHtml(project.rationale)}</p></section>` : ''}</div>`;
}
function projectDialog(project) {
  const gallery = project.gallery || [{src:project.image, alt:`${project.title} workflow`}];
  return `<dialog id="dialog-${project.id}" data-case="${project.id}" aria-labelledby="title-${project.id}"><div class="dialog-toolbar"><p>INDEPENDENT PORTFOLIO PROJECT</p><button class="dialog-close" type="button" autofocus>Close <span aria-hidden="true">×</span></button></div><div class="dialog-content"><h2 id="title-${project.id}">${escapeHtml(project.title)}</h2><p class="dialog-stack">${escapeHtml(project.stack)}</p>${caseSections(project)}<div class="case-gallery">${gallery.map((item) => `<figure>${imageMarkup(item.src,item.alt,'(max-width: 700px) 85vw, 800px')}<figcaption>${escapeHtml(item.caption || 'Workflow overview.')}<br><a href="${item.src}" target="_blank" rel="noopener noreferrer">Open full-size image ${arrow}<span class="sr-only">: ${escapeHtml(item.title || item.alt)} (opens in a new tab)</span></a></figcaption></figure>`).join('')}</div><div class="dialog-contact"><a class="text-link" href="#contact" data-dialog-contact>Have a similar process? Let’s talk ${arrow}</a></div></div></dialog>`;
}
export function build() {
  mkdirSync(output, {recursive:true});
  const vendor = join(output,'vendor');
  mkdirSync(vendor,{recursive:true});
  cpSync(join(root,'node_modules/gsap/dist/gsap.min.js'),join(vendor,'gsap.min.js'));
  cpSync(join(root,'node_modules/gsap/dist/ScrollTrigger.min.js'),join(vendor,'ScrollTrigger.min.js'));
  const featured = featuredIds.map((id) => PROJECTS.find((project) => project.id === id));
  const remaining = PROJECTS.filter((project) => !featuredIds.includes(project.id));
  let html = readFileSync(join(root,'index.html'),'utf8');
  const toolAliases = {'Gemini AI':'Google Gemini', Sheets:'Google Sheets'};
  const projectTools = [...new Set(PROJECTS.flatMap((project) => project.stack.split(' / ').map((tool) => toolAliases[tool] || tool)))];
  const toolItems = projectTools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join('');
  html = html.replace('<!-- PROJECT_TOOLS -->', `<ul aria-label="Tools used in these projects">${toolItems}</ul><ul aria-hidden="true" class="tool-copy">${toolItems}</ul>`);
  html = html.replace('<!-- FEATURED_PROJECTS -->', featured.map(projectCard).join('\n'));
  html = html.replace('<!-- MORE_PROJECTS -->', remaining.map((project,index) => `<article class="project-list-item"><span>${String(index+4).padStart(2,'0')}</span><div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p></div><a class="text-link" href="#case-${project.id}" data-project="${project.id}">View project ${arrow}<span class="sr-only">: ${escapeHtml(project.title)}</span></a></article>`).join('\n'));
  html = html.replace('<!-- PROJECT_DIALOGS -->', PROJECTS.map(projectDialog).join('\n'));
  html = html.replace('<!-- PROJECT_FALLBACKS -->', PROJECTS.map((project) => `<article id="case-${project.id}" class="section"><h3>${escapeHtml(project.title)}</h3>${caseSections(project)}<a class="text-link" href="${project.image}">View workflow image ${arrow}</a></article>`).join('\n'));
  html = html.replace('<!-- YEAR -->', new Date().getFullYear());
  writeFileSync(join(output,'index.html'),html);
  for (const file of ['style.css','script.js','contact.js','profile.webp','legacy.js','robots.txt','sitemap.xml']) cpSync(join(root,file),join(output,file));
  for (const directory of ['assets','about','services','work','contact']) cpSync(join(root,directory),join(output,directory),{recursive:true});
  console.log(`Built ${PROJECTS.length} case studies into dist/`);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) build();
