import Link from "next/link";
import { CATEGORIES } from "@/lib/taxonomy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#07070a] shadow-[0_1px_0_rgba(255,255,255,0.08)]">

      {/* ── Brand + primary nav ── */}
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0">
          <span className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-wide">
            Zoom<span className="text-[color:var(--za-red)]">Africa</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          <Link
            href="/news"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--za-red)] hover:text-red-400 transition"
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--za-red)]" />
            Live Wire
          </Link>
          <Link
            href="/latest"
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-300 hover:text-white transition"
          >
            Latest
          </Link>
          <Link
            href="/about"
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-300 hover:text-white transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-300 hover:text-white transition"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* ── Category nav bar ── */}
      <div className="border-t border-white/8 bg-[#0e0e12]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="-mx-4 flex items-center gap-0 overflow-x-auto sm:-mx-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="shrink-0 border-b-2 border-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 hover:border-[color:var(--za-red)] hover:text-white transition whitespace-nowrap"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
