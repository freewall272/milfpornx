<script>
  export let title = "";
  export let img_url = "";
  export let video_url = "";
  export let source = "";
  export let duration = "";
</script>

<a 
  href={video_url}
  target="_blank"
  rel="noopener"
  class="block bg-gray-200 rounded-xs overflow-hidden shadow-sm hover:shadow-md hover:z-5 transition-shadow duration-200 relative z-0"
>
  <!-- Thumbnail -->
  <div class="relative h-48 w-full">
    <img
      src={img_url}
      alt={title}
      class="w-full h-full object-cover"
    />

    <!-- Duration -->
    <span class="absolute bottom-2 right-2 text-[11px] px-2 py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full">
      {duration}
    </span>
  </div>

  <!-- Text -->
  <div class="p-3">
    <p class="text-sm font-semibold truncate text-gray-900">
      {title || "Untitled"}
    </p>
    <p class="text-xs text-gray-500 truncate">
      {source}
    </p>
  </div>
</a>
