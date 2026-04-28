import Link from "next/link";
import { getAllPosts, type Post } from "@/lib/posts";
import { FEEDS } from "@/lib/feeds";
import { fetchAllFeeds } from "@/lib/rss";
import { format } from "date-fns";
import { PostImage } from "@/components/post-image";

export const revalidate = 0;

/* ─── CNN-style section title: left black bar + uppercase bold label ─── */
function SectionTitle({ label, href }: { label: string; href?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-[#e0e0e0] pb-2">
      <div className="flex items-center gap-2">
        <span className="inline-block w-1 self-stretch bg-[#0c0c0c]" />
        <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0c0c0c]">
          {label}
        </span>
      </div>
      {href && (
        <Link href={href} className="text-[10px] font-bold uppercase tracking-widest text-[#cc0000] hover:underline">
          See all →
        </Link>
      )}
    </div>
  );
}

/* ─── CNN card: big image + headline + optional secondary below ─────── */
function BigCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="group block">
      <div className="overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: "16/9" }}>
        <PostImage
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
          {post.categoryLabel}
        </span>
        <h3 className="mt-0.5 text-[16px] font-black leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

/* ─── CNN small secondary card: tiny thumb + headline ────────────────── */
function SmallCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="group flex items-start gap-2.5 border-t border-[#e0e0e0] pt-3 mt-3">
      <div className="h-[60px] w-[90px] shrink-0 overflow-hidden bg-[#f0f0f0]">
        <PostImage
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.05]"
        />
      </div>
      <p className="flex-1 text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
        {post.title}
      </p>
    </Link>
  );
}

/* ─── Sidebar story row (dark bg) ─────────────────────────────────── */
function DarkSideRow({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="group flex items-start gap-3 border-t border-white/10 pt-3 mt-3 first:border-t-0 first:pt-0 first:mt-0">
      <div className="h-[58px] w-[90px] shrink-0 overflow-hidden bg-[#333]">
        <PostImage
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.05]"
        />
      </div>
      <p className="flex-1 text-[13px] font-bold leading-snug text-white group-hover:text-[#cc0000] transition line-clamp-3">
        {post.title}
      </p>
    </Link>
  );
}

