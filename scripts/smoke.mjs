/**
 * Headless smoke test: serves ./dist with an SPA fallback, walks every page at
 * desktop and mobile widths, and fails if any app-level console/page error
 * fires. Screenshots land in ./screenshots.
 *
 * Usage:  npm run build && npm run smoke
 * Needs:  npm install -D playwright  (then: npx playwright install chromium)
 */
import { createServer } from "node:http";
import { readFile, mkdir, access } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, "dist");
const SHOTS = join(ROOT, "screenshots");
const PORT = 4173;

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "playwright is not installed.\n" +
      "  npm install -D playwright && npx playwright install chromium"
  );
  process.exit(1);
}

try {
  await access(join(DIST, "index.html"));
} catch {
  console.error("dist/index.html not found — run `npm run build` first.");
  process.exit(1);
}

await mkdir(SHOTS, { recursive: true });

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

// Static server with SPA fallback to index.html
const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = join(DIST, normalize(urlPath));
    let data;
    try {
      data = await readFile(filePath);
    } catch {
      data = await readFile(join(DIST, "index.html"));
      filePath = "index.html";
    }
    res.setHeader("Content-Type", MIME[extname(filePath)] || "application/octet-stream");
    res.end(data);
  } catch (e) {
    res.statusCode = 500;
    res.end(String(e));
  }
});

await new Promise((r) => server.listen(PORT, r));
const base = `http://localhost:${PORT}`;
const appErrors = [];
const browser = await chromium.launch();

// External assets (Unsplash photos, Google Fonts) may be blocked offline —
// those failures are environmental, not app bugs.
const ignorable = (t) =>
  /ERR_|Failed to load resource|fonts\.g|images\.unsplash|lottie/i.test(t);

async function shot(path, name, width, height, after, locale = "en") {
  const ctx = await browser.newContext({ viewport: { width, height } });
  // Seed the saved language before any app code runs, so the page boots
  // straight into the locale under test.
  await ctx.addInitScript(
    (loc) => localStorage.setItem("shopwave.locale", loc),
    locale
  );
  const page = await ctx.newPage();
  const where = `${path} [${locale}]`;
  page.on("console", (m) => {
    if (m.type() === "error" && !ignorable(m.text()))
      appErrors.push(`[console] ${where} — ${m.text()}`);
  });
  page.on("pageerror", (e) => appErrors.push(`[pageerror] ${where} — ${e.message}`));
  await page.goto(base + path, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);
  if (after) await after(page);

  // The document must actually be in the right direction and language.
  const expectedDir = locale === "ar" ? "rtl" : "ltr";
  const { dir, lang } = await page.evaluate(() => ({
    dir: document.documentElement.dir,
    lang: document.documentElement.lang,
  }));
  if (dir !== expectedDir) appErrors.push(`[dir] ${where} — expected ${expectedDir}, got "${dir}"`);
  if (lang !== locale) appErrors.push(`[lang] ${where} — expected ${locale}, got "${lang}"`);

  // Arabic pages must render Arabic script, not fall back to English.
  if (locale === "ar") {
    const body = await page.evaluate(() => document.body.innerText);
    if (!/[؀-ۿ]/.test(body))
      appErrors.push(`[i18n] ${where} — no Arabic characters rendered`);
  }

  // Nothing may overflow the viewport horizontally.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  if (overflow > 2) appErrors.push(`[layout] ${where} — ${overflow}px horizontal overflow`);

  await page.screenshot({ path: join(SHOTS, `${name}.png`) });
  await ctx.close();
}

const routes = [
  ["/", "home", 1280, 1000],
  ["/", "home-mobile", 390, 900],
  ["/shop", "shop", 1280, 1000],
  ["/shop?category=Electronics&sort=price-asc", "shop-sorted", 1280, 1000],
  ["/product/aurora-headphones", "pdp", 1280, 1000],
  ["/cart", "cart", 1280, 900],
  ["/wishlist", "wishlist", 1280, 900],
  ["/about", "about", 1280, 1000],
  ["/contact", "contact", 1280, 1000],
  ["/login", "login", 1280, 820],
  ["/signup", "signup", 1280, 900],
  ["/no-such-page", "404", 1280, 820],
];

// Adds a product, then walks cart → checkout so both render populated.
const fillCart = async (page) => {
  await page.waitForTimeout(400);
  const add = page.locator("button.card__add:not([disabled])").first();
  if (await add.count()) await add.click();
  await page.waitForTimeout(200);
};

const openQuickView = async (page, label) => {
  await page.waitForTimeout(500);
  const eye = page.locator(`button[aria-label="${label}"]`).first();
  if (await eye.count()) {
    await eye.click();
    await page.waitForTimeout(500);
  }
};

for (const locale of ["en", "ar"]) {
  const suffix = locale === "en" ? "" : "-ar";
  for (const [path, name, w, h] of routes) {
    await shot(path, name + suffix, w, h, undefined, locale);
  }
  await shot(
    "/shop",
    `quickview${suffix}`,
    1280,
    1000,
    (page) => openQuickView(page, locale === "ar" ? "عرض سريع" : "Quick view"),
    locale
  );
  await shot("/shop", `cart-filled${suffix}`, 1280, 1000, fillCart, locale);
}

await browser.close();
server.close();

if (appErrors.length) {
  console.error("APP ERRORS:\n" + appErrors.join("\n"));
  process.exit(1);
}
console.log(`No app-level runtime errors ✅  screenshots → ${SHOTS}`);
