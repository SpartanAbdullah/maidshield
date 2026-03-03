import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/calculator/print"],
      },
    ],
    sitemap: "https://www.maidshield.com/sitemap.xml",
    host: "https://www.maidshield.com",
  };
}