<script lang="ts">
	import BirdCard from '$lib/components/BirdCard.svelte';
	import { Pagination } from '$lib/components/ui/pagination/index.js';

	let { data } = $props();
	let { streamed, page } = $derived(data);

	let pageValue = $derived.by(() => {
		if (!isNaN(parseFloat(page))) {
			return parseFloat(page);
		}
		return 1;
	});
</script>

<div class="container">
	<h1>Beautiful Birds</h1>

	<div class="card-grid">
		{#await streamed.observations}
			<p>Loading...</p>
		{:then observations}
			<Pagination
				page={pageValue}
				totalResults={observations.totalResults}
				perPage={observations.perPage}
				class="col-span-full"
			/>

			{#each observations.observations as observation (observation.id)}
				<BirdCard {observation} />
			{/each}

			<Pagination
				page={pageValue}
				totalResults={observations.totalResults}
				perPage={observations.perPage}
				class="col-span-full"
			/>
		{:catch error}
			<p class="text-red-500">{error.message}</p>
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
