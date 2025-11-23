<script>
  export let data;
  import VideoGrid from "$lib/components/VideoGrid.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
</script>

<svelte:head>
  {#if data.page > 1}
    <link rel="prev" href={`?page=${data.page - 1}`} />
  {/if}

  {#if data.page < data.totalPages}
    <link rel="next" href={`?page=${data.page + 1}`} />
  {/if}
</svelte:head>

<main class="max-w-[1800px] mx-auto pt-[124px] sm:pt-[84px] px-4 text-gray-900">
  <h1 class="text-2xl text-center font-semibold mb-4 uppercase tracking-wide text-gray-700">
    Free Asian Porn Videos
  </h1>

  <VideoGrid videos={data.videos} />

<Pagination data={data} />
</main>