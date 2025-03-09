<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';

	let { data, children } = $props();

	let updating = $state(false);
</script>

<main>
	{@render children()}
</main>
