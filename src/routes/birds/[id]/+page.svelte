<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from "$lib/components/ui/carousel/index.js";

    const name = "Bird Name";
    const description = "Bird description, its fuzzy, and tall, and has a long neck. Furthermore, it has a long tail and is very colorful. It is a bird.";
</script>

<!-- stored bird stuff tried em, tried px,  width="400em" height="400em"-->
<div class="landingContainer">
	<div class="birdCarousel">
		<Carousel.Root class="flex flex-column items-center">
			<Carousel.Content>
				<Carousel.Item>
					<img
					src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg"
					class="birdimg"
					alt="bird"
				/>
				</Carousel.Item>
				<Carousel.Item>
					<img
					src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg"
					class="birdimg"
					alt="bird"
				/>
				</Carousel.Item>
				<Carousel.Item>
					<img
					src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg"
					class="birdimg"
					alt="bird"
				/>
				</Carousel.Item>
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
	<!-- <img
		src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg"
		class="birdimg"
		alt="bird"
	/> -->
	<div class="landingContent">
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
		</div>
		<div class="audio">
			<!-- TODO: Add actual audio system -->
		</div>
	</div>
</div>

<!--soundbytes in this block-->
<div></div>

<!-- contentCards obs site -->
<div class="cardList">
	<div class="contentCards">
		<h1>iNatural Site</h1>
		<p>placeholder for the link to the iNatural site</p>
	</div>
	<div class="contentCards">
		<h1>Location</h1>
		<p>placeholder for location</p>
	</div>
	<div class="contentCards">
		<h1>Digital Commons</h1>
		<p>research placeholder</p>
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
	.birdCarousel {
		width: 400px;
		margin-right: 48px;
		margin-left: 72px;
		flex-grow: 2;
        flex-shrink: 0;
	}
    .cardList {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
	.contentCards {
        background: hsl(var(--card) / var(--tw-bg-opacity));
		width: 300px;
        margin-right: 16px;
        padding: 16px;
		border: 1px solid;
        border-color: hsl(var(--border) / var(--tw-border-opacity));
        border-radius: var(--radius);
	}
    .contentCards:last-child {
        margin-right: 0;
    }
</style>
