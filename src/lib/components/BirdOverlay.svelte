<script lang="ts">
    import BirdCard from "./BirdCard.svelte";
    import type { Bird } from '$lib/types/forest';
    
    let { 
      birds,
      cardWidth = '200px',
      cardImageHeight = '220px'
    } = $props();
</script>
  
<div class="absolute inset-0 pointer-events-none">
  {#each birds as bird}
    <div 
      class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      style="top: {bird.position?.top}; left: {bird.position?.left}"
    >
      <BirdCard 
        {...bird} 
        width={cardWidth}
        imageHeight={cardImageHeight}
      />
    </div>
  {/each}
</div>