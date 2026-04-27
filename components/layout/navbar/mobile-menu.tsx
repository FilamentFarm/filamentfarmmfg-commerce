'use client';

// Simple mobile-first hamburger menu for the navbar.
// At ≥768px (Tailwind's `md` breakpoint) the desktop nav already shows
// the search bar and the All Products / Contact links. Below 768px those
// links wrap awkwardly and the search bar is hidden — this component
// replaces them with a hamburger that opens a full-screen drawer.
//
// Behavior:
// - Renders a hamburger button visible only at <768px (md:hidden).
// - Click opens a Headless UI Dialog with a slide-in panel.
// - Panel contains: client name + the same nav links + a search input.
// - Closes on link click, X click, backdrop click, or Escape.
//
// The component is a Client Component because it uses useState; the
// search form posts via GET to /search so it works without JS.

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MobileMenu({ clientName }: { clientName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function close() {
    setIsOpen(false);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('q') ?? '').trim();
    close();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/search');
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-current md:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={close} className="relative z-50 md:hidden">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </Transition.Child>

          {/* Slide-in panel */}
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-out duration-200"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel
              className="fixed inset-y-0 left-0 flex h-full w-80 max-w-[85vw] flex-col gap-6 p-6 shadow-xl"
              style={{
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{clientName}</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearchSubmit} role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Search for products
                </label>
                <input
                  id="mobile-search"
                  name="q"
                  type="search"
                  placeholder="Search for products..."
                  autoComplete="off"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-base focus:border-white/40 focus:outline-none"
                  style={{ color: 'var(--text-color)' }}
                />
              </form>

              {/* Nav links */}
              <nav className="flex flex-col gap-3 text-base">
                <Link
                  href="/"
                  onClick={close}
                  className="rounded-md px-3 py-2 hover:bg-white/5"
                >
                  Home
                </Link>
                <Link
                  href="/search/all"
                  onClick={close}
                  className="rounded-md px-3 py-2 hover:bg-white/5"
                >
                  All Products
                </Link>
                <Link
                  href="/contact"
                  onClick={close}
                  className="rounded-md px-3 py-2 hover:bg-white/5"
                >
                  Contact
                </Link>
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
