"use client";

import { useState } from "react";

export function PostImage({
  src,
  alt,
  className,
  eager,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
