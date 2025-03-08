<script lang="ts">
	import type { PageData } from './$types.js';
	import LoginForm from './login-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<LoginForm {data} />
