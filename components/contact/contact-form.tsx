'use client';

import { FormEvent, useState } from 'react';

type ContactFormProps = {
  accentColor: string;
  successMessage: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type ApiResponse = {
  success: boolean;
  message: string;
};

export default function ContactForm({
  accentColor,
  successMessage
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setFeedbackMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? '')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.success) {
        setStatus('error');
        setFeedbackMessage(data.message || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setFeedbackMessage(data.message || successMessage);
      form.reset();
    } catch {
      setStatus('error');
      setFeedbackMessage('Unable to send your message right now. Please try again.');
    }
  }

  const buttonLabel = status === 'submitting' ? 'Sending...' : 'Send message';
  const isSubmitting = status === 'submitting';

  return (
    <form
      className="w-full max-w-2xl space-y-4 rounded-2xl bg-white/5 p-6 text-left backdrop-blur"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
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
            maxLength={320}
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
          maxLength={150}
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
          minLength={10}
          maxLength={5000}
          className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
          placeholder="Tell us a bit about what you need."
        />
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl px-4 py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        style={{ backgroundColor: accentColor }}
        disabled={isSubmitting}
      >
        {buttonLabel}
      </button>

      {feedbackMessage ? (
        <p
          className={`text-sm ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {feedbackMessage}
        </p>
      ) : null}
    </form>
  );
}
