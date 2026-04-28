import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { format } from "date-fns";

import { getCategoryBySlug } from "./taxonomy";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO
  category: string; // slug
  featured?: boolean;
  excerpt?: string;
  image?: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  categoryLabel: string;
  featured: boolean;
  excerpt: string;
  minutes: number;
  content: string;
  image: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function fileToSlug(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

function safeString(v: unknown, fallback: string) {
  return typeof v === "string" && v.trim().length > 0 ? v : fallback;
}

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = fileToSlug(filename);
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const parsed = matter(raw);

    const fm = parsed.data as Partial<PostFrontmatter>;
    const title = safeString(fm.title, slug);
    const date = safeString(fm.date, "2026-01-01");
    const category = safeString(fm.category, "environment");
    const featured = Boolean(fm.featured);
    const excerpt = safeString(
      fm.excerpt,
      parsed.content.trim().slice(0, 140) + "…",
    );
    const image = safeString(fm.image, "");

    const cat = getCategoryBySlug(category);
    const categoryLabel = cat?.label ?? category;
    const dateLabel = format(new Date(date), "MMM d, yyyy");
    const minutes = Math.max(1, Math.round(readingTime(parsed.content).minutes));

    return {
      slug,
      title,
      date,
      dateLabel,
      category,
      categoryLabel,
      featured,
      excerpt,
      minutes,
      content: parsed.content,
      image,
    } satisfies Post;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedPosts() {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, 3);
}

export function getLatestPosts(limit = 10) {
  return getAllPosts().slice(0, limit);
}

export function getPostsByCategory(categorySlug: string) {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

