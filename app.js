/* ═══════════════════════════════════════════════════════════════════════════
   Jojy's Mojis — Main Application Logic
   Built by yours truly
   Handles: Proxy init, search, game rendering, panic button, tab cloaking
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Game Database with Authentic Game Icons ───────────────────────────────
const GAMES = [
  // ── Featured ──
  { id: "roblox",           name: "Roblox",              image: "./assets/games/roblox.jpg",          emoji: "🎮", genre: "Sandbox / MMO",       type: "proxy", url: "https://www.roblox.com",              featured: true },
  { id: "slope",            name: "Slope",               image: "./assets/games/slope.png",           emoji: "🟢", genre: "Arcade / Speed",      type: "embed", url: "https://slopegamefree.github.io/slope/", featured: true },
  { id: "cinejoy",          name: "Cinejoy Movies & TV", image: "./assets/games/cinejoy.png",         emoji: "🎬", genre: "Free Streaming HD",   type: "proxy", url: "https://cinejoy.to/",                featured: true },
  { id: "monkey-mart",      name: "Monkey Mart",         image: "./assets/games/monkey-mart.png",     emoji: "🐒", genre: "Idle / Tycoon",       type: "embed", url: "https://ubg98.github.io/MonkeyMart/",  featured: true },
  { id: "motox3m",          name: "Moto X3M",            image: "./assets/games/motox3m.jpg",         emoji: "🏍️", genre: "Racing / Stunts",     type: "embed", url: "https://ubg365.github.io/moto-x3m/",  featured: true },
  { id: "subway-surfers",   name: "Subway Surfers",      image: "./assets/games/subway-surfers.png",  emoji: "🏃", genre: "Endless Runner",      type: "embed", url: "https://ubg98.github.io/SubwaySurfers/", featured: true },
  { id: "1v1lol",           name: "1v1.LOL",             image: "./assets/games/1v1lol.png",          emoji: "🔫", genre: "Shooter / Build",     type: "embed", url: "https://gameinclassroom.github.io/1v1-lol/", featured: true },
  { id: "retro-bowl",       name: "Retro Bowl",          image: "./assets/games/retro-bowl.png",      emoji: "🏈", genre: "Sports / Football",   type: "embed", url: "https://unblocked1889.github.io/retro-bowl-unblocked/", featured: true },
  { id: "krunker",          name: "Krunker.io",          image: "./assets/games/krunker.jpg",         emoji: "🎯", genre: "FPS / Multiplayer",   type: "proxy", url: "https://krunker.io",                   featured: true },
  { id: "minecraft",        name: "Minecraft Classic",   image: "./assets/games/minecraft.jpg",       emoji: "⛏️", genre: "Sandbox / Creative",  type: "proxy", url: "https://classic.minecraft.net",        featured: true },

  // ── Racing ──
  { id: "snow-rider-3d",    name: "Snow Rider 3D",       image: "./assets/games/snow-rider-3d.png",   emoji: "🛷", genre: "Racing / 3D Sled",     type: "embed", url: "https://snowrider3d.com/",           featured: false },
  { id: "drift-boss",       name: "Drift Boss",          image: "./assets/games/drift-boss.png",      emoji: "🚙", genre: "Racing / Drift",      type: "embed", url: "https://ubg365.github.io/drift-boss/", featured: false },
  { id: "motox3m2",         name: "Moto X3M 2",          image: "./assets/games/motox3m2.webp",       emoji: "🏍️", genre: "Racing / Stunts",     type: "embed", url: "https://gameinclassroom.github.io/moto-x3m-2/", featured: false },
  { id: "motox3m-winter",   name: "Moto X3M Winter",     image: "./assets/games/motox3m-winter.jpg",  emoji: "❄️", genre: "Racing / Stunts",     type: "proxy", url: "https://poki.com/en/g/moto-x3m-4-winter", featured: false },
  { id: "motox3m-pool",     name: "Moto X3M Pool Party", image: "./assets/games/motox3m-pool.jpg",    emoji: "🏖️", genre: "Racing / Stunts",     type: "proxy", url: "https://poki.com/en/g/moto-x3m-pool-party", featured: false },
  { id: "drift-hunters",    name: "Drift Hunters",        image: "./assets/games/drift-hunters.png",   emoji: "🚗", genre: "Racing / Drift",      type: "proxy", url: "https://poki.com/en/g/drift-hunters",   featured: false },
  { id: "smash-karts",      name: "Smash Karts",          image: "./assets/games/smash-karts.png",     emoji: "🏎️", genre: "Racing / Battle",     type: "proxy", url: "https://smashkarts.io",                featured: false },
  { id: "madalin-stunt",    name: "Madalin Stunt Cars 2", image: "./assets/games/madalin-stunt.png",   emoji: "🚙", genre: "Racing / Stunts",    type: "embed", url: "https://ubg365.github.io/madalin-stunt-cars-2/", featured: false },

  // ── Action / Shooters / Horror ──
  { id: "fnaf",             name: "Five Nights at Freddy's", image: "./assets/games/fnaf.webp",       emoji: "🐻", genre: "Horror / Survival",   type: "embed", url: "https://ubg98.github.io/FNAF/",       featured: false },
  { id: "paperio2",         name: "Paper.io 2",          image: "./assets/games/paperio2.jpg",        emoji: "🗺️", genre: "Multiplayer / Arena",  type: "proxy", url: "https://paper-io.com/",              featured: false },
  { id: "shellshockers",    name: "Shell Shockers",       image: "./assets/games/shellshockers.webp",  emoji: "🥚", genre: "FPS / Multiplayer",   type: "proxy", url: "https://shellshock.io",                featured: false },
  { id: "bloxd",            name: "Bloxd.io",             image: "./assets/games/bloxd.png",           emoji: "🧱", genre: "Sandbox / PvP",       type: "proxy", url: "https://bloxd.io",                     featured: false },
  { id: "voxiom",           name: "Voxiom.io",            image: "./assets/games/voxiom.png",          emoji: "💥", genre: "Battle Royale",       type: "proxy", url: "https://voxiom.io",                    featured: false },
  { id: "zombsroyale",      name: "ZombsRoyale.io",       image: "./assets/games/zombsroyale.png",     emoji: "🧟", genre: "Battle Royale",       type: "proxy", url: "https://zombsroyale.io",               featured: false },

  // ── Puzzle / Idle / Simulation ──
  { id: "bitlife",          name: "BitLife Simulator",   image: "./assets/games/bitlife.jpg",         emoji: "🧬", genre: "Simulation / Life",   type: "embed", url: "https://bitlife2.org/",              featured: false },
  { id: "tiny-fishing",     name: "Tiny Fishing",        image: "./assets/games/tiny-fishing.png",    emoji: "🎣", genre: "Casual / Idle",       type: "embed", url: "https://tinyfishing.github.io/",     featured: false },
  { id: "2048",             name: "2048",                  image: "./assets/games/2048.png",            emoji: "🔢", genre: "Puzzle",              type: "embed", url: "https://ubg365.github.io/2048/",      featured: false },
  { id: "cookie-clicker",   name: "Cookie Clicker",        image: "./assets/games/cookie-clicker.png",  emoji: "🍪", genre: "Idle / Clicker",      type: "embed", url: "https://ubg98.github.io/CookieClicker2/", featured: false },

  // ── Arcade / Rhythm / Runner ──
  { id: "fnf",              name: "Friday Night Funkin'", image: "./assets/games/fnf.png",            emoji: "🎤", genre: "Rhythm / Music",      type: "embed", url: "https://fridaynight-funkin.github.io/", featured: false },
  { id: "crossy-road",      name: "Crossy Road",           image: "./assets/games/crossy-road.png",     emoji: "🐔", genre: "Arcade",              type: "embed", url: "https://ubg98.github.io/CrossyRoad/",  featured: false },
  { id: "tunnel-rush",      name: "Tunnel Rush",           image: "./assets/games/tunnel-rush.png",     emoji: "🌀", genre: "Arcade / Speed",      type: "embed", url: "https://ubg98.github.io/TunnelRush2/", featured: false },
  { id: "run3",             name: "Run 3",                 image: "./assets/games/run3.png",            emoji: "🏃", genre: "Platformer / Endless", type: "embed", url: "https://ubg365.github.io/run-3/",       featured: false },
  { id: "geometry-dash",    name: "Geometry Dash",         image: "./assets/games/geometry-dash.png",   emoji: "🔶", genre: "Rhythm / Platformer", type: "embed", url: "https://ubg365.github.io/geometry-dash/", featured: false },
  { id: "temple-run2",      name: "Temple Run 2",          image: "./assets/games/temple-run2.png",     emoji: "🏛️", genre: "Endless Runner",      type: "proxy", url: "https://poki.com/en/g/temple-run-2",  featured: false },
  { id: "getaway-shootout", name: "Getaway Shootout",      image: "./assets/games/getaway-shootout.png", emoji: "🤠", genre: "Action / Multiplayer", type: "embed", url: "https://ubg365.github.io/getaway-shootout/", featured: false },
  { id: "basket-random",    name: "Basket Random",         image: "./assets/games/basket-random.jpg",   emoji: "🏀", genre: "Sports / Funny",      type: "embed", url: "https://basketrandom.github.io/",     featured: false },
  { id: "stickman-hook",    name: "Stickman Hook",         image: "./assets/games/stickman-hook.png",   emoji: "🪝", genre: "Arcade / Swing",      type: "embed", url: "https://ubg98.github.io/StickmanHook/", featured: false },
  { id: "boxing-random",    name: "Boxing Random",         image: "./assets/games/boxing-random.jpg",   emoji: "🥊", genre: "Sports / Funny",      type: "embed", url: "https://ubg98.github.io/BoxingRandom/", featured: false },
  { id: "narrow-one",       name: "Narrow.One",            image: "./assets/games/narrow-one.png",      emoji: "🏹", genre: "Archery / Multiplayer", type: "proxy", url: "https://narrow.one",                featured: false },
];

// ─── Proxy State ───────────────────────────────────────────────────────────
let proxyReady = false;
let swRegistration = null;

// ─── DOM References ────────────────────────────────────────────────────────
const searchInput    = document.getElementById("search-input");
const searchBtn      = document.getElementById("search-btn");
const proxyContainer = document.getElementById("proxy-container");
const proxyFrame     = document.getElementById("proxy-frame");
const proxyUrlBar    = document.getElementById("proxy-url-display");
const proxyBack      = document.getElementById("proxy-back");
const proxyRefresh   = document.getElementById("proxy-refresh");
const panicBtn       = document.getElementById("panic-btn");
const cloakToggle    = document.getElementById("cloak-toggle");
const loadingOverlay = document.getElementById("loading-overlay");

const cloakText      = document.getElementById("cloak-text");
const proxyHistBack  = document.getElementById("proxy-history-back");
const proxyHistFwd   = document.getElementById("proxy-history-forward");
const proxyFull      = document.getElementById("proxy-fullscreen");
const proxyPopout    = document.getElementById("proxy-popout");

// ─── IXL Disguise & Tab Cloaking ───────────────────────────────────────────
const IXL_TITLE = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
const IXL_FAVICON = "./assets/ixl-favicon.png";

const CLOAKS = [
  { title: "Google Docs",   icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
  { title: "Google Drive",  icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
  { title: "Google Classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
];

let currentCloak = 0;

function applyCloak(index) {
  if (!document.body.classList.contains("secret-active")) return;
  const cloak = CLOAKS[index];
  document.title = cloak.title;
  const favicon = document.getElementById("tab-favicon");
  if (favicon) favicon.href = cloak.icon;
  if (cloakText) cloakText.textContent = `Cloaked as ${cloak.title}`;
}

if (cloakToggle) {
  cloakToggle.addEventListener("click", () => {
    currentCloak = (currentCloak + 1) % CLOAKS.length;
    applyCloak(currentCloak);
  });
}

// ─── Secret "joey" Key Trigger ─────────────────────────────────────────────
let secretBuffer = "";
const SECRET_WORD = "joey";
let secretTimer = null;

function activateSecretSite() {
  document.body.classList.add("secret-active");
  const ixlWrap = document.getElementById("ixl-wrapper");
  const secretWrap = document.getElementById("secret-site-wrapper");
  if (ixlWrap) ixlWrap.style.display = "none";
  if (secretWrap) secretWrap.style.display = "block";
  window.scrollTo(0, 0);
  applyCloak(currentCloak);
  console.log("⚡ Secret portal activated via 'joey' trigger.");
}

function deactivateSecretSite() {
  document.body.classList.remove("secret-active");
  const ixlWrap = document.getElementById("ixl-wrapper");
  const secretWrap = document.getElementById("secret-site-wrapper");
  if (ixlWrap) ixlWrap.style.display = "block";
  if (secretWrap) secretWrap.style.display = "none";
  window.scrollTo(0, 0);
  if (proxyContainer) proxyContainer.classList.remove("active");
  if (proxyFrame) proxyFrame.src = "about:blank";
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
  // Restore IXL Title & Favicon
  document.title = IXL_TITLE;
  const favicon = document.getElementById("tab-favicon");
  if (favicon) favicon.href = IXL_FAVICON;
}

if (panicBtn) {
  panicBtn.addEventListener("click", deactivateSecretSite);
}

// Capture-phase keystroke listener: guaranteed to catch keystrokes anywhere
document.addEventListener("keydown", (e) => {
  // If secret site is active, ESC returns to IXL, no prank
  if (document.body.classList.contains("secret-active")) {
    if (e.key === "Escape") {
      e.preventDefault();
      deactivateSecretSite();
    }
    return;
  }

  if (e.key === "Escape") {
    deactivateSecretSite();
    return;
  }

  // Handle Backspace for typos
  if (e.key === "Backspace") {
    secretBuffer = secretBuffer.slice(0, -1);
    return;
  }

  // Enter key handling
  if (e.key === "Enter") {
    const ixlInput = document.querySelector(".ixl-search-input");
    const val = ixlInput ? ixlInput.value.trim().toLowerCase() : "";
    if (val === "joey" || secretBuffer.endsWith(SECRET_WORD)) {
      if (ixlInput) ixlInput.value = "";
      secretBuffer = "";
      activateSecretSite();
      return;
    }
    if (val !== "" || secretBuffer.length > 0) {
      e.preventDefault();
      if (typeof window.playPornhubIntroMaxVolume === "function") {
        window.playPornhubIntroMaxVolume();
      }
      secretBuffer = "";
      return;
    }
  }

  // Track keystrokes anywhere on the page
  if (e.key && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
    secretBuffer += e.key.toLowerCase();
    if (secretBuffer.length > 20) secretBuffer = secretBuffer.slice(-20);
    clearTimeout(secretTimer);
    secretTimer = setTimeout(() => { secretBuffer = ""; }, 5000);

    if (secretBuffer.endsWith(SECRET_WORD)) {
      secretBuffer = "";
      activateSecretSite();
      return;
    }

    if (secretBuffer.length >= 4 && !"joey".startsWith(secretBuffer)) {
      if (typeof window.playPornhubIntroMaxVolume === "function") {
        window.playPornhubIntroMaxVolume();
      }
      secretBuffer = "";
    }
  }
}, true);

// Also hook into IXL search bar directly if typed there
window.addEventListener("DOMContentLoaded", () => {
  const ixlInput = document.querySelector(".ixl-search-input");
  if (ixlInput) {
    ixlInput.addEventListener("input", () => {
      const val = ixlInput.value.trim().toLowerCase();
      if (val === "joey") {
        ixlInput.value = "";
        activateSecretSite();
      } else if (val.length >= 4 && !val.startsWith("joey")) {
        if (typeof window.playPornhubIntroMaxVolume === "function") {
          window.playPornhubIntroMaxVolume();
        }
      }
    });
    ixlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const val = ixlInput.value.trim().toLowerCase();
        if (val === "joey") {
          ixlInput.value = "";
          activateSecretSite();
        } else if (val.length > 0) {
          if (typeof window.playPornhubIntroMaxVolume === "function") {
            window.playPornhubIntroMaxVolume();
          }
        }
      }
    });
  }
});

// IXL Question Interaction
window.openIxlQuestion = function(problem, answer) {
  const modal = document.getElementById("ixl-modal");
  const qBody = document.getElementById("ixl-q-body");
  const feedback = document.getElementById("ixl-feedback");
  const ansInput = document.getElementById("ixl-ans");
  if (modal && qBody) {
    qBody.textContent = problem;
    modal.dataset.expected = answer;
    if (feedback) feedback.textContent = "";
    if (ansInput) { ansInput.value = ""; ansInput.focus(); }
    modal.style.display = "flex";
  }
};

window.closeIxlQuestion = function() {
  const modal = document.getElementById("ixl-modal");
  if (modal) modal.style.display = "none";
};

window.submitIxlAnswer = function() {
  const modal = document.getElementById("ixl-ans");
  const ansInput = document.getElementById("ixl-ans");
  const feedback = document.getElementById("ixl-feedback");
  const modalEl = document.getElementById("ixl-modal");
  if (!modalEl || !ansInput || !feedback) return;
  const userVal = ansInput.value.trim();
  if (!userVal) {
    feedback.textContent = "Please enter an answer.";
    feedback.style.color = "#e53e3e";
    return;
  }
  feedback.textContent = "✓ Brilliant! SmartScore increased to 96.";
  feedback.style.color = "#2e7d32";
  setTimeout(() => {
    modalEl.style.display = "none";
  }, 1200);
};

// Global browser error logging
window.addEventListener("error", (e) => {
  fetch("/api/log?msg=" + encodeURIComponent("[WINDOW ERROR] " + (e.message || "Unknown") + " at " + (e.filename || "") + ":" + (e.lineno || ""))).catch(() => {});
});
window.addEventListener("unhandledrejection", (e) => {
  fetch("/api/log?msg=" + encodeURIComponent("[UNHANDLED REJECTION] " + (e.reason?.stack || e.reason?.message || String(e.reason)))).catch(() => {});
});

async function initProxy() {
  try {
    if ("serviceWorker" in navigator) {
      swRegistration = await navigator.serviceWorker.register("./sw.js?v=1789508000000", {
        scope: "/",
      });
      console.log("[✓] UV Service Worker registered, scope:", swRegistration.scope);

      try { await swRegistration.update(); } catch (_) {}

      const sw = swRegistration.installing || swRegistration.waiting;
      if (sw) {
        await new Promise((resolve) => {
          if (sw.state === "activated") return resolve();
          sw.addEventListener("statechange", function onStateChange() {
            if (sw.state === "activated") {
              sw.removeEventListener("statechange", onStateChange);
              resolve();
            }
          });
          setTimeout(resolve, 1500);
        });
      }

      // Configure BareMux transport
      try {
        const { BareMuxConnection } = await import("./baremux/index.mjs");
        const v = Date.now();
        const workerUrl = new URL("./baremux/worker.js?v=" + v, location.href).href;
        const epoxyUrl = new URL("./epoxy/index.mjs?v=" + v, location.href).href;
        const conn = new BareMuxConnection(workerUrl);
        const hasLocalBare = location.port && (location.hostname === "localhost" || location.hostname === "127.0.0.1");

        if (hasLocalBare) {
          try {
            const { default: BareClient } = await import("./bareasmodule3/index.mjs");
            const client = new BareClient(location.origin + "/bare/");
            await conn.setRemoteTransport(client, "bare-as-module3");
            console.log("[✓] BareMux connected to local Bare server.");
          } catch (localErr) {
            console.warn("[!] Local Bare failed, connecting to Wisp tunnel via Epoxy:", localErr);
            await conn.setTransport(epoxyUrl, [{ wisp: "wss://wisp.mercurywork.shop/" }]);
          }
        } else {
          // Cloud / Custom domain / GitHub Pages: Connect to high-speed Wisp WebSocket tunnel!
          try {
            await conn.setTransport(epoxyUrl, [{ wisp: "wss://wisp.mercurywork.shop/" }]);
            console.log("[✓] BareMux connected to primary Wisp tunnel via Epoxy.");
          } catch (wispErr) {
            console.warn("[!] Primary Wisp failed, trying backup tunnel:", wispErr);
            await conn.setTransport(epoxyUrl, [{ wisp: "wss://flow-works.me/wisp/" }]);
          }
        }
      } catch (transportErr) {
        console.error("[✗] BareMux transport setup failed:", transportErr);
      }

      proxyReady = true;
    }
  } catch (err) {
    console.error("[✗] Service Worker registration failed:", err);
  }
}

initProxy();

// ─── URL Encoding / Navigation ─────────────────────────────────────────────
function isUrl(input) {
  // If it has a dot and no spaces, it's probably a URL
  return /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+/.test(input) || input.includes("://");
}

function formatUrl(input) {
  input = input.trim();
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (isUrl(input)) return "https://" + input;
  // Treat as a Google search
  return "https://www.google.com/search?q=" + encodeURIComponent(input);
}

function encodeForProxy(url) {
  const config = self.__uv$config;
  if (!config) return "/~/";
  // Use the XOR encode from UV config
  return config.prefix + config.encodeUrl(url);
}

async function navigateProxy(url) {
  if (!proxyReady) {
    console.log("Waiting for proxy to initialize...");
    if (loadingOverlay) loadingOverlay.classList.add("active");
    await new Promise(r => {
      let tries = 0;
      const check = setInterval(() => {
        tries++;
        if (proxyReady || tries > 25) { clearInterval(check); r(); }
      }, 100);
    });
  }

  const formatted = formatUrl(url);
  const encoded = encodeForProxy(formatted);

  // Show loading with safety timeout so it NEVER gets stuck
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
    setTimeout(() => {
      if (loadingOverlay) loadingOverlay.classList.remove("active");
    }, 2500);
  }

  // Show proxy frame
  proxyContainer.classList.add("active");
  proxyUrlBar.value = formatted;
  proxyFrame.src = encoded;

  proxyFrame.addEventListener("load", () => {
    if (loadingOverlay) loadingOverlay.classList.remove("active");
  }, { once: true });
}

// ─── Search Bar Events ─────────────────────────────────────────────────────
function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  navigateProxy(query);
}

if (searchBtn) searchBtn.addEventListener("click", handleSearch);
if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });
}

// ─── Proxy Frame Controls ──────────────────────────────────────────────────
if (proxyBack) {
  proxyBack.addEventListener("click", () => {
    proxyContainer.classList.remove("active");
    proxyFrame.src = "about:blank";
  });
}

if (proxyRefresh) {
  proxyRefresh.addEventListener("click", () => {
    proxyFrame.contentWindow?.location.reload();
  });
}

if (proxyHistBack) {
  proxyHistBack.addEventListener("click", () => {
    proxyFrame.contentWindow?.history.back();
  });
}

if (proxyHistFwd) {
  proxyHistFwd.addEventListener("click", () => {
    proxyFrame.contentWindow?.history.forward();
  });
}

if (proxyFull) {
  proxyFull.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      proxyContainer.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });
}

if (proxyPopout) {
  proxyPopout.addEventListener("click", () => {
    const popup = window.open("about:blank", "_blank");
    if (popup) {
      const frame = popup.document.createElement("iframe");
      frame.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;margin:0;padding:0;";
      frame.src = proxyFrame.src;
      popup.document.body.style.margin = "0";
      popup.document.body.appendChild(frame);
    }
  });
}

if (proxyUrlBar) {
  proxyUrlBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = proxyUrlBar.value.trim();
      if (val) navigateProxy(val);
    }
  });
}

// ─── Quick Access Buttons ──────────────────────────────────────────────────
document.querySelectorAll(".quick-btn[data-url]").forEach((btn) => {
  btn.addEventListener("click", () => {
    navigateProxy(btn.dataset.url);
  });
});

// ─── Direct Embed Game Loader (Instant, 0-Lag, No Proxy Bottleneck) ───────
function loadEmbedGame(url, name) {
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
  }
  proxyContainer.classList.add("active");
  proxyUrlBar.value = url;
  proxyFrame.src = url;
  proxyFrame.addEventListener("load", () => {
    if (loadingOverlay) loadingOverlay.classList.remove("active");
  }, { once: true });
  setTimeout(() => {
    if (loadingOverlay) loadingOverlay.classList.remove("active");
  }, 1200);
}

function openGame(game) {
  if (game.type === "embed") {
    loadEmbedGame(game.url, game.name);
  } else {
    navigateProxy(game.url);
  }
}

// ─── Game Card Rendering ───────────────────────────────────────────────────
function createGameCard(game) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.dataset.genre = game.genre;
  card.dataset.type = game.type;

  card.innerHTML = `
    <div class="game-thumb-wrap">
      <img
        src="${game.image}"
        alt="${game.name}"
        class="game-thumb-img"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="game-thumb-fallback">${game.emoji}</div>
      <span class="game-badge ${game.id === 'cinejoy' ? 'badge-stream' : (game.type === 'proxy' ? 'badge-proxy' : 'badge-html5')}">
        ${game.id === 'cinejoy' ? 'HD STREAM' : (game.type === 'proxy' ? 'PROXY' : 'HTML5')}
      </span>
      <div class="game-play-hover">
        <span class="play-pill">${game.id === 'cinejoy' ? '▶ Watch Now' : '▶ Play Now'}</span>
      </div>
    </div>
    <div class="game-info">
      <h3>${game.name}</h3>
      <span class="game-genre">${game.genre}</span>
    </div>
  `;

  card.addEventListener("click", () => {
    openGame(game);
  });

  return card;
}

function renderGames() {
  const featuredGrid = document.getElementById("featured-games");
  const popularGrid  = document.getElementById("popular-games");

  if (featuredGrid) {
    const featured = GAMES.filter(g => g.featured);
    featured.forEach(game => featuredGrid.appendChild(createGameCard(game)));
  }

  if (popularGrid) {
    const popular = GAMES.filter(g => !g.featured);
    popular.forEach(game => popularGrid.appendChild(createGameCard(game)));
  }
}

renderGames();

// ─── About:blank Cloaking (open site in about:blank iframe) ────────────────
// This is an optional extra layer: if the user right-clicks the cloak indicator
// and selects "Open in about:blank", the entire site loads inside an
// about:blank page, making it invisible to browser-level extensions.
function openInAboutBlank() {
  const popup = window.open("about:blank", "_blank");
  if (!popup) return alert("Pop-up blocked! Allow pop-ups for this site.");
  const frame = popup.document.createElement("iframe");
  frame.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;margin:0;padding:0;z-index:999999;";
  frame.src = location.href;
  popup.document.body.style.margin = "0";
  popup.document.body.appendChild(frame);

  // Apply cloak to the new tab too
  const cloak = CLOAKS[currentCloak];
  popup.document.title = cloak.title;
  const link = popup.document.createElement("link");
  link.rel = "icon";
  link.href = cloak.icon;
  popup.document.head.appendChild(link);
}

// Stealth button in navbar & double-click cloak indicator
const stealthBtn = document.getElementById("stealth-launch-btn");
if (stealthBtn) {
  stealthBtn.addEventListener("click", openInAboutBlank);
}
if (cloakToggle) {
  cloakToggle.addEventListener("dblclick", openInAboutBlank);
}

console.log("⚡ Jojy's Mojis loaded. Built by yours truly. Press ESC to panic.");
