import { CLIENT_CONFIGS, ClientConfig } from 'lib/client-config';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const PRIMARY_DOMAIN = 'filamentfarmmfg.com';
const RESEND_API_URL = 'https://api.resend.com/emails';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getSubdomainFromHost(hostHeader: string): string {
  const hostname = hostHeader.split(':')[0]?.toLowerCase() ?? '';

  if (!hostname || !hostname.endsWith(PRIMARY_DOMAIN)) {
    return '';
  }

  const parts = hostname.split('.');
  if (parts.length <= 2) {
    return '';
  }

  const subdomain = parts.slice(0, parts.length - 2).join('.');
  return subdomain === 'www' ? '' : subdomain;
}

function resolveClientConfig(request: NextRequest): ClientConfig | null {
  const subdomainFromHost = getSubdomainFromHost(request.headers.get('host') ?? '');
  const subdomainFromCookie = request.cookies.get('client-subdomain')?.value ?? '';
  const clientKey = subdomainFromHost || subdomainFromCookie;

  if (clientKey && CLIENT_CONFIGS[clientKey]) {
    return CLIENT_CONFIGS[clientKey];
  }

  return CLIENT_CONFIGS.default ?? null;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    if (firstIp) {
      return firstIp.trim();
    }
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();

  for (const [storedKey, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(storedKey);
    }
  }

  const entry = rateLimitStore.get(key);
  if (!entry) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return false;
}

function validatePayload(payload: ContactPayload): string | null {
  if (!payload.name || payload.name.length < 2 || payload.name.length > 120) {
    return 'Please provide your name.';
  }

  if (!payload.email || payload.email.length > 320) {
    return 'Please provide a valid email address.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) {
    return 'Please provide a valid email address.';
  }

  if (payload.subject.length > 150) {
    return 'Subject is too long.';
  }

  if (!payload.message || payload.message.length < 10 || payload.message.length > 5000) {
    return 'Please include a message.';
  }

  return null;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendEmail({
  to,
  replyTo,
  subject,
  text,
  html
}: {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error('Contact email service is not configured.');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html
    }),
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider error (${response.status}): ${errorBody}`);
  }
}

export async function POST(request: NextRequest) {
  const clientConfig = resolveClientConfig(request);

  if (!clientConfig) {
    return NextResponse.json(
      { success: false, message: 'Client configuration not found.' },
      { status: 404 }
    );
  }

  if (!clientConfig.contact?.recipientEmail) {
    return NextResponse.json(
      { success: false, message: 'Contact settings are missing for this client.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const payload: ContactPayload = {
    name: normalizeString((body as Record<string, unknown>)?.name),
    email: normalizeString((body as Record<string, unknown>)?.email),
    subject: normalizeString((body as Record<string, unknown>)?.subject),
    message: normalizeString((body as Record<string, unknown>)?.message),
    website: normalizeString((body as Record<string, unknown>)?.website)
  };

  const successMessage =
    clientConfig.contact.successMessage ||
    `Thanks for contacting ${clientConfig.name}. We'll get back to you soon.`;

  // Honeypot field: bot submissions are accepted silently and discarded.
  if (payload.website) {
    return NextResponse.json({ success: true, message: successMessage });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ success: false, message: validationError }, { status: 400 });
  }

  const rateLimitKey = `${clientConfig.name}:${getClientIp(request)}`;
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many submissions. Please wait a few minutes and try again.'
      },
      { status: 429 }
    );
  }

  const subjectPrefix = clientConfig.contact.subjectPrefix?.trim();
  const subject = [subjectPrefix, payload.subject || 'Website contact submission']
    .filter(Boolean)
    .join(' ');

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject || '(no subject)');
  const safeMessage = escapeHtml(payload.message).replaceAll('\n', '<br />');

  const text = [
    `Client: ${clientConfig.name}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject || '(no subject)'}`,
    '',
    payload.message
  ].join('\n');

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Client:</strong> ${escapeHtml(clientConfig.name)}</p>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <hr />
    <p>${safeMessage}</p>
  `;

  try {
    await sendEmail({
      to: clientConfig.contact.recipientEmail,
      replyTo: payload.email,
      subject,
      text,
      html
    });

    return NextResponse.json({ success: true, message: successMessage });
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown email error';
    console.error('[contact] failed to send email', details);

    return NextResponse.json(
      { success: false, message: 'Unable to send your message right now. Please try again later.' },
      { status: 500 }
    );
  }
}
