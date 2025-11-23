<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
    import { tick } from "svelte"; 
  import { PUBLIC_LINK_LIVE_SEX, PUBLIC_LINK_MEETFUCK, PUBLIC_LINK_AI_GF } 
    from "$env/static/public";


  let mobileMenuOpen = false;
  let searchQuery = "";
  let lastScrollY = 0;
  let hideMobileUI = false;
  let mobileSearchInput;


  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const current = window.scrollY;

      // Only run on mobile
      if (window.innerWidth < 768) {
        hideMobileUI = current > lastScrollY && current > 20;  // scroll down → hide
      }

      lastScrollY = current;
    });
  }

  let showMobileSearch = false;



  function toggleMenu() {
    closeSearch();           // CLOSE SEARCH
    mobileMenuOpen = !mobileMenuOpen;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }


  function closeMenu() {
    mobileMenuOpen = false;
    document.body.style.overflow = "";
  }

  function handleSearch(e) {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  }
  function closeSearch() {
    showMobileSearch = false;
  }
  $: if ($page.url.pathname) {
    closeSearch();
  }

async function toggleSearch() {
  // toggle visibility
  showMobileSearch = !showMobileSearch;

  // if we just opened it, wait for DOM update, then focus
  if (showMobileSearch) {
    await tick();

    if (mobileSearchInput) {
      // small Safari-safe scroll freeze
      window.scrollTo(window.scrollX, window.scrollY);
      mobileSearchInput.focus({ preventScroll: true });
    }
  }
}



</script>

<header
  class={`fixed top-0 left-0 w-full bg-yellow-200 border-b border-yellow-300 shadow-sm z-50
    h-[60px] transition-transform duration-500
    ${hideMobileUI ? "-translate-y-full" : "translate-y-0"}`}
>

  <div class="flex items-center justify-between h-full px-4 sm:px-10">

    <!-- Logo -->
    <a href="/" class="flex items-center h-full">
      <img src="/logo.png" alt="Logo" class="h-10 w-auto object-contain" />
    </a>

    <!-- Desktop Nav -->
    <div class="hidden lg:flex items-center gap-10 h-full flex-1 justify-center">
      <nav class="flex items-center gap-6 text-sm font-semibold text-black/90 h-full">

  <a href="/"
     class="relative h-full flex items-center px-2
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-black after:transition-[width] after:duration-500
            hover:after:w-full">
    HOME
  </a>

  <a href="/best"
     class="relative h-full flex items-center px-2
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-black after:transition-[width] after:duration-500
            hover:after:w-full">
    MOST VIEWED
  </a>

  <a href="/random"
     class="relative h-full flex items-center px-2
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-black after:transition-[width] after:duration-500
            hover:after:w-full">
    RANDOM
  </a>

  <a href="/stars"
     class="relative h-full flex items-center px-2
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-black after:transition-[width] after:duration-500
            hover:after:w-full">
    PORNSTARS
  </a>

  <!-- External links -->
  <a href={PUBLIC_LINK_LIVE_SEX} target="_blank"
     class="relative h-full flex items-center px-2 text-pink-700
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-pink-700 after:transition-all after:duration-300
            hover:after:w-full">
    LIVE SEX
  </a>

  <a href={PUBLIC_LINK_MEETFUCK} target="_blank"
     class="relative h-full flex items-center px-2
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-black after:transition-all after:duration-300
            hover:after:w-full">
    MEET & FUCK
  </a>

  <a href={PUBLIC_LINK_AI_GF} target="_blank"
     class="relative h-full flex items-center px-2 text-pink-700
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-pink-700 after:transition-all after:duration-300
            hover:after:w-full">
    AI GIRLFRIEND
  </a>

  <a href="https://lezbabes.com" target="_blank"
     class="relative h-full flex items-center px-2
            after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0
            after:bg-black after:transition-all after:duration-300
            hover:after:w-full">
    LESBIAN PORN
  </a>

