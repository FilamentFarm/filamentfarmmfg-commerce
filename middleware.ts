// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const currentHost = hostname
    .replace('.filamentfarmmfg.com', '') // our base domain
    .replace(':3000', ''); // if local dev

  const response = NextResponse.next();

  // Store the subdomain in a cookie for the app to use
  response.cookies.set('client-subdomain', currentHost);

  return response;
}

// Apply this middleware to all routes
export const config = {
  matcher: ['/', '/(.*)'],
};
