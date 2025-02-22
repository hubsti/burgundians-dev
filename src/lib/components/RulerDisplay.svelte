<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { burgundianRulers } from '$lib/data/rulers';
    import { eventTypeColors, eventTypeIcons } from '$lib/data/events';
    import type { Ruler } from '$lib/data/rulers';
    import type { HistoricalEvent } from '$lib/data/events';

    export let selectedYear: number;
    export let isPlaying: boolean = false;
    export let playbackSpeed: number = 1;
    export let currentEvents: HistoricalEvent[] = [];

    let selectedEventType: 'all' | string = 'all';
    const SPEED_OPTIONS = [0.5, 1, 2, 4];
    
    const dispatch = createEventDispatcher<{
        yearChange: { year: number };
        playbackToggle: { isPlaying: boolean };
        speedChange: { speed: number };
    }>();

    $: currentRuler = burgundianRulers.find(
        ruler => selectedYear >= ruler.reignStart && selectedYear <= ruler.reignEnd
    );

    $: nextRuler = burgundianRulers.find(
        ruler => ruler.reignStart > selectedYear
    );

    $: previousRuler = [...burgundianRulers]
        .reverse()
        .find(ruler => ruler.reignEnd < selectedYear);

    $: currentYearEvents = currentEvents.filter(e => e.year === selectedYear);
    $: filteredEvents = selectedEventType === 'all' 
        ? currentEvents 
        : currentEvents.filter(e => e.type === selectedEventType);

    function handleYearChange(event: Event): void {
        const year = parseInt((event.target as HTMLInputElement).value);
        dispatch('yearChange', { year });
    }

    function togglePlayback(): void {
        dispatch('playbackToggle', { isPlaying: !isPlaying });
    }

    function adjustSpeed(speed: number): void {
        dispatch('speedChange', { speed });
    }

    function getEventTypeColor(type: keyof typeof eventTypeColors): string {
        return eventTypeColors[type] || 'bg-gray-500';
    }

    function getEventTypeIcon(type: keyof typeof eventTypeIcons): string {
        return eventTypeIcons[type] || '📅';
    }
</script>

{#if currentRuler}
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Ruler Header -->
        <div class="p-4 bg-red-900 text-white">
            <h2 class="text-xl font-semibold">{currentRuler.name}</h2>
            <p class="text-sm opacity-80">{currentRuler.reignStart}-{currentRuler.reignEnd}</p>
        </div>

        <!-- Ruler Info -->
        <div class="grid grid-cols-3 gap-4 p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={currentRuler.image} alt={currentRuler.name} class="w-full h-full object-cover"/>
            </div>
            <div class="space-y-2">
                <p class="text-sm text-gray-600">{currentRuler.description}</p>
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden p-2">
                <img src={currentRuler.coatOfArms} alt="Coat of Arms" class="w-full h-full object-contain"/>
            </div>
        </div>

        <!-- Playback Controls -->
        <div class="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div class="flex items-center justify-between mb-3">
                <button
                    class="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 
                           focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50 
                           transition-colors duration-200 ease-in-out flex items-center gap-2"
                    on:click={togglePlayback}
                >
                    {#if isPlaying}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                        </svg>
                        <span>Pause</span>
                    {:else}
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        <span>Play</span>
                    {/if}
                </button>

                <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700">Speed:</span>
                    {#each SPEED_OPTIONS as speed}
                        <button
                            class="px-3 py-1 rounded-md text-sm transition-colors duration-200 ease-in-out
                                {playbackSpeed === speed ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                            on:click={() => adjustSpeed(speed)}
                        >
                            {speed}x
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Timeline -->
        <div class="p-4 border-t border-gray-100">
            <!-- Main Timeline -->
            <div class="relative">
                <!-- Timeline Slider -->
                <input
                    type="range"
                    min={1363}
                    max={1477}
                    value={selectedYear}
                    on:input={handleYearChange}
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50"
                />
                
                <!-- Ruler Period Indicators -->
                <div class="absolute top-0 left-0 w-full h-2">
                    {#each burgundianRulers as ruler}
                        <div 
                            class="absolute h-full transition-all duration-300 border-l-2 border-r-2 border-white
                                   {ruler === currentRuler ? 'bg-red-900' : 'bg-gray-400'}"
                            style="left: {((ruler.reignStart - 1363) / (1477 - 1363)) * 100}%; 
                                   width: {((ruler.reignEnd - ruler.reignStart) / (1477 - 1363)) * 100}%;"
                        >
                            <img 
                                src={ruler.coatOfArms} 
                                alt="Coat of Arms"
                                class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 h-4 w-4 object-contain"
                            />
                        </div>
                    {/each}
                </div>

        
                <!-- Ruler Names - Properly centered under each period -->
                <div class="relative mt-8 h-12">
                    {#each burgundianRulers as ruler}
                        <div 
                            class="absolute text-center transition-colors duration-300"
                            class:text-red-900={ruler === currentRuler}
                            class:text-gray-600={ruler !== currentRuler}
                            style="left: {((ruler.reignStart - 1363 + (ruler.reignEnd - ruler.reignStart)/2) / (1477 - 1363)) * 100}%;
                                   transform: translateX(-50%);"
                        >
                            <div class="font-medium text-xs">{ruler.name}</div>
                            <div class="text-xs opacity-75">{ruler.reignStart}-{ruler.reignEnd}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Event Type Filter -->
        <div class="p-4 border-t border-gray-100 mt-5">
            <div class="flex flex-wrap gap-2">
                <button
                    class="px-3 py-1 rounded-full text-sm transition-colors
                           {selectedEventType === 'all' ? 'bg-red-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                    on:click={() => selectedEventType = 'all'}
                >
                    All Events
                </button>
                {#each Object.keys(eventTypeColors) as type}
                    <button
                        class="px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors
                               {selectedEventType === type ? getEventTypeColor(type as keyof typeof eventTypeColors) + ' text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                        on:click={() => selectedEventType = type}
                    >
                        <span>{getEventTypeIcon(type as keyof typeof eventTypeIcons)}</span>
                        <span>{type}</span>
                    </button>
                {/each}
            </div>
        </div>

        <!-- Events List -->
        <div class="border-t border-gray-100">
            <!-- Current Year Events -->
            {#if currentYearEvents.length > 0}
                <div class="p-4 border-b border-gray-100">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Events in {selectedYear}</h3>
                    <div class="space-y-3">
                        {#each currentYearEvents as event}
                            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="px-2 py-1 text-xs rounded-full {getEventTypeColor(event.type)} text-white">
                                        {getEventTypeIcon(event.type)} {event.type}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-700">{event.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Historical Events -->
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Historical Timeline</h3>
                <div class="max-h-[300px] overflow-y-auto space-y-2 pr-2 
                           scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100">
                    {#each filteredEvents.slice().reverse() as event}
                        <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-sm font-semibold text-gray-900">{event.year}</span>
                                <span class="px-2 py-0.5 text-xs rounded-full {getEventTypeColor(event.type)} text-white">
                                    {getEventTypeIcon(event.type)} {event.type}
                                </span>
                            </div>
                            <p class="text-sm text-gray-700">{event.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}