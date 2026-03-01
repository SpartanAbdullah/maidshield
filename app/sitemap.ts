import type { MetadataRoute } from "next";

const marketingPaths = [
  "/",
  "/pricing",
  "/about",
  "/privacy",
  "/terms",
  "/checklist",
  "/pro",
  "/sources",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return marketingPaths.map((path) => ({
    url: `https://www.maidshield.com${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
