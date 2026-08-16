import { workflow, node, trigger, ifElse, expr } from '@n8n/workflow-sdk';

const receiveContact = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'Receive Contact Form',
    parameters: {
      httpMethod: 'POST',
      path: 'portfolio-contact',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {
        allowedOrigins: 'https://raymoncastano.com',
        ignoreBots: true
      }
    }
  },
  output: [{
    headers: { origin: 'https://raymoncastano.com' },
    params: {},
    query: {},
    body: {
      name: 'Jane Doe',
      company: 'Example Co',
      email: 'jane@example.com',
      phone: '+63 900 000 0000',
      message: 'I want to automate lead follow-up.',
      website: ''
    },
    webhookUrl: 'https://n8n-fbbj.srv1906418.hstgr.cloud/webhook/portfolio-contact',
    executionMode: 'production'
  }]
});

const normalizeContact = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Normalize Contact',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'name', name: 'name', value: expr("{{ String($json.body?.name ?? $json.name ?? '').trim().replace(/[\\r\\n]+/g, ' ').slice(0, 120) }}"), type: 'string' },
          { id: 'company', name: 'company', value: expr("{{ String($json.body?.company ?? $json.company ?? '').trim().replace(/[\\r\\n]+/g, ' ').slice(0, 200) }}"), type: 'string' },
          { id: 'email', name: 'email', value: expr("{{ String($json.body?.email ?? $json.email ?? '').trim().toLowerCase().slice(0, 254) }}"), type: 'string' },
          { id: 'phone', name: 'phone', value: expr("{{ String($json.body?.phone ?? $json.phone ?? '').trim().replace(/[\\r\\n]+/g, ' ').slice(0, 40) }}"), type: 'string' },
          { id: 'message', name: 'message', value: expr("{{ String($json.body?.message ?? $json.message ?? '').trim().slice(0, 5000) }}"), type: 'string' },
          { id: 'submitted-at', name: 'submitted_at', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'source', name: 'source', value: 'raymoncastano.com', type: 'string' },
          { id: 'valid', name: 'valid', value: expr("{{ (() => { const b = $json.body ?? $json; const n = String(b.name ?? '').trim(); const e = String(b.email ?? '').trim().toLowerCase(); const m = String(b.message ?? '').trim(); const hp = String(b.website ?? '').trim(); return hp === '' && n.length >= 2 && n.length <= 120 && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e) && e.length <= 254 && m.length <= 5000; })() }}"), type: 'boolean' }
        ]
      }
    }
  },
  output: [{
    name: 'Jane Doe',
    company: 'Example Co',
    email: 'jane@example.com',
    phone: '+63 900 000 0000',
    message: 'I want to automate lead follow-up.',
    submitted_at: '2026-08-16T12:00:00.000+08:00',
    source: 'raymoncastano.com',
    valid: true
  }]
});

const validContact = ifElse({
  version: 2.3,
  config: {
    name: 'Valid Contact?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [{
          leftValue: expr('{{ $json.valid }}'),
          operator: { type: 'boolean', operation: 'true' },
          rightValue: true
        }],
        combinator: 'and'
      }
    }
  },
  output: [{
    name: 'Jane Doe',
    company: 'Example Co',
    email: 'jane@example.com',
    phone: '+63 900 000 0000',
    message: 'I want to automate lead follow-up.',
    submitted_at: '2026-08-16T12:00:00.000+08:00',
    source: 'raymoncastano.com',
    valid: true
  }]
});

