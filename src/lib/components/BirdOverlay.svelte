<script lang="ts">
	import BirdCard from './BirdCard.svelte';
	import type { Bird } from '$lib/types/forest';

	let { birds, cardWidth = '200px', cardImageHeight = '220px' } = $props();
</script>

<div class="pointer-events-none absolute inset-0">
	{#each birds as bird}
		<div
			class="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
			style="top: {bird.position?.top}; left: {bird.position?.left}"
		>
			<BirdCard {...bird} width={cardWidth} imageHeight={cardImageHeight} />
		</div>
	{/each}
</div>
