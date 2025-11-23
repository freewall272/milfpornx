import { buildSEO } from "$lib/seo";

export async function load({ fetch }) {
  const res = await fetch(
    `https://api.asianpornxxx.com/random?limit=120`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const json = await res.json();

  return {
    videos: json.data,

    seo: buildSEO({
      title: `Random Asian Porn Videos: Free Asian Porn Videos - asianpornxxx.com`,
      description: `Discover randomly selected Asian porn videos refreshed on every visit.`,
      canonical: `https://asianpornxxx.com/random`,
    })
  };
}
