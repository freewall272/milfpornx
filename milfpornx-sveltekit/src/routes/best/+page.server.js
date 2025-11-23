import { buildSEO } from "$lib/seo";
import {SITE_URL, API_URL} from "$lib/config.js"

export async function load({ fetch, url }) {
  const page = Number(url.searchParams.get("page") || 1);

  const res = await fetch(
    `${API_URL}/best?page=${page}&limit=120`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const json = await res.json();

  // Page 1 SEO clean-up
  const isFirstPage = page === 1;

  const title = isFirstPage
    ? `Best Milf Porn & Sex Movies - milfpornx.com`
    : `Most Viewed Videos – Page ${page}`;

  const description = isFirstPage
    ? `Watch the best milf porn videos on milfpornx.com`
    : `Watch the most viewed milf porn videos on milfpornx — page ${page}.`;

  const canonical = isFirstPage
    ? `${SITE_URL}/best`
    : `${SITE_URL}/best?page=${page}`;

  const payload = {
    page: json.page,
    totalPages: json.totalPages,
    videos: json.data,

    seo: buildSEO({
      title,
      description,
      canonical,
      image: `https://milfpornx.com/og/og-best.jpg`

    })
  };

  return payload;
}
