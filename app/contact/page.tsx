import ContactForm from 'components/contact/contact-form';
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
  const successMessage =
    client.contact?.successMessage ||
    `Thanks for contacting ${client.name}. We'll get back to you soon.`;

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

          <ContactForm accentColor={accent} successMessage={successMessage} />
        </div>
      </section>
      <div className="pb-30" />
      <Footer />
    </>
  );
}
