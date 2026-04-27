export default function ContactPage() {
  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400">
          Contact
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
          Let’s talk.
        </h1>
        <p className="mt-5 text-sm leading-7 text-zinc-300/95">
          For this showcase, contact details are placeholders. Replace with your
          newsroom email, WhatsApp, or a form that posts to your backend.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                Email
              </p>
              <p className="mt-1 text-sm text-white">hello@zoomafrica.news</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                Location
              </p>
              <p className="mt-1 text-sm text-white">Africa • Remote-first</p>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-white/10" />
          <p className="mt-6 text-sm leading-7 text-zinc-300/95">
            If you want, I can add a polished contact form with validation +
            email sending (Resend / SMTP) next.
          </p>
        </div>
      </div>
    </div>
  );
}

