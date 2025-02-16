<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import BurgundyMap from '$lib/components/BurgundyMap.svelte';
	import {
		historicalEvents,
		eventTypeColors,
		eventTypeIcons,
		type EventType
	} from '$lib/data/events';
	import { burgundianTerritories, getTerritoriesForYear } from '$lib/data/territories';
	import type { Territory } from '$lib/types/territory';
	import type { HistoricalEvent } from '$lib/data/events';
	import RulerDisplay from '$lib/components/RulerDisplay.svelte';

	let selectedYear = 1363;
	let isPlaying = false;
	let playbackSpeed = 1;
	let playbackInterval: number;
	let selectedEventType: EventType | 'all' = 'all';

	let currentTerritories: Territory[] = [];
	let currentEvents: HistoricalEvent[] = [];
	let filteredEvents: HistoricalEvent[] = [];

	const rulerTimeline = [
		{ start: 1363, end: 1404, ruler: 'Philip the Bold' },
		{ start: 1404, end: 1419, ruler: 'John the Fearless' },
		{ start: 1419, end: 1467, ruler: 'Philip the Good' },
		{ start: 1467, end: 1477, ruler: 'Charles the Bold' }
	];

	// Update territories and events when year changes
	$: {
		currentTerritories = getTerritoriesForYear(selectedYear).sort(
			(a, b) => a.acquisition - b.acquisition
		);
		currentEvents = historicalEvents.filter((e) => e.year <= selectedYear);
		filteredEvents =
			selectedEventType === 'all'
				? currentEvents
				: currentEvents.filter((e) => e.type === selectedEventType);
	}

	$: currentRuler =
		rulerTimeline.find((period) => selectedYear >= period.start && selectedYear <= period.end)
			?.ruler || 'Unknown';

	// Get events that occurred in the selected year
	$: currentYearEvents = historicalEvents.filter((e) => e.year === selectedYear);

	function handleYearChange(event: CustomEvent<{ year: number }>) {
		selectedYear = event.detail.year;
	}

	function handlePlaybackToggle(event: CustomEvent<{ isPlaying: boolean }>) {
		isPlaying = event.detail.isPlaying;
		if (isPlaying) {
			startPlayback();
		} else {
			stopPlayback();
		}
	}

	function handleSpeedChange(event: CustomEvent<{ speed: number }>) {
		playbackSpeed = event.detail.speed;
		if (isPlaying) {
			stopPlayback();
			startPlayback();
		}
	}

	function startPlayback() {
		stopPlayback();
		playbackInterval = setInterval(() => {
			if (selectedYear < 1477) {
				selectedYear += 1;
			} else {
				stopPlayback();
				isPlaying = false;
			}
		}, 1000 / playbackSpeed) as unknown as number;
	}

	function stopPlayback() {
		if (playbackInterval) {
			clearInterval(playbackInterval);
		}
	}

	function getEventTypeColor(type: EventType): string {
		return eventTypeColors[type] || 'bg-gray-500';
	}

	function getEventTypeIcon(type: EventType): string {
		return eventTypeIcons[type] || '📅';
	}

	onDestroy(() => {
		stopPlayback();
	});
</script>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="container mx-auto px-4">
		<header class="mb-8 text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900">
				Burgundian Territory Changes (1363-1477)
			</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Explore the territorial evolution of the Duchy of Burgundy through the medieval period
			</p>
		</header>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div class="space-y-6 lg:col-span-2">
				<!-- Map Section -->
				<div class="rounded-xl bg-white p-4 shadow-lg">
					<BurgundyMap territories={currentTerritories} {selectedYear} />
				</div>

				<!-- Current Territory Overview -->
				<div class="rounded-xl bg-white p-6 shadow-lg">
					<div class="mb-4 flex items-center justify-between">
						<div>
							<h2 class="text-xl font-semibold text-gray-900">
								Current Territories ({currentTerritories.length})
							</h2>
							<p class="text-sm text-gray-600">Listed chronologically by acquisition date</p>
						</div>
						<div class="rounded-lg bg-red-900 px-4 py-2 text-white">
							<span class="font-medium">{currentRuler}</span>
						</div>
					</div>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each currentTerritories as territory (territory.id)}
							<div class="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-3">
								<h3 class="font-medium text-gray-900">{territory.name}</h3>
								<div class="mt-1 space-y-1">
									<p class="text-sm text-gray-600">
										<span class="inline-block rounded-md bg-red-100 px-2 py-1 text-red-900">
											Acquired: {territory.acquisition}
										</span>
									</p>
									{#if territory.properties?.capital}
										<p class="text-sm text-gray-500">Capital: {territory.properties.capital}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<RulerDisplay {selectedYear} />
				<!-- Timeline Control with integrated events -->
				<div class="rounded-xl bg-white shadow-lg">
					<Timeline
						{selectedYear}
						{isPlaying}
						{playbackSpeed}
						territories={burgundianTerritories}
						{currentEvents}
						on:yearChange={handleYearChange}
						on:playbackToggle={handlePlaybackToggle}
						on:speedChange={handleSpeedChange}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
