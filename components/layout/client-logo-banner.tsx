// components/layout/client-logo-banner.tsx
import Image from 'next/image'; // Corrected import statement
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
  const bannerIntrinsicHeight = 300;
  const logoIntrinsicHeight = 200;  

  const currentIntrinsicHeight = isBanner ? bannerIntrinsicHeight : logoIntrinsicHeight;

  return (
    <div className="w-full bg-[var(--accent-color)] py-4"> 
      {imageUrl ? (
        <div className="mx-auto max-w-screen-2xl">
          {isBanner ? (
            <div
              className="relative w-full overflow-hidden"
              style={{ height: `${bannerIntrinsicHeight}px` }} // Direct height control
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
            <div
              className="relative mx-auto w-full overflow-hidden max-w-[16rem]"
              style={{ height: `${logoIntrinsicHeight}px` }} // Direct height control
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
