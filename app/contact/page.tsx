import Link from 'next/link';
import { getClientConfig } from 'lib/get-client-config';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with our team.'
};

export default async function ContactPage() {
  const client = await getClientConfig();
  if (!client) return notFound();

  const accent = client.theme.primaryColor;
  const bg = client.theme.backgroundColor;
  const text = client.theme.textColor;

  return (
    <section
      className="mx-auto max-w-screen-2xl px-4 py-10 md:py-14"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p
            className="inline-block rounded-full px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: accent, color: '#ffffff' }}
          >
            Contact {client.name}
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">We&apos;re here to help</h1>
          <p className="text-lg text-neutral-300">
            Questions about products, manufacturing, or your order? Drop us a note and we&apos;ll
            get back within one business day.
          </p>

          <form className="space-y-4 rounded-2xl bg-white/5 p-6 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
                placeholder="How can we help?"
              />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
                placeholder="Tell us a bit about what you need."
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl px-4 py-3 text-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accent }}
              disabled
              aria-disabled="true"
              title="Submitting is disabled in this demo"
            >
              Send message
            </button>
            <p className="text-xs text-neutral-400">
              This form is a placeholder. We can wire it to email or your CRM next.
            </p>
          </form>
        </div>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-neutral-200">
          <div>
            <h2 className="text-lg font-semibold text-white">Support</h2>
            <p className="mt-1 text-neutral-300">
              Email us anytime and we&apos;ll reply within one business day.
            </p>
            <Link
              href="mailto:support@filamentfarmmfg.com"
              className="mt-2 inline-block text-white underline underline-offset-4"
            >
              support@filamentfarmmfg.com
            </Link>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h2 className="text-lg font-semibold text-white">Order questions</h2>
            <p className="mt-1 text-neutral-300">
              For order status or returns, include your order number so we can assist faster.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h2 className="text-lg font-semibold text-white">Partnerships</h2>
            <p className="mt-1 text-neutral-300">
              Interested in hosting your products on Filament Farm MFG? Let us know and we&apos;ll
              schedule a quick call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
