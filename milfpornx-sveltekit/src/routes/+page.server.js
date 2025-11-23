import { buildSEO } from "$lib/seo";
import {SITE_URL, API_URL} from "$lib/config.js"

export async function load({ fetch, url }) {
  const page = Number(url.searchParams.get("page") || 1);

  const res = await fetch(
    `${API_URL}/home?page=${page}&limit=120`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const json = await res.json();

  // Title logic
  const title = page === 1
    ? "Free Milf Porn Videos & Best Milf Sex Videos - milfpornx"
    : `Free Milf Porn Videos on milfpornx – Page ${page}`;

  // Description logic
  const description = page === 1
    ? "Watch the best free milf porn videos on milfpornx"
    : `Watch the best free milf porn videos on milfpornx – page ${page}.`;

  // Canonical logic
  const canonical = page === 1
    ? SITE_URL
    : `${SITE_URL}/?page=${page}`;

  const payload = {
    page: json.page,
    totalPages: json.totalPages,
    videos: json.data,

    seo: buildSEO({
      title,
      description,
      canonical,
      
    })
  };

  return payload;
}
