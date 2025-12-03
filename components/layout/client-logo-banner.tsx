// components/layout/client-logo-banner.tsx
import Image from 'next/image';
import { getClientConfig } from 'lib/get-client-config';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default async function ClientLogoBanner() {
  const cfg = await getClientConfig();

  // As [[...slug]]/page.tsx ensures cfg is not null, we can proceed safely here.
  // Determine which media to use (banner or logo)
  const isBanner = !!cfg?.bannerUrl;
  const imageUrl = isBanner ? cfg.bannerUrl : cfg?.logoUrl;
  const imageAlt = cfg?.name ? (isBanner ? `${cfg.name} banner` : `${cfg.name} logo`) : 'Client Branding';
  
  // Provide sensible defaults for Next/Image to prevent layout shift
  const defaultWidth = isBanner ? 1200 : 160; // Wider default for banners
  const defaultHeight = isBanner ? 300 : 40; // Proportional height for banners

  // Max width for the image in vw (simplified from previous metafield logic)
  const maxWidthVw = clamp(90, 20, 100); 

  // sizes hint for Next/Image (smaller on mobile, moderate on tablet, tighter on desktop)
  const sizes =
    `(max-width: 768px) ${Math.min(maxWidthVw, 90)}vw, ` +
    `(max-width: 1280px) ${Math.min(maxWidthVw, 60)}vw, ` +
    `${Math.min(maxWidthVw, 40)}vw`;

  return (
    <div className="w-full bg-[var(--accent-color)] pb-4">
      <div className="mx-auto max-w-screen-2xl flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={defaultWidth}
            height={defaultHeight}
            priority
            className="h-auto w-auto"
            sizes={sizes}
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
