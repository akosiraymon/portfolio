// ---- Icon set (stroke-based, no emoji, consistent 1.75 stroke) ----
// Used for generic workflow-step concepts that aren't a single branded product.
const ICONS = {
  webhook: '<path d="M8.5 14.5 15 6.5"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17" cy="6.5" r="2.5"/><path d="M17 9a5 5 0 0 1-3.6 7.8"/>',
  filter: '<path d="M4 5h16M7 12h10M10.5 19h3"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 12h5M9.5 15.5h5"/>',
  bot: '<rect x="5" y="8.5" width="14" height="10" rx="2.5"/><path d="M12 8.5V5.5M9 6.5h6"/><circle cx="9.3" cy="13.3" r="1.1"/><circle cx="14.7" cy="13.3" r="1.1"/><path d="M9.5 16.3h5"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z"/>',
  branch: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 8v8M8 6h4a4 4 0 0 1 4 4"/>',
  chat: '<path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.6 2.6L16.5 9"/>',
  repeat: '<path d="M4 8.5h11a4 4 0 0 1 4 4v1"/><path d="M20 15.5H9a4 4 0 0 1-4-4v-1"/><path d="M12.5 5.5 15 8.5l-2.5 3M11.5 18.5 9 15.5l2.5-3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  form: '<rect x="4.5" y="3.5" width="15" height="17" rx="2"/><path d="M8 8.5h8M8 12h8M8 15.5h5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>',
  phone: '<path d="M6 3.5h5l1.5 4-2.3 2.3a12 12 0 0 0 5.5 5.5l2.3-2.3 4 1.5v5c0 1-.9 1.8-1.9 1.7C11.4 20.7 3.3 12.6 2.8 3.9 2.7 2.9 3.5 2 4.5 2Z" />',
};

function iconSvg(name) {
  return `<svg class="node-icon" viewBox="0 0 24 24">${ICONS[name] || ICONS.globe}</svg>`;
}

// Real brand marks that the Simple Icons CDN won't serve under their brand
// guidelines (Slack, LinkedIn), embedded directly as static vector data instead,
// so no network request is needed and the shape is never in question.
const VECTOR_LOGOS = {
  slack: '<path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>',
  linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
};

// ---- Real brand logos (Simple Icons CDN, or embedded vector data above) ----
// Each entry: { name, slug, hex, fallback }. Name is the display label, hex tints
// the mark to its brand color, fallback is a generic ICONS key used only if a CDN
// image genuinely fails to load.
const BRANDS = {
  n8n: { name: 'n8n', slug: 'n8n', hex: 'EA4B71', fallback: 'webhook' },
  zapier: { name: 'Zapier', slug: 'zapier', hex: 'FF4A00', fallback: 'repeat' },
  make: { name: 'Make', slug: 'make', hex: '6D00CC', fallback: 'repeat' },
  slack: { name: 'Slack', hex: '4A154B', vector: 'slack' },
  gmail: { name: 'Gmail', slug: 'gmail', hex: 'EA4335', fallback: 'chat' },
  googlecalendar: { name: 'Google Calendar', slug: 'googlecalendar', hex: '4285F4', fallback: 'clock' },
  googlesheets: { name: 'Google Sheets', slug: 'googlesheets', hex: '34A853', fallback: 'form' },
  googledrive: { name: 'Google Drive', slug: 'googledrive', hex: 'FBBC05', fallback: 'form' },
  airtable: { name: 'Airtable', slug: 'airtable', hex: 'FCB400', fallback: 'form' },
  asana: { name: 'Asana', slug: 'asana', hex: 'F06A6A', fallback: 'check' },
  xero: { name: 'Xero', slug: 'xero', hex: '13B5EA', fallback: 'doc' },
  facebook: { name: 'Facebook', slug: 'facebook', hex: '1877F2', fallback: 'chat' },
  linkedin: { name: 'LinkedIn', hex: '0A66C2', vector: 'linkedin' },
  openai: { name: 'OpenAI', slug: 'openai', hex: '412991', fallback: 'bot' },
  hubspot: { name: 'HubSpot', slug: 'hubspot', hex: 'FF7A59', fallback: 'database' },
  gemini: { name: 'Google Gemini', slug: 'googlegemini', hex: '8E75B2', fallback: 'bot' },
};

