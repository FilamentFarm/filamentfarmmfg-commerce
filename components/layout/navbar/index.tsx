// components/layout/navbar/index.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
// import LogoSquare from 'components/logo-square'; // keep as fallback if you like

type Brand = { name: string; logoUrl?: string; homeHref?: string };

export default function Navbar({ brand }: { brand?: Brand }) {
  const homeHref = brand?.homeHref ?? '/';
  const name = brand?.name ?? 'Store';
  const hasLogo = Boolean(brand?.logoUrl);

  // Build the primary nav (drop "Home")
  const navLinks = useMemo(
    () => [
      { title: 'All products', href: '/catalog' },
      { title: 'About', href: '/about' }
      // Add more links here if needed
    ],
    []
  );

  return (
    <div className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[var(--bg-color)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-(--breakpoint-2xl) items-center justify-between px-4 py-3">
        {/* Left: brand */}
        <Link href={homeHref} className="flex items-center gap-3" prefetch>
          {hasLogo ? (
            <Image
              src={brand!.logoUrl!}
              alt={`${name} logo`}
              width={120}
              height={120}
              className="h-8 w-auto"
              priority
            />
          ) : (
            // <LogoSquare className="h-8 w-8" />
            <div className="h-8 w-8 rounded bg-[var(--accent-color)]" />
          )}
          <span className="text-sm font-semibold text-[var(--text-color)]">
            {name}
          </span>
        </Link>

        {/* Right: links + cart (keep your existing cart/search components) */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch
                className="text-sm text-[var(--text-color)]/85 hover:text-[var(--text-color)]"
              >
                {l.title}
              </Link>
            ))}
          </div>

          {/* Keep your existing Search and Cart triggers here */}
          {/* e.g. <Search /> and <OpenCart /> */}
        </div>
      </nav>

      {/* If you have a mobile menu component, it likely renders links; ensure it uses the same set */}
    </div>
  );
}
