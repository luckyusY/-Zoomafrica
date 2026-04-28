import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/lib/taxonomy";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { PostImage } from "@/components/post-image";

export function generateStaticParams() {
  return getAllPosts()
    .map((p) => ({ slug: p.category }))
    .filter((v, i, a) => a.findIndex((x) => x.slug === v.slug) === i);
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="min-h-screen bg-white text-[#0c0c0c]">
      {/* Category header */}
      <div className="border-b-4 border-[#cc0000] bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#cc0000]">
            Section
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-5xl leading-tight text-[#0c0c0c]">
            {category.label}
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-[#595959]">No stories in this category yet.</p>
        ) : (
          <>
            {/* Hero story */}
            <div className="mb-8 border-b border-[#e0e0e0] pb-8">
              <Link href={`/post/${posts[0].slug}`} className="group block sm:flex sm:gap-8">
                <div className="sm:w-3/5 overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
                  <PostImage
                    src={posts[0].image}
                    alt={posts[0].title}
                    eager
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:w-2/5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#cc0000]">
                    {posts[0].categoryLabel}
                  </span>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#0c0c0c] group-hover:text-[#cc0000] transition">
                    {posts[0].title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-6 text-[#595959] line-clamp-4">
                    {posts[0].excerpt}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-widest text-[#999]">
                    {posts[0].dateLabel} · {posts[0].minutes} min read
                  </p>
                </div>
              </Link>
            </div>

            {/* Rest as grid */}
            {posts.length > 1 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((p) => (
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
                      <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#595959]">
                        {p.excerpt}
                      </p>
                      <p className="mt-1.5 text-[11px] uppercase tracking-widest text-[#999]">
                        {p.dateLabel}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <footer className="mt-10 bg-[#0c0c0c] py-6 text-center">
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