// Maps generic modal-diagram step keys to a real brand logo, where one clearly applies.
const STEP_BRAND_MAP = {
  calendar: 'googlecalendar',
  mail: 'gmail',
  drive: 'googledrive',
  sheet: 'googlesheets',
  slack: 'slack',
  receipt: 'xero',
  database: 'airtable',
  hubspot: 'hubspot',
  gemini: 'gemini',
};

function brandImg(brandKey, size) {
  const b = BRANDS[brandKey];
  if (!b) return '';
  const px = size || 20;
  if (b.vector) {
    return `<svg class="brand-logo brand-svg" viewBox="0 0 24 24" width="${px}" height="${px}" fill="#${b.hex}" role="img" aria-label="${b.name}">${VECTOR_LOGOS[b.vector]}</svg>`;
  }
  return `<img class="brand-logo" src="https://cdn.simpleicons.org/${b.slug}/${b.hex}" alt="${b.name}" width="${px}" height="${px}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{innerHTML:iconSvg('${b.fallback}')}).firstChild)" />`;
}

// Renders a workflow-step icon: real brand logo if mapped, generic glyph otherwise.
function stepIcon(stepKey) {
  const brandKey = STEP_BRAND_MAP[stepKey];
  return brandKey ? brandImg(brandKey, 22) : iconSvg(stepKey);
}

// ---- Hero "tools used" marquee ----
const TOOLS_MARQUEE = ['n8n', 'zapier', 'make', 'slack', 'gmail', 'googlecalendar', 'googlesheets', 'googledrive', 'airtable', 'asana', 'xero', 'openai', 'facebook', 'linkedin'];

