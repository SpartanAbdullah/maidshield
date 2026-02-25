/* global self, caches, fetch */

const CACHE_NAME = "maidshield-static-v1";
const STATIC_PATH = "/_next/static/";
const STATIC_EXTENSIONS = /\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache documents or API responses with user data.
  if (request.mode === "navigate" || request.destination === "document") return;
  if (url.pathname.startsWith("/api")) return;

  const isStaticAsset =
    url.pathname.startsWith(STATIC_PATH) ||
    ["script", "style", "font", "image", "worker"].includes(request.destination) ||
    STATIC_EXTENSIONS.test(url.pathname);

  if (!isStaticAsset) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }

      const response = await fetch(request);
      if (response.ok && response.type === "basic") {
        await cache.put(request, response.clone());
      }
      return response;
    })(),
  );
});
