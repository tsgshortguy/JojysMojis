/*
 * Service Worker bootstrap for Ultraviolet.
 * This file gets registered as the service worker and imports the UV SW bundle.
 */
importScripts("./baremux/index.js?v=1789504454873");
importScripts("./uv/uv.bundle.js?v=1789504454873");
importScripts("./uv/uv.config.js?v=1789504454873");
importScripts("./uv/uv.sw.js?v=1789504454873");

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

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));

