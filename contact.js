export const CONTACT_FORM_ENDPOINT = 'https://n8n-fbbj.srv1906418.hstgr.cloud/webhook/portfolio-contact';
export const CONTACT_FIELDS = ['name','company','email','phone','message','website'];
export function isLocalPreview(hostname) {
  return ['localhost','127.0.0.1','[::1]','::1'].includes(hostname);
}
export function contactPayload(values) {
  return Object.fromEntries(CONTACT_FIELDS.map((field) => [field,String(values[field] || '').trim()]));
}
export function validateContact(payload) {
  const errors = {};
  if (!payload.name) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = 'Please enter a valid email address.';
  return errors;
}
export async function sendContact(payload, {hostname, scenario = 'success', fetchImpl = fetch, timeoutMs = 15000} = {}) {
  const local = isLocalPreview(hostname);
  if (local) {
    await new Promise((resolve) => setTimeout(resolve, scenario === 'timeout' ? timeoutMs : 650));
    if (scenario === 'timeout') throw new DOMException('Request timed out','AbortError');
    if (scenario === 'error') throw new Error('Simulated server error');
    return {simulated:true};
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(CONTACT_FORM_ENDPOINT, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
    if (!response.ok) throw new Error('Unable to send message');
    return {simulated:false};
  } finally {
    clearTimeout(timeout);
  }
}
