import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostImage } from "@/components/post-image";

export default function LatestPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-[#0c0c0c]">
      {/* Page header */}
      <div className="border-b border-[#e0e0e0] bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          <span className="section-title">All Stories</span>
          <p className="mt-2 text-sm text-[#595959]">
            The latest from ZoomAfrica across all categories.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        {/* Top 3 featured in a row */}
        <div className="mb-10 grid gap-6 sm:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/post/${p.slug}`} className="group block">
              <div className="overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
                <PostImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                  {p.categoryLabel}
                </span>
                <h2 className="mt-1 text-base font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                  {p.title}
                </h2>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-[#999]">
                  {p.dateLabel} · {p.minutes} min read
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Remaining as list */}
        <div className="divide-y divide-[#e0e0e0]">
          {posts.slice(3).map((p) => (
            <Link
              key={p.slug}
              href={`/post/${p.slug}`}
              className="group flex items-start gap-4 py-5 hover:bg-[#f5f5f5] transition px-2 -mx-2"
            >
              <div className="h-20 w-28 shrink-0 overflow-hidden bg-[#f5f5f5]">
                <PostImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#cc0000]">
                  {p.categoryLabel}
                </span>
                <h3 className="mt-1 text-[15px] font-bold leading-snug text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                  {p.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#595959]">
                  {p.excerpt}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-widest text-[#999]">
                  {p.dateLabel} · {p.minutes} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-[#0c0c0c] py-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-7 items-center rounded bg-[#cc0000] px-2 font-[family-name:var(--font-display)] text-base leading-none tracking-wider text-white">
            ZOOM
          </span>
          <span className="font-bold text-zinc-300">ZoomAfrica</span>
        </Link>
      </footer>
    </div>
  );
}
