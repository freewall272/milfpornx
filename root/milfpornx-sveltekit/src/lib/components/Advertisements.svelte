<script>
  import { onMount } from "svelte";

  export let delay = 10000;           // time before showing (ms)
  export let duration = 864000;    // 1 day in ms (reset daily)

  let visible = false;

  onMount(() => {
    const lastShown = localStorage.getItem("telegramBannerLastShown");
    const now = Date.now();

    // Show if never shown or older than 1 day
    if (!lastShown || now - parseInt(lastShown) > duration) {
      setTimeout(() => {
        visible = true;
        localStorage.setItem("telegramBannerLastShown", now);
      }, delay);
    }
  });

  function close() {
    visible = false;
  }
</script>

{#if visible}
  <!-- 📱 MOBILE: Full-width banner -->
<div
  class="sm:hidden fixed bottom-0 w-full bg-[#45caff] text-white grid grid-cols-[auto_1fr_auto] items-center px-5 py-2 z-[999]"
>
  <!-- Left invisible spacer balances the 'X' -->
  <div class="w-6"></div>

  <a
    href="https://t.me/dimesirl"
    target="_blank"
    rel="noopener noreferrer"
    class="font-bold text-center text-md"
  >
    Join The Telegram!
  </a>

  <button
    on:click={close}
    class="text-black/70 hover:text-black text-2xl leading-none justify-self-end"
    aria-label="Close banner"
  >
    ✕
  </button>
</div>


  <!-- 💻 DESKTOP: Floating bubble -->
  <div
    class="hidden sm:flex fixed bottom-6 right-6 z-[999] items-center gap-2"
  >
    <a
      href="https://t.me/dimesirl"
      target="_blank"
      rel="noopener noreferrer"
      class="bg-[#45caff] hover:bg-[#38bdf8] text-white font-semibold px-4 py-3 rounded-full shadow-lg transition-colors"
      title="Join our Telegram"
    >
      Join The Telegram!
    </a>

    <button
      on:click={close}
      class="text-gray-400 hover:text-black text-xl leading-none"
      aria-label="Close bubble"
    >
      ✕
    </button>
  </div>
{/if}
