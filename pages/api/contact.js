import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

// CORS helper
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Simple HTML escape
function sanitize(str) {
  return String(str)
    .replace(/[&<>'"/]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;','/':'&#x2F;'}[c]));
}

// Validate and sanitize input
function validateInput(body) {
  if (!body || typeof body !== 'object') return { valid: false, error: 'Invalid JSON' };
  const { name, email, message } = body;
  if (
    typeof name !== 'string' || name.length < 1 || name.length > 100 ||
    typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200 ||
    typeof message !== 'string' || message.length < 1 || message.length > 2000
  ) {
    return { valid: false, error: 'Invalid input fields' };
  }
  return {
    valid: true,
    data: {
      name: sanitize(name.trim()),
      email: sanitize(email.trim()),
      message: sanitize(message.trim()),
    }
  };
}

// isRateLimited always returns false (anti-spam removed)
const isRateLimited = async (_ip, _email) => false;

// recordSubmission is now a no-op
const recordSubmission = async (_ip, _email, _submissionId, _timestamp) => {};

// isDuplicateMessage always returns false (duplicate check removed)
const isDuplicateMessage = async (_email, _message) => false;

export default async function handler(req, res) {
  setCORS(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', error: 'Method not allowed' });
    return;
  }
  let body;
  try {
    body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
  } catch {
    res.status(400).json({ status: 'error', error: 'Malformed JSON' });
    return;
  }
  const validation = validateInput(body);
  if (!validation.valid) {
    res.status(400).json({ status: 'error', error: validation.error });
    return;
  }
  const { name, email, message } = validation.data;
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  const referrer = req.headers['referer'] || req.headers['referrer'] || '';
  const timestamp = new Date().toISOString();
  const submissionId = uuidv4();

  // Email content
  const emailHtml = `
    <h2>New Contact Submission</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>
    <hr/>
    <p><b>Timestamp:</b> ${timestamp}</p>
    <p><b>Referrer:</b> ${sanitize(referrer)}</p>
    <p><b>Submission ID:</b> ${submissionId}</p>
    <p><b>IP:</b> ${sanitize(ip)}</p>
  `;

  // Send email
  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: `Contact Form <noreply@marketing.krypop.com>`, // KRYpop brand, correct casing
      to: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: emailHtml,
      reply_to: email,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Failed to send email', details: err.message });
    return;
  }

  res.status(200).json({ status: 'success', submissionId, message: 'Your message has been sent.' });
}

export const config = { api: { bodyParser: true } }; // Allow JSON body
