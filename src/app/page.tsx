import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { FEEDS } from "@/lib/feeds";
import { fetchAllFeeds } from "@/lib/rss";
import { format } from "date-fns";
import { PostImage } from "@/components/post-image";

export const revalidate = 0;

export default async function Home() {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured).slice(0, 3);
  const hero = featured[0] ?? all[0];
  const secondaries = featured.slice(1, 3).length === 2 ? featured.slice(1, 3) : all.slice(1, 3);
  const grid = all.slice(0, 9);
  const wire = await fetchAllFeeds(FEEDS, { perFeedLimit: 6, revalidateSeconds: 0 });
  const edition = format(new Date(), "EEE, d MMM yyyy");

  return (
    <div className="flex-1 bg-[#07070a] text-zinc-100">
      {/* Top dateline bar */}
      <div className="border-b border-white/8 bg-[#0e0e12]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            {edition}
          </p>
          <Link
            href="/news"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--za-red)] hover:text-red-400 transition"
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--za-red)]" />
            Live Wire
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

        {/* ── HERO BLOCK ─────────────────────────────────────────────── */}
        <section className="mt-6">
          <div className="grid grid-cols-1 gap-1 lg:grid-cols-3">

            {/* Main hero */}
            <Link
              href={`/post/${hero.slug}`}
              className="group relative block overflow-hidden bg-zinc-900 lg:col-span-2"
              style={{ minHeight: 420 }}
            >
              <PostImage
                src={hero.image}
                alt={hero.title}
                eager
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:opacity-80 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--za-red)]">
                  {hero.categoryLabel}
                </span>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                  {hero.title}
                </h2>
                <p className="mt-3 hidden text-sm leading-6 text-zinc-300 sm:line-clamp-2">
                  {hero.excerpt}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                  {hero.dateLabel} · {hero.minutes} min read
                </p>
              </div>
            </Link>

            {/* Two secondary stories */}
            <div className="flex flex-col gap-1">
              {secondaries.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="group relative block flex-1 overflow-hidden bg-zinc-900"
                  style={{ minHeight: 200 }}
                >
                  <PostImage
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-75 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--za-red)]">
                      {p.categoryLabel}
                    </span>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl leading-tight text-white sm:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY GRID ─────────────────────────────────────────────── */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="h-5 w-1 rounded-sm bg-[color:var(--za-red)]" />
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-zinc-200">
              Latest Stories
            </h2>
            <Link
              href="/latest"
              className="ml-auto text-[11px] uppercase tracking-[0.22em] text-zinc-400 hover:text-white transition"
            >
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((p) => (
              <Link
                key={p.slug}
                href={`/post/${p.slug}`}
                className="group block"
              >
                <div className="aspect-video overflow-hidden bg-zinc-900">
                  <PostImage
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--za-red)]">
                    {p.categoryLabel}
                  </span>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-zinc-100 group-hover:text-white transition">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    {p.dateLabel} · {p.minutes} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── LIVE WIRE ──────────────────────────────────────────────── */}
        <section className="mt-12 overflow-hidden border border-white/10">
          <div className="flex items-center gap-3 bg-[color:var(--za-red)] px-5 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-xs font-bold uppercase tracking-[0.26em] text-white">
              Live Wire
            </span>
            <Link
              href="/news"
              className="ml-auto text-xs text-white/80 hover:text-white transition underline underline-offset-2"
            >
              Open full wire →
            </Link>
          </div>

          {wire.length === 0 ? (
            <p className="px-5 py-6 text-sm text-zinc-400">
              No headlines loaded right now — check your network or visit{" "}
              <Link href="/news" className="text-zinc-200 underline">
                /news
              </Link>{" "}
              to retry.
            </p>
          ) : (
            <div className="grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3 lg:divide-x">
              {wire.slice(0, 6).map((it) => (
                <Link
                  key={`${it.sourceId}-${it.id}`}
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block px-5 py-4 hover:bg-white/5 transition"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                    {it.sourceName}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-zinc-200 line-clamp-3 group-hover:text-white transition">
                    {it.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <footer className="mt-12 pb-10">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-zinc-200 font-semibold">ZoomAfrica</span> — Africa in focus.
            </p>
            <p className="text-[11px] uppercase tracking-[0.26em]">{edition}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
