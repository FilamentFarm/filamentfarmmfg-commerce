import { ClientConfig } from 'lib/client-config';
import Link from 'next/link';

export default function BrandHomeButton({ client }: { client: ClientConfig }) {
  const { logoUrl: logo, name } = client;

  return (
    <Link
      href="/"
      aria-label={`${name} — Home`}
      prefetch
      className="inline-flex items-center justify-center rounded-xl p-1 ring-1 ring-white/10 hover:ring-white/20 transition"
    >
      {logo ? (
        // Use <img> to avoid next/image domain config surprises.
        <img
          src={logo}
          alt={`${name} logo`}
          className="h-8 w-auto rounded-lg"
        />
      ) : (
        // Fallback if no logo is set
        <div className="h-8 w-8 rounded-lg bg-[var(--accent-color)]" />
      )}
    </Link>
  );
}
