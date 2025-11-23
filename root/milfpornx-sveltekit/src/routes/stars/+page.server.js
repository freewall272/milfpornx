import { buildSEO } from "$lib/seo";

export async function load({ fetch }) {
  const res = await fetch(
    `https://api.asianpornxxx.com/stars`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const json = await res.json();

  return {
    videos: json.data,
    stars: json.stars,
    totalStars: json.totalStars,

    seo: buildSEO({
      title: `Asian Pornstars: Gallery of Pornstars - asianpornxxx.com`,
      description: `Choose your favorite Asian Pornstar and get all her videos.`,
      canonical: `https://asianpornxxx.com/stars`,
    })
  };
}
