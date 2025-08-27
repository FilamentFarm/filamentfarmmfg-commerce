// components/layout/client-logo-banner.tsx
import Image from 'next/image';
import { getClientConfig } from 'lib/get-client-config';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default async function ClientLogoBanner() {
  const cfg = await getClientConfig();

  // Prefer Shopify metaobject logo, fallback to code config logoUrl
  const metaLogo = cfg?.branding?.logoLight;
  const logo = metaLogo?.url
    ? {
        url: metaLogo.url,
        alt: metaLogo.alt ?? `${cfg?.name ?? 'Client'} logo`,
        width: metaLogo.width ?? 800,
        height: metaLogo.height ?? 200
      }
    : cfg?.logoUrl
    ? {
        url: cfg.logoUrl,
        alt: cfg?.logoAlt ?? `${cfg?.name ?? 'Client'} logo`,
        width: 800,
        height: 200
      }
    : null;

  // Editable in Shopify → Branding.metaobject field: logo_max_width_vw (20–100)
  const maxWidthVw = clamp(
    Number((cfg as any)?.branding?.logoMaxWidthVw ?? (cfg as any)?.branding?.logo_max_width_vw ?? 90),
    20,
    100
  );

  // sizes hint for Next/Image (smaller on mobile, moderate on tablet, tighter on desktop)
  const sizes =
    `(max-width: 768px) ${Math.min(maxWidthVw, 90)}vw, ` +
    `(max-width: 1280px) ${Math.min(maxWidthVw, 60)}vw, ` +
    `${Math.min(maxWidthVw, 40)}vw`;

  return (
    <div className="w-full bg-[var(--accent-color)]">
      {/* No fixed height: bar height follows image height */}
      <div className="mx-auto max-w-screen-2xl flex items-center justify-center">
        {logo ? (
          <Image
            src={logo.url}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className="h-auto w-auto"
            sizes={sizes}
            // Limit visual width using vw from Shopify; intrinsic ratio preserves height
            style={{ maxWidth: `${maxWidthVw}vw` }}
          />
        ) : (
          <span className="text-[var(--bg-color)]/90 text-lg sm:text-xl md:text-2xl font-semibold">
            {cfg?.name ?? 'Our Store'}
          </span>
        )}
      </div>
    </div>
  );
}
