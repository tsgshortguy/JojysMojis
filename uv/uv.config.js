/*
 * Ultraviolet Config — JoeyIsStillAlive
 * This tells the UV service worker where everything lives.
 */
self.__uv$config = {
  prefix: "/uv/service/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
  rewriteImport(t, r, n = this.meta) {
    try {
      if (r !== undefined) {
        try {
          return this.rewriteUrl(new URL(r, t).href, n);
        } catch (_) {
          return this.rewriteUrl(new URL(t, r).href, n);
        }
      }
    } catch (_) {}
    return this.rewriteUrl(t, { ...n, base: r });
  }
};