// ---- Projects ----
const PROJECTS = [
  {
    id: 'ai-lead-qualification-crm',
    image: '/assets/projects/ai-lead-qualification-workflow.png',
    gallery: [
      {
        src: '/assets/projects/ai-lead-qualification-workflow.png',
        alt: 'n8n workflow for AI-powered lead qualification and CRM follow-up',
        caption: 'The production workflow validates, qualifies, enriches, responds, and alerts.',
      },
      {
        src: '/assets/projects/ai-lead-qualification-overview.png',
        alt: 'Lead capture, HubSpot enrichment, and Slack sales alert overview',
        caption: 'From enquiry to a sales-ready lead record in seconds.',
      },
    ],
    title: 'AI-Powered Lead Qualification & CRM Follow-Up System',
    stack: 'n8n / HubSpot / Google Gemini / Gmail / Slack',
    logos: ['n8n', 'hubspot', 'gemini', 'gmail', 'slack'],
    summary: 'Qualifies inbound leads, enriches HubSpot, replies instantly, and alerts sales about high-priority opportunities.',
    problem: 'Service businesses often receive enquiries through forms but still review, qualify, enter, and follow up with every lead manually. That creates slow response times, inconsistent CRM data, missed high-value prospects, and unnecessary work.',
    solution: 'Built an automated lead-processing system that validates each submission, filters spam and duplicates, creates or updates the HubSpot contact, applies a deterministic qualification score, and uses Gemini to interpret and summarize the enquiry. The workflow then updates HubSpot with the score and context, sends an immediate confirmation email, and alerts the sales team in Slack when a lead needs fast attention.',
    outcome: 'Leads are captured, qualified, enriched, responded to, and delivered to sales in seconds instead of hours.',
    impact: [
      'Faster response to new enquiries',
      'Less manual CRM data entry',
      'Consistent, auditable lead qualification',
      'High-value opportunities surfaced immediately',
      'Cleaner customer records with richer context',
      'Instant confirmation for every prospect',
    ],
    rationale: 'The core lead score uses deterministic JavaScript rules so every qualification decision stays predictable, auditable, and under business control. Gemini interprets and summarizes the enquiry, but it does not decide the lead priority.',
    flow: ['form', 'filter', 'hubspot', 'gemini', 'mail', 'slack'],
  },
  {
    id: 'voice-receptionist',
    image: '/assets/projects/voice-receptionist.webp',
    title: 'AI Voice Receptionist & Appointment Scheduling',
    stack: 'n8n / Vapi / Google Calendar / Airtable',
    logos: ['n8n', 'googlecalendar', 'airtable'],
    summary: 'A voice agent that books, checks, and cancels appointments over the phone.',
    problem: 'Small service businesses lose bookings when no one is free to pick up the phone, and manual scheduling means double-bookings and back-and-forth calls.',
    solution: 'Built a voice AI receptionist backend in n8n with four webhook-based tools (get/book/update/cancel appointment slots) that a voice agent calls mid-conversation. It checks real-time availability against Google Calendar and keeps Airtable in sync with every booking, reschedule, and cancellation, including timezone handling.',
    outcome: 'Callers can book, look up, reschedule, or cancel an appointment without waiting for a human to answer.',
    impact: [
      '24/7 appointment booking without requiring front-desk availability',
      'Fewer missed booking opportunities from unanswered phone calls',
      'Reduced administrative workload from manual scheduling and follow-ups',
      'Fewer double-bookings through real-time calendar availability checks',
      'More scalable appointment handling without increasing staffing requirements',
    ],
    flow: ['phone', 'webhook', 'calendar', 'database', 'check'],
  },
  {
    id: 'fb-support-agent',
    image: '/assets/projects/fb-support-agent.webp',
    title: 'AI Facebook Page Customer Support Agent',
    stack: 'n8n / Google Gemini / Webhooks',
    logos: ['n8n', 'facebook'],
    summary: 'Answers Facebook Page messages automatically using a live FAQ doc as context.',
    problem: 'Monitoring Facebook Page messages all day is tedious, and simple repeated questions (hours, pricing, location) shouldn\'t need a person every time.',
    solution: 'A webhook-triggered n8n chatbot picks up incoming Page messages, reads a Google Doc as a live FAQ source, and uses Google Gemini with basic memory to keep replies consistent across a conversation.',
    outcome: 'Common questions get an instant, on-brand reply, and the FAQ doc can be edited without touching the workflow.',
    impact: [
      'Near-instant responses that reduce wait time and improve the customer experience',
      'Less repetitive support work through automated answers from the business FAQ',
      'More consistent, accurate responses grounded in a centralized Google Docs FAQ',
      'Scalable Facebook support without increasing the team\'s workload',
      'Conversation context maintained across messages for a more natural experience',
      'Less constant Page monitoring so staff can focus on inquiries requiring human judgment',
    ],
    flow: ['webhook', 'filter', 'doc', 'bot', 'chat'],
  },
  {
    id: 'job-application-automation',
    image: '/assets/projects/job-application.webp',
    title: 'AI Job Application Automation',
    stack: 'n8n / Slack / OpenRouter / Gmail',
    logos: ['n8n', 'slack', 'gmail'],
    summary: 'Turns a Slack message into a tailored resume and a ready-to-send email draft.',
    problem: 'Rewriting a resume for every job posting is repetitive and eats time that could go toward actually applying.',
    solution: 'A Slack-triggered workflow takes a job search query, pulls matching listings via API, and uses an OpenRouter LLM with a structured output parser to tailor resume content to each posting. It then handles the copy, edits, and a Gmail draft automatically.',
    outcome: 'Typical prep time per application dropped from around 30 minutes to a couple of minutes.',
    flow: ['slack', 'search', 'bot', 'drive', 'mail'],
  },
  {
    id: 'xero-asana-sheets',
    image: '/assets/projects/xero-asana-sheets.webp',
    title: 'Xero Financial Export → Asana & Sheets Sync',
    stack: 'Make / Xero API / Asana / Google Sheets',
    logos: ['make', 'xero', 'asana', 'googlesheets'],
    summary: 'Keeps finance records updated automatically when a task is marked done.',
    problem: 'Finance teams were manually pulling transaction data into spreadsheets every week. It was an easy step to forget and easy to get wrong.',
    solution: 'Watches for completed tasks in Asana, pulls transaction data from Xero via API, then splits the data down two paths: one logs each row to Google Sheets, the other builds a summary report attached back to the Asana task.',
    outcome: 'The finance team gets updated records without opening a spreadsheet themselves.',
    flow: ['branch', 'globe', 'sheet', 'receipt'],
  },
  {
    id: 'gmail-attachment-sorter',
    image: '/assets/projects/gmail-attachment-sorter.webp',
    title: 'Gmail Attachment Sorter & Logger',
    stack: 'Make / Gmail / Google Drive / Sheets / AI',
    logos: ['make', 'gmail', 'googledrive', 'googlesheets'],
    summary: 'Renames and files email attachments without anyone touching them.',
    problem: 'Incoming files from clients tend to land with unhelpful names ("scan001.pdf") and pile up unsorted in an inbox.',
    solution: 'Watches Gmail for new emails with attachments, uses AI to look at each file and suggest a clearer filename, then saves it to the right Google Drive folder and logs the entry in Google Sheets.',
    outcome: 'Files end up named and filed correctly, with a confirmation email and a paper trail in Sheets.',
    flow: ['mail', 'bot', 'drive', 'sheet'],
  },
  {
    id: 'content-repurposing',
    image: '/assets/projects/content-repurposing.webp',
    title: 'Automated Content Repurposing & Publishing',
    stack: 'Zapier / Google Drive / Facebook / LinkedIn',
    logos: ['zapier', 'googledrive', 'facebook', 'linkedin'],
    summary: 'One video upload becomes a blog post and two social posts.',
    problem: 'Turning a single recorded video or audio clip into written content for multiple platforms is repetitive, manual work that often gets skipped.',
    solution: 'Triggers on new media uploads to Google Drive, uses AI to transcribe the file and draft a blog post from it, then publishes to Facebook Page and LinkedIn in parallel using separate formatting per platform.',
    outcome: 'One upload starts the whole publishing pipeline instead of hours of manual repurposing.',
    flow: ['drive', 'bot', 'branch', 'chat'],
  },
  {
    id: 'asana-lead-followup',
    image: '/assets/projects/asana-lead-followup.webp',
    title: 'Asana CRM Lead Engagement & Follow-Up',
    stack: 'Zapier / Asana / Gmail / Google Drive',
    logos: ['zapier', 'asana', 'gmail', 'googledrive'],
    summary: 'Routes leads through the right follow-up email automatically as their status changes.',
    problem: 'Sales follow-ups slip through the cracks when they depend on someone remembering to send the next email at the right time.',
    solution: 'Triggers on any Asana task status change and routes the lead through five follow-up paths (Ready to Start, No Response, Quoted, Approved, Paid & Closed), sending the right email at the right time with built-in delays, and creating Drive folders for approved deals.',
    outcome: 'A lead can move from first contact to closed deal with no manual follow-up step.',
    flow: ['branch', 'clock', 'mail', 'drive'],
  },
  {
    id: 'lead-enrichment-routing',
    image: '/assets/projects/lead-enrichment.webp',
    title: 'Lead Enrichment & Sales Routing',
    stack: 'Zapier / Apollo.io / Slack / Gmail',
    logos: ['zapier', 'slack', 'gmail'],
    summary: 'Scores and routes new leads the moment they submit a form.',
    problem: 'Not every inbound lead deserves the same amount of attention right away, but figuring out which ones matter most usually happens manually, after the fact.',
    solution: 'Captures new form submissions, enriches the lead with the Apollo.io API, then scores and splits them into High or Low priority: high-priority leads get logged to Sheets, a Slack alert, and an AI-drafted outreach email; low-priority leads get an automated Gmail notification.',
    outcome: 'A manual lead-qualification step turned into something close to real-time.',
    flow: ['form', 'target', 'branch', 'slack'],
  },
];
