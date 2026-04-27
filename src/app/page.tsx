import Link from "next/link";
import { ArrowRight, Flame, Leaf, Trophy } from "lucide-react";
import { getFeaturedPosts, getLatestPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/taxonomy";

export default function Home() {
  const featured = getFeaturedPosts();
  const latest = getLatestPosts(9);

  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="pt-10 sm:pt-16">
          <div className="rounded-2xl border border-white/10 bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(225,6,0,0.22),transparent_60%),radial-gradient(900px_circle_at_95%_20%,rgba(255,255,255,0.07),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400">
                    ZoomAfrica • Showcase newsroom
                  </p>
                  <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
                    Africa, in sharp focus.
                  </h1>
                  <p className="mt-4 max-w-2xl text-zinc-300/95 leading-7">
                    A red-and-black editorial experience designed for impact:
                    fast, modern, and easy to extend with real news content.
                  </p>
                </div>
                <div className="hidden sm:grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <Flame className="h-4 w-4 text-[color:var(--za-red)]" />
                      Breaking-style hero
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Dramatic typographic lead.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <Leaf className="h-4 w-4 text-[color:var(--za-red)]" />
                      Climate + nature
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Clean, readable stories.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <Trophy className="h-4 w-4 text-[color:var(--za-red)]" />
                      Sports coverage
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Fast category browsing.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <ArrowRight className="h-4 w-4 text-[color:var(--za-red)]" />
                      SEO-ready
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Metadata + sitemap setup.
                    </p>
                  </div>
                </div>
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
              </div>
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
                  className="group block rounded-2xl border border-white/10 bg-white/5 px-5 py-5 hover:bg-white/7.5 transition"
                >
                  <div className="flex items-center justify-between gap-4">
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
                    className="group block border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                      {p.categoryLabel}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-200 group-hover:text-white">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(225,6,0,0.18),rgba(255,255,255,0.04))] p-6">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-200">
                Client demo note
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-200/95">
                This build uses local Markdown content now, but it’s structured
                to swap in a CMS (Sanity, Strapi, WordPress, or a custom API)
                with minimal UI changes.
              </p>
              <Link
                href="/about"
                className="mt-4 inline-flex items-center gap-2 text-sm text-white"
              >
                <span className="za-link">About ZoomAfrica</span>
                <ArrowRight className="h-4 w-4 text-[color:var(--za-red)]" />
              </Link>
            </div>
          </aside>
        </section>

        <footer className="mt-14 pb-10">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-zinc-200">ZoomAfrica</span> — showcase
              newsroom experience.
            </p>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em]">
              Red / Black Editorial UI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
