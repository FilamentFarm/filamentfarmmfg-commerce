import BrandHomeButton from './brand-home-button';
import CartModal from 'components/cart/modal';
import { Suspense } from 'react';
import Search from './search';
import { ClientConfig } from 'lib/client-config';
import Link from 'next/link';

export function Navbar({ client }: { client: ClientConfig }) {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6" style={{ backgroundColor: client.theme.backgroundColor }}>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <BrandHomeButton client={client} />
            <Link
              href={`/search/all`}
              className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              All Products
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
