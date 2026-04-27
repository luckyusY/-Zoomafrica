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

function normalizeUrl(url: string) {
  const u = url.trim();
  if (!u) return u;
  if (u.startsWith("//")) return `https:${u}`;
  return u;
}

function pickLink(item: any): string | undefined {
  // Common RSS/Atom cases:
  // - <link>https://...</link>
  // - <link rel="alternate" type="text/html" href="..."/>
  // - <id>urn:... or https://... (Atom)
  const direct = pickText(item?.link) ?? pickText(item?.guid);
  if (direct) return direct;

  const linkObj = item?.link;
  if (Array.isArray(linkObj)) {
    const preferred = linkObj.find((l: any) => {
      const rel = l?.["@_rel"];
      const type = l?.["@_type"] ?? "";
      return (!rel || rel === "alternate") && String(type).includes("html");
    });
    const href = preferred?.["@_href"] ?? linkObj[0]?.["@_href"];
    if (href) return String(href);
  } else if (linkObj && typeof linkObj === "object" && linkObj["@_href"]) {
    return String(linkObj["@_href"]);
  }

  const id = pickText(item?.id);
  if (id && /^https?:\/\//i.test(id)) return id;
  return undefined;
}

function extractItemsFromParsedXml(data: any): any[] {
  if (!data) return [];

  // RSS 2.0
  const channelItems = data?.rss?.channel?.item;
  if (channelItems) return arrify(channelItems);

  // Some feeds: nested channel missing (rare)
  const topItems = data?.rss?.item;
  if (topItems) return arrify(topItems);

  // Atom
  const atomEntries = data?.feed?.entry;
  if (atomEntries) return arrify(atomEntries);

  // RDF (limited support)
  const rdfItems = data?.rdf?.RDF?.item;
  if (rdfItems) return arrify(rdfItems);

  // RSS 1.0 sometimes uses rdf:item under channel; try a couple paths
  const rdfChannelItems = data?.rdf?.RDF?.channel?.item;
  if (rdfChannelItems) return arrify(rdfChannelItems);

  return [];
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
  const revalidate = opts.revalidateSeconds ?? 0;
  const res = await fetch(opts.url, {
    // Default to fresh fetches: partial feed outages are common, and a cached empty
    // result would look like “no news at all” for a long time.
    next: { revalidate },
    headers: {
      "user-agent": "ZoomAfrica/1.0",
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

  const items = extractItemsFromParsedXml(data);
  const limit = opts.limit ?? 20;

  return items.slice(0, limit).map((item: any) => {
    const titleRaw = pickText(item?.title) ?? "Untitled";
    const linkRaw = pickLink(item) ?? pickText(item?.id);
    const url = normalizeUrl(typeof linkRaw === "string" ? linkRaw : "");
    const publishedAt =
      pickText(item?.pubDate) ??
      pickText(item?.published) ??
      pickText(item?.updated) ??
      pickText(item?.["dc:date"]);

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
  }).filter((it) => it.url && /^https?:\/\//i.test(it.url));
}

export async function fetchAllFeeds<T extends { id: string; name: string; url: string; category?: string }>(
  feeds: T[],
  options?: { perFeedLimit?: number; revalidateSeconds?: number },
) {
  const perFeed = options?.perFeedLimit ?? 12;
  const revalidateSeconds = options?.revalidateSeconds ?? 0;

  const results = await Promise.allSettled(
    feeds.map((f) =>
      fetchRssItems({
        sourceId: f.id,
        sourceName: f.name,
        url: f.url,
        categoryHint: f.category,
        limit: perFeed,
        revalidateSeconds,
      }),
    ),
  );

  const merged = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  merged.sort((a, b) => {
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
  return merged;
}

