import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/lib/taxonomy";
import { getPostsByCategory } from "@/lib/posts";

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="flex-1 za-grain">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <header className="pt-10 sm:pt-16">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-zinc-400">
            Category
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide sm:text-6xl">
            {category.label}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300/95">
            A curated showcase feed. Replace the Markdown content with your real
            newsroom data when ready.
          </p>
          <div className="mt-8 h-px w-full bg-white/10" />
        </header>

        <section className="py-10">
          {posts.length === 0 ? (
            <p className="text-zinc-400">
              No posts yet for this category.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10 transition"
                >
                  <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                    {p.dateLabel} • {p.minutes} min
                  </p>
                  <h2 className="mt-3 text-lg leading-7 text-zinc-50 group-hover:text-white">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-300/90">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-white">
                    <span className="za-link">Read</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

