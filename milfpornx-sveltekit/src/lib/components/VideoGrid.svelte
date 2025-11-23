<script>
  import VideoCard from "./VideoCard.svelte";
  export let videos = [];
</script>

<div class="mx-auto max-w-[1800px] px-4 relative z-0">

  <div
  class="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 relative z-0"
>

    {#each videos as video}
      <VideoCard {...video} />
    {/each}
  </div>
</div>
