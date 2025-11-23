export function buildSEO({
  title = "",
  description = "",
  canonical = "",
  image, // user can override
  type = "website",
  jsonld = null
}) {
  return {
    title,
    description,
    canonical,
    type,
    jsonld,
    image: image || "https://asianpornxxx.com/og-default.jpg"
  };
}
