<script lang="ts">
    import BirdCard from "$lib/components/BirdCard.svelte";
	let { data } = $props();
	let { favorites } = $derived(data);
</script>

<!-- let favorites: {
    id: any;
    createdAt: any;
    geoJSON: any;
    photos: Photo[];
    sounds: Sound[];
    taxon: Taxon;
}[]
 -->

<div class="content">
    <h1>Your Favorites:</h1>
    
    {#if favorites.length === 0}
        <p class="noFav">No favorites yet</p>
        <a class="noFavp" href="/gallery">Lets find some then...</a>
    {:else}
        <div class="cardGrid">
            {#each favorites as favorite}
                <BirdCard
                    showFavorite={true}
                    favorite={true}
                    observation={favorite}
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-self: center;
        padding: 1rem;
    }
    .content h1 {
        font-size: 2rem;
        font-weight: 800;
        text-align: center;
    }
    .noFav {
        font-size: 4rem;
        text-align: center;
        margin-top: 20vh;
    }
    .noFavp {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        color: #2651a8;
        text-decoration: underline;
        padding: 1rem;
    }
    .cardGrid {
        width: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
        margin-bottom: 4rem;
    }
</style>