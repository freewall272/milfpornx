<script>
  export let data;
  import VideoGrid from "$lib/components/VideoGrid.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
</script>



<main class="max-w-[1800px] mx-auto pt-[124px] sm:pt-[84px] px-4 text-gray-900">
  <h1 class="text-2xl text-center font-semibold mb-4 uppercase tracking-wide text-gray-700">
    Random Videos
  </h1>

  <VideoGrid videos={data.videos} />
  <Pagination data={data} />
</main>