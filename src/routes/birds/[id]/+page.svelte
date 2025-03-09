<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    const name = "bird name";
    const description = "bird description";
    const audioSrc = "/birds-chirping-75156.mp3";
</script>

<!-- stored bird stuff tried em, tried px,  width="400em" height="400em"-->
<div class="landingContent">
	<img
		src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg"
		class="birdimg"
		alt="bird"
	/>
	<div class="landingText">
		<h1>{name}</h1>
		<p>{description}</p>
	</div>
</div>

<!--soundbytes in this block-->
<div class="audio-player">
    <audio controls>
        <source src={audioSrc} type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</div>

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
	.landingContent {
		display: flex;
		flex-direction: row;
	}
    .landingText {
        padding: 0px 16px;
    }

    .cardList {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .birdimg {
        width: 300px;
        height: 300px;
        display: inline;
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

    .audio-player {
        margin: 0 auto 2rem auto; /* Center the audio player and add some space below it */
        text-align: center;
    }
</style>
