<script lang="ts">
	import BirdCard from '$lib/components/BirdCard.svelte';

	let { data } = $props();
	let { observationsPromise } = $derived(data);
</script>

<div class="container">
	<h1>Beautiful Birds</h1>

	<div class="card-grid">
		{#await observationsPromise}
			<p>Loading...</p>
		{:then observations}
			{#each observations as observation}
				<BirdCard {observation} />
			{/each}
		{:catch error}
			<p class="text-red-500">{error}</p>
		{/await}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		text-align: center;
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 2rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, 300px);
		gap: 1.5rem;
		justify-content: center;
	}
</style>
