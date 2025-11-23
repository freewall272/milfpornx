import { buildSEO } from "$lib/seo";
import {SITE_URL, API_URL} from "$lib/config.js"

export async function load({ fetch, url }) {
  const query = url.searchParams.get("q")?.trim() || "";

  if (!query) {
    return {
      query,
      page: 1,
      totalPages: 1,
      videos: [],

      seo: buildSEO({
        title: "Search – AsianPornXXX",
        description: "Search across 20,000+ Asian porn videos.",
        canonical: "https://asianpornxxx.com/search",
        image: "/og/search.png"
      })
    };
  }

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "120", 10);

  const apiUrl = `${API_URL}/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;

  const res = await fetch(apiUrl, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY
    }
  });

  if (!res.ok) {
    return {
      query,
      page,
      totalPages: 1,
      videos: [],

      seo: buildSEO({
        title: `Search: ${query}`,
        description: `Search results for ${query}.`,
        canonical: `https://asianpornxxx.com/search?q=${encodeURIComponent(query)}`,
      })
    };
  }

  const json = await res.json();

  return {
    query,
    page: json.page || page,
    totalPages: json.totalPages || 1,
    videos: json.videos || [],

    seo: buildSEO({
      title: `${query} Porn Videos`,
      description: `Search results for ${query} on AsianPornXXX.`,
      canonical: `https://asianpornxxx.com/search?q=${encodeURIComponent(query)}`,
    })
  };
}
