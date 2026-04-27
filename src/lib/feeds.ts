export type RssFeed = {
  id: string;
  name: string;
  url: string;
  category?: string; // taxonomy slug (optional mapping)
};

// Note: RSS sources can change URLs. Keep these configurable.
// Replace/extend this list with your preferred publishers anytime.
export const FEEDS: RssFeed[] = [
  {
    id: "bbc-africa",
    name: "BBC Africa",
    url: "https://feeds.bbci.co.uk/news/world/africa/rss.xml",
    category: "politics",
  },
  {
    id: "bbc-climate",
    name: "BBC Climate",
    url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    category: "climate-change",
  },
  {
    id: "un-news",
    name: "UN News Africa",
    url: "https://news.un.org/feed/subscribe/en/news/region/africa/feed/rss.xml",
    category: "environment",
  },
  {
    id: "reliefweb-climate",
    name: "ReliefWeb Climate",
    url: "https://reliefweb.int/updates/rss.xml?search=disaster_type.exact:%22Drought%22%20OR%20disaster_type.exact:%22Flood%22%20OR%20theme.exact:%22Climate%20Change%20and%20Environment%22",
    category: "climate-change",
  },
  {
    id: "who-africa",
    name: "WHO Africa",
    url: "https://www.afro.who.int/rss.xml",
    category: "health",
  },
];

