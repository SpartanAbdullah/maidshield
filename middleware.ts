import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APP_HOST = "app.maidshield.com";
const WWW_HOST = "www.maidshield.com";
const ROOT_HOST = "maidshield.com";

// Keep this small and explicit for MVP.
const APP_PATH_PREFIXES = ["/calculator"];
const MARKETING_PATHS = ["/", "/about", "/privacy", "/terms", "/health", "/sources", "/checklist", "/pro"];

function isAppPath(pathname: string) {
  return APP_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isMarketingPath(pathname: string) {
  return MARKETING_PATHS.includes(pathname);
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // Ignore Next.js internals & common static files
  const pathname = url.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icons") ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js" ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // 1) Root apex -> www
  if (host === ROOT_HOST) {
    const dest = new URL(url.toString());
    dest.host = WWW_HOST;
    return NextResponse.redirect(dest, 308);
  }

  // 2) If request is on www but path belongs to app -> send to app
  if (host === WWW_HOST && isAppPath(pathname)) {
    const dest = new URL(url.toString());
    dest.host = APP_HOST;
    return NextResponse.redirect(dest, 308);
  }

  // 3) If request is on app but path is marketing -> send to www
  // (Optional but clean: prevents SEO content on app subdomain)
  if (host === APP_HOST && isMarketingPath(pathname)) {
    // Special case: visiting app root should open calculator
    if (pathname === "/") {
      const dest = new URL(url.toString());
      dest.pathname = "/calculator";
      dest.search = dest.search || "";
      return NextResponse.redirect(dest, 308);
    }

    const dest = new URL(url.toString());
    dest.host = WWW_HOST;
    return NextResponse.redirect(dest, 308);
  }

  // 4) If request is on app root '/', always go to calculator (nice UX)
  if (host === APP_HOST && pathname === "/") {
    const dest = new URL(url.toString());
    dest.pathname = "/calculator";
    return NextResponse.redirect(dest, 308);
  }

  return NextResponse.next();
}

// Apply middleware to all paths except Next internals (we also guard above)
export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};