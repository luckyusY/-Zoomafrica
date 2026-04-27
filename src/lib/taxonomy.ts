export type Category = {
  slug: string;
  label: string;
};

export const CATEGORIES: Category[] = [
  { slug: "politics", label: "Politics" },
  { slug: "environment", label: "Environment" },
  { slug: "biodiversity", label: "Biodiversity" },
  { slug: "climate-change", label: "Climate Change" },
  { slug: "energy", label: "Energy" },
  { slug: "agriculture", label: "Agriculture" },
  { slug: "health", label: "Health" },
  { slug: "education", label: "Éducation" },
  { slug: "tourism", label: "Tourism" },
  { slug: "sports", label: "Sports" },
];

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

