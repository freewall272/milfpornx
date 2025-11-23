import { buildSEO } from "$lib/seo";
import {SITE_URL, API_URL} from "$lib/config.js"

export async function load({ fetch }) {
  const res = await fetch(
    `${API_URL}/stars`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const json = await res.json();

  return {
    videos: json.data,
    stars: json.stars,
    totalStars: json.totalStars,

    seo: buildSEO({
      title: `Pornstars: Gallery of Pornstars - milfpornx.com`,
      description: `Choose your favorite Slutty Mom Pornstar and get all her videos.`,
      canonical: `${SITE_URL}/stars`,
    })
  };
}
