import { cookies } from 'next/headers';
import { CLIENT_CONFIGS } from './client-config';
import { getBrandingByHandle } from './shopify/branding';

export async function getClientConfig() {
  const c = cookies();
  const sub = c.get('client-subdomain')?.value || '';

  // Code defaults
  const base = (sub && (CLIENT_CONFIGS as any)[sub]) || (CLIENT_CONFIGS as any).default || null;

  // Try Shopify metaobject
  let branding = null;
  if (sub) {
    try { branding = await getBrandingByHandle(sub); } catch { /* ignore network/schema errors */ }
  }

  if (branding) {
    const theme = base?.theme ?? {};
    const colors = branding.colors ?? {};

    return {
      ...(base ?? {}),
      name: branding.brandName || base?.name || sub,
      // prefer Shopify logo; fallback to code
      logoUrl: branding.logoLight?.url || base?.logoUrl,
      logoAlt: branding.logoLight?.alt || base?.logoAlt,
      branding, // expose full object if needed elsewhere
      theme: {
        ...theme,
        backgroundColor: colors.background ?? theme.backgroundColor,
        textColor: colors.text ?? theme.textColor,
        accentColor: colors.accent ?? theme.accentColor,
        productButtonColor: colors.productButton ?? theme.productButtonColor,
        productButtonHoverColor: colors.productButtonHover ?? theme.productButtonHoverColor
      }
    };
  }

  // No metaobject → code defaults
  return base;
}
