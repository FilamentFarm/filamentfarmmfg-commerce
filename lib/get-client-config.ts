// lib/get-client-config.ts

import { cookies } from 'next/headers';
import { CLIENT_CONFIGS, ClientConfig } from './client-config';

export function getClientConfig(): ClientConfig | null {
  const cookieStore = cookies();
  const subdomain = cookieStore.get('client-subdomain')?.value;

  if (!subdomain || !CLIENT_CONFIGS[subdomain]) {
    return null;
  }

  return CLIENT_CONFIGS[subdomain];
}
