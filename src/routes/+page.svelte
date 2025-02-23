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
	import { burgundianRulers } from '$lib/data/rulers';
	import type { Territory } from '$lib/types/territory';
	import type { HistoricalEvent } from '$lib/data/events';
	import RulerDisplay from '$lib/components/RulerDisplay.svelte';
	import { slide } from 'svelte/transition';

	let selectedYear = 1363;
	let isPlaying = false;
	let playbackSpeed = 1;
	let playbackInterval: number;
	let selectedEventType: EventType | 'all' = 'all';

	let currentTerritories: Territory[] = [];
	let currentEvents: HistoricalEvent[] = [];

	// Update territories and events when year changes
	$: {
		currentTerritories = getTerritoriesForYear(selectedYear).sort(
			(a, b) => a.acquisition - b.acquisition
		);
		currentEvents = historicalEvents.filter((e) => e.year <= selectedYear);
	}

	$: currentRuler = burgundianRulers.find(
		(ruler) => selectedYear >= ruler.reignStart && selectedYear <= ruler.reignEnd
	);

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

	onDestroy(() => {
		stopPlayback();
	});

	
</script>

<div class="min-h-screen bg-gray-50">
	
	<!-- Top Header with Year and Ruler -->
	<header class="sticky top-0 z-100 bg-red-900 py-4 text-white shadow-lg">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<h1 class="text-2xl font-bold">Duchy of Burgundy</h1>
												<img
								src='coats-of-arms/Ancient_Flag_of_Burgundy.svg'
								alt="Current ruler's coat of arms"
								class="h-15 w-15 object-contain"
							/>
				</div>
				<div class="flex items-center gap-6">
					<div class="text-center">
						<div class="text-3xl font-bold">{selectedYear}</div>
						<div class="text-sm opacity-80">Current Year</div>
					</div>
					<div class="flex items-center gap-4 border-l-2 border-red-700 px-6 py-2">
						<div>
							<div class="text-xl font-semibold">{currentRuler?.name}</div>
							<div class="text-sm opacity-80">Duke of Burgundy</div>
						</div>
						{#if currentRuler}
							<img
								src={currentRuler.coatOfArms}
								alt="Current ruler's coat of arms"
								class="h-10 w-10 object-contain"
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</header>

	<main class="relative z-0 container mx-auto px-4 py-6">
		<!-- Introduction Section -->
		<div class="mb-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900">
					Explore the Rise of Burgundy (1363-1477)
				</h2>
				<p class="mb-6 text-lg text-gray-600">
					Explore the evolution of the Duchy of Burgundy under the Valois dynasty. From its origins
					as a French duchy, Burgundy expanded through strategic marriages, purchases, and military
					campaigns to become a significant power linking France, the Holy Roman Empire, and the Low
					Countries.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Left Column: Map and Territory List -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Interactive Map -->
				<div class="rounded-xl bg-white p-4 shadow-lg">
					<BurgundyMap territories={currentTerritories} {selectedYear} />
				</div>

				<!-- Compact Territory List -->
				<div class="rounded-xl bg-white p-6 shadow-lg">
					<div class="mb-6 flex items-center justify-between">
						<h2 class="text-xl font-semibold text-gray-900">Territories</h2>
						<div class="text-sm text-gray-500">
							Current Ruler: {currentRuler?.name}
						</div>
					</div>

					{#each burgundianRulers as ruler}
						{#if ruler.reignStart <= selectedYear}
							{@const rulerTerritories = currentTerritories.filter((t) => t.ruler === ruler.name)}
							{#if rulerTerritories.length > 0}
								<div class="mb-6 last:mb-0">
									<!-- Ruler Section Header -->
									<div class="mb-3 flex items-center gap-3 border-b border-gray-100 pb-2">
										<img src={ruler.coatOfArms} alt={ruler.name} class="h-6 w-6 object-contain" />
										<h3 class="font-medium text-gray-900">Territories acquired by {ruler.name}</h3>
									</div>

									<!-- Territories Grid -->
									<div class="grid grid-cols-2 gap-4">
										{#each rulerTerritories as territory}
											<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
												<!-- Territory Header -->
												<div class="flex items-center gap-3 p-3">
													{#if territory.coatOfArms}
														<img
															src={territory.coatOfArms}
															alt={territory.name}
															class="h-8 w-8 object-contain"
														/>
													{/if}
													<div class="min-w-0 flex-1">
														<div class="truncate font-medium text-gray-900">
															{territory.name}
														</div>
														<div class="text-sm text-gray-500">
															{territory.properties?.capital || 'No capital'} • {territory.acquisition}
														</div>
													</div>
													<button
														class="text-gray-400 hover:text-gray-600"
														on:click={() => (territory.showDetails = !territory.showDetails)}
														aria-label="Toggle territory details"
													>
														<svg
															class="h-5 w-5 transform transition-transform duration-200
															{territory.showDetails ? 'rotate-180' : ''}"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M19 9l-7 7-7-7"
															/>
														</svg>
													</button>
												</div>

												<!-- Expanded Details -->
												{#if territory.showDetails}
													<div
														class="space-y-2 border-t border-gray-200 bg-white p-4"
														transition:slide
													>
														{#if territory.properties?.previousRuler}
															<div class="text-sm">
																<span class="font-medium text-gray-700">Previous Ruler:</span>
																<span class="text-gray-600"
																	>{territory.properties.previousRuler}</span
																>
															</div>
														{/if}
														{#if territory.properties?.acquisitionMethod}
															<div class="text-sm">
																<span class="font-medium text-gray-700">Method:</span>
																<span class="text-gray-600"
																	>{territory.properties.acquisitionMethod}</span
																>
															</div>
														{/if}
														<div class="text-sm">
															<span class="font-medium text-gray-700">Years under control:</span>
															<span class="text-gray-600"
																>{selectedYear - territory.acquisition}</span
															>
														</div>
													</div>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			</div>

			<!-- Right Column: Ruler Display and Timeline -->
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
	</main>
</div>
