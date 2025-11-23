<script>
  export let data;
  import VideoGrid from "$lib/components/VideoGrid.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
</script>

<main class="max-w-[1800px] mx-auto pt-[124px] sm:pt-[84px] px-4 text-black">
  <h1 class="text-2xl lg:text-4xl  text-center font-semibold mb-6 uppercase tracking-wide text-gray-700">
    Search: "{data.query}"
  </h1>

  {#if data.videos.length === 0}
    <p class="text-gray-400">No results found.</p>
  {:else}
    <VideoGrid videos={data.videos} />
    <Pagination data={data}/>
  {/if}
</main>
