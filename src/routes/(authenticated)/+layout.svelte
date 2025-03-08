<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';

	let { data, children } = $props();

	let updating = $state(false);
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
	<form
		method="POST"
		action="/auth/logout"
		use:enhance={() => {
			updating = true;

			return async ({ update }) => {
				await update();
				updating = false;
			};
		}}
	>
		<Button type="submit">Log Out</Button>
	</form>
</header>
<main>
	{@render children()}
</main>
