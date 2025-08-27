import Image from 'next/image';
import { getClientConfig } from '@/lib/get-client-config';

export default async function ClientLogoBanner() {
  const cfg = await getClientConfig();
  const logoUrl = cfg?.logoUrl ?? '';
  const alt = cfg?.name ? `${cfg.name} logo` : 'Client logo';
  const banner = cfg?.branding?.banner;

  if (banner?.url) {
  return (
    <div className="w-full bg-[var(--accent-color)]">
      <div className="mx-auto max-w-screen-2xl">
        <Image
          src={banner.url}
          alt={banner.alt ?? `${cfg?.name ?? 'Client'} banner`}
          width={banner.width ?? 1600}
          height={banner.height ?? 600}
          priority
          className="h-auto w-full object-contain"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
// else continue with your existing logo rendering...
  return (
    <div className="w-full bg-[var(--accent-color)]">
      {/* The inner container height controls the bar height; the image scales to fit */}
      <div className="mx-auto max-w-screen-2xl flex h-14 sm:h-25 md:h-30 lg:h-35 items-center justify-center">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={alt}
            width={800}
            height={200}
            priority
            className="max-h-full w-auto"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 800px"
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
