import { XMLParser } from "fast-xml-parser";

export type RssItem = {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  url: string;
  publishedAt?: string;
  excerpt?: string;
  imageUrl?: string;
  categoryHint?: string;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  allowBooleanAttributes: true,
  // Some feeds include invalid chars; be forgiving.
  processEntities: true,
});

function arrify<T>(v: T | T[] | undefined | null): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function stripHtml(s: string) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hashString(input: string) {
  // lightweight stable-ish hash for IDs (non-crypto)
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

function pickText(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (v && typeof v === "object" && "#text" in (v as any)) {
    const t = (v as any)["#text"];
    return typeof t === "string" ? t : undefined;
  }
  return undefined;
}

function pickImageUrl(item: any): string | undefined {
  // RSS enclosure
  const enclosure = item?.enclosure;
  if (enclosure?.["@_url"] && String(enclosure?.["@_type"] || "").startsWith("image/")) {
    return String(enclosure["@_url"]);
  }

  // media:thumbnail
  const thumb = item?.["media:thumbnail"];
  if (thumb?.["@_url"]) return String(thumb["@_url"]);
  if (Array.isArray(thumb)) {
    const u = thumb.map((t: any) => t?.["@_url"]).filter(Boolean).map(String)[0];
    if (u) return u;
  }

  // itunes:image
  const itunes = item?.["itunes:image"];
  if (itunes?.["@_href"]) return String(itunes["@_href"]);

  // media:content
  const media = item?.["media:content"];
  if (media) {
    const candidates = arrify(media)
      .map((m: any) => m?.["@_url"])
      .filter(Boolean)
      .map(String);
    if (candidates.length) return candidates[0];
  }

  // Some feeds put HTML in description/summary
  const desc = pickText(item?.description) ?? pickText(item?.summary);
  if (desc) {
    const match = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];
  }

  return undefined;
}

export async function fetchRssItems(opts: {
  sourceId: string;
  sourceName: string;
  url: string;
  categoryHint?: string;
  limit?: number;
  revalidateSeconds?: number;
}): Promise<RssItem[]> {
  const res = await fetch(opts.url, {
    // Next.js caching on the server
    next: { revalidate: opts.revalidateSeconds ?? 600 },
    headers: {
      "user-agent": "ZoomAfrica Showcase (+https://zoomafrica.example)",
      accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  if (!res.ok) return [];
  const xml = await res.text();

  let data: any;
  try {
    data = parser.parse(xml);
  } catch {
    return [];
  }

  const channel = data?.rss?.channel ?? data?.feed ?? data?.rdf?.RDF?.channel;
  const items = arrify(channel?.item ?? channel?.entry);
  const limit = opts.limit ?? 20;

  return items.slice(0, limit).map((item: any) => {
    const titleRaw = pickText(item?.title) ?? "Untitled";
    const linkRaw =
      pickText(item?.link) ??
      pickText(item?.id) ??
      item?.link?.["@_href"] ??
      item?.link?.["@_url"];

    const url = typeof linkRaw === "string" ? linkRaw : "";
    const publishedAt =
      pickText(item?.pubDate) ??
      pickText(item?.published) ??
      pickText(item?.updated);

    const descRaw =
      pickText(item?.description) ??
      pickText(item?.summary) ??
      pickText(item?.["content:encoded"]);

    const excerpt = descRaw ? stripHtml(descRaw).slice(0, 220) : undefined;
    const imageUrl = pickImageUrl(item);

    const id = hashString(`${opts.sourceId}:${titleRaw}:${url}:${publishedAt ?? ""}`);

    return {
      id,
      sourceId: opts.sourceId,
      sourceName: opts.sourceName,
      title: stripHtml(titleRaw),
      url,
      publishedAt,
      excerpt,
      imageUrl: imageUrl?.startsWith("//") ? `https:${imageUrl}` : imageUrl,
      categoryHint: opts.categoryHint,
    };
  });
}

export async function fetchAllFeeds<T extends { id: string; name: string; url: string; category?: string }>(
  feeds: T[],
  options?: { perFeedLimit?: number; revalidateSeconds?: number },
) {
  const results = await Promise.all(
    feeds.map((f) =>
      fetchRssItems({
        sourceId: f.id,
        sourceName: f.name,
        url: f.url,
        categoryHint: f.category,
        limit: options?.perFeedLimit ?? 12,
        revalidateSeconds: options?.revalidateSeconds ?? 600,
      }),
    ),
  );

  const merged = results.flat();
  merged.sort((a, b) => {
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
  return merged;
}

