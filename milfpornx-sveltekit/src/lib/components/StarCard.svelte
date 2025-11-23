<script>
  export let name = "";
  export let img_url = "";
  export let slug = "";       // NEW
</script>

<a
  href={slug ? `/stars/${slug}` : `/search?q=${encodeURIComponent(name)}`}
  class="block rounded-xs overflow-hidden relative group"
>
  <div class="relative h-48 w-full">
    <img
      src={img_url}
      alt={name}
      class="w-full h-full object-cover group-hover:opacity-90 transition"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
      <p class="text-white font-bold tracking-wide text-sm uppercase">
        {name}
      </p>
    </div>
  </div>
</a>
