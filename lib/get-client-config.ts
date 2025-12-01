import { cookies } from 'next/headers';
import { CLIENT_CONFIGS, ClientConfig } from './client-config';

export async function getClientConfig(): Promise<ClientConfig | null> {
  const c = await cookies();
  const sub = c.get('client-subdomain')?.value || '';

  const base =
    (sub && (CLIENT_CONFIGS as any)[sub]) ||
    (CLIENT_CONFIGS as any).default ||
    null;

  return base;
}
