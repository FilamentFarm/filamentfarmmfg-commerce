// components/layout/client-logo-banner.tsx
import Image from 'next/image';
import { getClientConfig } from 'lib/get-client-config';

export default async function ClientLogoBanner() {
  const cfg = await getClientConfig();

  if (!cfg) {
    return null; 
  }

  const isBanner = !!cfg.bannerUrl;
  const imageUrl = isBanner ? cfg.bannerUrl : cfg.logoUrl;
  const imageAlt = cfg.name ? (isBanner ? `${cfg.name} banner` : `${cfg.name} logo`) : 'Client Branding';

  // Define intrinsic heights. These will directly control the container's height.
  const bannerIntrinsicWidth = 1200;
  const bannerIntrinsicHeight = 300;
  const logoIntrinsicWidth = 160;
  const logoIntrinsicHeight = 40;  

  const currentIntrinsicHeight = isBanner ? bannerIntrinsicHeight : logoIntrinsicHeight;

  return (
    <div className="w-full bg-[var(--accent-color)] py-4"> 
      {imageUrl ? (
        // Outer wrapper: conditional max-width for logo, full width for banner
        <div className={isBanner ? "" : "mx-auto max-w-screen-2xl"}> 
          {isBanner ? (
            // Banner specific container: takes full width of its parent
            <div
              className="relative w-full overflow-hidden"
              style={{ height: `${bannerIntrinsicHeight}px` }} 
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          ) : (
            // Logo specific container: centered and constrained max-width
            <div
              className="relative w-full overflow-hidden max-w-[16rem] mx-auto"
              style={{ height: `${logoIntrinsicHeight}px` }} 
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          )}
        </div>
      ) : (
        // Text fallback if no image URL is present
        <div 
          className="flex items-center justify-center mx-auto max-w-screen-2xl py-4"
          style={{ height: `${currentIntrinsicHeight}px` }} 
        >
          <span className="text-[var(--bg-color)]/90 text-lg sm:text-xl md:text-2xl font-semibold">
            {cfg.name ?? 'Our Store'}
          </span>
        </div>
      )}
    </div>
  );
}
