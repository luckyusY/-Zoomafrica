import Link from "next/link";
import { CATEGORIES } from "@/lib/taxonomy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0c0c]">

      {/* ── Top utility bar ── */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <nav className="hidden items-center gap-5 md:flex">
            <Link href="/latest" className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition">
              Latest
            </Link>
            <Link href="/about" className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/news"
              className="flex items-center gap-2 rounded bg-[#cc0000] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#aa0000] transition"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Live TV
            </Link>
          </div>
        </div>
      </div>

      {/* ── Logo + Primary Nav ── */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">

          {/* CNN-style red badge logo */}
          <Link href="/" className="shrink-0 flex items-center gap-3">
            <span className="flex h-10 items-center rounded bg-[#cc0000] px-3 font-[family-name:var(--font-display)] text-2xl leading-none tracking-wider text-white">
              ZOOM
            </span>
            <span className="hidden font-[family-name:var(--font-display)] text-xl leading-none tracking-wide text-white sm:block">
              AFRICA
            </span>
          </Link>

          {/* Primary category nav */}
          <nav className="hidden flex-1 items-center gap-1 md:flex overflow-x-auto">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="shrink-0 px-3 py-2 text-[12px] font-bold uppercase tracking-wide text-zinc-300 hover:text-white transition border-b-2 border-transparent hover:border-[#cc0000]"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile category strip ── */}
      <div className="flex overflow-x-auto border-b border-white/10 md:hidden">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="shrink-0 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-zinc-400 hover:text-white transition whitespace-nowrap"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
