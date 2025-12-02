import Link from 'next/link';
// Removed: import { getMenu } from 'lib/shopify';
import { getClientConfig } from 'lib/get-client-config';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  // Removed: const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  const clientConfig = await getClientConfig();

  // Manually defined links
  const privacyPolicyLink = { title: 'FFMFG Privacy Policy', path: 'https://www.filamentfarmmfg.com/policies/privacy-policy' }; // EDIT THESE VALUES
  const contactLink = { title: 'FFMFG Contact', path: 'https://www.filamentfarmmfg.com/pages/contact' }; // EDIT THESE VALUES

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 pt-12 pb-6 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        {/* New text line, displayed only if clientConfig exists (i.e., on a client subdomain) */}
        {clientConfig && (
          <div className="w-full text-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg mb-6">
            This maker uses Filament Farm MFG to host and manufacture their products.
          </div>
        )}

        <div className="flex w-full flex-col md:flex-row justify-between pt-6">
          <div className="flex items-center flex-wrap gap-x-2">
            {/* Client name in partnership with Filament Farm MFG */}
            {clientConfig && (
              <span className="text-black dark:text-white text-lg font-semibold">
                {clientConfig.name} in partnership with
              </span>
            )}
            {/* Filament Farm MFG logo and link */}
            <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="https://www.filamentfarmmfg.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/logos/filamentfarmmfg-logo.png" // Assumed path for your custom logo
                alt="Filament Farm MFG logo"
                className="h-8 w-auto rounded-lg"
              />
              <span className="uppercase">Filament Farm MFG</span>
            </Link>
          </div>

          {/* In-line Privacy Policy and Contact links (now manually defined) */}
          <div className="flex flex-grow justify-end gap-x-6 md:gap-x-12 mt-6 md:mt-0">
            <Link href={privacyPolicyLink.path} className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">
              {privacyPolicyLink.title}
            </Link>
            <Link href={contactLink.path} className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">
              {contactLink.title}
            </Link>
          </div>
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
