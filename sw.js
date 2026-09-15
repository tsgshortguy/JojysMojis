/*
 * Service Worker bootstrap for Ultraviolet.
 * This file gets registered as the service worker and imports the UV SW bundle.
 */
importScripts("./baremux/index.js?v=1789508000000");
importScripts("./uv/uv.bundle.js?v=1789508000000");
importScripts("./uv/uv.config.js?v=1789508000000");
importScripts("./uv/uv.sw.js?v=1789508000000");

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

const sw = new UVServiceWorker();
if (self.BareMux && self.BareMux.BareClient) {
  sw.bareClient = new self.BareMux.BareClient();
}

const UV_PREFIX = "/uv/service/";

function xorDecode(str) {
  if (!str) return str;
  let [input, ...search] = str.split("?");
  let result = decodeURIComponent(input)
    .split("")
    .map((char, ind) =>
      ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
    )
    .join("");
  return result + (search.length ? "?" + search.join("?") : "");
}

function xorEncode(str) {
  if (!str) return str;
  return encodeURIComponent(
    str
      .split("")
      .map((char, ind) =>
        ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
      )
      .join("")
  );
}

const SITE_EXACT_PATHS = [
  "/",
  "",
  "/index.html",
  "/games.html",
  "/app.js",
  "/style.css",
  "/sw.js",
  "/favicon.jpg",
  "/ixl-favicon.png",
  "/CNAME",
  "/uv/uv.bundle.js",
  "/uv/uv.client.js",
  "/uv/uv.config.js",
  "/uv/uv.handler.js",
  "/uv/uv.sw.js",
  "/uv/uv.sw.js.map"
];

const SITE_PREFIX_PATHS = [
  "/baremux/",
  "/epoxy/",
  "/bareasmodule3/",
  "/assets/games/",
  "/assets/images/",
  "/assets/audio/",
  "/api/",
  "/bare/"
];

function isSiteAsset(pathname) {
  if (SITE_EXACT_PATHS.includes(pathname)) return true;
  for (const p of SITE_PREFIX_PATHS) {
    if (pathname.startsWith(p)) return true;
  }
  return false;
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Direct proxy request -> Ultraviolet handles it
  if (url.pathname.startsWith(UV_PREFIX)) {
    return event.respondWith(sw.fetch(event));
  }

  // 2. Cinejoy / SPA Service Worker trap (prevents 404 console errors)
  if (url.pathname === "/service-worker.js" || url.pathname === "/sw-register.js") {
    return event.respondWith(
      new Response("// Dummy service worker for proxied client", {
        headers: { "Content-Type": "application/javascript" }
      })
    );
  }

  // 3. Site's own assets -> pass through to GitHub Pages / network
  if (isSiteAsset(url.pathname)) {
    return; // default browser fetch
  }

  // 4. Root-relative requests from proxied sites (e.g. /_app/..., /manifest.json, /api/..., /uv/assets/...)
  let targetOrigin = null;
  const referrer = event.request.referrer;
  if (referrer && referrer.includes(UV_PREFIX)) {
    try {
      const refIdx = referrer.indexOf(UV_PREFIX);
      const encodedTarget = referrer.slice(refIdx + UV_PREFIX.length);
      const decodedTarget = xorDecode(encodedTarget);
      if (decodedTarget && (decodedTarget.startsWith("http://") || decodedTarget.startsWith("https://"))) {
        targetOrigin = new URL(decodedTarget).origin;
        self.__lastProxiedOrigin = targetOrigin;
      }
    } catch (err) {
      console.warn("[SW] Referrer decode error:", err);
    }
  } else if (self.__lastProxiedOrigin) {
    targetOrigin = self.__lastProxiedOrigin;
  }

  if (targetOrigin) {
    try {
      let targetPath = url.pathname;
      // Handle relative paths from Vite / SvelteKit that climbed out of /uv/service/
      if (targetPath.startsWith("/uv/assets/")) {
        targetPath = "/_app/immutable/assets/" + targetPath.slice("/uv/assets/".length);
      } else if (targetPath.startsWith("/uv/chunks/")) {
        targetPath = "/_app/immutable/chunks/" + targetPath.slice("/uv/chunks/".length);
      } else if (targetPath.startsWith("/uv/nodes/")) {
        targetPath = "/_app/immutable/nodes/" + targetPath.slice("/uv/nodes/".length);
      } else if (targetPath.startsWith("/uv/entry/")) {
        targetPath = "/_app/immutable/entry/" + targetPath.slice("/uv/entry/".length);
      } else if (targetPath.startsWith("/uv/") && !targetPath.startsWith(UV_PREFIX)) {
        targetPath = "/" + targetPath.slice("/uv/".length);
      }

      const targetFullUrl = new URL(targetPath + url.search, targetOrigin).href;
      const rewrittenProxyUrl = new URL(UV_PREFIX + xorEncode(targetFullUrl), location.origin).href;

      const rewrittenReq = new Request(rewrittenProxyUrl, {
        method: event.request.method,
        headers: event.request.headers,
        body: ["GET", "HEAD"].includes(event.request.method) ? null : event.request.body,
        mode: event.request.mode === "navigate" ? "same-origin" : event.request.mode,
        credentials: event.request.credentials,
        redirect: event.request.redirect
      });

      const inferredDestination =
        event.request.destination ||
        (url.pathname.endsWith(".js") || url.pathname.includes(".js?") ? "script" :
         url.pathname.endsWith(".css") || url.pathname.includes(".css?") ? "style" :
         url.pathname.match(/\.(png|jpe?g|gif|webp|svg|ico)$/i) ? "image" : "");

      const reqProxy = new Proxy(rewrittenReq, {
        get(target, prop) {
          if (prop === "destination") {
            return inferredDestination || target.destination;
          }
          const val = target[prop];
          return typeof val === "function" ? val.bind(target) : val;
        }
      });

      return event.respondWith(sw.fetch({ request: reqProxy }));
    } catch (err) {
      console.warn("[SW] Proxy rewrite error:", err);
    }
  }
});

