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

	function groupTerritoriesByRuler(territories: Territory[]) {
		return territories.reduce(
			(acc, territory) => {
				if (!acc[territory.ruler]) {
					acc[territory.ruler] = [];
				}
				acc[territory.ruler].push(territory);
				return acc;
			},
			{} as Record<string, Territory[]>
		);
	}

	onDestroy(() => {
		stopPlayback();
	});
</script>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="container mx-auto px-4">
		<header class="mb-8 text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900">Duchy of Burgundy (1363-1477)</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Explore the rise and territorial expansion of the Duchy of Burgundy under the
				Valois-Burgundian dynasty
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
					<!-- Header with Year and Ruler -->
					<div class="mb-6 border-b border-gray-200 pb-4">
						<div class="flex items-center justify-between">
							<h2 class="text-xl font-semibold text-gray-900">Burgundian Territories</h2>
							<div class="flex items-center gap-6">
								<div class="text-center">
									<div class="text-3xl font-bold text-gray-900">{selectedYear}</div>
									<div class="text-sm text-gray-600">Current Year</div>
								</div>
								<div class="rounded-lg bg-red-900 px-6 py-3 text-center">
									<div class="text-xl font-semibold text-white">{currentRuler}</div>
									<div class="text-sm text-red-100">Duke of Burgundy</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Territory Groups -->
					<div class="space-y-6">
						{#each Object.entries(groupTerritoriesByRuler(currentTerritories)) as [ruler, territories]}
							<div class="space-y-3">
								<h3 class="font-medium text-gray-900">
									Territories acquired by {ruler}
								</h3>
								<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{#each territories as territory}
										<div
											class="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
										>
											<!-- Territory Header -->
											<div class="flex items-start gap-3">
												{#if territory.coatOfArms}
													<img
														src={territory.coatOfArms}
														alt="Coat of arms of {territory.name}"
														class="h-10 w-10 object-contain"
													/>
												{/if}
												<div class="flex-1">
													<h4 class="font-medium text-gray-900">
														{territory.name}
													</h4>
													<p class="text-sm text-gray-500">
														{territory.properties?.capital || 'No capital specified'}
													</p>
												</div>
												<div class="absolute top-2 right-2 rounded bg-gray-100 px-2 py-1 text-sm">
													{territory.acquisition}
												</div>
											</div>

											<!-- Acquisition Info -->
											<div class="mt-3 text-sm">
												{#if territory.properties?.acquisitionMethod}
													<div class="rounded-md bg-gray-50 p-2 text-gray-700">
														{territory.properties.acquisitionMethod}
													</div>
												{/if}
											</div>

											<!-- Previous Ruler -->
											{#if territory.properties?.previousRuler}
												<div class="mt-2 flex items-center gap-1 text-sm text-gray-600">
													<span>From:</span>
													<span class="font-medium">{territory.properties.previousRuler}</span>
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="space-y-6">
				<RulerDisplay
					{selectedYear}
					{isPlaying}
					{playbackSpeed}
					{currentEvents}
					on:yearChange={handleYearChange}
					on:playbackToggle={handlePlaybackToggle}
					on:speedChange={handleSpeedChange}
				/>
			</div>
		</div>
	</div>
</div>
