import Link from "next/link";

import { getLatestPosts } from "@/lib/posts";

export default function LatestPage() {
  const posts = getLatestPosts(30);

  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <header className="pt-10 sm:pt-16">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400">
            News feed
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
            Latest
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300/95">
            A single stream across all categories—useful for client demos and
            newsroom workflows.
          </p>
          <div className="mt-8 h-px w-full bg-white/10" />
        </header>

        <section className="py-10">
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/post/${p.slug}`}
                className="block px-6 py-5 hover:bg-white/5 transition"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                      {p.categoryLabel} • {p.dateLabel}
                    </p>
                    <p className="mt-1 text-base text-zinc-100">
                      {p.title}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-400">{p.minutes} min</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

