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
    import { slide } from 'svelte/transition';

	let selectedYear = 1363;
	let isPlaying = false;
	let playbackSpeed = 1;
	let playbackInterval: number;
	let selectedEventType: EventType | 'all' = 'all';

	let currentTerritories: Territory[] = [];
	let currentEvents: HistoricalEvent[] = [];

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
	}

	$: currentRuler = rulerTimeline.find(
		(period) => selectedYear >= period.start && selectedYear <= period.end
	)?.ruler || 'Unknown';

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
	<header class="bg-red-900 text-white py-4 shadow-lg sticky top-0 z-50">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold">Duchy of Burgundy</h1>
				<div class="flex items-center gap-6">
					<div class="text-center">
						<div class="text-3xl font-bold">{selectedYear}</div>
						<div class="text-sm opacity-80">Current Year</div>
					</div>
					<div class="px-6 py-2 border-l-2 border-red-700">
						<div class="text-xl font-semibold">{currentRuler}</div>
						<div class="text-sm opacity-80">Duke of Burgundy</div>
					</div>
				</div>
			</div>
		</div>
	</header>

    <!-- Introduction Section -->
    <div class="bg-white border-b py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">
                    Explore the Rise of Burgundy (1363-1477)
                </h2>
                <p class="text-lg text-gray-600 mb-6">
                    Witness the transformation of a small duchy into one of medieval Europe's most powerful states. 
                    Follow the ambitious Valois dukes as they build their territory from the Mediterranean to the North Sea.
                </p>
                <div class="flex justify-center gap-8 text-sm text-gray-500">
                    <div class="flex items-center gap-2">
                        <span>👑</span> 4 Powerful Dukes
                    </div>
                    <div class="flex items-center gap-2">
                        <span>📍</span> 17 Territories
                    </div>
                    <div class="flex items-center gap-2">
                        <span>📅</span> 114 Years of History
                    </div>
                </div>
            </div>
        </div>
    </div>

	<main class="container mx-auto px-4 py-6">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Left Column: Map and Territory List -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Interactive Map -->
				<div class="rounded-xl bg-white p-4 shadow-lg">
					<BurgundyMap 
						territories={currentTerritories} 
						{selectedYear} 
					/>
				</div>

				<!-- Compact Territory List -->
                <div class="rounded-xl bg-white p-6 shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">Current Territories</h2>
                        <div class="text-sm text-gray-500">
                            Ruled by {currentRuler}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        {#each currentTerritories as territory}
                            <div class="rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
                                <!-- Territory Header -->
                                <div class="flex items-center gap-3 p-3">
                                    {#if territory.coatOfArms}
                                        <img 
                                            src={territory.coatOfArms} 
                                            alt={territory.name}
                                            class="w-8 h-8 object-contain"
                                        />
                                    {/if}
                                    <div class="flex-1 min-w-0">
                                        <div class="font-medium text-gray-900 truncate">
                                            {territory.name}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {territory.properties?.capital || 'No capital'}
                                        </div>
                                    </div>
                                    <button 
                                        class="text-gray-400 hover:text-gray-600"
                                        on:click={() => territory.showDetails = !territory.showDetails}
                                    >
                                        <svg class="w-5 h-5 transform transition-transform duration-200
                                                  {territory.showDetails ? 'rotate-180' : ''}" 
                                             fill="none" 
                                             stroke="currentColor" 
                                             viewBox="0 0 24 24">
                                            <path stroke-linecap="round" 
                                                  stroke-linejoin="round" 
                                                  stroke-width="2" 
                                                  d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Expanded Details -->
                                {#if territory.showDetails}
                                    <div 
                                        class="border-t border-gray-200 bg-white p-4 space-y-2"
                                        transition:slide
                                    >
                                        <div class="text-sm">
                                            <span class="font-medium text-gray-700">Acquired:</span>
                                            <span class="text-gray-600">{territory.acquisition}</span>
                                        </div>
                                        {#if territory.properties?.previousRuler}
                                            <div class="text-sm">
                                                <span class="font-medium text-gray-700">Previous Ruler:</span>
                                                <span class="text-gray-600">{territory.properties.previousRuler}</span>
                                            </div>
                                        {/if}
                                        {#if territory.properties?.acquisitionMethod}
                                            <div class="text-sm">
                                                <span class="font-medium text-gray-700">Method:</span>
                                                <span class="text-gray-600">{territory.properties.acquisitionMethod}</span>
                                            </div>
                                        {/if}
                                        <div class="text-sm">
                                            <span class="font-medium text-gray-700">Years under control:</span>
                                            <span class="text-gray-600">{selectedYear - territory.acquisition}</span>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
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