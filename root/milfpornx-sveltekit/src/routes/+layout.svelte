<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

import { page } from "$app/stores";

  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";

  onMount(() => {
    afterNavigate((nav) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pageview",
        page: nav.to?.url?.pathname
      });
    });
  });
</script>

<svelte:head>
  {#if $page.data?.seo}
    <title>{$page.data.seo.title || "AsianPornXXX"}</title>

    <meta name="description" content={$page.data.seo?.description || "Best free Asian porn videos updated daily."} />
    <link rel="canonical" href={$page.data.seo.canonical || "https://asianpornxxx.com"}/>

    <!-- Open Graph -->
    <meta property="og:title" content={$page.data.seo.title} />
    <meta property="og:description" content={$page.data.seo.description} />
    <meta property="og:type" content={$page.data.seo.type} />
    <meta property="og:image" content={$page.data.seo.image} />
    <meta property="og:url" content={$page.data.seo.canonical} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={$page.data.seo.image} />

    <!-- JSON-LD -->
    {#if $page.data.seo.jsonld}
      <script type="application/ld+json">
        {@html JSON.stringify($page.data.seo.jsonld)}
      </script>
    {/if}
  {/if}
</svelte:head>

<Header />

<slot />

<Footer />
