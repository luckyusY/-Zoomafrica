import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/taxonomy";
import { PostImage } from "@/components/post-image";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const cat = getCategoryBySlug(post.category);
  const all = getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#0c0c0c]">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-[#e0e0e0] bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#595959]">
            <Link href="/" className="hover:text-[#cc0000] transition">Home</Link>
            <span>›</span>
            <Link href={cat ? `/category/${cat.slug}` : "/"} className="hover:text-[#cc0000] transition text-[#cc0000] font-bold">
              {post.categoryLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">

        {/* Category + headline */}
        <header className="pt-8 sm:pt-12">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#cc0000]">
            {post.categoryLabel}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#0c0c0c] sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#595959]">
            {post.excerpt}
          </p>

          {/* Byline */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-[#e0e0e0] py-4">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#0c0c0c]">
              ZoomAfrica Staff
            </span>
            <span className="text-[#ccc]">|</span>
            <span className="text-[12px] uppercase tracking-widest text-[#595959]">
              {post.dateLabel}
            </span>
            <span className="text-[#ccc]">|</span>
            <span className="text-[12px] uppercase tracking-widest text-[#595959]">
              {post.minutes} min read
            </span>
          </div>
        </header>

        {/* Hero image */}
        {post.image && (
          <div className="mt-6 overflow-hidden bg-[#f5f5f5]">
            <PostImage
              src={post.image}
              alt={post.title}
              eager
              className="w-full object-cover"
              style={{ maxHeight: 520, width: "100%" }}
            />
          </div>
        )}

        {/* Article body */}
        <article className="mt-8 pb-12 prose prose-lg max-w-none
          prose-headings:font-[family-name:var(--font-display)]
          prose-headings:tracking-wide
          prose-headings:text-[#0c0c0c]
          prose-h2:text-3xl
          prose-h3:text-2xl
          prose-p:leading-8
          prose-p:text-[#1a1a1a]
          prose-a:text-[#cc0000]
          prose-a:no-underline
          hover:prose-a:underline
          prose-strong:text-[#0c0c0c]
          prose-li:text-[#1a1a1a]
          prose-li:leading-7
          prose-blockquote:border-l-[#cc0000]
          prose-blockquote:text-[#595959]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>

      {/* ── RELATED STORIES ── */}
      {related.length > 0 && (
        <div className="border-t border-[#e0e0e0] bg-[#f5f5f5]">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
            <span className="section-title">More in {post.categoryLabel}</span>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="group block bg-white">
                  <div className="overflow-hidden bg-[#e5e5e5]" style={{ aspectRatio: "16/9" }}>
                    <PostImage
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4">
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
          </div>
        </div>
      )}

      {/* ── MINI FOOTER ── */}
      <footer className="bg-[#0c0c0c] py-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-7 items-center rounded bg-[#cc0000] px-2 font-[family-name:var(--font-display)] text-base leading-none tracking-wider text-white">
            ZOOM
          </span>
          <span className="font-bold text-zinc-300">ZoomAfrica</span>
        </Link>
        <p className="mt-2 text-[11px] uppercase tracking-widest text-zinc-500">
          Africa in Focus
        </p>
      </footer>
    </div>
  );
}