const storeSubmission = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: {
    name: 'Store Submission',
    onError: 'continueErrorOutput',
    parameters: {
      resource: 'row',
      operation: 'insert',
      dataTableId: {
        __rl: true,
        mode: 'id',
        value: '0R4Sb5vaOWWRUtjV',
        cachedResultName: 'Portfolio Contact Submissions'
      },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          name: expr('{{ $json.name }}'),
          company: expr('{{ $json.company }}'),
          email: expr('{{ $json.email }}'),
          phone: expr('{{ $json.phone }}'),
          message: expr('{{ $json.message }}'),
          submitted_at: expr('{{ $json.submitted_at }}'),
          source: expr('{{ $json.source }}')
        },
        schema: [
          { id: 'name', displayName: 'name', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'company', displayName: 'company', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'email', displayName: 'email', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'phone', displayName: 'phone', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'message', displayName: 'message', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'submitted_at', displayName: 'submitted_at', required: false, defaultMatch: false, display: true, type: 'date', canBeUsedToMatch: true },
          { id: 'source', displayName: 'source', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }
        ]
      }
    }
  },
  output: [{
    createdAt: '2026-08-16T04:00:00.000Z',
    id: 1,
    updatedAt: '2026-08-16T04:00:00.000Z'
  }]
});

const emailRaymon = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Email Raymon',
    retryOnFail: true,
    maxTries: 3,
    waitBetweenTries: 5000,
    onError: 'continueErrorOutput',
    parameters: {
      resource: 'message',
      operation: 'send',
      authentication: 'oAuth2',
      sendTo: 'castanoraymon@gmail.com',
      subject: expr("{{ 'New portfolio enquiry from ' + $('Normalize Contact').item.json.name }}"),
      emailType: 'text',
      message: expr("New portfolio contact submission\n\nName: {{ $('Normalize Contact').item.json.name }}\nCompany: {{ $('Normalize Contact').item.json.company || 'Not provided' }}\nEmail: {{ $('Normalize Contact').item.json.email }}\nPhone: {{ $('Normalize Contact').item.json.phone || 'Not provided' }}\n\nMessage:\n{{ $('Normalize Contact').item.json.message || 'No message provided' }}\n\nReceived: {{ $('Normalize Contact').item.json.submitted_at }}"),
      options: { appendAttribution: false },
      replyTo: expr("{{ $('Normalize Contact').item.json.email }}")
    }
  },
  output: [{ id: 'gmail-message-id', labelIds: ['SENT'], threadId: 'gmail-thread-id' }]
});

const successResponse = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Success Response',
    parameters: {
      respondWith: 'json',
      responseBody: { ok: true, message: "Thanks — I'll get back to you soon." },
      options: {
        responseCode: 200,
        responseHeaders: {
          entries: [
            { name: 'Access-Control-Allow-Origin', value: 'https://raymoncastano.com' },
            { name: 'Vary', value: 'Origin' }
          ]
        }
      }
    }
  },
  output: [{ ok: true, message: "Thanks — I'll get back to you soon." }]
});

const validationResponse = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Validation Response',
    parameters: {
      respondWith: 'json',
      responseBody: { error: 'validation_error', message: 'Please enter a valid name and email address.' },
      options: {
        responseCode: 400,
        responseHeaders: {
          entries: [
            { name: 'Access-Control-Allow-Origin', value: 'https://raymoncastano.com' },
            { name: 'Vary', value: 'Origin' }
          ]
        }
      }
    }
  },
  output: [{ error: 'validation_error', message: 'Please enter a valid name and email address.' }]
});

const serverErrorResponse = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Server Error Response',
    parameters: {
      respondWith: 'json',
      responseBody: { error: 'internal_error', message: "We couldn't send your message right now. Please try again later." },
      options: {
        responseCode: 500,
        responseHeaders: {
          entries: [
            { name: 'Access-Control-Allow-Origin', value: 'https://raymoncastano.com' },
            { name: 'Vary', value: 'Origin' }
          ]
        }
      }
    }
  },
  output: [{ error: 'internal_error', message: "We couldn't send your message right now. Please try again later." }]
});

export default workflow('portfolio-contact-to-gmail', 'Portfolio Contact to Gmail')
  .add(receiveContact)
  .to(normalizeContact)
  .to(validContact
    .onTrue(storeSubmission.to(emailRaymon.to(successResponse)))
    .onFalse(validationResponse))
  .add(storeSubmission.onError(serverErrorResponse))
  .add(emailRaymon.onError(serverErrorResponse));