/* ─── page ─────────────────────────────────────────────────────────── */
export default async function Home() {
  const all = getAllPosts();
  const wire = await fetchAllFeeds(FEEDS, { perFeedLimit: 8, revalidateSeconds: 0 });
  const edition = format(new Date(), "EEEE, MMMM d, yyyy");

  const byCategory = (cat: string) => all.filter((p) => p.category === cat);

  // story buckets
  const hero      = all[0];
  const sidebar   = all.slice(1, 5);
  const strip     = all.slice(0, 4);
  const featured3 = all.slice(0, 3);
  const politics  = byCategory("politics");
  const health    = byCategory("health");
  const environ   = byCategory("environment");
  const energy    = byCategory("energy");
  const sports    = byCategory("sports");
  const travel    = byCategory("tourism");
  const agri      = byCategory("agriculture");
  const edu       = byCategory("education");
  const bio       = byCategory("biodiversity");

  // fallback: if a category has fewer than needed, pad from `all`
  const fill = (arr: Post[], n: number) =>
    [...arr, ...all.filter((p) => !arr.includes(p))].slice(0, n);

  return (
    <div className="min-h-screen bg-white text-[#0c0c0c]">

      {/* ══ BREAKING TICKER ═══════════════════════════════════════════ */}
      {wire.length > 0 && (
        <div className="flex items-stretch overflow-hidden bg-white border-b border-[#e0e0e0]">
          <span className="shrink-0 bg-[#cc0000] px-4 flex items-center text-[11px] font-black uppercase tracking-[0.18em] text-white">
            Breaking News
          </span>
          <div className="flex-1 overflow-hidden px-4 py-2">
            <div className="ticker-text text-[12px] font-semibold text-[#0c0c0c] whitespace-nowrap">
              {wire.slice(0, 5).map((it) => `${it.title}   ●   `).join("")}
            </div>
          </div>
          <Link href="/news" className="shrink-0 flex items-center px-4 border-l border-[#e0e0e0] text-[11px] font-bold text-[#cc0000] hover:underline">
            LIVE
          </Link>
        </div>
      )}

      {/* ══ EDITION BAR ═══════════════════════════════════════════════ */}
      <div className="border-b border-[#e0e0e0] bg-[#f5f5f5] py-1.5 px-4 sm:px-6">
        <p className="mx-auto max-w-7xl text-[10px] font-medium uppercase tracking-widest text-[#999]">{edition}</p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

        {/* ══ HERO + SIDEBAR ════════════════════════════════════════════ */}
        <section className="mt-5 grid grid-cols-1 gap-px border border-[#e0e0e0] bg-[#e0e0e0] lg:grid-cols-12">

          {/* Hero story */}
          <Link href={`/post/${hero.slug}`} className="group block bg-white lg:col-span-8">
            <div className="overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: "16/9" }}>
              <PostImage src={hero.image} alt={hero.title} eager
                className="h-full w-full object-cover transition duration-600 group-hover:scale-[1.02]" />
            </div>
            <div className="p-5">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#cc0000]">{hero.categoryLabel}</span>
              <h1 className="mt-1 text-[22px] font-black leading-tight text-[#0c0c0c] group-hover:text-[#cc0000] transition sm:text-[26px]">
                {hero.title}
              </h1>
              <p className="mt-2 text-[13px] leading-6 text-[#595959] line-clamp-3">{hero.excerpt}</p>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-[#999]">{hero.dateLabel} · {hero.minutes} min read</p>
            </div>
          </Link>

          {/* Sidebar */}
          <div className="bg-white lg:col-span-4">
            <div className="divide-y divide-[#e0e0e0]">
              {sidebar.map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group flex gap-3 p-3 hover:bg-[#f9f9f9] transition">
                  <div className="h-[70px] w-[100px] shrink-0 overflow-hidden bg-[#f0f0f0]">
                    <PostImage src={p.image} alt={p.title}
                      className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.05]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">{p.categoryLabel}</span>
                    <p className="mt-0.5 text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4-COLUMN STRIP ════════════════════════════════════════════ */}
        <section className="mt-5 grid grid-cols-2 gap-px border border-[#e0e0e0] bg-[#e0e0e0] sm:grid-cols-4">
          {strip.map((p) => (
            <Link key={p.slug} href={`/post/${p.slug}`} className="group block bg-white p-3 hover:bg-[#f9f9f9] transition">
              <div className="overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: "16/9" }}>
                <PostImage src={p.image} alt={p.title}
                  className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.04]" />
              </div>
              <span className="mt-1.5 block text-[10px] font-black uppercase tracking-widest text-[#cc0000]">{p.categoryLabel}</span>
              <p className="mt-0.5 text-[13px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-3">
                {p.title}
              </p>
            </Link>
          ))}
        </section>

        {/* ══ 3-COL: ENVIRONMENT | HEALTH | POLITICS ════════════════════
            CNN pattern: big image + headline + one small secondary card   */}
        <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { label: "Environment", posts: fill(environ, 2) },
            { label: "Health & Wellness", posts: fill(health, 2) },
            { label: "Politics", posts: fill(politics, 2) },
          ].map(({ label, posts }) => (
            <div key={label}>
              <SectionTitle label={label} href={`/category/${label.toLowerCase().split(" ")[0]}`} />
              <BigCard post={posts[0]} />
              {posts[1] && <SmallCard post={posts[1]} />}
            </div>
          ))}
        </section>

        {/* ══ "MORE FROM ZOOMAFRICA" — dark featured section ════════════
            CNN pattern: big image left with text overlay + stacked right  */}
        <section className="mt-8 bg-[#1a1a1a]">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Left: large feature with gradient overlay */}
            <Link href={`/post/${all[5]?.slug ?? all[0].slug}`} className="group relative block lg:col-span-7"
              style={{ minHeight: 340 }}>
              <PostImage
                src={all[5]?.image ?? all[0].image}
                alt={all[5]?.title ?? all[0].title}
                eager
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-600 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="mb-3 block h-[3px] w-8 bg-white" />
                <h2 className="text-[18px] font-black leading-snug text-white group-hover:text-[#ffaaaa] transition sm:text-[22px]">
                  {all[5]?.title ?? all[0].title}
                </h2>
                <p className="mt-2 text-[12px] leading-5 text-zinc-300 line-clamp-2">
                  {all[5]?.excerpt ?? all[0].excerpt}
                </p>
              </div>
            </Link>

            {/* Right: stacked dark stories */}
            <div className="flex flex-col justify-center gap-0 divide-y divide-white/10 bg-[#1a1a1a] p-5 lg:col-span-5">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">
                More from ZoomAfrica
              </p>
              {all.slice(6, 11).map((p) => (
                <DarkSideRow key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ LIVE NEWS WIRE ════════════════════════════════════════════ */}
        <section className="mt-8">
          <SectionTitle label="🔴 Live News Wire" href="/news" />
          {wire.length > 0 ? (
            <div className="grid grid-cols-1 gap-px border border-[#e0e0e0] bg-[#e0e0e0] sm:grid-cols-2 lg:grid-cols-3">
              {wire.slice(0, 6).map((it) => (
                <Link key={`${it.sourceId}-${it.id}`} href={it.url} target="_blank" rel="noreferrer"
                  className="group block bg-white p-4 hover:bg-[#f9f9f9] transition">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">{it.sourceName}</p>
                  <p className="mt-1 text-[13px] font-bold leading-snug text-[#0c0c0c] line-clamp-3 group-hover:text-[#cc0000] transition">
                    {it.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="border border-[#e0e0e0] p-4 text-sm text-[#595959]">
              No live headlines —{" "}
              <Link href="/news" className="text-[#cc0000] underline">retry at /news</Link>
            </p>
          )}
        </section>

        {/* ══ 3-COL: ENERGY | AGRICULTURE | BIODIVERSITY ═══════════════
            CNN pattern: big image + headline + one small secondary        */}
        <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { label: "Energy & Climate", posts: fill(energy, 2) },
            { label: "Agriculture", posts: fill(agri, 2) },
            { label: "Biodiversity", posts: fill(bio, 2) },
          ].map(({ label, posts }) => (
            <div key={label}>
              <SectionTitle label={label} />
              <BigCard post={posts[0]} />
              {posts[1] && <SmallCard post={posts[1]} />}
            </div>
          ))}
        </section>

        {/* ══ 2-COL: SPORTS | EDUCATION (+ no ad) ══════════════════════
            CNN pattern: big image + headline + 2 small secondary cards   */}
        <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {[
            { label: "Sports", posts: fill(sports, 3) },
            { label: "Education & Tech", posts: fill(edu, 3) },
          ].map(({ label, posts }) => (
            <div key={label}>
              <SectionTitle label={label} />
              <BigCard post={posts[0]} />
              {posts[1] && <SmallCard post={posts[1]} />}
              {posts[2] && <SmallCard post={posts[2]} />}
            </div>
          ))}
        </section>

        {/* ══ 2-COL: TRAVEL | CLIMATE CHANGE ════════════════════════════ */}
        <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {[
            { label: "Travel & Tourism", posts: fill(travel, 3) },
            { label: "Climate Change", posts: fill(byCategory("climate-change"), 3) },
          ].map(({ label, posts }) => (
            <div key={label}>
              <SectionTitle label={label} />
              <BigCard post={posts[0]} />
              {posts[1] && <SmallCard post={posts[1]} />}
              {posts[2] && <SmallCard post={posts[2]} />}
            </div>
          ))}
        </section>

        {/* ══ ZOOMAFRICA SHORTS (horizontal scroll) ═════════════════════ */}
        <section className="mt-8">
          <SectionTitle label="ZoomAfrica Shorts" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {all.slice(0, 7).map((p) => (
              <Link key={p.slug} href={`/post/${p.slug}`} className="group block shrink-0 w-[140px]">
                <div className="relative h-[88px] w-[140px] overflow-hidden rounded bg-[#f0f0f0]">
                  <PostImage src={p.image} alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-400" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-[9px] font-black uppercase tracking-wider text-white">
                    {p.categoryLabel}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] font-bold leading-tight text-[#0c0c0c] group-hover:text-[#cc0000] transition line-clamp-2">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="h-10" />
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#e0e0e0] bg-white">
        {/* Edition selector row */}
        <div className="border-b border-[#e0e0e0]">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-6 px-4 py-3 sm:px-6">
            <span className="text-[12px] font-black uppercase tracking-wider text-[#0c0c0c]">Edition</span>
            {["Africa", "World", "International", "Español"].map((e) => (
              <span key={e} className="text-[12px] text-[#595959] hover:text-[#cc0000] cursor-pointer transition">{e}</span>
            ))}
          </div>
        </div>

        {/* Category mega grid */}
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
            {[
              { head: "World", links: [["Africa", "/"], ["East Africa", "/category/environment"], ["West Africa", "/category/agriculture"], ["Southern Africa", "/category/biodiversity"]] },
              { head: "Politics", links: [["Regional", "/category/politics"], ["AU Summit", "/category/politics"], ["Trade", "/category/politics"]] },
              { head: "Business", links: [["Agriculture", "/category/agriculture"], ["Energy", "/category/energy"], ["Tech", "/category/education"]] },
              { head: "Health", links: [["Health", "/category/health"], ["Life", "/category/health"]] },
              { head: "Entertainment", links: [["Sports", "/category/sports"], ["Tourism", "/category/tourism"]] },
              { head: "Climate", links: [["Climate", "/category/climate-change"], ["Environment", "/category/environment"], ["Energy", "/category/energy"]] },
              { head: "More", links: [["Latest", "/latest"], ["Live Wire", "/news"], ["About", "/about"], ["Contact", "/contact"]] },
            ].map(({ head, links }) => (
              <div key={head}>
                <p className="mb-2 text-[12px] font-black text-[#0c0c0c]">{head}</p>
                {links.map(([label, href]) => (
                  <Link key={label} href={href} className="block py-0.5 text-[12px] text-[#cc0000] hover:underline">{label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e0e0e0] bg-[#0c0c0c] px-4 py-4 sm:px-6">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 items-center rounded-[2px] bg-[#cc0000] px-2 font-[family-name:var(--font-display)] text-base leading-none tracking-wider text-white">ZOOM</span>
              <span className="font-[family-name:var(--font-display)] text-base tracking-widest text-white">AFRICA</span>
            </Link>
            <p className="text-[11px] text-zinc-500">© {new Date().getFullYear()} ZoomAfrica. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
