import { NextResponse, NextRequest } from 'next/server';
import { CLIENT_CONFIGS } from './lib/client-config';

// Defense-in-depth security headers applied to every response.
// - X-Content-Type-Options: stops browsers from "MIME-sniffing" content types,
//   which is a common vector for tricking a browser into running a file as JS.
// - X-Frame-Options: prevents the site from being embedded in a clickjacking
//   iframe on a malicious page.
// - Referrer-Policy: leaks less of our URL to third-party sites users click out to.
// - Strict-Transport-Security: forces browsers to always use HTTPS.
// - Permissions-Policy: turns off browser APIs we don't use, so a future XSS
//   can't ask the user for camera/microphone/location.
// We are intentionally NOT setting Content-Security-Policy yet — Next.js'
// streaming RSC payloads need a per-request nonce, which is a larger change.
function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  return response;
}

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') ?? '';
  const hostname = hostHeader.split(':')[0] || '';
  const primaryDomain = 'filamentfarmmfg.com';

  // Only enforce routing on the production domain
  if (hostname.endsWith(primaryDomain)) {
    const parts = hostname.split('.');

    let subdomain = '';
    if (parts.length > 2) {
      subdomain = parts.slice(0, parts.length - 2).join('.');
      if (subdomain === 'www') subdomain = '';
    }

    // If a subdomain exists but we don't have a config for it, redirect to the root domain
    if (subdomain && !(subdomain in CLIENT_CONFIGS)) {
      const url = request.nextUrl.clone();
      url.hostname = primaryDomain;
      url.port = '';
      return applySecurityHeaders(NextResponse.redirect(url, 308));
    }

    const res = NextResponse.next();
    res.cookies.set('client-subdomain', subdomain, { path: '/', sameSite: 'lax' });
    return applySecurityHeaders(res);
  }

  // For non-production hosts (localhost, *.vercel.app), do not redirect; use default theme
  const res = NextResponse.next();
  res.cookies.set('client-subdomain', '', { path: '/', sameSite: 'lax' });
  return applySecurityHeaders(res);
}

export const config = { matcher: '/:path*' };