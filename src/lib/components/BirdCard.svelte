<script lang="ts">
	import type { Observation } from '$lib/types/observation';

	type Props = {
		imageUrl: string;
		commonName: string;
		latinName: string;
		imageWidth?: number;
		imageHeight?: number;
		onError?: () => void;
	};

	let { observation }: { observation: Observation } = $props();
	let { photos, taxon } = $derived(observation);

	let hasError = $state(false);

	function handleError() {
		hasError = true;
	}
</script>

<article class="card" class:error={hasError}>
	<header>
		<h2>{taxon?.preferredCommonName}</h2>
		<p>{taxon?.iconicTaxonName}</p>
	</header>

	{#if hasError}
		<div class="error-placeholder">
			<span>Failed to load image</span>
		</div>
	{:else if photos.length > 0}
		<img
			src={photos[0].url}
			alt={taxon?.preferredCommonName}
			width="100%"
			height="100%"
			loading="lazy"
			onerror={handleError}
		/>
	{/if}
</article>

<style>
	.card {
		width: 300px;
		border-radius: 8px;
		overflow: hidden;
		background: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		/* Grid layout for fixed image size */
		display: grid;
		grid-template-rows: auto 350px;
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

	p {
		margin: 0.5rem 0 0 0;
		font-size: 1rem;
		font-style: italic;
		color: #666;
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
