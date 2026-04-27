# Filament Farm MFG — Commerce Storefront

Headless e-commerce storefront for **Filament Farm MFG** and the marketplace
clients it manufactures for. One Next.js app, one Shopify store, many client
subdomains. Forked from [`vercel/commerce`](https://github.com/vercel/commerce).

> **Live:** [filamentfarmmfg.com](https://filamentfarmmfg.com)
> **Example client storefront:** [kongclave.filamentfarmmfg.com](https://kongclave.filamentfarmmfg.com)

---

## Stack at a glance

| Piece              | What it is                                                                  |
| ------------------ | --------------------------------------------------------------------------- |
| **Framework**      | Next.js 15 (App Router, React Server Components, React 19)                  |
| **Styling**        | Tailwind v4 + Headless UI + Heroicons                                       |
| **Data**           | Shopify Storefront API (`lib/shopify/`)                                     |
| **Hosting**        | Vercel — auto-deploys on push to `main`                                     |
| **Email**          | Resend (contact form, `app/api/contact/route.ts`)                           |
| **Package mgr**    | pnpm (Vercel detects and uses `pnpm-lock.yaml`)                             |

---

## How multi-tenancy works

Every client gets their own subdomain (e.g. `kongclave.filamentfarmmfg.com`)
that points at the same Vercel deployment. Routing flow:

1. **`middleware.ts`** reads the `Host` header on every request, extracts
   the subdomain, validates it against `lib/client-config.ts`, and stamps a
   `client-subdomain` cookie. Unknown subdomains 308-redirect to the root domain.
2. **`lib/client-config.ts`** — the canonical client list. Each entry holds
   the client's display name, logo path, theme colors, the Shopify
   collection that contains their products, and contact-routing details.
3. **`lib/get-client-config.ts`** — Server Component helper that reads the
   cookie and returns the matching `ClientConfig`. Components and pages
   that need client-specific behavior call this.
4. **Layout & pages** read theme colors via CSS variables on `<body>`,
   set in `app/layout.tsx`.

The site is intended as the **entry-level / paid-tier** storefront for
marketplace clients. A more white-glove tier with deeper customization
will exist alongside this in the future.

---

## Adding a new client (current process)

> **Caveat:** today this requires a code change + redeploy. We're moving to
> Shopify metaobjects so onboarding becomes a no-deploy operation. Until
> that ships, follow these steps.

1. Drop the client's logo (and optional banner) into `public/logos/`.
2. Open `lib/client-config.ts`, add a new entry to the `CLIENT_CONFIGS`
   record. Key = subdomain. Required: `name`, `logoUrl`, `theme.*`,
   `shopifyCollectionHandle`. Optional: `bannerUrl`, `contact.*`.
3. In Shopify admin, create a Collection (Manual or Smart) with the handle
   that matches `shopifyCollectionHandle`. Add the client's products.
4. In your DNS provider, add a `CNAME` for `<subdomain>.filamentfarmmfg.com`
   → `cname.vercel-dns.com`.
5. In Vercel project settings → Domains, add `<subdomain>.filamentfarmmfg.com`
   to the project.
6. Commit + push. Vercel auto-deploys.

---

## Local development

You don't need a local environment to make text or style edits — Vercel's
preview deployments will render any branch you push. But if you want to
preview locally:

```bash
pnpm install
cp .env.example .env.local
# Fill in .env.local with values from Vercel project settings → Environment Variables
pnpm dev
# Open http://localhost:3000
```

To test multi-tenant subdomain routing locally, you can point a fake
hostname at localhost via your hosts file (e.g. `127.0.0.1 kongclave.localhost`)
and visit `http://kongclave.localhost:3000`.

---

## Environment variables (in Vercel)

| Variable                              | Purpose                                                  |
| ------------------------------------- | -------------------------------------------------------- |
| `SHOPIFY_STORE_DOMAIN`                | `*.myshopify.com` host                                   |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN`     | Storefront-tier (public-safe) API token                  |
| `SHOPIFY_STOREFRONT_VERSION`          | Storefront API version pin (default `2025-07`)           |
| `SHOPIFY_REVALIDATION_SECRET`         | Shared secret for the `/api/revalidate` webhook          |
| `RESEND_API_KEY`                      | Resend API key for contact-form emails                   |
| `CONTACT_FROM_EMAIL`                  | "From" address for contact-form emails (must be verified)|
| `SITE_NAME`                           | Fallback site name on the root domain                    |
| `COMPANY_NAME`                        | Footer copyright owner                                   |

These live only in the Vercel dashboard. **Never commit a `.env.local` file.**

---

## Editing & deployment workflow

This project is edited by Nick (non-coder) in collaboration with Claude in
Cowork. The agreed-upon flow:

1. Nick describes the desired change in chat.
2. Claude edits files in this folder and proposes a commit message.
3. Nick opens **GitHub Desktop**, reviews the diff, pastes the message,
   clicks **Commit to main**, then **Push origin**.
4. Vercel auto-deploys (~30–60 seconds).
5. To roll back: GitHub Desktop → History → right-click commit → **Revert
   this commit** → Push.

> **Pull before edit.** At the start of every session, hit **Fetch origin**
> in GitHub Desktop and pull if there are updates.

---

## Repo conventions

- **Don't commit `.env*` files.** `.gitignore` excludes them.
- **Don't commit license-partner STLs** or anything from the parent
  `D:\3D Printing\` folders. None of that should ever live here.
- **Keep both lockfiles?** No — `pnpm-lock.yaml` is the truth. If you ever
  see a `package-lock.json` reappear, delete it.
- **Commit messages** should describe the user-visible change in a sentence.
  "Update home banner padding" beats "tweaks." A bot reads our git log
  every session.

---

## Links

- **Repo:** [github.com/FilamentFarm/filamentfarmmfg-commerce](https://github.com/FilamentFarm/filamentfarmmfg-commerce)
- **Upstream template:** [vercel/commerce](https://github.com/vercel/commerce)
- **Cowork session brief / "the brain":** `D:\3D Printing\My Designs\FF_Projects\CLAUDE.md`
  (this is the canonical source of business + project context — not in this repo)
