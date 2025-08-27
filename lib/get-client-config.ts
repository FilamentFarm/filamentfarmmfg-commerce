import { cookies } from 'next/headers';
import { CLIENT_CONFIGS } from './client-config';
import { getBrandingByHandle } from './shopify/branding';

export async function getClientConfig() {
  // BEFORE: const c = cookies();
  const c = await cookies(); // ✅ Next 15 types expect a Promise here
  const sub = c.get('client-subdomain')?.value || '';

  const base =
    (sub && (CLIENT_CONFIGS as any)[sub]) ||
    (CLIENT_CONFIGS as any).default ||
    null;

  let branding = null;
  if (sub) {
    try {
      branding = await getBrandingByHandle(sub);
    } catch {
      /* ignore */
    }
  }

  if (branding) {
    const theme = base?.theme ?? {};
    const colors = branding.colors ?? {};
    return {
      ...(base ?? {}),
      name: branding.brandName || base?.name || sub,
      logoUrl: branding.logoLight?.url || base?.logoUrl,
      logoAlt: branding.logoLight?.alt || base?.logoAlt,
      branding,
      theme: {
        ...theme,
        backgroundColor: colors.background ?? theme.backgroundColor,
        textColor: colors.text ?? theme.textColor,
        accentColor: colors.accent ?? theme.accentColor,
        productButtonColor: colors.productButton ?? theme.productButtonColor,
        productButtonHoverColor:
          colors.productButtonHover ?? theme.productButtonHoverColor
      }
    };
  }

  return base;
}
