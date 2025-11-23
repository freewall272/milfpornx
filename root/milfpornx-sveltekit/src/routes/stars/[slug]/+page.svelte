<script>
  export let data;

  const { star, videos } = data;

  import VideoGrid from "$lib/components/VideoGrid.svelte";
</script>

<!-- FULL BACKGROUND HERO -->
<section
  class="relative w-full h-[280px] sm:h-[360px] flex items-end justify-start
         pt-[120px] sm:pt-[80px]"  
  style="
    background-image: url('{star.img_url}');
    background-size: cover;
    background-position: center;
  "
>
  <!-- Dark gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

  <!-- Text -->
  <div class="relative z-10 p-6 sm:p-10 text-white w-full">
    <h1 class="text-3xl sm:text-5xl font-extrabold drop-shadow-xl">
      {star.name}
    </h1>

    <p class="text-yellow-300 font-semibold mt-2 text-lg sm:text-xl drop-shadow-lg">
      {videos.length} videos
    </p>

    {#if star.description}
      <p class="text-gray-200 mt-3 text-sm max-w-md drop-shadow-lg leading-relaxed hidden sm:block">
        {star.description}
      </p>
    {/if}
  </div>
</section>


<!-- VIDEO GRID -->
<section class="pt-8 pb-20">
  <VideoGrid videos={videos} />
</section>
