import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400">
          About
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
          ZoomAfrica is a showcase newsroom.
        </h1>
        <p className="mt-5 text-sm leading-7 text-zinc-300/95">
          Built with Next.js for speed, SEO, and a modern editorial UI. Today it
          uses local Markdown content; tomorrow it can connect to a CMS or API.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
            What this demo includes
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-zinc-300/95">
            <li>
              <span className="text-white">Red/black</span> editorial theme with
              typography-forward layout
            </li>
            <li>Category pages and article pages</li>
            <li>Markdown-powered content structure for easy migration</li>
          </ul>
          <Link
            href="/latest"
            className="mt-5 inline-block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-white"
          >
            <span className="za-link">Browse latest</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

