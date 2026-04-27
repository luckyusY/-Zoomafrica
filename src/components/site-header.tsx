import Link from "next/link";

import { CATEGORIES } from "@/lib/taxonomy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(7,7,10,0.72)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="group inline-flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-3xl tracking-wide leading-none">
              Zoom<span className="text-[color:var(--za-red)]">Africa</span>
            </span>
            <span className="hidden sm:inline font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-zinc-400 group-hover:text-zinc-200 transition">
              Africa in Focus
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/latest"
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-zinc-300 hover:text-white"
          >
            Latest
          </Link>
          <Link
            href="/about"
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-zinc-300 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-zinc-300 hover:text-white"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 sm:-mx-8 sm:px-8">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-zinc-200 hover:border-white/20 hover:bg-white/10 transition"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--za-red)]" />
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

