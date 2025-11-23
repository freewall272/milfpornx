// src/routes/sitemap.xml/+server.js
import { json } from '@sveltejs/kit';

const CACHE_TTL = 1000 * 60 * 60 * 14; // 14 hours
let cachedXml = null;
let cachedAt = 0;

const DOMAIN = "https://asianpornxxx.com";

// These routes are static (not paginated)
const STATIC_ROUTES = [
  "/",
  "/2257",
  "/about",
  "/dmca",
  "/privacy",
  "/random",
  "/search",
  "/stars",
  "/terms"
];

// Paginated routes
const PAGINATED_ROUTES = [
  "/",       // homepage
  "/best"    // best page
];

// ----------------------------
// Fetch total pages from your API
// ----------------------------
async function getTotalPages(fetch) {
  try {
    const res = await fetch("https://api.asianpornxxx.com/home?page=1", {
      headers: { "x-api-key": process.env.VITE_API_KEY }
    });

    const json = await res.json();
    return json.totalPages || 1;
  } catch (err) {
    console.error("Failed to fetch total pages for sitemap:", err);
    return 1;
  }
}

// ----------------------------
// Build Sitemap XML
// ----------------------------
async function generateSitemap(fetch) {
  const totalPages = await getTotalPages(fetch);

  const urls = [];

  // Add all static routes
  for (const route of STATIC_ROUTES) {
    urls.push({
      loc: `${DOMAIN}${route}`,
      priority: route === "/" ? "1.0" : "0.7"
    });
  }

  // Add paginated routes
  for (const route of PAGINATED_ROUTES) {
    for (let page = 1; page <= totalPages; page++) {
      const url =
        page === 1
          ? `${DOMAIN}${route}`
          : `${DOMAIN}${route}?page=${page}`;

      urls.push({
        loc: url,
        priority: route === "/" ? "1.0" : "0.8"
      });
    }
  }

  const lastmod = new Date().toISOString();

  // Build XML
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join("") +
    `\n</urlset>`;

  return xml.trim();
}

// ----------------------------
// GET Handler
// ----------------------------
export async function GET({ fetch }) {
  const now = Date.now();

  // Use cache if still valid
  if (cachedXml && now - cachedAt < CACHE_TTL) {
    return new Response(cachedXml, {
      headers: {
        "Content-Type": "application/xml"
      }
    });
  }

  // Generate new sitemap
  const xml = await generateSitemap(fetch);

  // Cache it
  cachedXml = xml;
  cachedAt = now;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
