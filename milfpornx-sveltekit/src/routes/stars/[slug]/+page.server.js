import { buildSEO } from "$lib/seo";

export async function load({ params, fetch }) {
  const slug = params.slug;

  // 1️⃣ Fetch list of all stars
  const resStars = await fetch(`https://api.asianpornxxx.com/stars`, {
    headers: { "x-api-key": import.meta.env.VITE_API_KEY }
  });

  const jsonStars = await resStars.json();
  const star = jsonStars.stars.find((s) => s.slug === slug);

  if (!star) {
    return { status: 404 };
  }

  // 2️⃣ Fetch videos for this star
  const resVideos = await fetch(
    `https://api.asianpornxxx.com/search?q=${encodeURIComponent(star.name)}`,
    { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
  );

  const jsonVideos = await resVideos.json();

  // 3️⃣ Your API returns videos at jsonVideos.videos
  const videos = jsonVideos.videos || [];

  return {
    star,
    videos,
    seo: buildSEO({
      title: `${star.name} Porn Video Gallery - All ${star.name} Sex Movies & Porn Videos on AsianPornXXX`,
      description: `Watch all Asian porn videos featuring ${star.name}.`,
      canonical: `https://asianpornxxx.com/stars/${slug}`,
    })
  };
}
