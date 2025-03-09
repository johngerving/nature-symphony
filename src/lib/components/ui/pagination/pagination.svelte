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

	let totalPages = $derived(Math.floor(totalResults / perPage));

	let previous = $derived.by(() => {
		if (page == 1) return '';

		return `?page=${page - 1}`;
	});
	let next = $derived.by(() => {
		if (page == totalPages) return '';

		return `?page=${page + 1}`;
	});

	let onFirstPage = $derived(page == 1);
	let onLastPage = $derived(page == totalPages);
</script>

<div class={cn(className, 'grid w-full grid-cols-3')}>
	<div class={onFirstPage ? 'opacity-50' : ''}>
		<a
			class={cn(buttonVariants(), 'w-fit', onFirstPage ? 'pointer-events-none cursor-default' : '')}
			data-sveltekit-preload-data="hover"
			href={previous}>Previous</a
		>
	</div>
	<p class="m-auto">{page} / {totalPages}</p>
	<div class={cn('ml-auto mr-0', onLastPage ? 'opacity-50' : '')}>
		<a
			class={cn(buttonVariants(), 'w-fit', onLastPage ? 'pointer-events-none cursor-default' : '')}
			data-sveltekit-preload-data="hover"
			href={next}>Next</a
		>
	</div>
</div>
