import Link from "next/link";

import { FEEDS } from "@/lib/feeds";
import { fetchAllFeeds } from "@/lib/rss";
import { getCategoryBySlug } from "@/lib/taxonomy";

function badgeClass(sourceId: string) {
  // small visual variation across sources
  const hues = ["bg-white/5", "bg-[rgba(225,6,0,0.10)]", "bg-white/7.5"];
  const idx =
    sourceId
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0) % hues.length;
  return hues[idx];
}

export default async function NewsPage() {
  const items = await fetchAllFeeds(FEEDS, {
    perFeedLimit: 12,
    revalidateSeconds: 600,
  });

  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="pt-10 sm:pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--za-red)] shadow-[0_0_0_6px_rgba(225,6,0,0.12)]" />
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-200">
              Live RSS headlines
            </span>
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
            Newsroom Wire
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300/95">
            Real headlines pulled from RSS sources (updated every ~10 minutes).
            Click “Read at source” to view the full story on the publisher’s
            site.
          </p>
          <div className="mt-8 h-px w-full bg-white/10" />
        </header>

        <section className="py-10">
          <div className="grid gap-5 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
                  Sources
                </h2>
                <p className="mt-2 text-sm leading-7 text-zinc-300/95">
                  Replace these with your preferred publishers anytime.
                </p>
                <div className="mt-5 space-y-3">
                  {FEEDS.map((f) => (
                    <div
                      key={f.id}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <p className="text-sm text-white">{f.name}</p>
                      <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                        {f.category ? getCategoryBySlug(f.category)?.label ?? f.category : "General"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(225,6,0,0.18),rgba(255,255,255,0.04))] p-6">
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-200">
                  Newspaper-style layout
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-200/95">
                  This page is built like a wire service: strong hierarchy,
                  dense headlines, and fast scanning—BBC-like red accents on
                  ink-black.
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-300">
                  No items loaded. Some feeds block requests occasionally—try
                  refreshing, or swap to different RSS sources.
                </div>
              ) : (
                <div className="space-y-4">
                  {items.slice(0, 36).map((it, idx) => (
                    <article
                      key={`${it.sourceId}-${it.id}`}
                      className="group rounded-2xl border border-white/10 bg-white/5 px-6 py-5 hover:border-white/20 hover:bg-white/10 transition"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border border-white/10 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-zinc-200 ${badgeClass(
                            it.sourceId,
                          )}`}
                        >
                          {it.sourceName}
                        </span>
                        {it.categoryHint ? (
                          <span className="rounded-full border border-white/10 bg-[rgba(225,6,0,0.10)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-zinc-200">
                            {getCategoryBySlug(it.categoryHint)?.label ?? it.categoryHint}
                          </span>
                        ) : null}
                        {idx < 4 ? (
                          <span className="rounded-full border border-white/10 bg-[rgba(225,6,0,0.14)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-zinc-200">
                            Top
                          </span>
                        ) : null}
                      </div>

                      <h2 className="mt-3 text-xl leading-7 text-zinc-50 group-hover:text-white">
                        {it.title}
                      </h2>
                      {it.excerpt ? (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-300/90">
                          {it.excerpt}
                        </p>
                      ) : null}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                          {it.publishedAt ? new Date(it.publishedAt).toLocaleString() : "—"}
                        </p>
                        <Link
                          href={it.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-white"
                        >
                          <span className="za-link">Read at source</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="pb-12">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-zinc-200">ZoomAfrica</span> — live RSS wire.
            </p>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em]">
              Accent: <span className="text-[color:var(--za-red)]">Red</span> • Base: Black
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

