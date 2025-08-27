// components/layout/footer.tsx
import Image from 'next/image';
import Link from 'next/link';

type Brand = { name: string; logoUrl?: string; homeHref?: string };

export default function Footer({ brand }: { brand?: Brand }) {
  const name = brand?.name ?? 'Store';
  const homeHref = brand?.homeHref ?? '/';

  return (
    <footer className="border-t border-neutral-800 bg-[var(--bg-color)]">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) items-center justify-between px-4 py-8">
        {/* Left: brand mark */}
        <Link href={homeHref} className="flex items-center gap-3" prefetch>
          {brand?.logoUrl ? (
            <Image
              src={brand.logoUrl}
              alt={`${name} logo`}
              width={120}
              height={120}
              className="h-8 w-auto"
            />
          ) : (
            <div className="h-8 w-8 rounded bg-[var(--accent-color)]" />
          )}
          <span className="text-sm font-medium text-[var(--text-color)]/85">
            {name}
          </span>
        </Link>

        {/* Right: footer links - mirror header */}
        <nav className="flex items-center gap-4">
          <Link href="/catalog" className="text-sm text-[var(--text-color)]/70 hover:text-[var(--text-color)]">All products</Link>
          <Link href="/about" className="text-sm text-[var(--text-color)]/70 hover:text-[var(--text-color)]">About</Link>
        </nav>
      </div>
    </footer>
  );
}
