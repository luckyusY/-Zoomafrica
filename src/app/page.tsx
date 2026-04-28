import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedPosts, getLatestPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/taxonomy";
import { FEEDS } from "@/lib/feeds";
import { fetchAllFeeds } from "@/lib/rss";
import { format } from "date-fns";

export const revalidate = 0;

export default async function Home() {
  const featured = getFeaturedPosts();
  const latest = getLatestPosts(9);
  const wire = await fetchAllFeeds(FEEDS, {
    perFeedLimit: 6,
    revalidateSeconds: 0,
  });
  const edition = format(new Date(), "EEE, d MMM yyyy");

  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="pt-10 sm:pt-16">
          <div className="rounded-2xl border border-white/10 bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(225,6,0,0.22),transparent_60%),radial-gradient(900px_circle_at_95%_20%,rgba(255,255,255,0.07),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400">
                    Today’s front page
                  </p>
                  <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
                    Africa, in sharp focus.
                  </h1>
                  <p className="mt-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-zinc-400">
                    {edition}
                  </p>
                  <p className="mt-4 max-w-2xl text-zinc-300/95 leading-7">
                    Real headlines from public RSS sources—presented in a
                    newspaper front-page layout, with a BBC-style red on black
                    look.
                  </p>
                </div>
                <div className="hidden sm:block" />
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-zinc-200 hover:border-white/20 hover:bg-white/10 transition"
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--za-red)]" />
                    {c.label}
                  </Link>
                ))}
                <Link
                  href="/news"
                  className="rounded-full border border-[color:var(--za-red)]/40 bg-[rgba(225,6,0,0.10)] px-3 py-1.5 text-xs tracking-wide text-white hover:bg-[rgba(225,6,0,0.16)] transition"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--za-red)] shadow-[0_0_0_6px_rgba(225,6,0,0.12)]" />
                  Live News Wire
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[color:var(--za-red)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-white">
                  Breaking
                </span>
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-zinc-300">
                  Live wire
                </p>
              </div>
              <Link
                href="/news"
                className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-white"
              >
                <span className="za-link">Open wire</span>
              </Link>
            </div>
            {wire.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-300/95">
                No headlines were loaded from RSS right now. Check your network
                or open <span className="text-zinc-200">/news</span> to retry in
                a few minutes.
              </p>
            ) : null}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {wire.slice(0, 6).map((it) => (
                <Link
                  key={`${it.sourceId}-${it.id}`}
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-white/5 transition"
                >
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                    {it.sourceName}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-100 group-hover:text-white">
                    {it.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
                Featured
              </h2>
              <Link
                href="/latest"
                className="za-link font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-zinc-300"
              >
                See all
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/7.5 transition"
                >
                  {p.image && (
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition duration-500"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-4 px-5 py-5">
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                        {p.categoryLabel} • {p.dateLabel}
                      </p>
                      <h3 className="mt-2 text-xl leading-7 text-zinc-50 group-hover:text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-300/90">
                        {p.excerpt}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition">
                      <ArrowRight className="h-4 w-4 text-[color:var(--za-red)]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
                  Latest
                </h2>
                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                  Updated daily
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {latest.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/post/${p.slug}`}
                    className="group flex items-start gap-3 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    {p.image && (
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10">
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover opacity-75 group-hover:opacity-100 transition"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = "none"; }}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                        {p.categoryLabel}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-zinc-200 group-hover:text-white">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </section>

        <footer className="mt-14 pb-10">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-zinc-200">ZoomAfrica</span> — an African news
              experience.
            </p>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em]">
              {edition}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
