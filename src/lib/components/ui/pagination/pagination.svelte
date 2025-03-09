<script lang="ts">
	import clsx from 'clsx';
	import { page } from '$app/state';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let {
		pageNum,
		totalResults,
		perPage,
		class: className,
		...restProps
	}: {
		pageNum: number;
		totalResults: number;
		perPage: number;
		class: string;
	} = $props();

	let totalPages = $derived(Math.floor(totalResults / perPage));

	let previous = $derived.by(() => {
		if (pageNum == 1) return '';

		let url = page.url;

		const queryParams = new URLSearchParams(url.searchParams);
		queryParams.set('page', (pageNum - 1).toString());

		return queryParams.toString();
	});
	let next = $derived.by(() => {
		if (pageNum == totalPages) return '';

		let url = page.url;

		const queryParams = new URLSearchParams(url.searchParams);
		queryParams.set('page', (pageNum + 1).toString());

		return queryParams.toString();
	});

	let onFirstPage = $derived(pageNum == 1);
	let onLastPage = $derived(pageNum == totalPages);
</script>

<div class={cn(className, 'grid w-full grid-cols-3')}>
	<div class={onFirstPage ? 'opacity-50' : ''}>
		<a
			class={cn(buttonVariants(), 'w-fit', onFirstPage ? 'pointer-events-none cursor-default' : '')}
			data-sveltekit-preload-data="hover"
			href="?{previous}">Previous</a
		>
	</div>
	<p class="m-auto">{pageNum} / {totalPages}</p>
	<div class={cn('ml-auto mr-0', onLastPage ? 'opacity-50' : '')}>
		<a
			class={cn(buttonVariants(), 'w-fit', onLastPage ? 'pointer-events-none cursor-default' : '')}
			data-sveltekit-preload-data="hover"
			href="?{next}">Next</a
		>
	</div>
</div>
