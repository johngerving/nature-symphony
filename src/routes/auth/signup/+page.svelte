<script lang="ts">
	import type { PageData } from './$types.js';
	import SignupForm from './signup-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<SignupForm {data} />
