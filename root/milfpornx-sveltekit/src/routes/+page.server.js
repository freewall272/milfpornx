import { buildSEO } from "$lib/seo";

export async function load({ fetch, url }) {
  const page = Number(url.searchParams.get("page") || 1);

  const res = await fetch(
    `https://api.asianpornxxx.com/home?page=${page}&limit=120`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const json = await res.json();

  // Title logic
  const title = page === 1
    ? "Free Asian Porn Videos & Best Asian Sex Videos - AsianPornXXX"
    : `Free Asian Porn Videos on AsianPornXXX – Page ${page}`;

  // Description logic
  const description = page === 1
    ? "Watch the best free Asian porn videos on AsianPornXXX"
    : `Watch the best free Asian porn videos on AsianPornXXX – page ${page}.`;

  // Canonical logic
  const canonical = page === 1
    ? "https://asianpornxxx.com"
    : `https://asianpornxxx.com/?page=${page}`;

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
