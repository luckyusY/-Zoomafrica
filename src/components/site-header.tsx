"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/taxonomy";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#333] bg-[#0c0c0c]">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1 px-3 py-2.5 sm:px-4">

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="flex shrink-0 flex-col gap-[5px] p-2 group"
          >
            <span className="block h-[2px] w-5 bg-white group-hover:bg-[#cc0000] transition" />
            <span className="block h-[2px] w-5 bg-white group-hover:bg-[#cc0000] transition" />
            <span className="block h-[2px] w-5 bg-white group-hover:bg-[#cc0000] transition" />
          </button>

          {/* Logo */}
          <Link href="/" className="ml-1 shrink-0 flex items-center gap-2">
            <span className="flex h-8 items-center rounded-[2px] bg-[#cc0000] px-2 font-[family-name:var(--font-display)] text-[18px] leading-none tracking-wider text-white">
              ZOOM
            </span>
            <span className="font-[family-name:var(--font-display)] text-[18px] leading-none tracking-wider text-white">
              AFRICA
            </span>
          </Link>

          {/* Primary nav */}
          <nav className="ml-3 hidden flex-1 items-center gap-0 overflow-x-auto lg:flex">
            {[
              ["Africa", "/"],
              ["Politics", "/category/politics"],
              ["Business", "/category/agriculture"],
              ["Health", "/category/health"],
              ["Environment", "/category/environment"],
              ["Style", "/category/education"],
              ["Travel", "/category/tourism"],
              ["Sports", "/category/sports"],
              ["More", "/latest"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="shrink-0 whitespace-nowrap px-2.5 py-1 text-[13px] font-bold text-white hover:text-[#cc0000] transition"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Tablet nav (condensed) */}
          <nav className="ml-2 hidden flex-1 items-center gap-0 overflow-x-auto sm:flex lg:hidden">
            {[
              ["Africa", "/"],
              ["Politics", "/category/politics"],
              ["Health", "/category/health"],
              ["Sports", "/category/sports"],
              ["More", "/latest"],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="shrink-0 whitespace-nowrap px-2 py-1 text-[12px] font-bold text-white hover:text-[#cc0000] transition">
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Link href="/news" className="hidden items-center gap-1.5 sm:flex text-[12px] font-bold text-white hover:text-[#cc0000] transition">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#cc0000]" />
              Watch
            </Link>
            <Link href="/latest" className="hidden text-[12px] font-bold text-white hover:text-[#cc0000] transition sm:block">
              Listen
            </Link>
            {/* Search icon */}
            <button className="text-white hover:text-[#cc0000] transition p-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <Link
              href="/about"
              className="rounded border border-white/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#0c0c0c] transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ── Slide-down mobile / mega menu ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-[#0c0c0c] px-6 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setMenuOpen(false)} className="mb-6 text-white text-2xl leading-none">✕</button>
            <Link href="/" onClick={() => setMenuOpen(false)} className="mb-6 flex items-center gap-2">
              <span className="flex h-8 items-center rounded-[2px] bg-[#cc0000] px-2 font-[family-name:var(--font-display)] text-[18px] leading-none tracking-wider text-white">ZOOM</span>
              <span className="font-[family-name:var(--font-display)] text-[16px] tracking-widest text-white">AFRICA</span>
            </Link>
            <nav className="flex flex-col gap-0 divide-y divide-white/10">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-[13px] font-bold uppercase tracking-wider text-zinc-300 hover:text-[#cc0000] transition"
                >
                  {c.label}
                </Link>
              ))}
              <Link href="/news" onClick={() => setMenuOpen(false)} className="py-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[#cc0000]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#cc0000]" /> Live Wire
              </Link>
              <Link href="/latest" onClick={() => setMenuOpen(false)} className="py-3 text-[13px] font-bold uppercase tracking-wider text-zinc-300 hover:text-[#cc0000] transition">Latest</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="py-3 text-[13px] font-bold uppercase tracking-wider text-zinc-300 hover:text-[#cc0000] transition">About</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="py-3 text-[13px] font-bold uppercase tracking-wider text-zinc-300 hover:text-[#cc0000] transition">Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
