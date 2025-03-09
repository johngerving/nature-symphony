<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Navbar } from '$lib/components/ui/navbar';

	let { data, children } = $props();
	let { user, session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<header>

    <div class="search-bar">

      <input id="search" type="search" placeholder="&#x1F50D; Start typing to search..." />

    </div>

</header>

<main class="container">

    <div class="search-display"></div>

    

    <div class="posts-container"></div>

</main>


<style>
div.absolute {
	position: absolute;
	top: 180px;
	right: 0;
	width: 200px;
	height: 100px;
	border: 3px solid #4a4e44;
  }
  header {

position: sticky;

top: -54px; /* value to scroll past the logo so just the search bar is sticky */

z-index: 2;

}

.search-bar {

display: flex;

justify-content: center;

padding: 24px;

}

.search-bar input {

width: 50%;

min-width: 300px;

padding: 12px 24px;

border-radius: 24px;

font-size: 16px;

border: 0px;

outline: none;

}

.search-bar [list]::-webkit-list-button,

.search-bar [list]::-webkit-calendar-picker-indicator {

display: none !important;

}

</style>
<Navbar {user}/>

{@render children()}
