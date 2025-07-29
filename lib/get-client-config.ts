// lib/get-client-config.ts

import { cookies } from 'next/headers';
import { CLIENT_CONFIGS, ClientConfig } from './client-config';

export async function getClientConfig(): Promise<ClientConfig | null> {
  const cookieStore = await cookies();
  const subdomain = cookieStore.get('client-subdomain')?.value;

  if (!subdomain || !CLIENT_CONFIGS[subdomain]) {
    return null;
  }

  return CLIENT_CONFIGS[subdomain];
}
