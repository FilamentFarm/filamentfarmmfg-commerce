import Link from 'next/link';
import Footer from 'components/layout/footer';
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
    <>
      <section
        className="mx-auto max-w-screen-2xl px-4 py-10 md:py-14"
        style={{ backgroundColor: bg, color: text }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Contact {client.name}</h1>
          <p className="text-base font-semibold text-neutral-300">
            We&apos;re here to help.
          </p>
          <p className="max-w-2xl text-lg text-neutral-300">
            Questions about products, manufacturing, or your order? Drop us a note and we&apos;ll
            get back within one business day.
          </p>

          <form className="w-full max-w-2xl space-y-4 rounded-2xl bg-white/5 p-6 text-left backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
                />
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
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
            <p className="text-center text-xs text-neutral-400">
              This form is a placeholder. We can wire it to email or your CRM next. Need help now?{' '}
              <Link
                href="mailto:support@filamentfarmmfg.com"
                className="text-white underline underline-offset-4"
              >
                support@filamentfarmmfg.com
              </Link>
            </p>
          </form>
        </div>
      </section>
      <div className="pb-12" />
      <Footer />
    </>
  );
}
