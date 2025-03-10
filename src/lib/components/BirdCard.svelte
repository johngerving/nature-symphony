<script lang="ts">
	import type { Observation } from '$lib/types/inaturalist';

	let {
		observation,
		width = '300px',
		imageHeight = '350px',
		class: className = ''
	}: {
		observation: Observation;
		width: string;
		imageHeight: string;
		class: string;
	} = $props();

	let { photos, taxon } = $derived(observation);
	let hasError = false;

	function handleError() {
		hasError = true;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<a
	class="card {className}"
	class:error={hasError}
	style="--card-width: {width}; --image-height: {imageHeight}"
	href={`/birds/${observation.id}`}
	data-sveltekit-preload-data="hover"
>
	<header>
		<h2>{taxon?.preferredCommonName}</h2>
	</header>

	{#if hasError}
		<div class="error-placeholder">
			<span>Failed to load image</span>
		</div>
	{:else if photos.length > 0}
		<img
			src={photos[0].url}
			alt={taxon?.preferredCommonName}
			loading="lazy"
			onerror={handleError}
		/>
	{/if}
</a>

<style>
	.card {
		width: var(--card-width);
		border-radius: 8px;
		overflow: hidden;
		background: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: grid;
		grid-template-rows: auto var(--image-height);
		cursor: pointer;
	}

	header {
		padding: 1.5rem;
		background: white;
		z-index: 1;
	}

	h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.error-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f9fa;
		color: #666;
		font-size: 0.9rem;
	}

	.card.error {
		opacity: 0.9;
	}
</style>
