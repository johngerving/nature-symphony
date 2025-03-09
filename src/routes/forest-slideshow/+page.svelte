<script lang="ts">
  import ForestSlideshow from "$lib/components/ForestSlideshow.svelte";
  import type { PageData } from './$types';

  let { data } = $props<{ data: PageData }>();
</script>

<div class="container-centered">
  <h1 class="text-4xl font-bold text-center mb-8">Forest Slideshow</h1>
  <ForestSlideshow slides={data.slides} />
</div> 