'use client';

import React from 'react';
import Link from 'next/link';

function useBrandData() {
  const [logo, setLogo] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>('Home');

  React.useEffect(() => {
    const b = document.body;
    const l = b.getAttribute('data-brand-logo') || '';
    const n = b.getAttribute('data-brand-name') || 'Home';
    setLogo(l || null);
    setName(n);
  }, []);

  return { logo, name };
}

export default function BrandHomeButton() {
  const { logo, name } = useBrandData();

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