</nav>


      <!-- Desktop Search -->
      <div class="flex-1 max-w-[350px]">
        <input
          type="text"
          bind:value={searchQuery}
          on:keydown={handleSearch}
          placeholder="Search 21,364 videos..."
          class="w-full px-4 py-2 rounded-full bg-white text-black placeholder-gray-600 border border-gray-300
                 focus:outline-none focus:border-pink-500 transition"
        />
      </div>

    </div>

    <div class="lg:hidden flex items-center gap-3">

  
      <button 
        class="text-black"
        on:click={toggleSearch}
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-black">
          <path fill="currentColor" d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.98 6.98 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.98 6.98 0 0 0 4.875-1.975z"/>
        </svg>
      </button>

      <!-- Hamburger -->
      <button 
        class="text-3xl text-black" 
        on:click={toggleMenu}
      >
        {#if mobileMenuOpen} ✕ {:else} ☰ {/if}
      </button>

    </div>
  </div>
</header>



<!-- MOBILE QUICKLINKS (unchanged except color tweaks) -->
{#if !['/about', '/dmca', '/2257', '/privacy', '/terms'].includes($page.url.pathname)}
<div 
  class={`lg:hidden fixed top-[60px] left-0 w-full bg-black/90 text-white border-b border-gray-800 z-40
    transition-all duration-200
${hideMobileUI ? "delay-75" : "delay-300"}

    ${hideMobileUI ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
>

  <div class="flex items-center justify-around text-sm font-semibold py-3">
    <a href={PUBLIC_LINK_LIVE_SEX} target="_blank" class="transition">LIVE SEX</a>
    <a href={PUBLIC_LINK_MEETFUCK} target="_blank" class=" transition">MEET & FUCK</a>
    <a href={PUBLIC_LINK_AI_GF} target="_blank" class="transition">AI GF</a>
    <a href="https://lezbabes.com" target="_blank" class="transition">LESBIAN PORN</a>
  </div>
</div>

{#if showMobileSearch}
<div 
  class="lg:hidden fixed inset-0 z-20"
  on:click={closeSearch}
></div>
{/if}

<div
  class={`lg:hidden fixed left-0 w-full bg-black z-30
    transition-all duration-75 ease-out
    ${showMobileSearch 
      ? "opacity-100 pointer-events-auto" 
      : "opacity-0 pointer-events-none -translate-y-4"}`}
  style="top: 104px;"
>
  <div class="p-3">
    <input
      bind:this={mobileSearchInput}
      type="text"
      placeholder="Search videos..."
      class="w-full px-4 py-2 rounded-md bg-white text-black
            placeholder-gray-500 border border-gray-300"
      on:keydown={(e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
          closeSearch();
          window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
        }
      }}
    />
  </div>
</div>





{/if}

<!-- MOBILE OVERLAY -->
{#if mobileMenuOpen}
  <div 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[900] animate-fadeIn" 
    on:click={toggleMenu}
  ></div>
{/if}

<!-- MOBILE NAV -->
<div
  class={`fixed top-0 right-0 h-full w-2/3 bg-black text-white transform transition-transform duration-300 z-[1000] ${
    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div class="flex flex-col gap-4 p-6 mt-10 text-lg font-medium">
    <h1 class="text-2xl mb-2">Navigation</h1>
    <div class="border-t border-gray-700"></div>

    <a href="/" on:click={closeMenu} class="block px-3 py-2 rounded hover:bg-white/10">HOME</a>
    <a href="/best" on:click={closeMenu} class="block px-3 py-2 rounded hover:bg-white/10">MOST VIEWED</a>
    <a href="/random" on:click={closeMenu} class="block px-3 py-2 rounded hover:bg-white/10">RANDOM</a>
    <a href="/stars" on:click={closeMenu} class="block px-3 py-2 rounded hover:bg-white/10">PORNSTARS</a>

    <div class="border-t border-gray-700 my-4"></div>
  </div>
</div>

<style>
  .animate-fadeIn {
    animation: fadeIn 0.25s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
</style>
