// components/layout/client-logo-banner.tsx
import Image from 'next/image';
import { getClientConfig } from 'lib/get-client-config';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default async function ClientLogoBanner() {
  const cfg = await getClientConfig();

  const isBanner = !!cfg?.bannerUrl;
  const imageUrl = isBanner ? cfg.bannerUrl : cfg?.logoUrl;
  const imageAlt = cfg?.name ? (isBanner ? `${cfg.name} banner` : `${cfg.name} logo`) : 'Client Branding';
  
  // Provide sensible intrinsic size hints for calculating aspect ratio.
  const intrinsicWidth = isBanner ? 1200 : 160; // Example intrinsic width for banner vs logo
  const intrinsicHeight = isBanner ? 300 : 40; // Example intrinsic height for banner vs logo

  return (
    <div className="w-full bg-[var(--accent-color)] pb-4">
      {/* Container for the image, capped by max-w-screen-2xl and with aspect ratio */}
      <div
        className="relative mx-auto max-w-screen-2xl overflow-hidden"
        style={{
            paddingBottom: isBanner ? `${(intrinsicHeight / intrinsicWidth) * 100}%` : undefined, // Maintain aspect ratio for banners
            height: isBanner ? 'auto' : `${intrinsicHeight}px`, // Keep logo height fixed if not a banner
            minHeight: isBanner ? '100px' : undefined // Ensure banner has a minimum height
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill // Make the image fill its parent container
            priority
            className="object-cover object-center" // Zoom in and center
            // width, height, sizes, and style props are ignored when fill is true
          />
        ) : (
          <div className="flex h-full items-center justify-center"> {/* Centering for text fallback */} 
            <span className="text-[var(--bg-color)]/90 text-lg sm:text-xl md:text-2xl font-semibold">
              {cfg?.name ?? 'Our Store'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
