<script lang="ts">
	import clsx from 'clsx';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let {
		page,
		totalResults,
		perPage,
		class: className,
		...restProps
	}: {
		page: number;
		totalResults: number;
		perPage: number;
		class: string;
	} = $props();

	let totalPages = $derived(Math.ceil(totalResults / perPage));

	let previous = $derived.by(() => {
		if (page == 1) return '';

		return `?page=${page - 1}`;
	});
	let next = $derived.by(() => {
		if (page == totalPages) return '';

		return `?page=${page + 1}`;
	});
</script>

<div class={cn(className, 'grid w-full grid-cols-3')}>
	<a class={cn(buttonVariants(), 'w-fit')} data-sveltekit-preload-data="hover" href={previous}
		>Previous</a
	>
	<p class="m-auto">{page} / {totalPages}</p>
	<a
		class={cn(buttonVariants(), 'float-right ml-auto mr-0 w-fit')}
		data-sveltekit-preload-data="hover"
		href={next}>Next</a
	>
</div>
