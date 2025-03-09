<script lang="ts">
  import ForestSlideshow from "$lib/components/ForestSlideshow.svelte";
  import type { PageData } from './$types';

  let { data } = $props<{ data: PageData }>();
</script>

<div class="w-full h-screen">
  <ForestSlideshow slides={data.slides} />
</div>

<style>
  :global(.bird-card) {
    width: 200px !important;
    height: 250px !important;
    transform: scale(0.8);
    transition: transform 0.2s ease-in-out;
  }
  
  :global(.bird-card:hover) {
    transform: scale(0.9);
    z-index: 10;
  }
</style> 