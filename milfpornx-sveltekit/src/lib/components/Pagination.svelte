<script>
  export let data;

  // reactive – updates when URL/page changes
  $: page = Number(data.page);
  $: totalPages = Number(data.totalPages);

  const desktopWindowSize = 5;
  const mobileWindowSize = 5;

  function getSlidingWindow(current, total, size) {
    const half = Math.floor(size / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = Math.min(total, size);
    }

    if (end > total) {
      end = total;
      start = Math.max(1, total - size + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  function getDesktopPages() {
    return getSlidingWindow(page, totalPages, desktopWindowSize)
      .filter((p) => p !== 1 && p !== totalPages);
  }

  function getMobilePages() {
    return getSlidingWindow(page, totalPages, mobileWindowSize);
  }
</script>



<!-- DESKTOP PAGINATION (NO PREV BUTTON) -->
<div class="hidden sm:flex justify-center items-center gap-3 mt-10 flex-wrap">

  <!-- First Page -->
  <a rel="external"
    href="?page=1"
    class={`px-4 py-3 rounded-md border-2 border-black transition 
      ${page === 1
        ? "bg-yellow-200 text-black"
        : "bg-white shadow-[4px_4px_0_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black]"}`}
  >1</a>

  <!-- Middle Pages -->
  {#each getDesktopPages() as p}
    <a rel="external"
      href={`?page=${p}`}
      class={`px-4 py-3 rounded-md border-2 border-black transition 
        ${p === page
          ? "bg-yellow-200 text-black"
          : "bg-white shadow-[4px_4px_0_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black]"}`}
    >{p}</a>
  {/each}

  <!-- Last Page -->
  {#if totalPages > 1}
    <a rel="external"
      href={`?page=${totalPages}`}
      class={`px-4 py-3 rounded-md border-2 border-black transition 
        ${page === totalPages
          ? "bg-yellow-200 text-black"
          : "bg-white shadow-[4px_4px_0_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black]"}`}
    >{totalPages}</a>
  {/if}

  <!-- Next -->
  <a rel="external"
    href={page < totalPages ? `?page=${page + 1}` : "#"}
    class={`px-4 py-3 rounded-md border-2 border-black text-black 
      ${page === totalPages
        ? "opacity-40 pointer-events-none bg-white shadow-[4px_4px_0_0_black]"
        : "bg-white shadow-[4px_4px_0_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black] transition-all"}`}
  >  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/></svg>
    </a>

</div>




<!-- MOBILE PAGINATION (NO PREV BUTTON) -->
<div class="flex sm:hidden justify-center items-center gap-3 mt-10 flex-wrap">

  <!-- Sliding Pages -->
  {#each getMobilePages() as p}
    <a rel="external"
      href={`?page=${p}`}
      class={`px-5 py-4 text-lg rounded-lg border-2 border-black transition 
        ${p === page
          ? "bg-yellow-200 text-black"
          : "bg-white shadow-[4px_4px_0_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black]"}`}
    >{p}</a>
  {/each}

  <!-- Next -->
  <a rel="external"
    href={page < totalPages ? `?page=${page + 1}` : "#"}
    class={`px-5 py-4 text-lg rounded-lg border-2 border-black text-black transition
      ${page === totalPages
        ? "opacity-40 pointer-events-none bg-white shadow-[4px_4px_0_0_black]"
        : "bg-white font-bold shadow-[4px_4px_0_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black]"}`}
  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/></svg></a>

</div>


