<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Root, Content, Item, Previous, Next } from "$lib/components/ui/carousel/index.js"; 
    import ResearchArticles from '$lib/components/ResearchArticles.svelte';

    export let data;

    console.log("Full Data Object:", data);
    console.log("Observation:", data?.observation);

    let observation = data?.observation;
    let imageUrls = observation?.photos
        ?.slice(0, 3) // get only the first 3 images
        ?.map(photo => photo.url.replace("square.jpeg", "original.jpeg")) || [];

    console.log("Extracted Image URLs:", imageUrls);

    const name = observation?.taxon?.preferredCommonName || "Unknown Bird";
    const description = observation?.taxon?.iconicTaxonName || "No description available";
    let audioUrls = observation?.sounds
        ?.slice(0, 3) // Get only the first 3 sounds
        ?.map(sound => sound.url) || []; // Set to an empty array if no audio is available
</script>

{#if observation}
    <div class="carousel-container">
        <Root class="carousel">
            <Previous class="carousel-button left">‹</Previous>
            <Content class="carousel-content">
                {#each imageUrls as imageUrl}
                    <Item class="carousel-item">
                        <img
                            src="{imageUrl}"
                            class="birdimg"
                            alt="{name}"
                        />
                    </Item>
                {/each}
            </Content>
            <Next class="carousel-button right">›</Next>
        </Root>
    </div>
{:else}
    <p>Loading images...</p> <!-- Shows a loading message instead of rendering empty -->
{/if}

<div class="landingContent">
    <div>
        <h1>{name}</h1>
    </div>
    <div class="audio">
        {#if audioUrls.length > 0}
            {#each audioUrls as audioUrl}
                <audio controls>
                    <source src="{audioUrl}" type="audio/mpeg">
                    Your browser does not support the audio element!.
                </audio>
            {/each}
        {:else}
            <p>Sorry, no audio files found.</p>
        {/if}
    </div>
</div>

<!-- contentCards obs site -->
<div class="cardList">
    <!-- <div class="contentCards">
        <h1>iNatural Site</h1>
        <p>placeholder for the link to the iNatural site</p>
    </div>
    <div class="contentCards">
        <h1>Location</h1>
        <p>placeholder for location</p>
    </div> -->
    <div class="contentCards">
        <ResearchArticles 
            articles={data.articles} 
            error={data.articlesError} 
        />
    </div>
</div>

<style>
    .landingContainer {
        display: flex;
        flex-direction: row;
        margin-bottom: 100px;
    }
    .landingContent {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0px 16px;
        flex-grow: 1;
        flex-shrink: 1;
    }
    .landingContent h1 {
        font-weight: 800;
        font-size: 2rem;
    }
    .landingContent .audio {
        width: 100%;
        height: 100px;
        border-radius: var(--radius);
        background: rgb(249, 250, 251);
    }
    
    .birdimg {
        width: 400px;
        height: 300px;
        border-radius: var(--radius);
        object-fit: contain;
    }
    .carousel-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .carousel {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .carousel-content {
        display: flex;
        overflow: hidden;
        width: 400px;
    }
    .carousel-item {
        min-width: 100%;
        transition: transform 0.5s ease-in-out;
    }
    .carousel-button {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px 15px;
        font-size: 2rem;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    }
    .left {
        left: 10px;
    }
    .right {
        right: 10px;
    }
    .cardList {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .contentCards {
        background: hsl(var(--card) / var(--tw-bg-opacity));
        width: 1000px;
        margin-right: 16px;
        padding: 16px;
        border: 2px solid;
        border-color: hsl(var(--border) / var(--tw-border-opacity));
        border-radius: var(--radius);
    }
    .contentCards:last-child {
        margin-right: 0;
    }
</style>
