import type { Metadata } from "next";

const BRAND_NAME = "MaidShield";
export const MARKETING_BASE_URL = "https://www.maidshield.com";
export const APP_BASE_URL = "https://app.maidshield.com";
const DEFAULT_OG_IMAGE = "/opengraph-image";

export const defaultDescription =
  "Plan UAE domestic worker end-of-service gratuity with clear estimates, checklists, and assumptions for household employers.";

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function getBaseUrl(base: "www" | "app") {
  return base === "app" ? APP_BASE_URL : MARKETING_BASE_URL;
}

export function buildTitle(pageTitle?: string) {
  if (!pageTitle) {
    return BRAND_NAME;
  }

  return `${pageTitle} | ${BRAND_NAME}`;
}

export function makeCanonical(path: string, base: "www" | "app") {
  const normalizedPath = normalizePath(path);
  return `${getBaseUrl(base)}${normalizedPath}`;
}

export function buildOpenGraph({
  title,
  description = defaultDescription,
  path,
  base,
  type = "website",
}: {
  title?: string;
  description?: string;
  path: string;
  base: "www" | "app";
  type?: "website" | "article";
}): Metadata["openGraph"] {
  return {
    type,
    title: buildTitle(title),
    description,
    url: makeCanonical(path, base),
    siteName: BRAND_NAME,
    images: [
      {
        url: `${MARKETING_BASE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} preview`,
      },
    ],
  };
}

export function buildTwitter({
  title,
  description = defaultDescription,
}: {
  title?: string;
  description?: string;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: buildTitle(title),
    description,
    images: [`${MARKETING_BASE_URL}${DEFAULT_OG_IMAGE}`],
  };
}
