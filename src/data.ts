import { Project, Service, Certification, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: "RA CASTANO",
  logoText: "RA CASTANO",
  title: "Automation Specialist · AI Workflow Engineer",
  email: "castanoraymon@gmail.com",
  phone: "(+63) 9164820241",
  location: "Manila, Philippines",
  linkedin: "linkedin.com/in/RAcastano",
  linkedinUrl: "https://linkedin.com/in/RAcastano",
  summary: "Automation Specialist with 4+ years of experience building no-code and AI-powered workflows for small businesses and growing teams. Proficient in Zapier, Make, n8n, and REST APIs. I help clients eliminate repetitive tasks, connect their tools, and build systems that run without them — saving hours of manual work every week."
};

export const SERVICES: Service[] = [
  {
    id: "workflow-automation",
    title: "End-to-End Workflow Automation",
    description: "Eliminate manual data entry and repetitive operations by connecting your apps into seamless pipelines that run 24/7.",
    iconName: "Cpu",
    bullets: [
      "Custom trigger-action workflow architecture on Zapier, Make, and n8n",
      "Multi-step, branching path setups for intricate business business logic",
      "Error-handling procedures, notification systems, and sleep delays for reliable data sync"
    ],
    tools: ["Zapier", "Make", "n8n", "Power Automate"]
  },
  {
    id: "ai-agents",
    title: "AI-Powered Agents & Chatbots",
    description: "Augment operations with smart LLMs capable of automated context-aware customer support, research, and dynamic copywriting.",
    iconName: "Bot",
    bullets: [
      "Google Gemini & OpenAI integration via webhooks to handle real-time queries",
      "Retrieval-Augmented Generation (RAG) using live documents as custom knowledge bases",
      "Structured output parsers that draft emails, categorize leads, and update CRM records"
    ],
    tools: ["Google Gemini", "OpenAI", "n8n", "OpenRouter", "AI by Zapier"]
  },
  {
    id: "api-integrations",
    title: "Custom REST API & Webhooks",
    description: "Connect specialized and legacy platforms that lack native integrations using secure HTTP endpoints.",
    iconName: "Webhook",
    bullets: [
      "Webhook receiver endpoints and advanced JSON payload structuring",
      "HTTP request setups to interface with third-party software APIs",
      "Robust data synchronization between CRMs, spreadsheets, and databases"
    ],
    tools: ["REST APIs", "Webhooks", "JSON Parser", "HTTP Client", "Xero API"]
  },
  {
    id: "crm-operations",
    title: "CRM & Lead Pipeline Systems",
    description: "Turn forms and cold-outreach replies into active sales loops without manual follow-up friction.",
    iconName: "Workflow",
    bullets: [
      "Lead enrichment using Apollo.io API and automated priority scoring",
      "Multi-stage automated follow-up sequences across Asana, HighLevel, and Gmail",
      "Internal team notifications via Slack or email on key deal milestones"
    ],
    tools: ["Asana", "Apollo.io", "Youform", "HighLevel", "Gmail", "Sheets"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "fb-gemini-support",
    title: "AI Facebook Page Customer Support Agent",
    subtitle: "n8n · Google Gemini · Webhooks · HTTP Request",
    description: "Built a webhook-triggered conversational chatbot that answers customer queries in real-time, pulling context from a dynamically updated knowledge repository.",
    bulletPoints: [
      "Built a webhook-triggered n8n chatbot that handles incoming Facebook Page messages automatically.",
      "Integrated Google Docs as a live FAQ knowledge base — AI reads it to generate accurate, context-aware replies.",
      "Used Google Gemini with simple memory so the bot maintains conversation context across messages.",
      "Eliminated the need for manual message monitoring, cutting response time to near-instant."
    ],
    workflow: [
      { label: "Facebook Message", type: "trigger", details: "Webhook trigger on incoming messenger chat" },
      { label: "n8n Webhook Listener", type: "api", details: "Captures payload and manages async response thread" },
      { label: "Google Docs FAQ", type: "file", details: "Pulls the live corporate knowledge-base context" },
      { label: "Google Gemini AI", type: "ai", details: "Generates context-aware, customized replies with flow history" },
      { label: "Facebook API Send", type: "action", details: "Instantly delivers reply back to customer chat" }
    ],
    stack: ["n8n", "Google Gemini", "Webhooks", "HTTP Request", "Google Docs", "Facebook Graph API"],
    imageUrl: "/src/assets/images/fb_gemini_support_1780933170285.png"
  },
  {
    id: "ai-job-apply",
    title: "AI Job Application Automation",
    subtitle: "n8n · Slack · Google Drive · OpenRouter · Gmail",
    description: "An automated pipeline that optimizes and drafts custom application sequences directly from a Slack user query.",
    bulletPoints: [
      "Built a Slack-triggered workflow where a user types a job search query and the system handles the rest.",
      "Automatically fetches job listings via API, matches them against a master resume in Google Drive.",
      "Uses OpenRouter LLM + Structured Output Parser to rewrite resume content tailored to each job posting.",
      "Automates resume duplication, content updates, Gmail draft creation, and Slack notification on completion.",
      "Reduced job application prep time from 30+ minutes per application to under 2 minutes."
    ],
    workflow: [
      { label: "Slack Command", type: "trigger", details: "Search query containing job title/preferences" },
      { label: "Job Fetch API", type: "api", details: "Pulls listings matching the search criteria" },
      { label: "Master Resume PDF", type: "file", details: "Reads source resume stored on Google Drive" },
      { label: "OpenRouter LLM", type: "ai", details: "Rewrites resume bullet-points to match job description keywords" },
      { label: "Gmail Draft & Slack", type: "email", details: "Creates draft email with customized resume attachment" }
    ],
    stack: ["n8n", "Slack App", "Google Drive", "OpenRouter", "Gmail API", "Structured JSON Parser"],
    imageUrl: "/src/assets/images/ai_job_apply_1780933191481.png"
  },
  {
    id: "xero-asana-sync",
    title: "Xero Financial Export → Asana & Sheets Sync",
    subtitle: "Make · Xero API · Asana · Google Sheets",
    description: "A dual-orchestrator pipeline converting completed operational goals into automated billing and tracking compliance.",
    bulletPoints: [
      "Watches for completed tasks in Asana and automatically triggers a Xero API call to pull transaction data.",
      "Routes data through a two-path system: one path logs each transaction row to Google Sheets, the other aggregates and uploads a formatted report as an Asana task attachment.",
      "Used Make's Iterator, Text Aggregator, and Sleep tools to handle bulk data reliably without hitting API limits.",
      "Replaced a manual weekly reporting process — finance team gets updated records without touching a spreadsheet."
    ],
    workflow: [
      { label: "Asana Task", type: "trigger", details: "Triggered instantly upon marking task as complete" },
      { label: "Xero Transaction API", type: "finance", details: "Pulls detailed transactional billing records" },
      { label: "Router Path A", type: "database", details: "Logs individual rows to Google Sheets bookkeeping" },
      { label: "Router Path B", type: "crm", details: "Compiles & formats PDF report and attaches it back to the Asana task" }
    ],
    stack: ["Make", "Xero API", "Asana CRM", "Google Sheets", "Iterator Modules", "Data Aggregator"],
    imageUrl: "/src/assets/images/xero_asana_sync_1780933212047.png"
  },
  {
    id: "gmail-sorter",
    title: "Smart Gmail Attachment Sorter & Logger",
    subtitle: "Make · Gmail · Google Drive · Google Sheets · AI",
    description: "An automated filing assistant that scans, structures, files, and documents incoming mail payloads without human touch.",
    bulletPoints: [
      "Monitors Gmail inbox and automatically detects new emails with attachments.",
      "Uses AI to analyze each file and generate a smart, descriptive filename before saving.",
      "Uploads sorted files to the correct Google Drive folder and logs each entry in Google Sheets.",
      "Sends a confirmation email with file details — zero manual file management required."
    ],
    workflow: [
      { label: "Gmail Incoming", type: "trigger", details: "Triggered on new message containing file attachments" },
      { label: "AI File Analysis", type: "ai", details: "Identifies file category, invoice amount, and smart filename" },
      { label: "Google Drive Folder", type: "file", details: "Files in correct categorized subfolder recursively" },
      { label: "Google Sheets Log", type: "database", details: "Registers timestamp, original sender, and file link" },
      { label: "Gmail Notification", type: "email", details: "Sends summary email with organized confirmation" }
    ],
    stack: ["Make", "Gmail Trigger", "Google Sheets API", "Google Drive API", "OpenAI Vision/Text API"],
    imageUrl: "/src/assets/images/gmail_sorter_1780933228828.png"
  },
  {
    id: "content-repurpose",
    title: "Automated Content Repurposing Pipeline",
    subtitle: "Zapier · Google Drive · AI by Zapier · Facebook Pages · LinkedIn",
    description: "A broadcast pipeline converting raw audiovisual elements into platform-specific campaigns instantaneously.",
    bulletPoints: [
      "Triggers on new media uploads in Google Drive — no manual steps needed to start the pipeline.",
      "Uses AI by Zapier to transcribe audio/video and auto-generate a full blog post from the content.",
      "Splits output into separate paths: publishes to Facebook Page and LinkedIn simultaneously.",
      "Handles different content formats per platform using Zapier Paths and Looping logic.",
      "Eliminated hours of manual content repurposing — one upload triggers the entire publishing workflow."
    ],
    workflow: [
      { label: "Drive Video Upload", type: "trigger", details: "Triggered when raw video drops in target folder" },
      { label: "AI Translation & Post", type: "ai", details: "Transcribes media and writes blog posts" },
      { label: "Zapier Router", type: "api", details: "Controls format guidelines per application" },
      { label: "LinkedIn Update API", type: "action", details: "Shares optimized technical post on user profile" },
      { label: "Facebook Page API", type: "action", details: "Publishes conversational summary with image" }
    ],
    stack: ["Zapier Paths", "Google Drive", "AI by Zapier", "LinkedIn API", "Facebook Pages Client"],
    imageUrl: "/src/assets/images/content_repurpose_1780933245104.png"
  },
  {
    id: "asana-crm-engagement",
    title: "Asana CRM Lead Engagement & Follow-Up Automation",
    subtitle: "Zapier · Asana · Gmail · Google Drive",
    description: "A complete autonomous sales routing sequence driven entirely by CRM board updates.",
    bulletPoints: [
      "Triggers on any Asana task status change and routes the lead through 5 distinct follow-up paths.",
      "Each path (Ready to Start, No Response, Quoted, Approved, Paid & Closed) sends the right email at the right time automatically.",
      "Creates Google Drive folders for new leads and uploads proposal PDFs when a deal is approved.",
      "Built-in delays and email-finding logic ensure follow-ups land at optimal times without manual scheduling."
    ],
    workflow: [
      { label: "Asana Status Change", type: "trigger", details: "Runs when a candidate card moves columns" },
      { label: "Zapier Path Router", type: "api", details: "Branches into 5 distinct email flows based on state" },
      { label: "Google Drive Folder", type: "file", details: "Dynamic folder creation with deal name" },
      { label: "Zapier Delay Helper", type: "action", details: "Handles scheduled multi-day waiting periods cleanly" },
      { label: "Gmail Direct API", type: "email", details: "Dispatches automated follow-up proposal emails" }
    ],
    stack: ["Zapier Premium", "Asana Webhooks", "Gmail SMTP", "Google Drive API", "Zapier Storage"],
    imageUrl: "/src/assets/images/asana_crm_engagement_1780933260600.png"
  },
  {
    id: "lead-enrichment-pipeline",
    title: "Automated Lead Enrichment & Sales Routing",
    subtitle: "Zapier · Youform · Apollo.io · Google Sheets · Slack · AI",
    description: "A real-time marketing acquisition workflow which captures, validates, tags and alerts key specialists.",
    bulletPoints: [
      "Captures new form submissions and immediately enriches lead data using the Apollo.io API.",
      "Scores and segments leads into High Priority vs. Low Priority using conditional routing logic.",
      "High-priority leads are logged to Google Sheets, Slack alerts the sales team, and AI drafts a personalized outreach email.",
      "Low-priority leads receive an automated Gmail notification — no lead falls through the cracks."
    ],
    workflow: [
      { label: "Youform Submission", type: "trigger", details: "User registers details on the landing page" },
      { label: "Apollo.io API Enrich", type: "api", details: "Fetches social, role, company size, and funding info" },
      { label: "Conditional Router", type: "api", details: "Validates score based on target client criteria" },
      { label: "Slack / Sheets Notify", type: "notification", details: "Pings channel with summary and copies to Google Sheets" },
      { label: "AI Custom Outreach", type: "ai", details: "Writes draft Gmail response based on Apollo bio" }
    ],
    stack: ["Zapier Router", "Youform", "Apollo.io API", "Slack API", "AI by Zapier", "Google Sheets"],
    imageUrl: "/src/assets/images/lead_enrichment_pipeline_1780933279283.png"
  },
  {
    id: "voice-ai-receptionist",
    title: "Voice AI Receptionist & Scheduling Automation",
    subtitle: "n8n · Voice AI · Google Calendar · Airtable · Webhooks",
    description: "A fully automated voice AI receptionist that handles appointment booking end-to-end — no human required on the line. Built four interconnected n8n workflows (GetSlots, BookSlot, UpdateSlot, CancelSlot) exposed as webhook tools that a voice AI agent calls in real time during a live phone conversation.",
    bulletPoints: [
      "Checks real-time availability against Google Calendar and returns open slots mid-call",
      "Books, reschedules, and cancels appointments, keeping Google Calendar and Airtable perfectly in sync",
      "Handles timezone conversion automatically so scheduling stays accurate no matter where the caller is",
      "Built-in validation and error handling at every step, so the AI agent always has a clean, accurate answer to give the caller",
      "Replaces a human receptionist for routine scheduling — live, 24/7, with zero missed calls"
    ],
    workflow: [
      { label: "Voice Bot Call Trigger", type: "trigger", details: "Incoming live phone call initializes real-time voice session" },
      { label: "GetSlots Webhook", type: "api", details: "Checks real-time availability against Google Calendar" },
      { label: "BookSlot Webhook", type: "database", details: "Secures slot, registers in Airtable, sends calendar invite" },
      { label: "UpdateSlot Webhook", type: "crm", details: "Reschedules, updates calendar event & book records dynamically" },
      { label: "CancelSlot Webhook", type: "action", details: "Cancels appointment, frees calendar block and keeps database accurate" }
    ],
    stack: ["n8n", "Voice AI", "Google Calendar API", "Airtable API", "Webhooks", "Timezone Engine"],
    imageUrl: "/src/assets/images/voice_ai_receptionist_1782012655851.jpg"
  }
];

export const EXPERIENCE = [
  {
    company: "Freelance Automation Specialist & AI Workflow Engineer",
    role: "Self-Employed",
    period: "2021 – Present",
    bullets: [
      "Design and deploy custom automation workflows for clients using Zapier, Make, n8n, and Power Automate.",
      "Build AI-powered systems for customer support, lead management, content publishing, and operations.",
      "Connect business apps via REST APIs and webhooks to eliminate manual data entry and reduce errors.",
      "Consult with clients to map their processes, identify bottlenecks, and deliver scalable solutions."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Zapier Certified Expert", issuer: "Zapier" },
  { name: "Make Advanced Scenario Builder", issuer: "Make" },
  { name: "Microsoft Power Automate Certified", issuer: "Microsoft" },
  { name: "API Integration Professional", issuer: "REST API Specialists" },
  { name: "HighLevel Automation Architect", issuer: "GoHighLevel" },
  { name: "AI Prompt Engineering Specialist", issuer: "Core AI Institute" }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Workflow Automation",
    skills: ["Zapier", "Make", "n8n", "Power Automate"]
  },
  {
    category: "AI Agent Development",
    skills: ["Large Language Models", "Google Gemini", "OpenAI", "OpenRouter", "Structured Output Parsing", "Prompt Engineering"]
  },
  {
    category: "API & Data Sync",
    skills: ["REST APIs", "Webhooks", "JSON Manipulations", "HTTP Requests", "Data Mapping"]
  },
  {
    category: "Business Tech Integrations",
    skills: ["CRM Systems (Asana, GoHighLevel)", "Google Workspace Suite", "Slack Integrations", "Xero Financial Automations", "Youform & Apollo.io"]
  },
  {
    category: "Process Design",
    skills: ["SOP Mapping", "Process Documentation", "Workflow Optimization", "Conditional Routing / Logical Paths"]
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Radiologic Technology",
    school: "De La Salle Health Sciences Institute",
    year: "2017"
  }
];
