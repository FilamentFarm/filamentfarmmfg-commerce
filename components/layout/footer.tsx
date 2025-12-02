import Link from 'next/link';
import { getMenu } from 'lib/shopify';
import { getClientConfig } from 'lib/get-client-config'; // Import getClientConfig

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const menu = await getMenu('next-js-frontend-footer-menu'); // Fetch all menu items
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  const clientConfig = await getClientConfig(); // Fetch client config

  // Find specific links for Privacy Policy and Contact
  const privacyPolicy = menu.find(item => item.title.toLowerCase() === 'privacy policy');
  const contact = menu.find(item => item.title.toLowerCase() === 'contact');

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      {/* New text line, displayed only if clientConfig exists (i.e., on a client subdomain) */}
      {clientConfig && (
        <div className="mx-auto w-full max-w-7xl px-6 py-4 text-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
          This maker uses Filament Farm MFG to host and manufacture their products.
        </div>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          {/* Filament Farm MFG logo and link */}
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="https://filamentfarmmfg.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/logos/filamentfarmmfg-logo.png" // Assumed path for your custom logo
              alt="Filament Farm MFG logo"
              className="h-8 w-auto rounded-lg"
            />
            <span className="uppercase">Filament Farm MFG</span>
          </Link>
        </div>

        {/* In-line Privacy Policy and Contact links */}
        <div className="flex flex-grow justify-end gap-x-6 md:gap-x-12">
          {privacyPolicy && (
            <Link href={privacyPolicy.path} className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">
              {privacyPolicy.title}
            </Link>
          )}
          {contact && (
            <Link href={contact.path} className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">
              {contact.title}
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl border-t border-neutral-200 px-6 py-4 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
        <a
          className="mr-2 text-black dark:text-white"
          href="https://vercel.com"
          aria-label="Vercel.com Link"
          target="_blank"
          rel="noreferrer"
        >
          Powered by Vercel
        </a>
        <span>&copy; {copyrightDate} {copyrightName}.</span>
      </div>
    </footer>
  );
}
