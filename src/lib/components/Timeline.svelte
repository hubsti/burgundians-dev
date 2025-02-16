<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Territory } from '$lib/types/territory';
    import type { HistoricalEvent } from '$lib/data/events';
    import { eventTypeColors, eventTypeIcons } from '$lib/data/events';

    export let selectedYear: number = 1363;
    export let isPlaying: boolean = false;
    export let playbackSpeed: number = 1;
    export let territories: Territory[] = [];
    export let currentEvents: HistoricalEvent[] = [];

    let selectedEventType: 'all' | string = 'all';
    
    const dispatch = createEventDispatcher<{
        yearChange: { year: number };
        playbackToggle: { isPlaying: boolean };
        speedChange: { speed: number };
    }>();

    const MIN_YEAR = 1363;
    const MAX_YEAR = 1477;
    const SPEED_OPTIONS = [0.5, 1, 2, 4];

    function getEventImage(year: number, type: string): string {
        return `/events/${year}-${type.toLowerCase()}.jpg`;
    }

    function handleYearChange(event: Event): void {
        const year = parseInt((event.target as HTMLInputElement).value);
        dispatch('yearChange', { year });
    }

    function togglePlayback(): void {
        isPlaying = !isPlaying;
        dispatch('playbackToggle', { isPlaying });
    }

    function adjustSpeed(speed: number): void {
        playbackSpeed = speed;
        dispatch('speedChange', { speed });
    }

    function getEventTypeColor(type: keyof typeof eventTypeColors): string {
        return eventTypeColors[type] || 'bg-gray-500';
    }

    function getEventTypeIcon(type: keyof typeof eventTypeIcons): string {
        return eventTypeIcons[type] || '📅';
    }

    $: currentYearEvents = currentEvents.filter((e) => e.year === selectedYear);
    $: filteredEvents = selectedEventType === 'all' 
        ? currentEvents 
        : currentEvents.filter(e => e.type === selectedEventType);
</script>

<div class="w-full rounded-xl bg-white p-4 shadow-lg">
    <!-- Playback Controls -->
    <div class="mb-4 flex items-center justify-between">
        <button
            class="focus:ring-opacity-50 flex items-center gap-2 rounded-lg bg-red-900
                   px-4 py-2 text-white transition-colors
                   duration-200 ease-in-out hover:bg-red-800 focus:ring-2 focus:ring-red-900 focus:outline-none"
            on:click={togglePlayback}
        >
            {#if isPlaying}
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause</span>
            {:else}
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                </svg>
                <span>Play</span>
            {/if}
        </button>

        <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-700">Speed:</span>
            {#each SPEED_OPTIONS as speed}
                <button
                    class="rounded-md px-3 py-1 text-sm transition-colors duration-200 ease-in-out
                        {playbackSpeed === speed
                        ? 'bg-red-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                    on:click={() => adjustSpeed(speed)}
                >
                    {speed}x
                </button>
            {/each}
        </div>
    </div>

    <!-- Timeline Slider -->
    <div class="relative mb-4">
        <input
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={selectedYear}
            on:input={handleYearChange}
            class="focus:ring-opacity-50 h-2 w-full cursor-pointer appearance-none rounded-lg
                   bg-gray-200 focus:ring-2 focus:ring-red-900 focus:outline-none"
        />
        <div class="mt-2 flex justify-between text-sm font-medium text-gray-600">
            <span>{MIN_YEAR}</span>
            <span class="font-bold text-red-900">{selectedYear}</span>
            <span>{MAX_YEAR}</span>
        </div>
    </div>

    <!-- Event Type Filter -->
    <div class="mt-6 mb-4">
        <div class="flex flex-wrap gap-2">
            <button
                class="px-3 py-1 rounded-full text-sm {selectedEventType === 'all' ? 'bg-red-900 text-white' : 'bg-gray-100'}"
                on:click={() => selectedEventType = 'all'}
            >
                All Events
            </button>
            {#each Object.keys(eventTypeColors) as type}
                <button
                    class="px-3 py-1 rounded-full text-sm flex items-center gap-1
                        {selectedEventType === type ? getEventTypeColor(type as keyof typeof eventTypeColors) + ' text-white' : 'bg-gray-100'}"
                    on:click={() => selectedEventType = type}
                >
                    <span>{getEventTypeIcon(type as keyof typeof eventTypeIcons)}</span>
                    <span>{type}</span>
                </button>
            {/each}
        </div>
    </div>

    <!-- Current Year Events -->
    {#if currentYearEvents.length > 0}
        <div class="mt-6">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">Events in {selectedYear}</h3>
            <div class="space-y-4">
                {#each currentYearEvents as event}
                    <div
                        class="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-lg"
                    >
                        <!-- Event Header -->
                        <div class="p-4">
                            <div class="mb-2 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                 
                                    <span
                                        class="rounded-full px-2 py-1 text-xs {getEventTypeColor(
                                            event.type
                                        )} text-white"
                                    >
                                        {getEventTypeIcon(event.type)}
                                        {event.type}
                                    </span>
                                </div>
                            </div>
                            <p class="text-gray-700">{event.description}</p>
                        </div>
                        <!-- Event Image -->
                        <!--
                        <div class="h-48 w-full bg-gray-50">
                            <img
                                src={getEventImage(event.year, event.type)}
                                alt={event.description}
                                class="h-full w-full object-cover"
                            />
                        </div>
                        -->
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Historical Events List -->
    <div class="mt-6">
        <h3 class="mb-3 text-lg font-semibold text-gray-900">Historical Timeline</h3>
        <div
            class="scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100 max-h-[400px] space-y-4 overflow-y-auto pr-2"
        >
            {#each filteredEvents.slice().reverse() as event}
                <div
                    class="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-lg"
                >
                    <div class="flex">
                        
                        <!-- Small Event Image -->
                         <!--
                        <div class="h-20 w-20 flex-shrink-0 bg-gray-50">
                            <img
                                src={getEventImage(event.year, event.type)}
                                alt={event.description}
                                class="h-full w-full object-cover"
                            />
                        </div>-->
                        
                        <!-- Event Content -->
                        <div class="flex-grow p-3">
                            <div class="mb-1 flex items-center gap-2">
                                <span class="text-sm font-semibold text-gray-900">{event.year}</span>
                                <span
                                    class="rounded-full px-2 py-0.5 text-xs {getEventTypeColor(
                                        event.type
                                    )} text-white"
                                >
                                    {getEventTypeIcon(event.type)}
                                    {event.type}
                                </span>
                            </div>
                            <p class="text-sm text-gray-700">{event.description}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>