import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { FEEDS } from "@/lib/feeds";
import { fetchAllFeeds } from "@/lib/rss";
import { format } from "date-fns";
import { PostImage } from "@/components/post-image";

export const revalidate = 0;

export default async function Home() {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  const hero   = featured[0] ?? all[0];
  const second = featured[1] ?? all[1];
  const third  = featured[2] ?? all[2];
  const sideStories = [second, third, all[3]].filter(Boolean);
  const gridStories = all.slice(0, 8);
  const moreStories = all.slice(8, 12);

  const wire = await fetchAllFeeds(FEEDS, { perFeedLimit: 8, revalidateSeconds: 0 });
  const edition = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-white text-[#0c0c0c]">

      {/* ── BREAKING NEWS TICKER ────────────────────────────────── */}
      {wire.length > 0 && (
        <div className="flex items-center gap-0 overflow-hidden border-b border-[#e0e0e0] bg-white">
          <span className="shrink-0 bg-[#cc0000] px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-white">
            Breaking
          </span>
          <div className="ticker-wrap flex-1 py-2.5 px-4">
            <span className="ticker-text text-[12px] font-semibold text-[#0c0c0c]">
              {wire.slice(0, 4).map((it) => `${it.title}   ·   `).join("")}
            </span>
          </div>
          <Link
            href="/news"
            className="shrink-0 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#cc0000] hover:underline"
          >
            Full Wire →
          </Link>
        </div>
      )}

      {/* ── DATE EDITION BAR ────────────────────────────────────── */}
      <div className="border-b border-[#e0e0e0] bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#595959]">
            {edition}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

        {/* ── HERO SECTION ────────────────────────────────────────── */}
        <section className="mt-6 border-b border-[#e0e0e0] pb-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* Main hero story */}
            <div className="lg:col-span-7">
              <Link href={`/post/${hero.slug}`} className="group block">
                <div className="overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
                  <PostImage
                    src={hero.image}
                    alt={hero.title}
                    eager
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#cc0000]">
                    {hero.categoryLabel}
                  </span>
                  <h1 className="mt-1.5 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#0c0c0c] group-hover:text-[#cc0000] transition sm:text-5xl">
                    {hero.title}
                  </h1>
                  <p className="mt-2 text-base leading-7 text-[#595959]">
                    {hero.excerpt}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-widest text-[#999]">
                    {hero.dateLabel} · {hero.minutes} min read
                  </p>
                </div>
              </Link>
            </div>

            {/* Side stories */}
            <div className="flex flex-col gap-0 divide-y divide-[#e0e0e0] lg:col-span-5">
              {sideStories.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="h-24 w-36 shrink-0 overflow-hidden bg-[#f5f5f5] sm:h-28 sm:w-44">
                    <PostImage
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                      {p.categoryLabel}
                    </span>
                    <h3 className="mt-1 text-base font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#595959]">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST STORIES GRID ─────────────────────────────────── */}
        <section className="mt-8 border-b border-[#e0e0e0] pb-8">
          <div className="mb-5 flex items-end justify-between">
            <span className="section-title">Latest Stories</span>
            <Link
              href="/latest"
              className="text-[11px] font-bold uppercase tracking-widest text-[#cc0000] hover:underline"
            >
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gridStories.map((p) => (
              <Link key={p.slug} href={`/post/${p.slug}`} className="group block">
                <div className="overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
                  <PostImage
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                    {p.categoryLabel}
                  </span>
                  <h3 className="mt-1 text-[15px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-[#999]">
                    {p.dateLabel}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── MORE STORIES ────────────────────────────────────────── */}
        {moreStories.length > 0 && (
          <section className="mt-8 border-b border-[#e0e0e0] pb-8">
            <div className="mb-5">
              <span className="section-title">More from Africa</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreStories.map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-4">
                  <div className="h-20 w-28 shrink-0 overflow-hidden bg-[#f5f5f5]">
                    <PostImage
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                      {p.categoryLabel}
                    </span>
                    <h3 className="mt-1 text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── LIVE NEWS WIRE ──────────────────────────────────────── */}
        <section className="mt-8 pb-10">
          <div className="mb-0 flex items-center gap-4 bg-[#cc0000] px-5 py-3">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-[13px] font-black uppercase tracking-widest text-white">
              Live News Wire
            </span>
            <Link
              href="/news"
              className="ml-auto text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition"
            >
              Open full wire →
            </Link>
          </div>

          {wire.length === 0 ? (
            <div className="border border-t-0 border-[#e0e0e0] px-5 py-8 text-sm text-[#595959]">
              No live headlines at the moment.{" "}
              <Link href="/news" className="text-[#cc0000] underline">
                Retry at /news
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 divide-y divide-[#e0e0e0] border border-t-0 border-[#e0e0e0] sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
              {wire.slice(0, 6).map((it) => (
                <Link
                  key={`${it.sourceId}-${it.id}`}
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block px-5 py-4 hover:bg-[#f5f5f5] transition"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                    {it.sourceName}
                  </p>
                  <p className="mt-1.5 text-[14px] font-semibold leading-snug text-[#0c0c0c] line-clamp-3 group-hover:text-[#cc0000] transition">
                    {it.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[#0c0c0c] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="border-b border-white/10 py-8">
            <div className="flex flex-wrap gap-6">
              {["World", "Politics", "Business", "Health", "Entertainment", "Tech", "Travel", "Sports"].map((item) => (
                <Link key={item} href="/latest" className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 py-6 text-[12px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-7 items-center rounded bg-[#cc0000] px-2 font-[family-name:var(--font-display)] text-base leading-none tracking-wider text-white">
                ZOOM
              </span>
              <span className="font-bold text-zinc-300">ZoomAfrica</span>
              <span>— Africa in Focus</span>
            </div>
            <p className="uppercase tracking-widest">{edition}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
