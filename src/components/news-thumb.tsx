"use client";

import { RssThumb } from "@/components/rss-thumb";
import { Newspaper } from "lucide-react";

export function NewsThumb({ src, label }: { src?: string; label: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(800px_circle_at_20%_20%,rgba(225,6,0,0.22),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
      {src ? (
        <RssThumb src={src} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Newspaper className="h-6 w-6 text-white/40" />
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-zinc-300/90 line-clamp-2">
              {label}
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}
