import Link from "next/link";
import { CATEGORIES } from "@/lib/taxonomy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0c0c] shadow-md">

      {/* ── Main nav bar ── */}
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">

        {/* ZOOM badge logo — CNN-style red badge */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5">
          <span className="flex h-9 items-center rounded-[3px] bg-[#cc0000] px-2.5 font-[family-name:var(--font-display)] text-[22px] leading-none tracking-wider text-white">
            ZOOM
          </span>
          <span className="hidden font-[family-name:var(--font-display)] text-[18px] leading-none tracking-widest text-white sm:block">
            AFRICA
          </span>
        </Link>

        {/* Category links — scrollable, like CNN's top nav */}
        <nav className="ml-3 flex flex-1 items-center gap-0 overflow-x-auto">
          {[
            { label: "Home", href: "/" },
            { label: "Politics", href: "/category/politics" },
            { label: "Environment", href: "/category/environment" },
            { label: "Health", href: "/category/health" },
            { label: "Sports", href: "/category/sports" },
            { label: "Energy", href: "/category/energy" },
            { label: "Travel", href: "/category/tourism" },
            { label: "Agriculture", href: "/category/agriculture" },
            { label: "More ›", href: "/latest" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 whitespace-nowrap px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300 hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link
            href="/latest"
            className="hidden text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400 hover:text-white transition sm:block"
          >
            Latest
          </Link>
          <Link
            href="/news"
            className="flex items-center gap-1.5 rounded-[3px] bg-[#cc0000] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#aa0000] transition"
          >
            <span className="hidden h-1.5 w-1.5 animate-pulse rounded-full bg-white sm:inline-block" />
            Live TV
          </Link>
        </div>
      </div>

      {/* ── Secondary category strip ── */}
      <div className="border-t border-white/10 bg-[#151515]">
        <div className="mx-auto flex w-full max-w-7xl items-center overflow-x-auto px-4 sm:px-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 hover:border-[#cc0000] hover:text-white transition"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
