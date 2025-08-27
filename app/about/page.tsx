// app/about/page.tsx
import { getClientConfig } from 'lib/get-client-config';

export const metadata = {
  title: 'About',
  description: 'About this client'
};

export default async function AboutPage() {
  const cfg = await getClientConfig();
  const name = cfg?.name ?? 'Our Client';
  const about = (cfg as any)?.branding?.about as string | null;
  const disclaimer =
    ((cfg as any)?.branding?.disclaimer as string | null) ??
    `${name} partners with Filament Farm MFG for manufacturing and fulfillment. Product designs, descriptions, and pricing are provided by ${name}. Filament Farm MFG provides production and shipping services.`;

  return (
    <div className="mx-auto max-w-prose px-4 py-10 text-[var(--text-color)]">
      <h1 className="mb-4 text-3xl font-semibold">{name}</h1>

      {about ? (
        <p className="mb-8 leading-relaxed opacity-90">{about}</p>
      ) : (
        <p className="mb-8 leading-relaxed opacity-90">
          Welcome to {name}. We are proud to offer a curated selection of products manufactured by
          Filament Farm MFG with a focus on quality, consistency, and reliable fulfillment.
        </p>
      )}

      <hr className="my-8 border-white/10" />

      <p className="text-sm opacity-70">{disclaimer}</p>
    </div>
  );
}
