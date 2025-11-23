<script>
  export let data;
  import VideoGrid from "$lib/components/VideoGrid.svelte";
</script>

<svelte:head>
  <title>Categories — DimesIRL</title>
  <meta name="description" content="Browse the newest videos on DimesIRL." />
</svelte:head>

<main class="max-w-[1800px] mx-auto pt-[84px] px-4 text-gray-900">
  <h1 class="text-2xl text-center font-semibold mb-4 uppercase tracking-wide text-gray-700">
    Categories
  </h1>

  <VideoGrid videos={data.videos} />
</main>