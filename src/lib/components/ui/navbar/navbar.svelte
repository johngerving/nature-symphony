<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	// Getting user signed-in status
	let { user } = $props();
	$effect(() => {
		console.log(user);
	});
</script>

<nav class="text-primary-background flex items-center justify-between bg-primary-foreground p-4">
	<div>
		<a href="/">Home</a>
		<a href="/about">About</a>
	</div>
	<div class="flex items-center space-x-4">
		{#if user}
			<form method="POST" action="/auth/logout">
				<Button type="submit">Log Out</Button>
			</form>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
		{:else}
			<Button href="/auth/login">Login</Button>
			<Button href="/auth/signup">Signup</Button>
		{/if}
	</div>
</nav>
