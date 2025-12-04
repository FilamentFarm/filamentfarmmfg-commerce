// components/layout/client-logo-banner.tsx
import Image from 'next/image';
import { getClientConfig } from 'lib/get-client-config';

export default async function ClientLogoBanner() {
  const cfg = await getClientConfig();

  // Handle case where clientConfig might be null
  if (!cfg) {
    return null; // Render nothing if no client config is found
  }

  const isBanner = !!cfg.bannerUrl;
  const imageUrl = isBanner ? cfg.bannerUrl : cfg.logoUrl;
  const imageAlt = cfg.name ? (isBanner ? `${cfg.name} banner` : `${cfg.name} logo`) : 'Client Branding';

  // Define intrinsic sizes. These should roughly match the actual dimensions of your images.
  const bannerIntrinsicWidth = 1200;
  const bannerIntrinsicHeight = 300;
  const logoIntrinsicWidth = 160;
  const logoIntrinsicHeight = 40;

  const currentIntrinsicHeight = isBanner ? bannerIntrinsicHeight : logoIntrinsicHeight;

  return (
    <div className="w-full bg-[var(--accent-color)] py-4"> {/* Fixed vertical padding here */}
      {imageUrl ? (
        // Outer wrapper to center and limit max width of the entire banner/logo section visually
        <div className="mx-auto max-w-screen-2xl">
          {isBanner ? (
            // Banner specific container: takes full width of its parent (max-w-screen-2xl)
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ maxHeight: `${currentIntrinsicHeight}px` }} // Cap height at intrinsic image height
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-center" // Scales to cover, crops if aspect ratio mismatch
              />
            </div>
          ) : (
            // Logo specific container: centered and constrained max-width
            <div
              className="relative mx-auto w-full h-full overflow-hidden max-w-[16rem]" // Max width for the logo container
              style={{ maxHeight: `${currentIntrinsicHeight}px` }} // Cap height at intrinsic image height
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-contain object-center" // Scales to contain, no cropping
              />
            </div>
          )}
        </div>
      ) : (
        // Text fallback if no image URL is present
        <div className="flex h-[100px] items-center justify-center mx-auto max-w-screen-2xl py-4"> 
          <span className="text-[var(--bg-color)]/90 text-lg sm:text-xl md:text-2xl font-semibold">
            {cfg.name ?? 'Our Store'}
          </span>
        </div>
      )}
    </div>
  );
}
