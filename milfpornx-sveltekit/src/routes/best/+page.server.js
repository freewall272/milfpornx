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
    ? "Best Asian Porn & Sex Movies - AsianPornXXX"
    : `Most Viewed Videos – Page ${page}`;

  const description = isFirstPage
    ? "Watch the best Asian porn videos on AsianPornXXX.com."
    : `Watch the most viewed Asian porn videos on AsianPornXXX — page ${page}.`;

  const canonical = isFirstPage
    ? "https://asianpornxxx.com/best"
    : `https://asianpornxxx.com/best?page=${page}`;

  const payload = {
    page: json.page,
    totalPages: json.totalPages,
    videos: json.data,

    seo: buildSEO({
      title,
      description,
      canonical,
      image: `https://asianpornxxx.com/og/og-best.jpg`

    })
  };

  return payload;
}
