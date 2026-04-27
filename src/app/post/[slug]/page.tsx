import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/taxonomy";

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

  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <header className="pt-10 sm:pt-16">
          <Link
            href={cat ? `/category/${cat.slug}` : "/"}
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400 hover:text-zinc-200"
          >
            ← {post.categoryLabel}
          </Link>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-300/95">
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
              {post.dateLabel}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
              {post.minutes} min read
            </span>
          </div>
          <div className="mt-8 h-px w-full bg-white/10" />
        </header>

        <article className="prose prose-invert prose-zinc max-w-none pb-16 pt-8 prose-headings:font-[family-name:var(--font-display)] prose-headings:tracking-wide prose-p:leading-7 prose-a:text-white prose-a:no-underline prose-a:font-medium">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

