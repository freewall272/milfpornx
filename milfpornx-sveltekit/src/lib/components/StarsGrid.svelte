<script>
  import StarCard from "./StarCard.svelte";
  export let stars = [];
</script>

<div class="mx-auto max-w-[1800px] px-4 relative z-0">
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {#each stars as star}
      <StarCard {...star} />
    {/each}
  </div>
</div>
