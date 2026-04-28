import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { FEEDS } from "@/lib/feeds";
import { fetchAllFeeds } from "@/lib/rss";
import { format } from "date-fns";
import { PostImage } from "@/components/post-image";

export const revalidate = 0;

/* ─── tiny helpers ─────────────────────────────────────────────────── */

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-[#cc0000]">
      {label}
    </span>
  );
}

function Timestamp({ label, mins }: { label: string; mins: number }) {
  return (
    <span className="mt-1 block text-[10px] uppercase tracking-widest text-[#999]">
      {label} · {mins} min read
    </span>
  );
}

function SectionBar({
  label,
  href,
  color = "#1a1a1a",
}: {
  label: string;
  href?: string;
  color?: string;
}) {
  return (
    <div
      className="mb-4 flex items-center justify-between px-3 py-2"
      style={{ background: color }}
    >
      <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white">
        {label}
      </span>
      {href && (
        <Link
          href={href}
          className="text-[10px] uppercase tracking-widest text-white/70 hover:text-white transition"
        >
          See all →
        </Link>
      )}
    </div>
  );
}

/* ─── page ─────────────────────────────────────────────────────────── */

export default async function Home() {
  const all = getAllPosts();
  const wire = await fetchAllFeeds(FEEDS, { perFeedLimit: 8, revalidateSeconds: 0 });
  const edition = format(new Date(), "EEEE, MMMM d, yyyy");

  // story buckets
  const hero      = all[0];
  const sidebar   = all.slice(1, 5);
  const strip     = all.slice(0, 4);        // 4-col strip
  const topStories = all.slice(0, 3);
  const health    = all.filter((p) => p.category === "health");
  const politics  = all.filter((p) => p.category === "politics");
  const environ   = all.filter((p) => p.category === "environment");
  const sports    = all.filter((p) => p.category === "sports");
  const travel    = all.filter((p) => p.category === "tourism");
  const agri      = all.filter((p) => p.category === "agriculture");
  const energy    = all.filter((p) => p.category === "energy");
  const shorts    = all.slice(0, 6);
  const moreStories = all.slice(3, 7);

  return (
    <div className="min-h-screen bg-white text-[#0c0c0c]">

      {/* ══ BREAKING TICKER ═══════════════════════════════════════════ */}
      {wire.length > 0 && (
        <div className="flex items-stretch overflow-hidden border-b border-[#e0e0e0]">
          <span className="shrink-0 bg-[#cc0000] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white flex items-center">
            Breaking News
          </span>
          <div className="flex-1 overflow-hidden py-2 px-4">
            <div className="ticker-text text-[12px] font-semibold text-[#0c0c0c] whitespace-nowrap">
              {wire.slice(0, 5).map((it) => `${it.title}   ●   `).join("")}
            </div>
          </div>
          <Link href="/news" className="shrink-0 flex items-center px-4 text-[11px] font-bold text-[#cc0000] hover:underline border-l border-[#e0e0e0]">
            LIVE WIRE
          </Link>
        </div>
      )}

      {/* ══ EDITION DATE ══════════════════════════════════════════════ */}
      <div className="border-b border-[#e0e0e0] bg-[#f5f5f5] px-4 py-1.5 sm:px-6">
        <p className="mx-auto max-w-7xl text-[10px] font-medium uppercase tracking-widest text-[#999]">
          {edition}
        </p>
      </div>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════════ */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

        {/* ── HERO BLOCK ─────────────────────────────────────────────── */}
        <div className="mt-4 grid grid-cols-1 gap-0 border border-[#e0e0e0] lg:grid-cols-12">

          {/* Main hero story */}
          <div className="border-b border-[#e0e0e0] lg:col-span-8 lg:border-b-0 lg:border-r">
            <Link href={`/post/${hero.slug}`} className="group block">
              <div className="overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: "16/9" }}>
                <PostImage
                  src={hero.image}
                  alt={hero.title}
                  eager
                  className="h-full w-full object-cover transition duration-600 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-4">
                <CategoryBadge label={hero.categoryLabel} />
                <h1 className="mt-1.5 text-2xl font-black leading-tight text-[#0c0c0c] group-hover:text-[#cc0000] transition sm:text-3xl">
                  {hero.title}
                </h1>
                <p className="mt-2 text-[13px] leading-6 text-[#595959] line-clamp-3">
                  {hero.excerpt}
                </p>
                <Timestamp label={hero.dateLabel} mins={hero.minutes} />
              </div>
            </Link>
          </div>

          {/* Sidebar stories */}
          <div className="lg:col-span-4">
            <div className="divide-y divide-[#e0e0e0]">
              {sidebar.map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-[72px] w-[100px] shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CategoryBadge label={p.categoryLabel} />
                    <p className="mt-0.5 text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4-COLUMN STRIP ─────────────────────────────────────────── */}
        <div className="mt-4 grid grid-cols-2 gap-0 border border-[#e0e0e0] sm:grid-cols-4">
          {strip.map((p, i) => (
            <Link
              key={p.slug}
              href={`/post/${p.slug}`}
              className={`group block p-3 hover:bg-[#f9f9f9] transition ${i < strip.length - 1 ? "border-b border-[#e0e0e0] sm:border-b-0 sm:border-r" : ""}`}
            >
              <div className="overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: "16/9" }}>
                <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-400" />
              </div>
              <CategoryBadge label={p.categoryLabel} />
              <p className="mt-0.5 text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                {p.title}
              </p>
            </Link>
          ))}
        </div>

        {/* ── MORE TOP STORIES ───────────────────────────────────────── */}
        <div className="mt-6">
          <SectionBar label="More Top Stories" href="/latest" />
          <div className="grid grid-cols-1 gap-0 border border-[#e0e0e0] sm:grid-cols-3">
            {topStories.map((p, i) => (
              <Link
                key={p.slug}
                href={`/post/${p.slug}`}
                className={`group block p-4 hover:bg-[#f9f9f9] transition ${i < topStories.length - 1 ? "border-b border-[#e0e0e0] sm:border-b-0 sm:border-r" : ""}`}
              >
                <div className="overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: "16/9" }}>
                  <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-400" />
                </div>
                <div className="mt-2">
                  <CategoryBadge label={p.categoryLabel} />
                  <p className="mt-1 text-[14px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                    {p.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#595959]">
                    {p.excerpt}
                  </p>
                  <Timestamp label={p.dateLabel} mins={p.minutes} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── TWO-PANEL SECTIONS: HEALTH | POLITICS ──────────────────── */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Health & Wellness */}
          <div className="border border-[#e0e0e0]">
            <SectionBar label="Health &amp; Wellness" href="/category/health" color="#1a1a1a" />
            <div className="divide-y divide-[#e0e0e0]">
              {(health.length > 0 ? health : all.slice(5, 8)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Politics */}
          <div className="border border-[#e0e0e0]">
            <SectionBar label="Politics" href="/category/politics" color="#1a1a1a" />
            <div className="divide-y divide-[#e0e0e0]">
              {(politics.length > 0 ? politics : all.slice(2, 5)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── TWO-PANEL SECTIONS: ENVIRONMENT | ENERGY ───────────────── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="border border-[#e0e0e0]">
            <SectionBar label="Environment" href="/category/environment" color="#2d6a2d" />
            <div className="divide-y divide-[#e0e0e0]">
              {(environ.length > 0 ? environ : all.slice(6, 9)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-[#e0e0e0]">
            <SectionBar label="Energy & Climate" href="/category/energy" color="#b8640a" />
            <div className="divide-y divide-[#e0e0e0]">
              {(energy.length > 0 ? energy : all.slice(7, 10)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── LIVE NEWS WIRE (CNN "Breaking" style) ──────────────────── */}
        <div className="mt-6">
          <SectionBar label="🔴  Live News Wire" href="/news" color="#cc0000" />
          {wire.length > 0 ? (
            <div className="grid grid-cols-1 gap-0 border border-t-0 border-[#e0e0e0] sm:grid-cols-2 lg:grid-cols-3">
              {wire.slice(0, 6).map((it) => (
                <Link
                  key={`${it.sourceId}-${it.id}`}
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block border-b border-[#e0e0e0] p-4 hover:bg-[#f9f9f9] transition last:border-b-0 sm:[&:nth-child(2)]:border-r sm:[&:nth-child(3)]:border-r sm:[&:nth-child(5)]:border-r"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                    {it.sourceName}
                  </p>
                  <p className="mt-1 text-[13px] font-bold leading-snug text-[#0c0c0c] line-clamp-3 group-hover:text-[#cc0000] transition">
                    {it.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="border border-t-0 border-[#e0e0e0] p-4 text-sm text-[#595959]">
              No live headlines right now —{" "}
              <Link href="/news" className="text-[#cc0000] underline">open /news</Link> to retry.
            </p>
          )}
        </div>

        {/* ── TRAVEL & LIVING | AGRICULTURE ──────────────────────────── */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border border-[#e0e0e0]">
            <SectionBar label="Travel &amp; Living" href="/category/tourism" color="#1a5276" />
            <div className="divide-y divide-[#e0e0e0]">
              {(travel.length > 0 ? travel : all.slice(8, 11)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-[#e0e0e0]">
            <SectionBar label="Agriculture" href="/category/agriculture" color="#5d6e1e" />
            <div className="divide-y divide-[#e0e0e0]">
              {(agri.length > 0 ? agri : all.slice(9, 12)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── SPORTS | EDUCATION ─────────────────────────────────────── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border border-[#e0e0e0]">
            <SectionBar label="Sports" href="/category/sports" color="#0d3b6e" />
            <div className="divide-y divide-[#e0e0e0]">
              {(sports.length > 0 ? sports : all.slice(3, 6)).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-[#e0e0e0]">
            <SectionBar label="Education &amp; Tech" href="/category/education" color="#4a235a" />
            <div className="divide-y divide-[#e0e0e0]">
              {all.filter((p) => p.category === "education").concat(all).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-16 w-24 shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                    <Timestamp label={p.dateLabel} mins={p.minutes} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── "ZoomAfrica SHORTS" horizontal strip (like CNN Shorts) ─── */}
        <div className="mt-6">
          <SectionBar label="ZoomAfrica Shorts" color="#0c0c0c" />
          <div className="flex gap-3 overflow-x-auto pb-2 border border-t-0 border-[#e0e0e0] p-3">
            {shorts.map((p) => (
              <Link
                key={p.slug}
                href={`/post/${p.slug}`}
                className="group block shrink-0 w-36"
              >
                <div className="h-24 w-36 overflow-hidden rounded bg-[#f0f0f0] relative">
                  <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-[9px] font-black uppercase tracking-wider text-white">
                    {p.categoryLabel}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] font-bold leading-tight text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-2">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── MORE FROM ZOOMAFRICA ────────────────────────────────────── */}
        <div className="mt-6">
          <SectionBar label="More from ZoomAfrica" href="/latest" color="#1a1a1a" />
          <div className="grid grid-cols-1 gap-0 border border-t-0 border-[#e0e0e0] sm:grid-cols-2">
            {moreStories.map((p, i) => (
              <Link
                key={p.slug}
                href={`/post/${p.slug}`}
                className={`group flex gap-3 p-4 hover:bg-[#f9f9f9] transition
                  ${i % 2 === 0 && i !== moreStories.length - 1 ? "sm:border-r border-[#e0e0e0]" : ""}
                  ${i < moreStories.length - 2 ? "border-b border-[#e0e0e0]" : ""}
                `}
              >
                <div className="h-20 w-28 shrink-0 overflow-hidden bg-[#f0f0f0]">
                  <PostImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-400" />
                </div>
                <div className="min-w-0">
                  <CategoryBadge label={p.categoryLabel} />
                  <p className="mt-0.5 text-[14px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                    {p.title}
                  </p>
                  <Timestamp label={p.dateLabel} mins={p.minutes} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* spacing before footer */}
        <div className="h-10" />
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════════ */}
      <footer className="bg-[#0c0c0c]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          {/* Logo row */}
          <div className="flex items-center gap-4 border-b border-white/10 py-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 items-center rounded bg-[#cc0000] px-3 font-[family-name:var(--font-display)] text-xl leading-none tracking-wider text-white">
                ZOOM
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl tracking-wide text-white">
                AFRICA
              </span>
            </Link>
            <span className="ml-auto text-[11px] uppercase tracking-widest text-zinc-500">
              Africa in Focus
            </span>
          </div>

          {/* Nav links grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 py-6 sm:grid-cols-4">
            {[
              ["Home", "/"],
              ["Politics", "/category/politics"],
              ["Environment", "/category/environment"],
              ["Health", "/category/health"],
              ["Energy", "/category/energy"],
              ["Agriculture", "/category/agriculture"],
              ["Education", "/category/education"],
              ["Sports", "/category/sports"],
              ["Tourism", "/category/tourism"],
              ["Biodiversity", "/category/biodiversity"],
              ["Climate", "/category/climate-change"],
              ["Live Wire", "/news"],
              ["Latest", "/latest"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="py-1 text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white transition"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-4 text-[11px] text-zinc-600">
            © {new Date().getFullYear()} ZoomAfrica. All rights reserved. For demonstration purposes.
          </div>
        </div>
      </footer>
    </div>
  );
}
