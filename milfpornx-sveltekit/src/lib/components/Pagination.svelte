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



<div class="hidden sm:flex justify-center items-center gap-2 mt-10 flex-wrap">

  <!-- First Page -->
  <a rel="external"
    href="?page=1"
    class={`px-4 py-2 rounded-md border border-gray-300 text-sm transition
      ${page === 1
        ? "bg-purple-100 text-black font-semibold purple-purple-300"
        : "bg-white hover:bg-gray-100 text-gray-800"}`}
  >1</a>

  <!-- Middle Pages -->
  {#each getDesktopPages() as p}
    <a rel="external"
      href={`?page=${p}`}
      class={`px-4 py-2 rounded-md border border-gray-300 text-sm transition
        ${p === page
          ? "bg-purple-100 text-black font-semibold border-purple-300"
          : "bg-white hover:bg-gray-100 text-gray-800"}`}
    >{p}</a>
  {/each}

  <!-- Last Page -->
  {#if totalPages > 1}
    <a rel="external"
      href={`?page=${totalPages}`}
      class={`px-4 py-2 rounded-md border border-gray-300 text-sm transition
        ${page === totalPages
          ? "bg-purple-100 text-black font-semibold border-purple-300"
          : "bg-white hover:bg-gray-100 text-gray-800"}`}
    >{totalPages}</a>
  {/if}

  <!-- Next -->
  <a rel="external"
    href={page < totalPages ? `?page=${page + 1}` : "#"}
    class={`px-4 py-2 rounded-md border border-gray-300 text-sm transition flex items-center gap-1
      ${page === totalPages
        ? "opacity-40 pointer-events-none bg-white text-gray-400"
        : "bg-white hover:bg-gray-100 text-gray-800"}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/>
    </svg>
  </a>

</div>




<div class="flex sm:hidden justify-center items-center gap-2 mt-10 flex-wrap">

  <!-- Sliding Pages -->
  {#each getMobilePages() as p}
    <a rel="external"
      href={`?page=${p}`}
      class={`px-5 py-3 text-lg rounded-lg border border-gray-300 transition
        ${p === page
          ? "bg-purple-100 text-black font-semibold border-purple-300"
          : "bg-white hover:bg-gray-100 text-gray-800"}`}
    >{p}</a>
  {/each}

  <!-- Next -->
  <a rel="external"
    href={page < totalPages ? `?page=${page + 1}` : "#"}
    class={`px-5 py-3 text-lg rounded-lg border border-gray-300 transition flex items-center
      ${page === totalPages
        ? "opacity-40 pointer-events-none bg-white text-gray-400"
        : "bg-white hover:bg-gray-100 text-gray-800"}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/>
    </svg>
  </a>

</div>



