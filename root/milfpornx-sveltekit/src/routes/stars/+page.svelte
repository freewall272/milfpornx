<script>
  export let data;
  import StarsGrid from "$lib/components/StarsGrid.svelte";

  const { stars } = data;
</script>

<section class="pt-[124px] sm:pt-[84px]">
  <StarsGrid {stars} />
</section>
