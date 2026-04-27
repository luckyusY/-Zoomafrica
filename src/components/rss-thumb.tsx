"use client";

import { useState } from "react";

export function RssThumb({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      className="h-full w-full object-cover opacity-90"
      onError={() => setFailed(true)}
    />
  );
}

