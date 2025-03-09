<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import type { DateRange } from 'bits-ui';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone
	} from '@internationalized/date';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';

	let { q } = $props();

	let isDrawerOpen = $state(false);
	function toggleDrawer() {
		isDrawerOpen = !isDrawerOpen;
	}
	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	let value: DateRange = $state({
		start: new CalendarDate(2022, 1, 20),
		end: new CalendarDate(2022, 1, 20).add({ days: 20 })
	});

	let startValue: DateValue | undefined = $state(undefined);
</script>

<header>
	<div class="search-bar">
		<!-- <input id="search" type="search" placeholder="&#x1F50D; Start typing to search..." /> -->
		<form method="GET" action="/gallery" class="w-full">
			<Input name="q" placeholder="Search" value={q} />
		</form>
		<Button style="margin-left: 16px" onclick={toggleDrawer}
			><img
				class="icon"
				width="48"
				height="48"
				src="https://img.icons8.com/material-rounded/ffffff/48/filter-and-sort.png"
				alt="filter-and-sort"
			/></Button
		>
	</div>
</header>

<main class="container">
	<div class="search-display"></div>
	<div class="posts-container"></div>

	<Drawer.Root open={isDrawerOpen}>
		<Drawer.Content>
			<div class="mx-auto w-full">
				<Drawer.Header>
					<Drawer.Title class="text-center">Choose search filters</Drawer.Title>
				</Drawer.Header>
				<div class="block">
					<h2>Observation requirements</h2>
					<div class="flex flex-col">
						<span class="spacer"></span>
						<label>
							<Switch />
							<span>Images</span>
						</label>
						<label>
							<Switch />
							<span>Audio</span>
						</label>
					</div>
				</div>
				<div class="block">
					<h2>Date range of observations</h2>
					<RangeCalendar
						bind:value
						onStartValueChange={(v) => {
							startValue = v;
						}}
						numberOfMonths={2}
					/>
				</div>
				<!-- Favorits
				 	Has image, has audio
					Date range -->

				<Drawer.Footer>
					<Button>Submit</Button>
					<Drawer.Close onclick={toggleDrawer}>Cancel</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</main>

<style>
	.search-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 60px;
		width: 70%;
		margin-left: auto;
		margin-right: auto;
	}
	.icon {
		width: 24px;
		height: 24px;
	}
	.filterGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 16px;
	}
	.filterGrid .block {
		margin-bottom: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.filterGrid .spacer {
		height: 1rem;
	}
	.filterGrid label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}
</style>
