import BrandHomeButton from './brand-home-button';
import CartModal from 'components/cart/modal';
import { Suspense } from 'react';
import Search, { SearchSkeleton } from './search';
import { ClientConfig } from 'lib/client-config';

export function Navbar({ client }: { client: ClientConfig }) {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <BrandHomeButton client={client} />
          </div>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
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
