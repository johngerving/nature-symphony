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
    width: 100px !important;
    height: 125px !important;
    transform: scale(0.7);
    transition: all 0.3s ease-in-out;
    opacity: 0.9;
  }
  
  :global(.bird-card:hover) {
    transform: scale(0.85);
    z-index: 10;
    opacity: 1;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
</style> 