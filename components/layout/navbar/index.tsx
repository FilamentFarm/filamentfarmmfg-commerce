import BrandHomeButton from './brand-home-button';
import CartModal from 'components/cart/modal';
import MobileMenu from './mobile-menu';
import { Suspense } from 'react';
import Search from './search';
import { ClientConfig } from 'lib/client-config';
import Link from 'next/link';

export function Navbar({ client }: { client: ClientConfig }) {
  return (
    <nav
      className="relative flex items-center justify-between p-4 lg:px-6 border-b border-solid"
      style={{
        backgroundColor: client.theme.backgroundColor,
        borderColor: client.theme.primaryColor
      }}
    >
      <div className="flex w-full items-center">
        <div className="flex w-full items-center gap-3 md:w-1/3">
          {/* Hamburger: only visible <768px. Opens a slide-in drawer
              containing the same nav links + a search input. */}
          <MobileMenu clientName={client.name} />

          <BrandHomeButton client={client} />

          {/* Desktop-only inline links. Hidden below 768px in favor of the
              hamburger above. */}
          <div className="ml-2 hidden items-center gap-4 md:flex">
            <Link
              href={`/search/all`}
              className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              All Products
            </Link>
            <Link
              href="/contact"
              className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={null}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
